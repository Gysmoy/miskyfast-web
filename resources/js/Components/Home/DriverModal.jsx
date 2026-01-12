import { useState, useRef, useEffect } from 'react';
import { X, Bike, User, Mail, Phone, CreditCard, CheckCircle } from 'lucide-react';
import MessagesRest from '../../Actions/MessagesRest';

const messagesRest = new MessagesRest()

const vehicleOptions = [
    { value: 'moto', label: 'Motocicleta', icon: 'mdi mdi-motorbike' },
    { value: 'bicicleta', label: 'Bicicleta', icon: 'mdi mdi-bicycle' },
    { value: 'scooter', label: 'Scooter Eléctrico', icon: 'mdi mdi-scooter' },
    { value: 'auto', label: 'Auto', icon: 'mdi mdi-car' },
];

const DriverModal = ({ isOpen, onClose, prefixes }) => {
    const [formData, setFormData] = useState({
        owner_name: '',
        email: '',
        phone_prefix: '51',
        phone: '',
        license_number: '',
        vehicle_type: '',
        plate_number: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [prefixDropdownOpen, setPrefixDropdownOpen] = useState(false);
    const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
    const prefixDropdownRef = useRef(null);
    const vehicleDropdownRef = useRef(null);

    // Set default prefix on mount
    useEffect(() => {
        if (prefixes && prefixes.length > 0 && !formData.phone_prefix) {
            const defaultPrefix = prefixes.find(p => p.realCode === '+51') || prefixes[0];
            setFormData(prev => ({ ...prev, phone_prefix: defaultPrefix.realCode }));
        }
    }, [prefixes]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (prefixDropdownRef.current && !prefixDropdownRef.current.contains(event.target)) {
                setPrefixDropdownOpen(false);
            }
            if (vehicleDropdownRef.current && !vehicleDropdownRef.current.contains(event.target)) {
                setVehicleDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await messagesRest.save({ ...formData, type: 'driver' });

            if (!result) throw new Error('Error al enviar el formulario. Por favor, intenta de nuevo.');

            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setFormData({
                    owner_name: '',
                    email: '',
                    phone_prefix: '51',
                    phone: '',
                    license_number: '',
                    vehicle_type: '',
                    plate_number: '',
                });
            }, 2000);
        } catch (err) {
            setError('Error al enviar el formulario. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    // Determine if plate number is required
    const isPlateRequired = formData.vehicle_type === 'moto' || formData.vehicle_type === 'auto';

    // Get selected prefix object
    const selectedPrefix = prefixes?.find(p => p.realCode === formData.phone_prefix) || prefixes?.[0] || { flag: '🇵🇪', beautyCode: '+51', realCode: '+51' };

    // Get selected vehicle object
    const selectedVehicle = vehicleOptions.find(v => v.value === formData.vehicle_type) || { label: 'Selecciona una opción', icon: 'mdi mdi-bike' };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
                <div className="sticky top-0 bg-gradient-to-r from-yellow-400 to-red-600 p-6 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                <Bike className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">Trabaja con Nosotros</h2>
                                <p className="text-white/90">Conviértete en motorizado delivery</p>
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
                            Nos pondremos en contacto contigo para el proceso de selección
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                <User className="w-5 h-5 text-yellow-500" />
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                name="owner_name"
                                value={formData.owner_name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                                placeholder="Tu nombre completo"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                <Mail className="w-5 h-5 text-yellow-500" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div className="space-y-2">
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

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <Bike className="w-5 h-5 text-yellow-500" />
                                    Tipo de Vehículo
                                </label>
                                <div className="relative" ref={vehicleDropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => setVehicleDropdownOpen(!vehicleDropdownOpen)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none bg-white flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={selectedVehicle.icon}></span>
                                            <span>{selectedVehicle.label}</span>
                                        </div>
                                        <svg className={`w-4 h-4 ml-2 transition-transform ${vehicleDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {vehicleDropdownOpen && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                            {vehicleOptions.map((vehicle) => (
                                                <button
                                                    key={vehicle.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, vehicle_type: vehicle.value }));
                                                        setVehicleDropdownOpen(false);
                                                    }}
                                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl flex items-center gap-2"
                                                >
                                                    <span className={vehicle.icon}></span>
                                                    <span>{vehicle.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {(isPlateRequired) && (
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                        <CreditCard className="w-5 h-5 text-yellow-500" />
                                        Número de Placa
                                    </label>
                                    <input
                                        type="text"
                                        name="plate_number"
                                        value={formData.plate_number}
                                        onChange={(e) => {
                                            const cleaned = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                                            setFormData({
                                                ...formData,
                                                plate_number: cleaned,
                                            });
                                        }}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                                        placeholder="Ej: ABC123"
                                    />
                                </div>
                            )}
                        </div>
                        {(formData.vehicle_type === 'moto' || formData.vehicle_type === 'auto') && (
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <CreditCard className="w-5 h-5 text-yellow-500" />
                                    Número de Licencia
                                </label>
                                <input
                                    type="text"
                                    name="license_number"
                                    value={formData.license_number}
                                    onChange={(e) => {
                                        const cleaned = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                                        setFormData({
                                            ...formData,
                                            license_number: cleaned,
                                        });
                                    }}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                                    placeholder="Ej: Q12345678"
                                />
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                                <p className="text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-yellow-400 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? 'Enviando...' : 'Enviar Solicitud'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default DriverModal