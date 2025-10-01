import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import { Phone, Mail, MapPin, Truck, Store, Users, Clock, TrendingUp, Zap, CheckCircle } from 'lucide-react';

const Home = ({ ...props }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    userType: 'restaurant'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('¡Gracias por tu interés! Te contactaremos pronto.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-gray-700 font-medium text-sm">La plataforma #1 de delivery</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Haz crecer tu restaurante con pedidos online
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Conecta tu restaurante con miles de clientes o gana dinero repartiendo en tu tiempo libre.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#registro"
                  onClick={() => setFormData({ ...formData, userType: 'restaurant' })}
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
                  <Store className="w-5 h-5 mr-2" />
                  Soy Restaurante
                </a>
                <a href="#registro"
                  onClick={() => setFormData({ ...formData, userType: 'repartidor' })}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-medium rounded-lg border-2 border-gray-200 hover:border-gray-300 transition">
                  <Truck className="w-5 h-5 mr-2" />
                  Soy Repartidor
                </a>
              </div>

              <div className="flex items-center gap-12 pt-8 border-t border-gray-100">
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-500">Restaurantes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-500">Pedidos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">200+</div>
                  <div className="text-sm text-gray-500">Repartidores</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <Store className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Pizzería Roma</div>
                        <div className="text-sm text-gray-500">Pedido #1234</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <Truck className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">En camino</span>
                      </div>
                      <div className="text-orange-500 font-semibold">15 min</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">124 clientes activos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir MiskyFast?
            </h2>
            <p className="text-lg text-gray-600">
              Beneficios diseñados para impulsar tu negocio o tus ingresos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Más ventas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Incrementa tus ventas sin comisiones iniciales. Solo pagas por éxito.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tiempo real</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Recibe y gestiona pedidos instantáneamente desde tu panel web.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Gana repartiendo</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Gana dinero en tu tiempo libre. Tú decides cuándo y cuánto trabajar.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Red amplia</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Accede a miles de clientes y repartidores en tu zona.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-gray-600">
              Simple, rápido y eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-orange-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Regístrate</h3>
              <p className="text-gray-600 leading-relaxed">
                Completa el formulario en menos de 2 minutos. Sin complicaciones.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Configura</h3>
              <p className="text-gray-600 leading-relaxed">
                Sube tu menú o activa tu perfil de repartidor. Todo desde tu celular.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Empieza a ganar</h3>
              <p className="text-gray-600 leading-relaxed">
                Recibe pedidos o reparte. El dinero llega directo a tu cuenta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registro" className="py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Únete a MiskyFast hoy
                </h2>
                <p className="text-gray-600">
                  Comienza a crecer en minutos
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Nombre completo o empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="Ej: Restaurante El Buen Sabor"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="+51 999 999 999"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3 text-sm">
                    Quiero unirme como:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="restaurant"
                        checked={formData.userType === 'restaurant'}
                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                        className="sr-only"
                      />
                      <div className={`p-5 rounded-lg border-2 transition ${formData.userType === 'restaurant'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}>
                        <Store className={`w-7 h-7 mx-auto mb-2 ${formData.userType === 'restaurant' ? 'text-orange-500' : 'text-gray-400'
                          }`} />
                        <span className={`block text-center font-medium ${formData.userType === 'restaurant' ? 'text-gray-900' : 'text-gray-600'
                          }`}>Restaurante</span>
                      </div>
                    </label>

                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="repartidor"
                        checked={formData.userType === 'repartidor'}
                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                        className="sr-only"
                      />
                      <div className={`p-5 rounded-lg border-2 transition ${formData.userType === 'repartidor'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}>
                        <Truck className={`w-7 h-7 mx-auto mb-2 ${formData.userType === 'repartidor' ? 'text-orange-500' : 'text-gray-400'
                          }`} />
                        <span className={`block text-center font-medium ${formData.userType === 'repartidor' ? 'text-gray-900' : 'text-gray-600'
                          }`}>Repartidor</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-medium py-4 px-8 rounded-lg hover:bg-orange-600 transition flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Quiero unirme a MiskyFast</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})