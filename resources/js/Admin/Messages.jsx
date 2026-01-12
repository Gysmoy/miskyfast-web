import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import BaseAdminto from '@Adminto/Base';
import CreateReactScript from '@Utils/CreateReactScript';
import Table from '../Components/Adminto/Table';
import DxButton from '../Components/dx/DxButton';
import ReactAppend from '@Utils/ReactAppend';
import MessagesRest from '@Rest/Admin/MessagesRest';
import Modal from '@Adminto/Modal';
import Swal from 'sweetalert2';

const messagesRest = new MessagesRest()

const Messages = () => {
  const gridRef = useRef()
  const modalRef = useRef()

  const [dataLoaded, setDataLoaded] = useState(null)

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar mensaje',
      text: '¿Estas seguro de eliminar este mensaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await messagesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onAccept = async () => {
    if (!dataLoaded) return
    const { isConfirmed } = await Swal.fire({
      title: '¿Confirmar acción?',
      text: 'Se creará un restaurante y un usuario para el restaurante',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await messagesRest.boolean({
      id: dataLoaded.id,
      field: 'status',
      value: true
    })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onReject = async () => {
    if (!dataLoaded) return
    const { isConfirmed, value: reason } = await Swal.fire({
      title: 'Rechazar mensaje',
      text: '¿Cuál es el motivo del rechazo?',
      input: 'textarea',
      inputPlaceholder: 'Escribe el motivo aquí...',
      showCancelButton: true,
      confirmButtonText: 'Rechazar',
      cancelButtonText: 'Cancelar',
      inputAttributes: {
        autocapitalize: 'off',
        style: 'resize: vertical; min-height: 80px;'
      },
      didOpen: (popup) => {
        const textarea = popup.querySelector('textarea.swal2-textarea');
        if (textarea) {
          textarea.removeAttribute('readonly');
          textarea.removeAttribute('disabled');
          textarea.focus();
        }
      },
      inputValidator: (value) => {
        if (!value) return 'Debes escribir un motivo'
      }
    })
    if (!isConfirmed) return
    const result = await messagesRest.boolean({
      id: dataLoaded.id,
      field: 'status',
      value: false,
      reason
    })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onModalOpen = (data) => {
    setDataLoaded(data)
    $(modalRef.current).modal('show');
  }

  return (<>
    <Table gridRef={gridRef} title='Solicitudes' rest={messagesRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
      }}
      columns={[
        {
          dataField: 'id',
          caption: 'ID',
          visible: false
        },
        {
          dataField: 'type',
          caption: 'Tipo',
          lookup: {
            dataSource: [
              { value: 'restaurant', label: 'Restaurante' },
              { value: 'driver', label: 'Delivery' }
            ],
            valueExpr: 'value',
            displayExpr: 'label'
          }
        },
        {
          dataField: 'name',
          caption: 'Nombre',
          width: 200,
          cellTemplate: (container, { data }) => {
            const vehicleOptions = [
              { value: 'moto', label: 'Motocicleta', icon: 'mdi mdi-motorbike' },
              { value: 'bicicleta', label: 'Bicicleta', icon: 'mdi mdi-bicycle' },
              { value: 'scooter', label: 'Scooter Eléctrico', icon: 'mdi mdi-scooter' },
              { value: 'auto', label: 'Auto', icon: 'mdi mdi-car' },
            ];
            if (data.type == 'restaurant') {
              ReactAppend(container, <div style={{
                width: '100%',
                cursor: 'pointer'
              }} onClick={() => onModalOpen(data)}>
                <b className='d-block'>{data.restaurant_name}</b>
                <small className='d-block text-muted'>{data.owner_name}</small>
              </div>)
            } else {
              const vehicleLabel = vehicleOptions.find(v => v.value === data.vehicle_type)?.label || data.vehicle_type;
              ReactAppend(container, <div style={{
                width: '100%',
                cursor: 'pointer'
              }} onClick={() => onModalOpen(data)}>
                <b className='d-block'>{data.owner_name}</b>
                <small className='d-block text-muted'>{vehicleLabel} - {data.plate_number}</small>
              </div>)
            }
          }
        },
        {
          dataField: 'email',
          caption: 'Correo',
        },
        {
          dataField: 'phone',
          caption: 'Telefono',
          cellTemplate: (container, { data }) => {
            ReactAppend(container, (<span>
              <span className='text-muted fw-light me-1'>{data.phone_prefix}</span>
              <span>{data.phone}</span>
            </span>))
          }
        },
        {
          dataField: 'created_at',
          caption: 'Fecha',
          dataType: 'datetime',
          format: 'yyyy-MM-dd HH:mm:ss',
          sortOrder: 'desc'
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            if (data.status === null) {
              ReactAppend(container, <span className='badge bg-warning rounded-pill'>No atendido</span>)
            } else if (data.status === true) {
              ReactAppend(container, <span className='badge bg-success rounded-pill'>Atendido y aceptado</span>)
            } else {
              ReactAppend(container, <span className='badge bg-danger rounded-pill'>Rechazado</span>)
            }
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-dark',
              title: 'Ver mensaje',
              icon: 'fa fa-eye',
              onClick: () => onModalOpen(data)
            }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Eliminar',
              icon: 'fa fa-trash',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title='Mensaje' hideFooter>
      {dataLoaded && (
        <div className="row g-2">
          <div className="col-12">
            <label className="form-label fw-semibold mb-0">Nombre</label>
            <div className="text-muted small">{dataLoaded.owner_name}</div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold mb-0">Correo</label>
            <div className="text-muted small">{dataLoaded.email || '-'}</div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold mb-0">Teléfono</label>
            <div className="text-muted small">{dataLoaded.phone_prefix} {dataLoaded.phone}</div>
          </div>
          {dataLoaded.type === 'restaurant' && (
            <>
              <div className="col-12">
                <label className="form-label fw-semibold mb-0">Restaurante</label>
                <div className="text-muted small">{dataLoaded.restaurant_name}</div>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold mb-0">Dirección</label>
                <div className="text-muted small">{dataLoaded.address}</div>
              </div>
              {dataLoaded.reference && (
                <div className="col-12">
                  <label className="form-label fw-semibold mb-0">Referencia</label>
                  <div className="text-muted small">{dataLoaded.reference}</div>
                </div>
              )}
              {dataLoaded.latitude && dataLoaded.longitude && (
                <div className="col-12">
                  <label className="form-label fw-semibold mb-0">Ubicación</label>
                  <div className="text-muted small">
                    <a href={`https://maps.google.com/?q=${dataLoaded.latitude},${dataLoaded.longitude}`} target="_blank" rel="noreferrer">
                      Ver en mapa
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
          {dataLoaded.type === 'driver' && (
            <>
              <div className="col-md-6">
                <label className="form-label fw-semibold mb-0">Licencia</label>
                <div className="text-muted small">{dataLoaded.license_number}</div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold mb-0">Vehículo</label>
                <div className="text-muted small">{dataLoaded.vehicle_type}</div>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold mb-0">Placa</label>
                <div className="text-muted small">{dataLoaded.plate_number}</div>
              </div>
            </>
          )}
          <div className="col-12">
            <label className="form-label fw-semibold mb-0">Estado</label>
            <div>
              {dataLoaded.status === null && <span className="badge bg-warning">No atendido</span>}
              {dataLoaded.status === true && <span className="badge bg-success">Aceptado</span>}
              {dataLoaded.status === false && <span className="badge bg-danger">Rechazado</span>}
            </div>
          </div>
          <div className="col-12">
            <label className="form-label fw-semibold mb-0">Fecha</label>
            <div className="text-muted small">{dataLoaded.created_at}</div>
          </div>
        </div>
      )}
      <div className='d-flex justify-content-end gap-2 mt-3'>
        <button className="btn btn-sm btn-success" onClick={onAccept}>Aceptar</button>
        <button className="btn btn-sm btn-danger" onClick={onReject}>Rechazar</button>
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Solicitudes'>
    <Messages {...properties} />
  </BaseAdminto>);
})