import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
    mdiMenu,
    mdiClose,
    mdiSilverwareForkKnife
} from "@mdi/js";
import Global from "../../Utils/Global";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-5"}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8" bis_skin_checked="1">
                <div className="flex items-center justify-between" bis_skin_checked="1">
                    {/* Logo con rebote */}
                    <div className="flex items-center gap-3 group cursor-pointer" bis_skin_checked="1">
                        <div
                            className={`p-2 rounded-xl transition-all duration-300 ${scrolled ? "bg-primary" : "bg-white/20 backdrop-blur-md"} ${scrolled ? "scale-90" : "scale-100 group-hover:scale-110"}`}
                            bis_skin_checked="1"
                        >
                            <img src="/assets/img/isotipo.svg" alt={Global.APP_NAME} className="h-8" />
                        </div>
                        <div bis_skin_checked="1">
                            <h1
                                className={`text-2xl font-bold transition-all duration-500 ease-out ${scrolled
                                    ? "bg-gradient-to-r from-red-600 to-yellow-400 bg-clip-text text-transparent"
                                    : "text-white group-hover:text-yellow-300"}`}
                            >
                                Misky Fast
                            </h1>
                            <p
                                className={`text-xs transition-all duration-500 ease-out ${scrolled ? "text-gray-600" : "text-white/90 group-hover:text-white"}`}
                            >
                                Delivery de Comida
                            </p>
                        </div>
                    </div>

                    {/* Navegación con rebote */}
                    <nav className="hidden md:flex items-center gap-8">
                        {["Inicio", "Cómo Funciona", "Categorías", "Testimonios"].map((label) => (
                            <button
                                key={label}
                                className={`font-medium transition-all duration-300 ease-out hover:scale-110 ${scrolled ? "text-gray-700 hover:text-red-600" : "text-white hover:text-yellow-300"}`}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* Botones con rebote */}
                    <div className="hidden md:flex items-center gap-4" bis_skin_checked="1">
                        <button
                            className={`px-6 py-2 rounded-full font-bold transition-all duration-500 ease-out transform hover:scale-110 ${scrolled
                                ? "bg-gradient-to-r from-red-600 to-yellow-400 text-white shadow-lg"
                                : "bg-white text-red-600 shadow-xl hover:shadow-2xl"}`}
                        >
                            Restaurantes
                        </button>
                        <button
                            className={`px-6 py-2 rounded-full font-bold transition-all duration-500 ease-out transform hover:scale-110 ${scrolled
                                ? "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                : "border-2 border-white text-white hover:bg-white hover:text-red-600"}`}
                        >
                            Motorizados
                        </button>
                    </div>

                    {/* Menú móvil con rebote */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "bg-gray-100 text-gray-700" : "bg-white/20 backdrop-blur-md text-white hover:scale-110"}`}
                    >
                        <Icon path={menuOpen ? mdiClose : mdiMenu} size={1} />
                    </button>
                </div>
                {
                    menuOpen && <div className={`md:hidden mt-4 p-6 bg-white rounded-2xl animate-scale-in ${scrolled ? "" : "shadow-2xl"}`} bis_skin_checked="1">
                        <nav class="flex flex-col gap-4 mb-4">
                            <button class="text-left text-gray-700 font-medium hover:text-red-600 transition-colors py-2">Inicio</button>
                            <button class="text-left text-gray-700 font-medium hover:text-red-600 transition-colors py-2">Cómo Funciona</button>
                            <button class="text-left text-gray-700 font-medium hover:text-red-600 transition-colors py-2">Categorías</button>
                            <button class="text-left text-gray-700 font-medium hover:text-red-600 transition-colors py-2">Testimonios</button>
                        </nav>
                        <div class="flex flex-col gap-3 pt-4 border-t" bis_skin_checked="1">
                            <button class="w-full bg-gradient-to-r from-red-600 to-yellow-400 text-white py-3 rounded-full font-bold">Registra tu Restaurante</button>
                            <button class="w-full border-2 border-red-600 text-red-600 py-3 rounded-full font-bold">Trabaja con Nosotros</button>
                        </div>
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;