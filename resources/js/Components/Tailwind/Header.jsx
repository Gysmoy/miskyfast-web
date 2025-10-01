import React from "react";

const Header = () => {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-orange-500 p-2 rounded-lg">
                            <span className="mdi mdi-truck text-white text-2xl"></span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                            MiskyFast
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#beneficios" className="text-gray-600 hover:text-gray-900 transition font-medium">Beneficios</a>
                        <a href="#como-funciona" className="text-gray-600 hover:text-gray-900 transition font-medium">Cómo Funciona</a>
                        <a href="#registro" className="text-gray-600 hover:text-gray-900 transition font-medium">Únete</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
