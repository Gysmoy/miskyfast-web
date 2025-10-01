import React from "react";

const Footer = ({ }) => {
    return <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-orange-500 p-2 rounded-lg">
                            <span className="mdi mdi-truck text-white text-2xl leading-none"></span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">MiskyFast</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Conectamos restaurantes, clientes y repartidores para hacer el delivery más rápido y eficiente.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Contacto</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <span className="mdi mdi-phone text-gray-400 text-base leading-none"></span>
                            <span className="text-gray-600 text-sm">+51 999 888 777</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="mdi mdi-email text-gray-400 text-base leading-none"></span>
                            <span className="text-gray-600 text-sm">contacto@miskyfast.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="mdi mdi-map-marker text-gray-400 text-base leading-none"></span>
                            <span className="text-gray-600 text-sm">Lima, Perú</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Síguenos</h3>
                    <div className="flex space-x-3">
                        <a href="#" className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
                            <span className="mdi mdi-facebook text-gray-600 text-xl leading-none"></span>
                        </a>
                        <a href="#" className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
                            <span className="mdi mdi-instagram text-gray-600 text-xl leading-none"></span>
                        </a>
                        <a href="#" className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
                            <span className="mdi mdi-twitter text-gray-600 text-xl leading-none"></span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 mt-10 pt-8 text-center">
                <p className="text-gray-500 text-sm">&copy; 2025 MiskyFast. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
};

export default Footer;
