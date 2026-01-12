import BaseAdminto from "@Adminto/Base";
import SwitchFormGroup from "@Adminto/form/SwitchFormGroup";
import { useRef, useState } from "react";
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
import SelectFormGroup from "../Components/Adminto/form/SelectFormGroup";
import TextareaFormGroup from "../Components/Adminto/form/TextareaFormGroup";

const restaurantsRest = new RestaurantController();

const Restaurants = ({ prefixes, gmaps_api_key }) => {
    const gridRef = useRef();
    const modalRef = useRef();
    const mapModalRef = useRef();

    // Form elements ref
    const idRef = useRef();
    const nameRef = useRef();
    const ownerNameRef = useRef();
    const emailRef = useRef();
    const descriptionRef = useRef();
    const addressRef = useRef();
    const referenceRef = useRef();
    const longitudeRef = useRef();
    const latitudeRef = useRef();
    const bannerRef = useRef();
    const logoRef = useRef();
    const phonePrefixRef = useRef();
    const phoneRef = useRef();

    const [isEditing, setIsEditing] = useState(false);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    const onModalOpen = (data) => {
        if (data?.id) setIsEditing(true);
        else setIsEditing(false);

        idRef.current.value = data?.id ?? "";
        nameRef.current.value = data?.name ?? "";
        ownerNameRef.current.value = data?.owner_name ?? "";
        emailRef.current.value = data?.email ?? "";
        descriptionRef.current.value = data?.description ?? "";
        addressRef.current.value = data?.address ?? "";
        referenceRef.current.value = data?.reference ?? "";
        longitudeRef.current.value = data?.longitude ?? "";
        latitudeRef.current.value = data?.latitude ?? "";
        $(phonePrefixRef.current).val(data?.phone_prefix ?? "").trigger("change");
        phoneRef.current.value = data?.phone ?? "";

        bannerRef.image.src = `/storage/images/restaurant/${data?.banner}`;
        bannerRef.current.value = null;
        logoRef.image.src = `/storage/images/restaurant/${data?.logo}`;
        logoRef.current.value = null;

        $(modalRef.current).modal("show");
    };

    const openMapPicker = () => {
        $(mapModalRef.current).modal("show");
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${gmaps_api_key}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => initMap();
            document.head.appendChild(script);
        } else {
            setTimeout(() => initMap(), 0);
        }
    };

    const initMap = () => {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Map element not found');
            return;
        }

        // Check if lat/lng are already set
        const lat = parseFloat(latitudeRef.current.value);
        const lng = parseFloat(longitudeRef.current.value);
        const hasLatLng = !isNaN(lat) && !isNaN(lng);

        const mapInstance = new window.google.maps.Map(mapElement, {
            center: hasLatLng ? { lat, lng } : { lat: -13.1604189, lng: -74.2257754 },
            zoom: hasLatLng ? 16 : 12,
        });

        setMap(mapInstance);

        // If lat/lng exist, place marker
        if (hasLatLng) {
            const newMarker = new window.google.maps.Marker({
                position: { lat, lng },
                map: mapInstance,
            });
            setMarker(newMarker);
        }

        mapInstance.addListener('click', (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();

            if (marker) {
                marker.setMap(null);
            }

            const newMarker = new window.google.maps.Marker({
                position: { lat, lng },
                map: mapInstance,
            });

            setMarker(newMarker);

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    addressRef.current.value = results[0].formatted_address;
                    longitudeRef.current.value = lng.toString();
                    latitudeRef.current.value = lat.toString();
                }
            });

            setTimeout(() => {
                $(mapModalRef.current).modal("hide");
            }, 300);
        });
    };

    const onModalSubmit = async (e) => {
        e.preventDefault();

        const request = {
            id: idRef.current.value || undefined,
            name: nameRef.current.value,
            owner_name: ownerNameRef.current.value,
            email: emailRef.current.value,
            description: descriptionRef.current.value,
            address: addressRef.current.value,
            reference: referenceRef.current.value,
            longitude: longitudeRef.current.value,
            latitude: latitudeRef.current.value,
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
                        width: "240px",
                        cellTemplate: (container, { data }) => {
                            ReactAppend(container, (<div className="w-100">
                                <b className="d-block">{data.name}</b>
                                <small className='d-block text-muted fw-light text-truncate'>{data.description}</small>
                            </div>))
                        }
                    },
                    {
                        dataField: "address",
                        caption: "Dirección",
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
                        dataField: "logo",
                        caption: "Logo",
                        width: "58px",
                        allowFiltering: false,
                        cellTemplate: (container, { data }) => {
                            ReactAppend(
                                container,
                                <img
                                    src={`/storage/images/restaurant/${data.logo}`}
                                    style={{
                                        width: "48px",
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
                        width: "80px",
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
                        width: "80px",
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
                title={isEditing ? "Editar restaurante" : "Agregar restaurante"}
                onSubmit={onModalSubmit}
            >
                <input ref={idRef} type="hidden" />
                <div className="row" id="restaurants-container">
                    <ImageFormGroup
                        eRef={logoRef}
                        label="Logo"
                        col="col-md-4"
                        aspect={1}
                    />
                    <ImageFormGroup
                        eRef={bannerRef}
                        label="Banner"
                        col="col-md-8"
                        aspect={16 / 9}
                    />
                    <InputFormGroup
                        eRef={nameRef}
                        label="Nombre"
                        required
                    />
                    <InputFormGroup
                        eRef={ownerNameRef}
                        label="Nombre del propietario"
                        required
                    />
                    <TextareaFormGroup
                        eRef={descriptionRef}
                        label="Descripción"
                        rows={2}
                        required
                    />

                    <InputFormGroup
                        eRef={emailRef}
                        label="Email"
                        required
                    />

                    <div className="col-md-4">
                        <SelectFormGroup label='Prefijo' eRef={phonePrefixRef} dropdownParent='#restaurants-container'>
                            {prefixes.sort((a, b) => a.beautyCode.localeCompare(b.beautyCode)).map((prefix) => (
                                <option key={prefix.realCode} value={prefix.realCode}>{prefix.beautyCode} {prefix.country}</option>
                            ))}
                        </SelectFormGroup>
                    </div>
                    <div className="col-md-8">
                        <InputFormGroup
                            eRef={phoneRef}
                            label="Teléfono"
                            placeholder="123456789"
                        />
                    </div>

                    <div className="col-md-12">
                        <div className="form-group mb-2">
                            <label className="form-label">Dirección</label>
                            <div className="input-group">
                                <input
                                    ref={addressRef}
                                    type="text"
                                    className="form-control"
                                    placeholder="Dirección"
                                    disabled
                                />
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn btn-soft-info"
                                        onClick={openMapPicker}
                                    >
                                        <i className="fa fa-map-marker-alt"></i> Ubicar en mapa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <InputFormGroup
                        eRef={referenceRef}
                        label="Referencia"
                        placeholder="Referencia adicional"
                    />

                    <input ref={longitudeRef} type="hidden" />
                    <input ref={latitudeRef} type="hidden" />
                </div>
            </Modal>
            <Modal
                modalRef={mapModalRef}
                title="Seleccionar ubicación"
                size="lg"
                hideFooter
            >
                <div id="map" style={{ height: "400px", width: "100%" }}></div>
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
