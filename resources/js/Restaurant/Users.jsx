import BaseAdminto from '@Adminto/Base';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import InputFormGroup from '../Components/Adminto/form/InputFormGroup';
import Modal from '../Components/Adminto/Modal';
import Table from '../Components/Adminto/Table';
import DxButton from '../Components/dx/DxButton';
import CreateReactScript from '../Utils/CreateReactScript';
import ReactAppend from '../Utils/ReactAppend';
import UsersRest from '../Actions/Restaurant/UsersRest';
import PasswordFormGroup from '../Components/Adminto/form/PasswordFormGroup';
import SelectFormGroup from '../Components/Adminto/form/SelectFormGroup';

const usersRest = new UsersRest()

const Users = ({ role }) => {

  usersRest.pagination_suffix = role

  const gridRef = useRef()
  const modalRef = useRef()
  const passwordModalRef = useRef()
  const inviteModalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const roleRef = useRef()
  const inviteEmailRef = useRef()

  const [isEditing, setIsEditing] = useState(false)
  const [passwordUserId, setPasswordUserId] = useState(null)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    lastnameRef.current.value = data?.lastname ?? ''
    emailRef.current.value = data?.email ?? ''
    roleRef.current.value = data?.role ?? '2'

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
    }
    if (!isEditing) {
      request.password = passwordRef.current.value
    }
    const result = await usersRest.save(request)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onPasswordModalOpen = (id) => {
    setPasswordUserId(id)
    $(passwordModalRef.current).modal('show')
  }

  const onPasswordChangeSubmit = async (e) => {
    e.preventDefault()
    const newPassword = document.getElementById('new-password').value
    if (!newPassword) return

    const formData = new FormData()
    formData.append('id', passwordUserId)
    formData.append('password', newPassword)

    const result = await usersRest.changePassword(formData)
    if (!result) return

    $(passwordModalRef.current).modal('hide')
    document.getElementById('new-password').value = ''
  }

  const onInviteModalOpen = () => {
    inviteEmailRef.current.value = ''
    $(inviteModalRef.current).modal('show')
  }

  const onInviteSubmit = async (e) => {
    e.preventDefault()
    const email = inviteEmailRef.current.value.trim()
    if (!email) return

    const result = await usersRest.invite({ email })
    if (!result) return

    $(inviteModalRef.current).modal('hide')
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
            text: 'Nuevo',
            hint: 'Crear usuario',
            onClick: () => onModalOpen()
          }
        });
        container.unshift({
          widget: 'dxButton', location: 'after',
          options: {
            icon: 'mdi mdi-email-send',
            text: 'Invitar',
            hint: 'Invitar usuario',
            onClick: () => onInviteModalOpen()
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
          width: '20%',
        },
        {
          dataField: 'lastname',
          caption: 'Apellido',
          width: '20%',
        },
        {
          dataField: 'email',
          caption: 'Email',
          width: '25%',
        },
        {
          caption: 'Rol',
          width: '15%',
          cellTemplate: (container, { data }) => {
            const roles = data.roles || []
            const roleNames = roles
              .map(r => r.name)
              .filter(name => name === 'Restaurant' || name === 'Kitchen')
              .map(name => name === 'Restaurant' ? 'Administrador' : 'Cocina')
            $(container).text(roleNames.join(', ') || '')
          }
        },
        {
          caption: 'Acciones',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            // container.append(DxButton({
            //   className: 'btn btn-xs btn-soft-primary',
            //   title: 'Editar',
            //   icon: 'fa fa-pen',
            //   onClick: () => onModalOpen(data)
            // }))
            // container.append(DxButton({
            //   className: 'btn btn-xs btn-soft-warning',
            //   title: 'Cambiar contraseña',
            //   icon: 'fa fa-key',
            //   onClick: () => onPasswordModalOpen(data.id)
            // }))
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-danger',
              title: 'Quitar acceso',
              icon: 'fa fa-trash',
              onClick: () => onDeleteClicked(data.id)
            }))
          },
          allowFiltering: false,
          allowExporting: false
        }
      ]} />
    <Modal modalRef={modalRef} title={isEditing ? 'Editar usuario' : 'Agregar usuario'} onSubmit={onModalSubmit} size='md'>
      <div className='row' id='users-container'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Nombre' col='col-md-6' required />
        <InputFormGroup eRef={lastnameRef} label='Apellido' col='col-md-6' required />
        <InputFormGroup eRef={emailRef} label='Email' type='email' required />
        {!isEditing && <PasswordFormGroup eRef={passwordRef} label='Contraseña' type='password' required />}
        <SelectFormGroup label='Rol' eRef={roleRef} dropdownParent='#users-container'>
          <option value="" disabled selected>Seleccione un rol</option>
          <option value="Restaurant">Administrador</option>
          <option value="Kitchen">Cocina</option>
        </SelectFormGroup>
      </div>
    </Modal>

    <Modal modalRef={passwordModalRef} title='Cambiar contraseña' onSubmit={onPasswordChangeSubmit} size='sm'>
      <div className='row'>
        <div className='col-12'>
          <InputFormGroup eRef={{ current: document.getElementById('new-password') }} label='Nueva contraseña' type='password' required />
        </div>
      </div>
    </Modal>

    <Modal modalRef={inviteModalRef} title='Invitar usuario' onSubmit={onInviteSubmit} size='sm'>
      <div className='row'>
        <div className='col-12'>
          <InputFormGroup eRef={inviteEmailRef} label='Correo electrónico' type='email' required />
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