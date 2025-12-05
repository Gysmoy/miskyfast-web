import BaseAdminto from '@Adminto/Base';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import useWebSocket from '../Hooks/useWebSocket';
import { useEffect, useRef, useState } from 'react';
import OrdersRest from '../Actions/Restaurant/OrdersRest';
import Number2Currency from '../Utils/Number2Currency';
import KanbanCard from '../Reutilizables/Orders/KanbanCard';
import OrderCard from '../Reutilizables/Orders/OrderCard';
import Table from '../Components/Adminto/Table';
import DxButton from '../Components/dx/DxButton';
import Swal from 'sweetalert2';

// Rests
const ordersRest = new OrdersRest()

const orderCreatedSound = new Audio('/assets/sounds/order-created.mp3');
const orderReadySound = new Audio('/assets/sounds/order-ready.mp3')

const Orders = ({ orders: ordersDB }) => {
  const gridRef = useRef()

  const [orders, setOrders] = useState(ordersDB);
  const [activeTab, setActiveTab] = useState('realtime'); // realtime | history
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { socket } = useWebSocket()

  const onOrderChanged = (order) => {
    const validStatusIds = [
      '56844089-7edf-4c9e-9d09-6874624c37b2',
      'be7e24c9-a3e4-444e-adab-bb301b4ccce3',
      '1eb603e6-e078-4f9f-8c86-25a363742518',
      'f0a538f0-8aef-4ca7-80d1-297ab6c58279'
    ];

    setOrders(prev => {
      const exists = prev.some(o => o?.id === order?.id);
      if (validStatusIds.includes(order?.status_id)) {
        if (exists) {
          // Play ready sound when status changes to LISTO PARA RECOJO
          const oldOrder = prev.find(o => o.id === order.id);
          if (oldOrder?.status_id !== 'f0a538f0-8aef-4ca7-80d1-297ab6c58279' && order?.status_id === 'f0a538f0-8aef-4ca7-80d1-297ab6c58279') {
            orderReadySound.play();
          }
          return prev.map(o => o.id === order.id ? order : o);
        } else {
          if (order?.status_id === 'be7e24c9-a3e4-444e-adab-bb301b4ccce3') {
            orderCreatedSound.play();
          }
          // Play ready sound if new order is already LISTO PARA RECOJO
          if (order?.status_id === 'f0a538f0-8aef-4ca7-80d1-297ab6c58279') {
            orderReadySound.play();
          }
          return [...prev, order];
        }
      } else {
        if (exists) {
          return prev.filter(o => o.id !== order.id);
        } else {
          return prev;
        }
      }
    });
  }
  const onStatusChanged = async (orderId, statusId, deliveryStatusId = null, reason = null) => {
    const request = {
      id: orderId,
      status_id: statusId,
    }
    if (deliveryStatusId) {
      request.delivery_status_id = deliveryStatusId
    }
    if (reason) {
      request.rejected_reason = reason
    }
    const result = await ordersRest.save(request)
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
  const pendingOrders = orders.filter(o => o.status_id === '56844089-7edf-4c9e-9d09-6874624c37b2'); // PENDIENTE
  const kitchenOrders = orders.filter(o => o.status_id === 'be7e24c9-a3e4-444e-adab-bb301b4ccce3' || o.status_id === '1eb603e6-e078-4f9f-8c86-25a363742518'); // CONFIRMADO + PREPARANDO
  const readyOrders = orders.filter(o => o.status_id === 'f0a538f0-8aef-4ca7-80d1-297ab6c58279'); // LISTO PARA RECOJO

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

  return <>
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
      </div>
    </div>

    {/* Tabs content */}
    {activeTab === 'realtime' && (
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-md-4">
              <KanbanCard title="PENDIENTE" length={pendingOrders.length} height='calc(100vh - 280px)'>
                {pendingOrders.map(order => <OrderCard
                  key={order.id} {...order}
                  showContact
                  showTotal
                  confirmText={<>Aceptar <i className="mdi mdi-arrow-right"></i></>}
                  onConfirm={() => onStatusChanged(order.id, 'be7e24c9-a3e4-444e-adab-bb301b4ccce3')}
                  cancelText={<i className="mdi mdi-close" />}
                  onCancel={() => {
                    Swal.fire({
                      title: 'Motivo de rechazo',
                      input: 'text',
                      inputLabel: 'Indique la razón por la cual se rechaza el pedido:',
                      showCancelButton: true,
                      confirmButtonText: 'Rechazar',
                      cancelButtonText: 'Cancelar',
                      inputValidator: (value) => {
                        if (!value) {
                          return 'Debe ingresar un motivo';
                        }
                      }
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onStatusChanged(order.id, 'ea4578c1-f0c7-4495-ade5-a82b5ca7cc4b', 'a0618dce-63fc-4e31-8a53-c6dd39ed54d3', result.value);
                      }
                    });
                  }}
                />)}
              </KanbanCard>
            </div>

            <div className="col-md-4">
              <KanbanCard title="COCINA" length={kitchenOrders.length} height='calc(100vh - 280px)'>
                {kitchenOrders.map(order => <OrderCard
                  key={order.id} {...order}
                  showContact
                  confirmText={<>Listo <i className="mdi mdi-arrow-right"></i></>}
                  onConfirm={() => onStatusChanged(order.id, 'f0a538f0-8aef-4ca7-80d1-297ab6c58279')}
                />)}
              </KanbanCard>
            </div>

            <div className="col-md-4">
              <KanbanCard title="LISTO PARA RECOJO" length={readyOrders.length} height='calc(100vh - 280px)'>
                {readyOrders.map(order => <OrderCard
                  key={order.id} {...order}
                  showContact
                  showTotal
                  confirmText={<>Entregar <i className="mdi mdi-arrow-right"></i></>}
                  onConfirm={() => onStatusChanged(order.id, 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc', 'a0618dce-5fe8-4aa8-92c4-1797f9bc5618')}
                  showDelivery
                />)}
              </KanbanCard>
            </div>
          </div>
        </div>
      </div>
    )}

    {activeTab === 'history' && (
      <Table
        gridRef={gridRef}
        title="Items"
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
          container.unshift({
            widget: "dxButton",
            location: "after",
            options: {
              icon: "plus",
              text: "Agregar",
              hint: "Agregar",
              onClick: () => onModalOpen(),
            },
          });
        }}
        exportable={true}
        exportableName="Items"
        columns={[
          {
            dataField: "id",
            caption: "ID",
            visible: false,
          },
          {
            dataField: "code",
            caption: "Código",
            cssClass: 'font-monospace fw-bold text-center',
            width: '80px',
            cellTemplate: (container, { data }) => {
              container.css({ borderLeft: `4px solid ${data.status?.color ?? '#ddd'}` });
              container.text(data.code);
            },
          },
          {
            dataField: "status.name",
            caption: "Estado",
          },
          {
            dataField: "client.name",
            caption: "Cliente",
            cellTemplate: (container, { data }) => {
              container.text(`${data.client.name} ${data.client.lastname}`);
            },
          },
          {
            dataField: "client.lastname",
            caption: "Apellido",
            visible: false,
          },
          {
            dataField: "client.email",
            caption: "Correo"
          },
          {
            dataField: "client.phone",
            caption: "Teléfono"
          },
          {
            dataField: "details_count",
            caption: "Items",
            cellTemplate: (container, { data }) => {
              container.text(`${data.details_count} items`);
            },
            width: '80px',
          },
          {
            dataField: "total_amount",
            caption: "Precio",
            dataType: "number",
            width: "100px",
            cellTemplate: (container, { data }) => {
              container.text(`S/ ${Number2Currency(data.total_amount)}`);
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
        ]}
      />
    )}
  </>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Recepción'>
    <Orders {...properties} />
  </BaseAdminto>);
})