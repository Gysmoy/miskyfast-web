import BaseAdminto from '@Adminto/Base';
import InputFormGroup from '@Adminto/form/InputFormGroup';
import SelectFormGroup from '@Adminto/form/SelectFormGroup';
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
    $(imageRef.current).val(data?.image ?? null).trigger('change');
    colorRef.current.value = data?.color ?? '#000000'
    $(typeRef.current).val(data?.type ?? 'order').trigger('change');
    $(isOkRef.current).prop('checked', data?.is_ok == 1).trigger('click')
    $(statusRef.current).prop('checked', data?.status == 1).trigger('click')

    $(modalRef.current).modal('show')
  }

  const onModalSubmit = async (e) => {
    e.preventDefault()

    const request = {
      id: idRef.current.value || undefined,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      color: colorRef.current.value,
      type: typeRef.current.value,
      is_ok: isOkRef.current.checked,
      status: statusRef.current.checked,
    }

    const result = await statusesRest.save(request)
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

  const imageTemplate = (e) => {
    return $(renderToString(<span>
      {e.text}
    </span>))
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
          width: '100px',
          cellTemplate: (container, { data }) => {
            container.html(renderToString(<>
              {data.image && <img src={data.image} alt="status" style={{width:32,height:32,objectFit:'contain'}} />}
            </>))
          }
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
    <Modal modalRef={modalRef} title={isEditing ? 'Editar estado' : 'Agregar estado'} onSubmit={onModalSubmit} size='lg'>
      <div className='row' id='statuses-container'>
        <input ref={idRef} type='hidden' />
        <InputFormGroup eRef={nameRef} label='Estado' col='col-md-6' required />
        <SelectFormGroup
          eRef={typeRef}
          label='Tipo'
          col='col-md-6'
          options={[
            {value:'order',label:'Pedido'},
            {value:'payment',label:'Pago'},
            {value:'shipment',label:'Envío'}
          ]}
          required
        />
        <TextareaFormGroup eRef={descriptionRef} label='Descripción' col='col-12' />
        <InputFormGroup eRef={imageRef} label='Imagen' type='file' col='col-md-6' />
        <InputFormGroup eRef={colorRef} label='Color' type="color" col='col-md-6' required />
        <SwitchFormGroup eRef={isOkRef} label='¿Es contable?' info="Indica si este estado se considera 'hecho' para efectos de dashboard y reportes" col='col-md-6' />
        <SwitchFormGroup eRef={statusRef} label='Activo' col='col-md-6' />
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