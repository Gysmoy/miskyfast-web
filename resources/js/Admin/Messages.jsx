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
import RestaurantsRest from '../Actions/Admin/RestaurantsRest';
import UsersRest from '../Actions/Admin/UsersRest';

const messagesRest = new MessagesRest()
const restaurantsRest = new RestaurantsRest()
const usersRest = new UsersRest()

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
      text: dataLoaded.type === 'restaurant'
        ? 'Se creará un restaurante y un usuario para el restaurante'
        : 'Se creará un usuario de acceso para el delivery',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return

    let saveResult
    if (dataLoaded.type === 'restaurant') {
      const formData = new FormData();
      formData.append('name', dataLoaded.restaurant_name);
      formData.append('description', ''); // ignored as per instructions
      formData.append('address', dataLoaded.address);
      formData.append('reference', dataLoaded.reference || '');
      formData.append('phone_prefix', dataLoaded.phone_prefix);
      formData.append('phone', dataLoaded.phone);
      formData.append('email', dataLoaded.email);
      formData.append('latitude', dataLoaded.latitude);
      formData.append('longitude', dataLoaded.longitude);
      formData.append('owner_name', dataLoaded.owner_name);
      saveResult = await restaurantsRest.save(formData);
    } else {
      saveResult = await usersRest.save({
        name: dataLoaded.owner_name,
        lastname: 'Delivery', // not provided in dataLoaded
        email: dataLoaded.email,
        phone: dataLoaded.phone,
        phone_prefix: dataLoaded.phone_prefix,
        license_number: dataLoaded.license_number,
        vehicule_type: dataLoaded.vehicle_type,
        plate_number: dataLoaded.plate_number,
        role: 'Delivery'
      })
    }

    if (!saveResult) return

    // Close modal before showing SweetAlert to allow text selection
    $(modalRef.current).modal('hide')
    // Small delay to ensure modal is fully closed
    await new Promise(resolve => setTimeout(resolve, 200))

    // Show email and password in a single-view Swal
    await Swal.fire({
      title: dataLoaded.type === 'restaurant' ? '¡Restaurante activado!' : '¡Delivery listo!',
      html: `
        <div style="text-align: left;">
          <p><strong>Email:</strong> ${saveResult.email}</p>
          <p><strong>Password:</strong> ${saveResult.password}</p>
          <p style="color: #d33; margin-top: 12px;">
            ${dataLoaded.type === 'restaurant'
          ? 'Guarda estos datos del panel del restaurante «' + dataLoaded.restaurant_name + '». Solo se muestran ahora.'
          : 'Copia los datos de acceso del delivery. Única oportunidad.'}
          </p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Entendido'
    })

    const result = await messagesRest.boolean({
      id: dataLoaded.id,
      field: 'status',
      value: true
    })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }
  const onReject = async () => {
    if (!dataLoaded) return
    // Close modal before showing SweetAlert to avoid focus conflicts
    $(modalRef.current).modal('hide')
    // Small delay to ensure modal is fully closed
    await new Promise(resolve => setTimeout(resolve, 200))
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
            if (data.status === null) {
              container.append(DxButton({
                className: 'btn btn-xs btn-soft-danger',
                title: 'Eliminar',
                icon: 'fa fa-trash',
                onClick: () => onDeleteClicked(data.id)
              }))
            }
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
      {dataLoaded && dataLoaded.status === null && (
        <div className='d-flex justify-content-end gap-2 mt-3'>
          <button className="btn btn-sm btn-success" onClick={onAccept}>Aceptar</button>
          <button className="btn btn-sm btn-danger" onClick={onReject}>Rechazar</button>
        </div>
      )}
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Solicitudes'>
    <Messages {...properties} />
  </BaseAdminto>);
})