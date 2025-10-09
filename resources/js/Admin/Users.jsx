import BaseAdminto from '@Adminto/Base';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import ImageFormGroup from '@Adminto/form/ImageFormGroup';
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import InputFormGroup from '../Components/Adminto/form/InputFormGroup';
import Modal from '../Components/Adminto/Modal';
import Table from '../Components/Adminto/Table';
import DxButton from '../Components/dx/DxButton';
import CreateReactScript from '../Utils/CreateReactScript';
import ReactAppend from '../Utils/ReactAppend';
import UsersRest from '../Actions/Admin/UsersRest';

const usersRest = new UsersRest()

const Users = ({ role }) => {

  usersRest.pagination_suffix = role

  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const dniRef = useRef()
  const phoneRef = useRef()
  const videoRef = useRef()
  const titleRef = useRef()
  const countryRef = useRef()
  const cityRef = useRef()
  const addressRef = useRef()
  const summaryRef = useRef()
  const descriptionRef = useRef()
  const statusRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    lastnameRef.current.value = data?.lastname ?? ''
    emailRef.current.value = data?.email ?? ''
    dniRef.current.value = data?.dni ?? ''
    phoneRef.current.value = data?.phone ?? ''
    videoRef.current.value = data?.video ?? ''
    titleRef.current.value = data?.title ?? ''
    countryRef.current.value = data?.country ?? ''
    cityRef.current.value = data?.city ?? ''
    addressRef.current.value = data?.address ?? ''
    summaryRef.current.value = data?.summary ?? ''
    descriptionRef.current.value = data?.description ?? ''
    statusRef.current.value = data?.status ?? 'active'

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', idRef.current.value || '')
    formData.append('name', nameRef.current.value)
    formData.append('lastname', lastnameRef.current.value)
    formData.append('email', emailRef.current.value)
    formData.append('dni', dniRef.current.value)
    formData.append('phone', phoneRef.current.value)
    formData.append('video', videoRef.current.value)
    formData.append('title', titleRef.current.value)
    formData.append('country', countryRef.current.value)
    formData.append('city', cityRef.current.value)
    formData.append('address', addressRef.current.value)
    formData.append('summary', summaryRef.current.value)
    formData.append('description', descriptionRef.current.value)
    formData.append('status', statusRef.current.value)

    const result = await usersRest.save(formData)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, value }) => {
    const result = await usersRest.boolean({ id, field: 'status', value })
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  const onDeleteClicked = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar registro',
      text: '¿Estas seguro de eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return
    const result = await usersRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Usuarios' rest={usersRest}
      toolBar={(container) => {
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'refresh',
            hint: 'Refrescar tabla',
            onClick: () => $(gridRef.current).dxDataGrid('instance').refresh()
          }
        });
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'plus',
            text: 'Nuevo registro',
            hint: 'Nuevo registro',
            onClick: () => onModalOpen()
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
          dataField: 'name',
          caption: 'Nombre',
          width: '15%',
        },
        {
          dataField: 'lastname',
          caption: 'Apellido',
          width: '15%',
        },
        {
          dataField: 'email',
          caption: 'Email',
          width: '20%',
        },
        {
          dataField: 'dni',
          caption: 'DNI',
          width: '10%',
        },
        {
          dataField: 'phone',
          caption: 'Teléfono',
          width: '10%',
        },
        {
          dataField: 'country',
          caption: 'País',
          width: '10%',
        },
        {
          dataField: 'city',
          caption: 'Ciudad',
          width: '10%',
        },
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            $(container).empty()
            const isActive = data.status === 'active'
            ReactAppend(container, <SwitchFormGroup checked={isActive} onChange={() => onStatusChange({
              id: data.id,
              value: isActive ? 'inactive' : 'active'
            })} />)
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar usuario' : 'Agregar usuario'} onSubmit={onModalSubmit} size='lg'>
      <div className='row' id='users-container'>
        <input ref={idRef} type='hidden' />

        <div className='col-md-6'>
          <InputFormGroup eRef={nameRef} label='Nombre' required />
        </div>
        <div className='col-md-6'>
          <InputFormGroup eRef={lastnameRef} label='Apellido' required />
        </div>

        <div className='col-md-6'>
          <InputFormGroup eRef={emailRef} label='Email' type='email' required />
        </div>
        <div className='col-md-6'>
          <InputFormGroup eRef={phoneRef} label='Teléfono' />
        </div>

        <div className='col-md-6'>
          <InputFormGroup eRef={dniRef} label='DNI' />
        </div>
        <div className='col-md-6'>
          <InputFormGroup eRef={titleRef} label='Título / Cargo' />
        </div>

        <div className='col-md-6'>
          <InputFormGroup eRef={countryRef} label='País' />
        </div>
        <div className='col-md-6'>
          <InputFormGroup eRef={cityRef} label='Ciudad' />
        </div>

        <div className='col-12'>
          <InputFormGroup eRef={addressRef} label='Dirección' />
        </div>

        <div className='col-12'>
          <TextareaFormGroup eRef={summaryRef} label='Resumen' rows={2} />
        </div>

        <div className='col-12'>
          <TextareaFormGroup eRef={descriptionRef} label='Descripción' rows={3} />
        </div>

        <div className='col-md-6'>
          <InputFormGroup eRef={videoRef} label='Video (URL)' />
        </div>
        <div className='col-md-6'>
          <div className="form-group mb-2">
            <label className="form-label">Estado</label>
            <select ref={statusRef} className="form-control">
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title='Usuarios'>
    <Users {...properties} />
  </BaseAdminto>);
})