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

  const { socket } = useWebSocket()

  const onOrderChanged = (order) => {
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
    socket.on('orders.created', (order) => onOrderChanged(order))
    socket.on('orders.updated', (order) => onOrderChanged(order))

    return () => {
      socket.off('orders.created')
      socket.off('orders.updated')
    }
  }, [socket])

  return <div className="row">
    <div className="col-12">
      <div className="card h-100">
        <div className="d-flex card-header justify-content-between align-items-center border-bottom">
          <h4 className="header-title my-0">Lista de pedidos</h4>
          <div className="btn-group btn-group-xs" role="group">
            <button type="button" className="btn btn-xs btn-outline-primary active">Pendientes</button>
            <button type="button" className="btn btn-xs btn-outline-primary">Completados</button>
          </div>
        </div>
        <div className="card-body p-0 d-flex flex-column" style={{ minHeight: 'calc(100vh - 300px)' }}>
          <div className="table-responsive flex-grow-1">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>Client #{order.client_id}</td>
                    <td>Order #{order.id}</td>
                    <td>@{order.client_id}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-white dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {statuses.find(s => s.id === order.status_id)?.name}
                        </button>
                        <ul className="dropdown-menu">
                          {/* Non-OK statuses first */}
                          {statuses
                            .filter(s => s.type === 'order' && !s.is_ok)
                            .map(status => (
                              <li key={status.id}>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => onStatusChanged(order.id, status.id)}
                                >
                                  {status.name}
                                </button>
                              </li>
                            ))}
                          {/* Divider between blocks */}
                          {statuses.some(s => s.type === 'order' && !s.is_ok) &&
                            statuses.some(s => s.type === 'order' && s.is_ok) && (
                              <li><hr className="dropdown-divider" /></li>
                            )}
                          {/* OK statuses below */}
                          {statuses
                            .filter(s => s.type === 'order' && s.is_ok)
                            .map(status => (
                              <li key={status.id}>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => onStatusChanged(order.id, status.id)}
                                >
                                  {status.name}
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer">
          <div className="align-items-center justify-content-between row text-center text-sm-start">
            <div className="col-sm">
              <div className="text-muted">
                Showing <span className="fw-semibold">5</span> of <span className="fw-semibold">20</span> Results
              </div>
            </div>
            <div className="col-sm-auto mt-3 mt-sm-0">
              <ul className="pagination pagination-boxed pagination-sm mb-0 justify-content-center">
                <li className="page-item disabled">
                  <a href="#" className="page-link"><i className="ti ti-chevron-left"></i></a>
                </li>
                <li className="page-item active">
                  <a href="#" className="page-link">1</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">2</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link">3</a>
                </li>
                <li className="page-item">
                  <a href="#" className="page-link"><i className="ti ti-chevron-right"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Pedidos'>
    <Orders {...properties} />
  </BaseAdminto>);
})