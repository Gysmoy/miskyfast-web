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
import Table from '../Components/Adminto/Table';
import { renderToString } from 'react-dom/server';
import ReactAppend from '../Utils/ReactAppend';
import SwitchFormGroup from '../Components/Adminto/form/SwitchFormGroup';
import DxButton from '../Components/dx/DxButton';

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
  const pendingOrders = orders.filter(o => o.status_id === '56844089-7edf-4c9e-9d09-6874624c37b2'); // PENDIENTE
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
              <KanbanCard title="PENDIENTE" length={pendingOrders.length}>
                {pendingOrders.map(order => <OrderCard
                  key={order.id} {...order}
                  showContact
                  showTotal
                  confirmText={<>Aceptar <i className="mdi mdi-arrow-right"></i></>}
                  onConfirm={() => onStatusChanged(order.id, 'be7e24c9-a3e4-444e-adab-bb301b4ccce3')}
                  cancelText={<i className="mdi mdi-close" />}
                  onCancel={() => onStatusChanged(order.id, 'ea4578c1-f0c7-4495-ade5-a82b5ca7cc4b')}
                />)}
              </KanbanCard>
            </div>

            <div className="col-md-4">
              <KanbanCard title="COCINA" length={kitchenOrders.length}>
                {kitchenOrders.map(order => <OrderCard
                  key={order.id} {...order}
                  showContact
                  confirmText={<>Listo <i className="mdi mdi-arrow-right"></i></>}
                  onConfirm={() => onStatusChanged(order.id, 'f0a538f0-8aef-4ca7-80d1-297ab6c58279')}
                />)}
              </KanbanCard>
            </div>

            <div className="col-md-4">
              <KanbanCard title="LISTO PARA RECOJO" length={readyOrders.length}>
                {readyOrders.map(order => <OrderCard
                  key={order.id} {...order}
                  showContact
                  showTotal
                  confirmText={<>Entregar <i className="mdi mdi-arrow-right"></i></>}
                  onConfirm={() => onStatusChanged(order.id, 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc')}
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