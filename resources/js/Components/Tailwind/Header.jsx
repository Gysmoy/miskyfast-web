import React, { useEffect, useState } from "react";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

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
                            className={`p-2 rounded-xl transition-all duration-500 ease-out bg-white/20 backdrop-blur-md ${scrolled ? "scale-90" : "scale-100 group-hover:scale-110"}`}
                            bis_skin_checked="1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`lucide lucide-utensils-crossed w-8 h-8 transition-all duration-500 ease-out ${scrolled ? "text-red-600" : "text-white group-hover:text-yellow-300"}`}
                            >
                                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"></path>
                                <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"></path>
                                <path d="m2.1 21.8 6.4-6.3"></path>
                                <path d="m19 5-7 7"></path>
                            </svg>
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
                        className={`md:hidden p-2 rounded-lg transition-all duration-300 ease-out bg-white/20 backdrop-blur-md text-white hover:scale-110`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-menu w-6 h-6"
                        >
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="4" x2="20" y1="6" y2="6"></line>
                            <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;