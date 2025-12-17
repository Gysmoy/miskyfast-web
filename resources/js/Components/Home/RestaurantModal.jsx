import { useState } from 'react';
import { X, Store, User, Mail, Phone, MapPin, Utensils, CheckCircle } from 'lucide-react';


const RestaurantModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        restaurant_name: '',
        owner_name: '',
        email: '',
        phone: '',
        address: '',
        cuisine_type: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            //   const { error: submitError } = await supabase
            //     .from('restaurant_registrations')
            //     .insert([formData]);

            //   if (submitError) throw submitError;

            //   setSuccess(true);
            //   setTimeout(() => {
            //     onClose();
            //     setSuccess(false);
            //     setFormData({
            //       restaurant_name: '',
            //       owner_name: '',
            //       email: '',
            //       phone: '',
            //       address: '',
            //       cuisine_type: '',
            //     });
            //   }, 2000);
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

    if (!isOpen) return null;

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

                        <div className="grid md:grid-cols-2 gap-6">
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

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <Phone className="w-5 h-5 text-red-600" />
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                                    placeholder="+51 999 999 999"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                <MapPin className="w-5 h-5 text-red-600" />
                                Dirección del Restaurante
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                                placeholder="Dirección completa"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-gray-700 font-semibold">
                                <Utensils className="w-5 h-5 text-red-600" />
                                Tipo de Cocina
                            </label>
                            <select
                                name="cuisine_type"
                                value={formData.cuisine_type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="hamburguesas">Hamburguesas</option>
                                <option value="pollo">Pollo a la Brasa</option>
                                <option value="pizza">Pizza</option>
                                <option value="tacos">Tacos y Comida Mexicana</option>
                                <option value="parrilla">Parrilla</option>
                                <option value="comida_rapida">Comida Rápida</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                                <p className="text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-red-600 to-yellow-400 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? 'Enviando...' : 'Registrar Restaurante'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default RestaurantModal