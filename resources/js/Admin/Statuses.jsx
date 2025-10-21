import BaseAdminto from '@Adminto/Base';
import InputFormGroup from '@Adminto/form/InputFormGroup';
import SwitchFormGroup from '@Adminto/form/SwitchFormGroup';
import TextareaFormGroup from '@Adminto/form/TextareaFormGroup';
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import Swal from 'sweetalert2';
import Modal from '../Components/Adminto/Modal';
import Table from '../Components/Adminto/Table';
import DxButton from '../Components/dx/DxButton';
import CreateReactScript from '../Utils/CreateReactScript';
import ReactAppend from '../Utils/ReactAppend';
import StatusesRest from '../Actions/Admin/StatusesRest';
import SelectFormGroup from '../Components/Adminto/form/SelectFormGroup';
import ImageFormGroup from '../Components/Adminto/form/ImageFormGroup';

const statusesRest = new StatusesRest()

const Statuses = ({ }) => {
  const gridRef = useRef()
  const modalRef = useRef()

  // Form elements ref
  const idRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const imageRef = useRef()
  const colorRef = useRef()
  const typeRef = useRef()
  const isOkRef = useRef()
  const statusRef = useRef()

  const [isEditing, setIsEditing] = useState(false)

  const onModalOpen = (data) => {
    if (data?.id) setIsEditing(true)
    else setIsEditing(false)

    idRef.current.value = data?.id ?? ''
    nameRef.current.value = data?.name ?? ''
    descriptionRef.current.value = data?.description ?? ''
    imageRef.current.value = null
    imageRef.image.src = `/storage/images/status/${data?.image}`
    colorRef.current.value = data?.color ?? '#000000'
    $(typeRef.current).val(data?.type ?? 'order').trigger('change');

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', idRef.current.value || '')
    formData.append('name', nameRef.current.value)
    formData.append('description', descriptionRef.current.value)
    formData.append('color', colorRef.current.value)
    formData.append('type', typeRef.current.value)

    // Append image file if selected
    const file = imageRef.current.files[0]
    if (file) formData.append('image', file)

    const result = await statusesRest.save(formData)
    if (!result) return

    $(gridRef.current).dxDataGrid('instance').refresh()
    $(modalRef.current).modal('hide')
  }

  const onStatusChange = async ({ id, value }) => {
    const result = await statusesRest.boolean({ id, field: 'status', value })
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
    const result = await statusesRest.delete(id)
    if (!result) return
    $(gridRef.current).dxDataGrid('instance').refresh()
  }

  return (<>
    <Table gridRef={gridRef} title='Estados' rest={statusesRest}
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
          dataField: 'image',
          caption: 'Imagen',
          width: '60px',
          ccsClass: 'text-center',
          cellTemplate: (container, { data }) => {
            container.html(renderToString(<>
              {data.image && <img src={`/storage/images/status/${data.image}`} className='mx-auto d-block' alt="status" style={{
                width: 32,
                height: 32,
                objectFit: 'contain',
                backgroundColor: data.color,
                borderRadius: 8,
                padding: 4,
              }} />}
            </>))
          },
          allowFiltering: false,
          allowSorting: false
        },
        {
          dataField: 'name',
          caption: 'Estado',
          width: '200px'
        },
        {
          dataField: 'description',
          caption: 'Descripción',
        },
        {
          dataField: 'color',
          caption: 'Color',
          width: '100px',
          cellTemplate: (container, { data }) => {
            container.html(renderToString(<>
              <i className={`mdi mdi-checkbox-blank-circle me-1`} style={{ color: data.color }} />
              {data.color}
            </>))
          }
        },
        {
          dataField: 'type',
          caption: 'Tipo',
          width: '120px'
        },
        {
          dataField: 'is_ok',
          caption: 'Contable',
          dataType: 'boolean',
          width: '100px',
          cellTemplate: (container, { data }) => {
            $(container).empty()
            ReactAppend(container, <SwitchFormGroup checked={data.is_ok == 1} onChange={() => onStatusChange({
              id: data.id,
              value: !data.is_ok
            })} />)
          }
        },
        {
          dataField: 'status',
          caption: 'Activo',
          dataType: 'boolean',
          width: '100px',
          cellTemplate: (container, { data }) => {
            $(container).empty()
            ReactAppend(container, <SwitchFormGroup checked={data.status == 1} onChange={() => onStatusChange({
              id: data.id,
              value: !data.status
            })} />)
          }
        },
        {
          caption: 'Acciones',
          width: '150px',
          cellTemplate: (container, { data }) => {
            container.css('text-overflow', 'unset')
            container.append(DxButton({
              className: 'btn btn-xs btn-soft-primary',
              title: 'Editar',
              icon: 'fa fa-pen',
              onClick: () => onModalOpen(data)
            }))
            data.editable == 1 && container.append(DxButton({
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar estado' : 'Agregar estado'} onSubmit={onModalSubmit}>
      <input ref={idRef} type='hidden' />
      <div className='row' id='statuses-container'>
        <div className="col-md-4">
          <ImageFormGroup eRef={imageRef} label='Imagen' aspect={1} />
        </div>
        <div className="col-md-8">
          <InputFormGroup eRef={nameRef} label='Estado' required />
          <div className='row'>
          <SelectFormGroup eRef={typeRef} label='Tipo' dropdownParent='#statuses-container' col='col-md-7' required>
            <option value="order">Orden</option>
            <option value="delivery">Delivery</option>
          </SelectFormGroup>
          <InputFormGroup eRef={colorRef} label='Color' type='color' col='col-md-5' required />
          </div>
        </div>
        <TextareaFormGroup eRef={descriptionRef} label='Descripción' col='col-12' />
      </div>
    </Modal>
  </>
  )
}

CreateReactScript((el, properties) => {

  createRoot(el).render(<BaseAdminto {...properties} title='Estados'>
    <Statuses {...properties} />
  </BaseAdminto>);
})