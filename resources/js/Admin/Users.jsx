import BaseAdminto from '@Adminto/Base';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import ImageFormGroup from '@Adminto/form/ImageFormGroup';
import React, { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import InputFormGroup from '../Components/Adminto/form/InputFormGroup';
import Modal from '../Components/Adminto/Modal';
import Table from '../Components/Adminto/Table';
import DxButton from '../Components/dx/DxButton';
import CreateReactScript from '../Utils/CreateReactScript';
import ReactAppend from '../Utils/ReactAppend';
import UsersRest from '../Actions/Admin/UsersRest';
import SelectAPIFormGroup from '../Components/Adminto/form/SelectAPIFormGroup';
import SelectFormGroup from '../Components/Adminto/form/SelectFormGroup';

const usersRest = new UsersRest()

const Users = ({ role, prefixes }) => {

  usersRest.pagination_suffix = role

  const gridRef = useRef()
  const modalRef = useRef()
  const passwordModalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const phonePrefixRef = useRef()
  const phoneRef = useRef()
  const restaurantIdRef = useRef()
  const vehicleTypeRef = useRef()
  const plateNumberRef = useRef()
  const licenseNumberRef = useRef()
  const biographyRef = useRef()
  const passwordRef = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [passwordUserId, setPasswordUserId] = useState(null)
  const [modalReady, setModalReady] = useState(false)

  // Wait for modal to be rendered before trying to set values
  useEffect(() => {
    if (modalReady) {
      // Modal is ready, safe to set values
    }
  }, [modalReady])

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    // Defer setting values until after modal is shown
    setTimeout(() => {
      if (idRef.current) idRef.current.value = data?.id ?? ''
      if (nameRef.current) nameRef.current.value = data?.name ?? ''
      if (lastnameRef.current) lastnameRef.current.value = data?.lastname ?? ''
      if (emailRef.current) emailRef.current.value = data?.email ?? ''
      if (phonePrefixRef.current) $(phonePrefixRef.current).val(data?.phone_prefix ?? '51').trigger('change')
      if (phoneRef.current) phoneRef.current.value = data?.phone ?? ''
      if (restaurantIdRef.current) restaurantIdRef.current.value = data?.restaurant_id ?? ''
      if (vehicleTypeRef.current) vehicleTypeRef.current.value = data?.vehicle_type ?? ''
      if (plateNumberRef.current) plateNumberRef.current.value = data?.plate_number ?? ''
      if (licenseNumberRef.current) licenseNumberRef.current.value = data?.license_number ?? ''
      if (biographyRef.current) biographyRef.current.value = data?.biography ?? ''
    }, 0)

    $(modalRef.current).modal('show')
    setModalReady(true)
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', idRef.current?.value || '')
    formData.append('name', nameRef.current?.value)
    formData.append('lastname', lastnameRef.current?.value)
    formData.append('email', emailRef.current?.value)
    formData.append('status', statusRef.current?.value)

    if (role === 'restaurant') {
      formData.append('restaurant_id', restaurantIdRef.current?.value)
    }
    if (role === 'delivery' || role === 'client') {
      formData.append('phone_prefix', phonePrefixRef.current?.value)
      formData.append('phone', phoneRef.current?.value)
    }
    if (role === 'delivery') {
      formData.append('vehicle_type', vehicleTypeRef.current?.value)
      formData.append('plate_number', plateNumberRef.current?.value)
      formData.append('license_number', licenseNumberRef.current?.value)
      formData.append('biography', biographyRef.current?.value)
    }

    const result = await usersRest.save(formData)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
    setModalReady(false)
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

  const onChangePasswordClicked = (id) => {
    setPasswordUserId(id)
    if (passwordRef.current) passwordRef.current.value = ''
    $(passwordModalRef.current).modal('show')
  }

  const onPasswordSubmit = async (e) => {
    e.preventDefault()
    const result = await usersRest.save({ id: passwordUserId, password: passwordRef.current?.value })
    if (!result) return
    $(passwordModalRef.current).modal('hide')
  }

  console.log(role)

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
          dataField: 'fullname',
          caption: 'Nombre',
        },
        role == 'restaurant' ?
          {
            dataField: 'restaurant.name',
            caption: 'Restaurante',
          } : null,
        {
          dataField: 'email',
          caption: 'Email',
        },
        (role == 'client' || role == 'delivery') ?
          {
            dataField: 'phone',
            caption: 'Teléfono',
            cellTemplate: (container, { data }) => {
              ReactAppend(container, (<span>
                <span className='text-muted fw-light me-1'>{data.phone_prefix}</span>
                <span>{data.phone}</span>
              </span>))
            }
          } : null,
        role == 'delivery' ?
          {
            dataField: 'vehicle_type',
            caption: 'Vehículo',
          } : null,
        {
          dataField: 'status',
          caption: 'Estado',
          dataType: 'boolean',
          cellTemplate: (container, { data }) => {
            $(container).empty()
            const isActive = data.status
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
              className: 'btn btn-xs btn-soft-warning',
              title: 'Cambiar contraseña',
              icon: 'fa fa-key',
              onClick: () => onChangePasswordClicked(data.id)
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar usuario' : 'Agregar usuario'} onSubmit={onModalSubmit} >
      <div className='row' id='users-container'>
        <input ref={idRef} type='hidden' />

        <div className='col-md-6'>
          <InputFormGroup eRef={nameRef} label='Nombre' required />
        </div>
        <div className='col-md-6'>
          <InputFormGroup eRef={lastnameRef} label='Apellido' required />
        </div>

        <InputFormGroup eRef={emailRef} label='Email' type='email' required />

        {role == 'restaurant' && (
          <div className='col-md-6'>
            <SelectAPIFormGroup eRef={restaurantIdRef} label='Restaurante' searchAPI={'/api/admin/restaurants/paginate'} searchBy={'name'} required dropdownParent='#users-container' />
          </div>
        )}

        {(role === 'delivery' || role === 'client') && (
          <>
            <SelectFormGroup label='Prefijo' eRef={phonePrefixRef} dropdownParent='#users-container' col='col-md-4'>
              {prefixes.sort((a, b) => a.country.localeCompare(b.country)).map((prefix) => (
                <option key={prefix.realCode} value={prefix.realCode}>{prefix.beautyCode} {prefix.country}</option>
              ))}
            </SelectFormGroup>
            <InputFormGroup eRef={phoneRef} label='Teléfono' col='col-md-8' />
          </>
        )}

        {role === 'delivery' && (
          <>
            <div className='col-md-6'>
              <InputFormGroup eRef={vehicleTypeRef} label='Tipo de vehículo' />
            </div>
            <div className='col-md-6'>
              <InputFormGroup eRef={plateNumberRef} label='Número de placa' />
            </div>
            <div className='col-md-6'>
              <InputFormGroup eRef={licenseNumberRef} label='Número de licencia' />
            </div>
            <div className='col-12'>
              <TextareaFormGroup eRef={biographyRef} label='Biografía' rows={3} />
            </div>
          </>
        )}
      </div>
    </Modal>

    <Modal modalRef={passwordModalRef} title='Cambiar contraseña' onSubmit={onPasswordSubmit} size='sm'>
      <div className='row'>
        <div className='col-12'>
          <InputFormGroup eRef={passwordRef} label='Nueva contraseña' type='password' required />
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