import { useState, useEffect, useRef } from 'react';
import { X, Store, User, Mail, Phone, MapPin, CheckCircle, Globe } from 'lucide-react';
import MessagesRest from '../../Actions/MessagesRest';

const messagesRest = new MessagesRest();

const RestaurantModal = ({ isOpen, onClose, prefixes, gmaps_api_key }) => {
    const [formData, setFormData] = useState({
        restaurant_name: '',
        owner_name: '',
        email: '',
        phone_prefix: '51',
        phone: '',
        address: '',
        latitude: '',
        longitude: '',
        reference: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showMap, setShowMap] = useState(false);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [locationSelected, setLocationSelected] = useState(false);
    const [prefixDropdownOpen, setPrefixDropdownOpen] = useState(false);
    const prefixDropdownRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate location is selected
        if (!formData.latitude || !formData.longitude) {
            setError('Por favor selecciona una ubicación en el mapa');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Call messagesRest.save with formData
            const result = await messagesRest.save({ ...formData, type: 'restaurant' });

            if (!result) throw new Error('Error al enviar el formulario. Por favor, intenta de nuevo.');

            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setFormData({
                    restaurant_name: '',
                    owner_name: '',
                    email: '',
                    phone_prefix: '51',
                    phone: '',
                    address: '',
                    latitude: '',
                    longitude: '',
                    reference: '',
                });
            }, 2000);
        } catch (err) {
            setError('Error al enviar el formulario. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const openMap = () => {
        setShowMap(true);
        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${gmaps_api_key}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            // Delay initMap to ensure DOM element is rendered
            setTimeout(initMap, 0);
        }
    };

    const initMap = () => {
        // Ensure the map DOM element exists
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Map element not found');
            return;
        }

        const mapInstance = new window.google.maps.Map(mapElement, {
            center: { lat: -13.1604189, lng: -74.2257754 },
            zoom: 12,
        });

        setMap(mapInstance);

        // Single click listener to close map after selection
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
            setLocationSelected(true);

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    setFormData((prev) => ({
                        ...prev,
                        address: results[0].formatted_address,
                        latitude: lat.toString(),
                        longitude: lng.toString(),
                    }));
                }
            });

            // Close map immediately after selecting location
            setTimeout(() => {
                closeMap();
            }, 300);
        });
    };

    const closeMap = () => {
        setShowMap(false);
    };

    useEffect(() => {
        if (!isOpen) {
            setShowMap(false);
            setMap(null);
            setMarker(null);
        }
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (prefixDropdownRef.current && !prefixDropdownRef.current.contains(event.target)) {
                setPrefixDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isOpen) return null;

    const selectedPrefix = prefixes.find(p => p.realCode === formData.phone_prefix) || prefixes[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
                <div className="sticky top-0 bg-gradient-to-r from-red-600 to-yellow-400 p-6 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                <Store className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">Registra tu Restaurante</h2>
                                <p className="text-white/90">Únete a nuestra red de partners</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>

                {success ? (
                    <div className="p-12 text-center animate-scale-in">
                        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">¡Registro Exitoso!</h3>
                        <p className="text-lg text-gray-600">
                            Nos pondremos en contacto contigo pronto
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <Store className="w-5 h-5 text-red-600" />
                                    Nombre del Restaurante
                                </label>
                                <input
                                    type="text"
                                    name="restaurant_name"
                                    value={formData.restaurant_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                                    placeholder="Ej: Burger House"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <User className="w-5 h-5 text-red-600" />
                                    Nombre del Propietario
                                </label>
                                <input
                                    type="text"
                                    name="owner_name"
                                    value={formData.owner_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                                    placeholder="Tu nombre completo"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                <Mail className="w-5 h-5 text-red-600" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-3 space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <Phone className="w-5 h-5 text-red-600" />
                                    Teléfono
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="relative col-span-1" ref={prefixDropdownRef}>
                                        <button
                                            type="button"
                                            onClick={() => setPrefixDropdownOpen(!prefixDropdownOpen)}
                                            className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-white flex items-center justify-between"
                                        >
                                            <div className='flex items-center gap-2'>
                                                <span className="font-emoji">{selectedPrefix.flag}</span>
                                                <span>{selectedPrefix.beautyCode}</span>
                                            </div>
                                            <svg className={`w-4 h-4 ml-2 transition-transform ${prefixDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {prefixDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                                {prefixes.map((prefix) => (
                                                    <button
                                                        key={prefix.realCode}
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, phone_prefix: prefix.realCode }));
                                                            setPrefixDropdownOpen(false);
                                                        }}
                                                        className="w-full px-3 py-2 text-left hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl flex items-center gap-2"
                                                    >
                                                        <span className="font-emoji">{prefix.flag}</span>
                                                        <span>{prefix.beautyCode}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="col-span-2 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                                        placeholder="999 999 999"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                <MapPin className="w-5 h-5 text-red-600" />
                                Dirección del Restaurante
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled
                                    required
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                                    placeholder="Dirección completa"
                                />
                                <button
                                    type="button"
                                    onClick={openMap}
                                    className="bg-gradient-to-r from-red-600 to-yellow-400 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <Globe className="w-5 h-5 font-emoji" />
                                </button>
                            </div>
                            <input
                                type="text"
                                name="reference"
                                value={formData.reference}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                                placeholder="Referencia (opcional)"
                            />
                            {/* Display latitude and longitude below reference */}
                            {formData.latitude && formData.longitude && (
                                <div className="text-sm text-gray-600 mt-2">
                                    <p>Latitud: {formData.latitude}</p>
                                    <p>Longitud: {formData.longitude}</p>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                                <p className="text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !locationSelected}
                            className="w-full bg-gradient-to-r from-red-600 to-yellow-400 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? 'Enviando...' : 'Registrar Restaurante'}
                        </button>
                    </form>
                )}
            </div>

            {showMap && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 animate-fade-in">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeMap}></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
                        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-yellow-400 p-6 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-white">Selecciona la ubicación en el mapa</h3>
                            <button
                                onClick={closeMap}
                                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <div id="map" className="w-full h-96"></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantModal