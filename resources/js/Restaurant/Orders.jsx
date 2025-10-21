import BaseAdminto from '@Adminto/Base';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import useWebSocket from '../Hooks/useWebSocket';
import { useEffect, useState } from 'react';
import OrdersRest from '../Actions/Restaurant/OrdersRest';

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
      console.loh('Quitando eventos del websocket')
      socket.off('order.created')
      socket.off('order.updated')
    }
  }, [socket])

  // Filter orders for realtime panel (only pending status)
  const realtimeOrders = orders.filter(o => o.status_id === '56844089-7edf-4c9e-9d09-6874624c37b2');

  const handleConfirm = (orderId) => {
    onStatusChanged(orderId, 'be7e24c9-a3e4-444e-adab-bb301b4ccce3');
  };

  const handleCancel = (orderId) => {
    onStatusChanged(orderId, 'ea4578c1-f0c7-4495-ade5-a82b5ca7cc4b');
  };

  const handleMozoView = () => {
    console.log('Vista de mozo clicked');
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card h-100">
          <div className="d-flex card-header justify-content-between align-items-center border-bottom">
            <h4 className="header-title my-0">Lista de pedidos</h4>
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

          <div className="card-body p-0 d-flex flex-column" style={{ minHeight: 'calc(100vh - 300px)' }}>
            {activeTab === 'realtime' && (
              <div className="table-responsive flex-grow-1">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Cliente</th>
                      <th>Pedido</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {realtimeOrders.map(order => (
                      <tr key={order.id}>
                        <th scope="row">{order.id}</th>
                        <td>Client #{order.client_id}</td>
                        <td>Order #{order.id}</td>
                        <td>
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleConfirm(order.id)}
                            >
                              CONFIRMAR
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleCancel(order.id)}
                            >
                              CANCELAR
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="p-3 text-center text-muted">
                {/* Placeholder for history content */}
                Historial de pedidos (contenido pendiente)
              </div>
            )}
          </div>

          <div className="card-footer">
            <div className="align-items-center justify-content-between row text-center text-sm-start">
              <div className="col-sm">
                <div className="text-muted">
                  Mostrando <span className="fw-semibold">{activeTab === 'realtime' ? realtimeOrders.length : 0}</span> resultados
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