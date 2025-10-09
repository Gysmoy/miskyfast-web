import BaseAdminto from "@Adminto/Base";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import TextareaFormGroup from "@Adminto/form/TextareaFormGroup";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";
import ItemsRest from "../Actions/Admin/ItemsRest";
import Modal from "../Components/Adminto/Modal";
import Table from "../Components/Adminto/Table";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import QuillFormGroup from "../Components/Adminto/form/QuillFormGroup";
import SelectAPIFormGroup from "../Components/Adminto/form/SelectAPIFormGroup";
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";
import DxButton from "../Components/dx/DxButton";
import CreateReactScript from "../Utils/CreateReactScript";
import Number2Currency from "../Utils/Number2Currency";
import ReactAppend from "../Utils/ReactAppend";
import SetSelectValue from "../Utils/SetSelectValue";
import ModalImportItem from "./Components/ModalImportItem";

const itemsRest = new ItemsRest();

const Items = ({ categories, restaurants }) => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const restaurantRef = useRef();
    const categoryRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const presentationsRef = useRef();

    const [isEditing, setIsEditing] = useState(false);
    const [presentations, setPresentations] = useState([]);

    const onModalOpen = (data) => {
        setIsEditing(!!data?.id);

        idRef.current.value = data?.id || "";
        nameRef.current.value = data?.name || "";
        priceRef.current.value = data?.price || "";
        descriptionRef.current.value = data?.description || "";

        $(restaurantRef.current).val(data?.restaurant_id || "").trigger('change');
        $(categoryRef.current).val(data?.category_id || "").trigger('change');

        // presentations
        const pts = data?.presentations || [];
        setPresentations(Array.isArray(pts) ? pts : JSON.parse(pts || "[]"));

        // image
        if (imageRef.current) {
            imageRef.current.value = null;
            if (imageRef.image) {
                imageRef.image.src = data?.image
                    ? `/storage/images/item/${data.image}`
                    : "/api/cover/thumbnail/null";
            }
        }

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current?.value || undefined,
            category_id: categoryRef.current?.value || null,
            restaurant_id: restaurantRef.current?.value || null,
            name: nameRef.current?.value,
            price: priceRef.current?.value,
            description: descriptionRef.current?.value,
            presentations: JSON.stringify(presentations),
        };

        const formData = new FormData();
        Object.keys(request).forEach((k) => formData.append(k, request[k]));

        const image = imageRef.current.files[0];
        if (image) formData.append("image", image);

        const result = await itemsRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
        setPresentations([]);
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await itemsRest.boolean({ id, field: "visible", value });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar item",
            text: "¿Estás seguro de eliminar este item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await itemsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const addPresentation = () => {
        setPresentations(prev => [...prev, { uuid: crypto.randomUUID(), presentation: "", price: 0 }]);
    };

    const updatePresentation = (uuid, field, value) => {
        setPresentations(prev =>
            prev.map(p => (p.uuid === uuid ? { ...p, [field]: value } : p))
        );
    };

    const removePresentation = (uuid) => {
        setPresentations(prev => prev.filter(p => p.uuid !== uuid));
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Items"
                rest={itemsRest}
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
                        dataField: "restaurant.name",
                        caption: "Restaurante",
                        width: "200px",
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
                ]}
            />
            <Modal
                modalRef={modalRef}
                title={isEditing ? "Editar item" : "Agregar item"}
                onSubmit={onModalSubmit}
            >
                <input ref={idRef} type="hidden" />
                <div id="principal-container" className="row">

                    <SelectFormGroup eRef={restaurantRef} label="Restaurante" col='col-md-6' dropdownParent="#principal-container" >
                        <option value="">- Escoja un restaurante -</option>
                        {restaurants.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </SelectFormGroup>
                    <SelectFormGroup eRef={categoryRef} label="Categoría" col='col-md-6' dropdownParent="#principal-container" >
                        <option value="">- Escoja una categoría -</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </SelectFormGroup>
                    <InputFormGroup eRef={nameRef} label="Nombre" col='col-md-8' required />
                    <InputFormGroup eRef={priceRef} label="Precio" type="number" step="0.01" col='col-md-4' required />
                    <TextareaFormGroup eRef={descriptionRef} label="Descripción" rows={2} />
                    <ImageFormGroup eRef={imageRef} label="Imagen" aspect={2.35} />
                    <div className="col-md-12">
                        <label className="form-label">Presentaciones</label>
                        <div className="mb-2">
                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={addPresentation}>
                                + Agregar presentación
                            </button>
                        </div>
                        {presentations.map((p) => (
                            <div key={p.uuid} className="row mb-2 align-items-center">
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Presentación"
                                        value={p.presentation}
                                        onChange={(e) => updatePresentation(p.uuid, "presentation", e.target.value)}
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        placeholder="Precio"
                                        step="0.01"
                                        value={p.price}
                                        onChange={(e) => updatePresentation(p.uuid, "price", parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="col-auto">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => removePresentation(p.uuid)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Items">
            <Items {...properties} />
        </BaseAdminto>
    );
});
