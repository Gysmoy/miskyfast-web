import { useState } from 'react';
import { X, Bike, User, Mail, Phone, CreditCard, CheckCircle } from 'lucide-react';
// import { supabase } from '../lib/supabase';

const DriverModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        license_number: '',
        vehicle_type: '',
        has_vehicle: true,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // const { error: submitError } = await supabase
            //     .from('driver_registrations')
            //     .insert([formData]);

            // if (submitError) throw submitError;

            // setSuccess(true);
            // setTimeout(() => {
            //     onClose();
            //     setSuccess(false);
            //     setFormData({
            //         full_name: '',
            //         email: '',
            //         phone: '',
            //         license_number: '',
            //         vehicle_type: '',
            //         has_vehicle: true,
            //     });
            // }, 2000);
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
                        <div className="bg-gradient-to-r from-yellow-50 to-red-50 p-6 rounded-2xl border-2 border-yellow-200">
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Beneficios:</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                    Gana hasta $1,500 mensuales
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                    Horarios flexibles
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                    Bonos por rendimiento
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                <User className="w-5 h-5 text-yellow-500" />
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                                placeholder="Tu nombre completo"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
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
                                    <Phone className="w-5 h-5 text-yellow-500" />
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                                    placeholder="+51 999 999 999"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                <CreditCard className="w-5 h-5 text-yellow-500" />
                                Número de Licencia
                            </label>
                            <input
                                type="text"
                                name="license_number"
                                value={formData.license_number}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                                placeholder="Ej: Q12345678"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                <Bike className="w-5 h-5 text-yellow-500" />
                                Tipo de Vehículo
                            </label>
                            <select
                                name="vehicle_type"
                                value={formData.vehicle_type}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="moto">Motocicleta</option>
                                <option value="bicicleta">Bicicleta</option>
                                <option value="scooter">Scooter Eléctrico</option>
                                <option value="auto">Auto</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                            <input
                                type="checkbox"
                                name="has_vehicle"
                                checked={formData.has_vehicle}
                                onChange={handleChange}
                                className="w-5 h-5 text-yellow-500 rounded focus:ring-2 focus:ring-yellow-200"
                            />
                            <label className="text-gray-700 font-medium">
                                Tengo vehículo propio
                            </label>
                        </div>

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