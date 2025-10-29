import { useState, useEffect } from "react";
import CreateReactScript from "../Utils/CreateReactScript";
import { createRoot } from "react-dom/client";

const AddAddress = () => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [form, setForm] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [saved, setSaved] = useState(false);

    const apiKey = 'AIzaSyBDikLz7ELBdUFW0TnvkWkcXPK48Wc003U'

    useEffect(() => {
        const initMap = () => {
            const gmap = new google.maps.Map(document.getElementById("map"), {
                center: {
                    lat: -13.15878,
                    lng: -74.22321,
                },
                zoom: 14,
            });

            gmap.addListener("click", async (event) => {
                const latitude = event.latLng.lat();
                const longitude = event.latLng.lng();

                if (marker) marker.setPosition({ lat: latitude, lng: longitude });
                else setMarker(new google.maps.Marker({ position: { lat: latitude, lng: longitude }, map: gmap }));

                const res = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
                );
                const data = await res.json();

                if (data.status === "OK" && data.results.length > 0) {
                    const address = data.results[0];
                    const c = address.address_components;
                    const get = (type) => c.find((x) => x.types.includes(type))?.long_name || "";

                    const parsed = {
                        latitude,
                        longitude,
                        department: get("administrative_area_level_1"),
                        city: get("locality") || get("administrative_area_level_2"),
                        district: get("sublocality") || get("administrative_area_level_3"),
                        street: get("route"),
                        number: get("street_number"),
                        address: address.formatted_address,
                    };

                    setForm(parsed);
                    setShowModal(true);
                }
            });

            setMap(gmap);
        };

        if (!window.google) loadScript();
        else initMap();
    }, []);

    const handleSave = () => {
        console.log("📍 Datos:", form);
        setSaved(true);
        setShowModal(false);
        setTimeout(() => window.close(), 1500);
    };

    return (
        <div className="relative w-screen h-screen">
            <div id="map" className="w-full h-full" />

            {showModal && !saved && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-5 w-11/12 max-w-md">
                        <h2 className="text-lg font-bold mb-3">¿Guardar esta dirección?</h2>
                        <p className="text-sm text-gray-700 mb-4">{form?.address}</p>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {saved && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-5 text-center w-11/12 max-w-md">
                        <h2 className="text-lg font-bold">✅ Dirección guardada</h2>
                        <p className="text-sm text-gray-600">Ya puedes volver a la app.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

CreateReactScript((el, properties) => {
    createRoot(el).render(<AddAddress {...properties} />);
})