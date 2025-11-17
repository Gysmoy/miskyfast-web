import BaseAdminto from '@Adminto/Base';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import useWebSocket from '../Hooks/useWebSocket';
import { useEffect, useRef, useState } from 'react';
import OrdersRest from '../Actions/Restaurant/OrdersRest';
import Number2Currency from '../Utils/Number2Currency';
import DataGrid from '../Components/Adminto/DataGrid';
import KanbanCard from '../Reutilizables/Orders/KanbanCard';
import OrderCard from '../Reutilizables/Orders/OrderCard';

// Rests
const ordersRest = new OrdersRest()

const audio = new Audio('/assets/sounds/notification.mp3');

const Kitchen = ({ orders: ordersDB }) => {
  const gridRef = useRef()

  const [orders, setOrders] = useState(ordersDB);
  const [activeTab, setActiveTab] = useState('realtime'); // realtime | history
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { socket } = useWebSocket()

  const onOrderChanged = (order) => {
    console.log(order);
    setOrders(prev => {
      const exists = prev.some(o => o.id === order.id);
      if (exists) {
        return prev.map(o => o.id === order.id ? order : o);
      } else {
        audio.play();
        return [...prev, order];
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

  // Listen to fullscreen changes (F11 or browser controls)
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Pipeline stages (3 columnas): Confirmado, Preparando, Listo para recojo
  const confirmedOrders = orders.filter(o => o.status_id === 'be7e24c9-a3e4-444e-adab-bb301b4ccce3');
  const preparingOrders = orders.filter(o => o.status_id === '1eb603e6-e078-4f9f-8c86-25a363742518');
  const readyOrders = orders.filter(o => o.status_id === 'f0a538f0-8aef-4ca7-80d1-297ab6c58279');

  const handleCancel = (orderId) => onStatusChanged(orderId, 'ea4578c1-f0c7-4495-ade5-a82b5ca7cc4b');
  const handleReady = (orderId) => onStatusChanged(orderId, 'f0a538f0-8aef-4ca7-80d1-297ab6c58279');
  const handleDeliver = (orderId) => onStatusChanged(orderId, 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc');

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // const OrderCard = ({ order, stage }) => (
  //   <div className="card mb-2" style={{ borderLeft: `3px solid ${order.status.color}` }}>
  //     <div className="card-body p-2">
  //       <div className="d-flex justify-content-between align-items-start">
  //         <small className="fw-bold text-muted">#{order.id.slice(-6)}</small>
  //         <span className="badge" style={{ backgroundColor: order.status.color, color: '#fff' }}>
  //           {order.status.name}
  //         </span>
  //       </div>

  //       {stage === 'confirmed' && (
  //         <>
  //           <div className="mt-2">
  //             <strong>{order.client.name} {order.client.lastname}</strong>
  //             <div className="text-muted small">{order.client.email}</div>
  //             <div className="text-muted small">{order.address?.street || 'Sin dirección'}</div>
  //             <div className="text-muted small">{order.payment_method}</div>
  //           </div>
  //           <div className="mt-2 fw-semibold">Total: S/ {Number2Currency(order.total_amount)}</div>
  //           <details className="mt-2 small">
  //             <summary>Detalles</summary>
  //             <ul className="mt-1 mb-0 ps-3">
  //               {order.details.map(d => (
  //                 <li key={d.id}>{d.quantity} × {d.product_name}</li>
  //               ))}
  //             </ul>
  //           </details>
  //           <div className="d-flex gap-1 mt-2">
  //             <button className="btn btn-primary btn-sm flex-fill" onClick={() => onStatusChanged(order.id, '1eb603e6-e078-4f9f-8c86-25a363742518')}>Preparar</button>
  //             <button className="btn btn-danger btn-sm flex-fill" onClick={() => handleCancel(order.id)}>Cancelar</button>
  //           </div>
  //         </>
  //       )}

  //       {stage === 'preparing' && (
  //         <>
  //           <details className="mt-2 small">
  //             <summary>Pedido</summary>
  //             <ul className="mt-1 mb-0 ps-3">
  //               {order.details.map(d => (
  //                 <li key={d.id}>{d.quantity} × {d.product_name}</li>
  //               ))}
  //             </ul>
  //             {order.notes && <div className="mt-1 text-muted"><strong>Notas:</strong> {order.notes}</div>}
  //           </details>
  //           <div className="d-flex gap-1 mt-2">
  //             <button className="btn btn-info btn-sm flex-fill" onClick={() => handleReady(order.id)}>Listo</button>
  //           </div>
  //         </>
  //       )}

  //       {stage === 'ready' && (
  //         <>
  //           <div className="mt-2">
  //             <strong>{order.client.name} {order.client.lastname}</strong>
  //             <div className="text-muted small">{order.payment_method}</div>
  //             <div className="text-muted small">{order.address?.street || 'Recojo en tienda'}</div>
  //           </div>
  //           <div className="d-flex gap-1 mt-2">
  //             <button className="btn btn-success btn-sm flex-fill" onClick={() => handleDeliver(order.id)}>Entregado</button>
  //           </div>
  //         </>
  //       )}

  //       {stage === 'history' && (
  //         <>
  //           <div className="mt-2">
  //             <strong>{order.client.name} {order.client.lastname}</strong>
  //             <div className="text-muted small">Delivery: {order.delivery?.name || 'N/A'}</div>
  //             <div className="text-muted small">Entrega: {new Date(order.updated_at).toLocaleTimeString()}</div>
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );

  return <div className="row">
    <div className="col-md-4">
      <KanbanCard title="CONFIRMADO" length={confirmedOrders.length}>
        {confirmedOrders.map(order => <OrderCard
          key={order.id} {...order}
          confirmText={<>Preparar <i className="mdi mdi-arrow-right"></i></>}
          onConfirm={() => onStatusChanged(order.id, '1eb603e6-e078-4f9f-8c86-25a363742518')}
        />)}
      </KanbanCard>
    </div>

    <div className="col-md-4">
      <KanbanCard title="PREPARANDO" length={preparingOrders.length}>
        {preparingOrders.map(order => <OrderCard
          key={order.id} {...order}
          confirmText={<>Listo <i className="mdi mdi-arrow-right"></i></>}
          onConfirm={() => onStatusChanged(order.id, 'f0a538f0-8aef-4ca7-80d1-297ab6c58279')}
        />)}
      </KanbanCard>
    </div>

    <div className="col-md-4">
      <KanbanCard title="LISTO PARA RECOJO" length={readyOrders.length}>
        {readyOrders.map(order => <OrderCard key={order.id} {...order} />)}
      </KanbanCard>
    </div>
  </div>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Cocina'>
    <Kitchen {...properties} />
  </BaseAdminto>);
})