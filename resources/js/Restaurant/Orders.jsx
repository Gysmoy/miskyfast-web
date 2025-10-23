import BaseAdminto from '@Adminto/Base';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import useWebSocket from '../Hooks/useWebSocket';
import { useEffect, useRef, useState } from 'react';
import OrdersRest from '../Actions/Restaurant/OrdersRest';
import Number2Currency from '../Utils/Number2Currency';
import DataGrid from '../Components/Adminto/DataGrid';

// Rests
const ordersRest = new OrdersRest()

const audio = new Audio('/assets/sounds/notification.mp3');

const Orders = ({ orders: ordersDB, statuses }) => {
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

  // Pipeline stages
  const receptionOrders = orders.filter(o => o.status_id === '56844089-7edf-4c9e-9d09-6874624c37b2'); // PENDIENTE
  const kitchenOrders = orders.filter(o => o.status_id === 'be7e24c9-a3e4-444e-adab-bb301b4ccce3' || o.status_id === '1eb603e6-e078-4f9f-8c86-25a363742518'); // CONFIRMADO + PREPARANDO
  const readyOrders = orders.filter(o => o.status_id === 'f0a538f0-8aef-4ca7-80d1-297ab6c58279'); // LISTO PARA RECOJO
  const deliveredOrders = orders.filter(o => o.status_id === 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc' || o.status_id === 'ea4578c1-f0c7-4495-ade5-a82b5ca7cc4b'); // ENTREGADO + CANCELADO

  const handleConfirm = (orderId) => onStatusChanged(orderId, 'be7e24c9-a3e4-444e-adab-bb301b4ccce3');
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

  const getTitle = () => {
    if (activeTab === 'realtime') return 'En tiempo real';
    if (activeTab === 'history') return 'Historial de pedidos';
    return 'Pedidos';
  };

  const OrderCard = ({ order, stage }) => (
    <div className="card mb-2" style={{ borderLeft: `3px solid ${order.status.color}` }}>
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
              <summary>Detalles</summary>
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
              <summary>Pedido</summary>
              <ul className="mt-1 mb-0 ps-3">
                {order.details.map(d => (
                  <li key={d.id}>{d.quantity} × {d.product_name}</li>
                ))}
              </ul>
              {order.notes && <div className="mt-1 text-muted"><strong>Notas:</strong> {order.notes}</div>}
            </details>
            <div className="d-flex gap-1 mt-2">
              <button className="btn btn-info btn-sm flex-fill" onClick={() => handleReady(order.id)}>Listo</button>
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
        {/* Título dinámico */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="header-title my-0">{getTitle()}</h5>
          <div className="d-flex align-items-center gap-2">
            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className={`btn btn-sm btn-outline-primary ${activeTab === 'realtime' ? 'active' : ''}`}
                onClick={() => setActiveTab('realtime')}
              >
                Tiempo real
              </button>
              <button
                type="button"
                className={`btn btn-sm btn-outline-primary ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Historial
              </button>
            </div>
            <button className="btn btn-sm btn-outline-secondary" onClick={toggleFullscreen}>
              <i className={`fa ${isFullscreen ? 'fa-compress' : 'fa-expand'}`} />
            </button>
          </div>
        </div>

        {/* Tabs content */}
        {activeTab === 'realtime' && (
          <>
            {/* 3 cards independientes sin contenedor principal */}
            <div className="row g-2">
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-header text-center">
                    <h6 className="mb-0">Recepción</h6>
                  </div>
                  <div className="card-body p-2" style={{ minHeight: 'calc(100vh - 300px)' }}>
                    {receptionOrders.map(o => <OrderCard key={o.id} order={o} stage="reception" />)}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-header text-center">
                    <h6 className="mb-0">Cocina</h6>
                  </div>
                  <div className="card-body p-2" style={{ minHeight: 'calc(100vh - 300px)' }}>
                    {kitchenOrders.map(o => <OrderCard key={o.id} order={o} stage="kitchen" />)}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-header text-center">
                    <h6 className="mb-0">Listos</h6>
                  </div>
                  <div className="card-body p-2" style={{ minHeight: 'calc(100vh - 300px)' }}>
                    {readyOrders.map(o => <OrderCard key={o.id} order={o} stage="ready" />)}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div className="card">
            <div className="card-body p-2" style={{ minHeight: 'calc(100vh - 300px)' }}>
              <DataGrid
                gridRef={gridRef}
                rest={ordersRest}
                toolBar={(container) => {
                  container.unshift({
                    widget: "dxButton",
                    location: "after",
                    options: {
                      icon: "refresh",
                      hint: "Refrescar tabla",
                      onClick: () =>
                        $(gridRef.current).dxDataGrid("instance").refresh(),
                    },
                  });
                }} 
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "category.name",
                        caption: "Categoría",
                        width: "200px",
                    },
                    {
                        dataField: "name",
                        caption: "Nombre",
                        minWidth: "300px",
                        cellTemplate: (container, { data }) => {
                            container.html(renderToString(<>
                                <b className="d-block mb-1">{data.name}</b>
                                <div className="d-flex flex-wrap gap-1">{data.presentations.map(p => <span className="badge badge-outline-dark">{p.presentation}</span>)}</div>
                            </>));
                        },
                    },
                    {
                        dataField: "price",
                        caption: "Precio",
                        dataType: "number",
                        width: "90px",
                        cellTemplate: (container, { data }) => {
                            container.html(renderToString(<>S/.{Number2Currency(data.price)}</>));
                        },
                    },
                    {
                        dataField: "image",
                        caption: "Imagen",
                        width: "90px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={data.image ? `/storage/images/item/${data.image}` : "/api/cover/thumbnail/null"}
                                    style={{
                                        width: "80px",
                                        height: "48px",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                    }}
                                    onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                />
                            );
                        },
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        width: "80px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.visible}
                                    onChange={(e) =>
                                        onVisibleChange({
                                            id: data.id,
                                            value: e.target.checked,
                                        })
                                    }
                                />
                            );
                        },
                    },
                    {
                        caption: "Acciones",
                        width: "100px",
                        cellTemplate: (container, { data }) => {
                            container.css("text-overflow", "unset");
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-primary",
                                    title: "Editar",
                                    icon: "fa fa-pen",
                                    onClick: () => onModalOpen(data),
                                })
                            );
                            container.append(
                                DxButton({
                                    className: "btn btn-xs btn-soft-danger",
                                    title: "Eliminar",
                                    icon: "fa fa-trash",
                                    onClick: () => onDeleteClicked(data.id),
                                })
                            );
                        },
                        allowFiltering: false,
                        allowExporting: false,
                    },
                ]}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Pedidos'>
    <Orders {...properties} />
  </BaseAdminto>);
})