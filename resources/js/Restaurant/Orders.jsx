import BaseAdminto from '@Adminto/Base';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import useWebSocket from '../Hooks/useWebSocket';
import { useEffect, useState } from 'react';
import OrdersRest from '../Actions/Restaurant/OrdersRest';
import Number2Currency from '../Utils/Number2Currency';

// Rests
const ordersRest = new OrdersRest()

const audio = new Audio('/assets/sounds/notification.mp3');

const Orders = ({ orders: ordersDB, statuses }) => {
  const [orders, setOrders] = useState(ordersDB);
  const [activeTab, setActiveTab] = useState('realtime'); // realtime | history

  const { socket } = useWebSocket()

  const onOrderChanged = (order) => {
    console.log(order);
    setOrders(prev => {
      const exists = prev.some(o => o.id === order.id);
      if (order.status.is_ok) {
        return prev.filter(o => o.id !== order.id);
      } else {
        if (exists) {
          return prev.map(o => o.id === order.id ? order : o);
        } else {
          audio.play();
          return [...prev, order];
        }
      }
    });
  }

  const onStatusChanged = async (orderId, statusId) => {
    const result = await ordersRest.save({
      id: orderId,
      status_id: statusId
    })
    onOrderChanged(result)
  }

  useEffect(() => {
    socket.on('order.created', (order) => onOrderChanged(order))
    socket.on('order.updated', (order) => onOrderChanged(order))

    return () => {
      socket.off('order.created')
      socket.off('order.updated')
    }
  }, [socket])

  // Pipeline stages
  const receptionOrders   = orders.filter(o => o.status_id === '56844089-7edf-4c9e-9d09-6874624c37b2'); // PENDIENTE
  const kitchenOrders     = orders.filter(o => o.status_id === 'be7e24c9-a3e4-444e-adab-bb301b4ccce3' || o.status_id === '1eb603e6-e078-4f9f-8c86-25a363742518'); // CONFIRMADO + PREPARANDO
  const readyOrders       = orders.filter(o => o.status_id === 'f0a538f0-8aef-4ca7-80d1-297ab6c58279'); // LISTO PARA RECOJO
  const deliveredOrders   = orders.filter(o => o.status_id === 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc' || o.status_id === 'ea4578c1-f0c7-4495-ade5-a82b5ca7cc4b'); // ENTREGADO + CANCELADO

  const handleConfirm = (orderId) => onStatusChanged(orderId, 'be7e24c9-a3e4-444e-adab-bb301b4ccce3');
  const handleCancel  = (orderId) => onStatusChanged(orderId, 'ea4578c1-f0c7-4495-ade5-a82b5ca7cc4b');
  const handleReady   = (orderId) => onStatusChanged(orderId, 'f0a538f0-8aef-4ca7-80d1-297ab6c58279');
  const handleDeliver = (orderId) => onStatusChanged(orderId, 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc');

  const handleMozoView = () => console.log('Vista de mozo clicked');

  const OrderCard = ({ order, stage }) => (
    <div className="card mb-2 shadow-sm" style={{ borderLeft: `4px solid ${order.status.color}` }}>
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-start">
          <small className="fw-bold text-muted">#{order.id.slice(-6)}</small>
          <span className="badge" style={{ backgroundColor: order.status.color, color: '#fff' }}>
            {order.status.name}
          </span>
        </div>

        {stage === 'reception' && (
          <>
            <div className="mt-2">
              <strong>{order.client.name} {order.client.lastname}</strong>
              <div className="text-muted small">{order.client.email}</div>
              <div className="text-muted small">{order.address?.street || 'Sin dirección'}</div>
              <div className="text-muted small">{order.payment_method}</div>
            </div>
            <div className="mt-2 fw-semibold">Total: S/ {Number2Currency(order.total_amount)}</div>
            <details className="mt-2 small">
              <summary>Ver detalles</summary>
              <ul className="mt-1 mb-0 ps-3">
                {order.details.map(d => (
                  <li key={d.id}>{d.quantity} × {d.product_name}</li>
                ))}
              </ul>
            </details>
            <div className="d-flex gap-1 mt-2">
              <button className="btn btn-success btn-sm flex-fill" onClick={() => handleConfirm(order.id)}>Aceptar</button>
              <button className="btn btn-danger btn-sm flex-fill" onClick={() => handleCancel(order.id)}>Rechazar</button>
            </div>
          </>
        )}

        {stage === 'kitchen' && (
          <>
            <details className="mt-2 small">
              <summary>Ver pedido</summary>
              <ul className="mt-1 mb-0 ps-3">
                {order.details.map(d => (
                  <li key={d.id}>{d.quantity} × {d.product_name}</li>
                ))}
              </ul>
              {order.notes && <div className="mt-1 text-muted"><strong>Notas:</strong> {order.notes}</div>}
            </details>
            <div className="d-flex gap-1 mt-2">
              <button className="btn btn-info btn-sm flex-fill" onClick={() => handleReady(order.id)}>Marcar listo</button>
            </div>
          </>
        )}

        {stage === 'ready' && (
          <>
            <div className="mt-2">
              <strong>{order.client.name} {order.client.lastname}</strong>
              <div className="text-muted small">{order.payment_method}</div>
              <div className="text-muted small">{order.address?.street || 'Recojo en tienda'}</div>
            </div>
            <div className="d-flex gap-1 mt-2">
              <button className="btn btn-success btn-sm flex-fill" onClick={() => handleDeliver(order.id)}>Entregado</button>
            </div>
          </>
        )}

        {stage === 'history' && (
          <>
            <div className="mt-2">
              <strong>{order.client.name} {order.client.lastname}</strong>
              <div className="text-muted small">Delivery: {order.delivery?.name || 'N/A'}</div>
              <div className="text-muted small">Entrega: {new Date(order.updated_at).toLocaleTimeString()}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-12">
        <div className="card h-100">
          <div className="d-flex card-header justify-content-between align-items-center border-bottom">
            <h4 className="header-title my-0">Pipeline de pedidos</h4>
            <div className="btn-group btn-group-xs" role="group">
              <button
                type="button"
                className={`btn btn-xs btn-outline-primary ${activeTab === 'realtime' ? 'active' : ''}`}
                onClick={() => setActiveTab('realtime')}
              >
                En tiempo real
              </button>
              <button
                type="button"
                className={`btn btn-xs btn-outline-primary ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Historial
              </button>
            </div>
          </div>

          <div className="card-body p-3" style={{ minHeight: 'calc(100vh - 300px)' }}>
            {activeTab === 'realtime' && (
              <div className="row g-3">
                <div className="col-md-3">
                  <h6 className="text-center mb-2">📥 Recepción</h6>
                  {receptionOrders.map(o => <OrderCard key={o.id} order={o} stage="reception" />)}
                </div>
                <div className="col-md-3">
                  <h6 className="text-center mb-2">🍳 Cocina</h6>
                  {kitchenOrders.map(o => <OrderCard key={o.id} order={o} stage="kitchen" />)}
                </div>
                <div className="col-md-3">
                  <h6 className="text-center mb-2">📦 Listos</h6>
                  {readyOrders.map(o => <OrderCard key={o.id} order={o} stage="ready" />)}
                </div>
                <div className="col-md-3">
                  <h6 className="text-center mb-2">✅ Finalizados</h6>
                  {deliveredOrders.map(o => <OrderCard key={o.id} order={o} stage="history" />)}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="row g-3">
                <div className="col-12">
                  <h6 className="text-center mb-2">📜 Historial completo</h6>
                  {orders.filter(o => o.status.is_ok).map(o => <OrderCard key={o.id} order={o} stage="history" />)}
                </div>
              </div>
            )}
          </div>

          <div className="card-footer">
            <div className="align-items-center justify-content-between row text-center text-sm-start">
              <div className="col-sm">
                <div className="text-muted">
                  Mostrando <span className="fw-semibold">
                    {activeTab === 'realtime'
                      ? receptionOrders.length + kitchenOrders.length + readyOrders.length
                      : orders.filter(o => o.status.is_ok).length}
                  </span> resultados
                </div>
              </div>
              <div className="col-sm-auto mt-3 mt-sm-0">
                <button className="btn btn-outline-secondary btn-sm" onClick={handleMozoView}>
                  Vista de mozo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Pedidos'>
    <Orders {...properties} />
  </BaseAdminto>);
})