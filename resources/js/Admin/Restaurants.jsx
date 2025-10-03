import BaseAdminto from "@Adminto/Base";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import TextareaFormGroup from "@Adminto/form/TextareaFormGroup";
import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Swal from "sweetalert2";
import RestaurantController from "../Actions/Admin/RestaurantsRest";
import ImageFormGroup from "../Components/Adminto/form/ImageFormGroup";
import InputFormGroup from "../Components/Adminto/form/InputFormGroup";
import Modal from "../Components/Adminto/Modal";
import Table from "../Components/Adminto/Table";
import DxButton from "../Components/dx/DxButton";
import CreateReactScript from "../Utils/CreateReactScript";
import ReactAppend from "../Utils/ReactAppend";

const restaurantsRest = new RestaurantController();

const Restaurants = () => {
    const gridRef = useRef();
    const modalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const addressRef = useRef();
    const bannerRef = useRef();
    const logoRef = useRef();
    const phonePrefixRef = useRef();
    const phoneRef = useRef();

    const [isEditing, setIsEditing] = useState(false);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        descriptionRef.current.value = data?.description ?? "";
        addressRef.current.value = data?.address ?? "";
        phonePrefixRef.current.value = data?.phone_prefix ?? "";
        phoneRef.current.value = data?.phone ?? "";

        bannerRef.image.src = `/storage/images/restaurant/${data?.banner}`;
        bannerRef.current.value = null;
        logoRef.image.src = `/storage/images/restaurant/${data?.logo}`;
        logoRef.current.value = null;

        $(modalRef.current).modal("show");
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            address: addressRef.current.value,
            phone_prefix: phonePrefixRef.current.value,
            phone: phoneRef.current.value,
        };

        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }
        const bannerFile = bannerRef.current.files[0];
        if (bannerFile) formData.append("banner", bannerFile);
        const logoFile = logoRef.current.files[0];
        if (logoFile) formData.append("logo", logoFile);

        const result = await restaurantsRest.save(formData);
        if (!result) return;

        $(gridRef.current).dxDataGrid("instance").refresh();
        $(modalRef.current).modal("hide");
    };

    const onFeaturedChange = async ({ id, value }) => {
        const result = await restaurantsRest.boolean({
            id,
            field: "featured",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onVisibleChange = async ({ id, value }) => {
        const result = await restaurantsRest.boolean({
            id,
            field: "visible",
            value,
        });
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    const onDeleteClicked = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: "Eliminar registro",
            text: "¿Estas seguro de eliminar este registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!isConfirmed) return;
        const result = await restaurantsRest.delete(id);
        if (!result) return;
        $(gridRef.current).dxDataGrid("instance").refresh();
    };

    return (
        <>
            <Table
                gridRef={gridRef}
                title="Restaurantes"
                rest={restaurantsRest}
                toolBar={(container) => {
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "refresh",
                            hint: "Refrescar tabla",
                            onClick: () =>
                                $(gridRef.current)
                                    .dxDataGrid("instance")
                                    .refresh(),
                        },
                    });
                    container.unshift({
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "plus",
                            text: "Nuevo registro",
                            hint: "Nuevo registro",
                            onClick: () => onModalOpen(),
                        },
                    });
                }}
                columns={[
                    {
                        dataField: "id",
                        caption: "ID",
                        visible: false,
                    },
                    {
                        dataField: "name",
                        caption: "Nombre",
                        width: "20%",
                    },
                    {
                        dataField: "description",
                        caption: "Descripción",
                        width: "25%",
                    },
                    {
                        dataField: "address",
                        caption: "Dirección",
                        width: "25%",
                    },
                    {
                        dataField: "phone_prefix",
                        caption: "Prefijo",
                        width: "8%",
                    },
                    {
                        dataField: "phone",
                        caption: "Teléfono",
                        width: "12%",
                    },
                    {
                        dataField: "logo",
                        caption: "Logo",
                        width: "90px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/storage/images/restaurant/${data.logo}`}
                                    style={{
                                        width: "80px",
                                        height: "48px",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        borderRadius: "4px",
                                    }}
                                    onError={(e) =>
                                    (e.target.src =
                                        "/api/cover/thumbnail/null")
                                    }
                                />
                            );
                        },
                    },
                    {
                        dataField: "featured",
                        caption: "Destacado",
                        dataType: "boolean",
                        cellTemplate: (container, { data }) => {
                            $(container).empty();
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.featured == 1}
                                    onChange={() =>
                                        onFeaturedChange({
                                            id: data.id,
                                            value: !data.featured,
                                        })
                                    }
                                />
                            );
                        },
                    },
                    {
                        dataField: "visible",
                        caption: "Visible",
                        dataType: "boolean",
                        cellTemplate: (container, { data }) => {
                            $(container).empty();
                            ReactAppend(
                                container,
                                <SwitchFormGroup
                                    checked={data.visible == 1}
                                    onChange={() =>
                                        onVisibleChange({
                                            id: data.id,
                                            value: !data.visible,
                                        })
                                    }
                                />
                            );
                        },
                    },
                    {
                        caption: "Acciones",
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
                title={isEditing ? "Editar restaurante" : "Agregar restaurante"}
                onSubmit={onModalSubmit}
            >
                <input ref={idRef} type="hidden" />
                <div className="row" id="restaurants-container">
                    <div className="col-md-6">
                        <ImageFormGroup
                            eRef={bannerRef}
                            label="Banner"
                            col="col-12"
                            aspect={16 / 9}
                        />
                        <ImageFormGroup
                            eRef={logoRef}
                            label="Logo"
                            col="col-12"
                            aspect={1}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextareaFormGroup
                            eRef={nameRef}
                            label="Nombre"
                            rows={2}
                            required
                        />
                        <TextareaFormGroup
                            eRef={descriptionRef}
                            label="Descripción"
                            rows={2}
                        />
                        <TextareaFormGroup
                            eRef={addressRef}
                            label="Dirección"
                            rows={2}
                        />
                        <div className="row">
                            <div className="col-md-4">
                                <InputFormGroup
                                    eRef={phonePrefixRef}
                                    label="Prefijo"
                                    placeholder="+1"
                                />
                            </div>
                            <div className="col-md-8">
                                <InputFormGroup
                                    eRef={phoneRef}
                                    label="Teléfono"
                                    placeholder="123456789"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Restaurantes">
            <Restaurants {...properties} />
        </BaseAdminto>
    );
});
