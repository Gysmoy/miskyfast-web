import Icon from "@mdi/react";
import {
    mdiMagnify,
    mdiMotorbike,
    mdiCreditCardOutline,
    mdiCheckCircleOutline,
    mdiChevronRight,
} from "@mdi/js";

const HowItWorks = () => {
    return (
        <div id="howitworks">
            <section class="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
                <div class="absolute inset-0 opacity-5">
                    <div
                        class="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"

                    ></div>
                    <div
                        class="absolute bottom-20 right-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"

                    ></div>
                </div>
                <div
                    class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"

                >
                    <div class="text-center mb-16 animate-fade-in-up">
                        <h2 class="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent w-max mx-auto">
                            ¿Cómo Funciona?
                        </h2>
                        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                            Recibe tu comida favorita en 4 simples pasos
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div
                            class="group relative animate-fade-in-up"
                            style={{ animationDelay: "0ms" }}

                        >
                            <div
                                class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"

                            >
                                <div
                                    class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary"

                                ></div>
                                <div
                                    class="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg"

                                >
                                    <Icon path={mdiMagnify} size={2.5} className="text-white" />
                                </div>
                                <div
                                    class="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors"

                                >
                                    1
                                </div>
                                <h3 class="text-2xl font-bold mb-4 text-gray-800 relative z-10">
                                    Busca y Elige
                                </h3>
                                <p class="text-gray-600 leading-relaxed relative z-10">
                                    Explora cientos de restaurantes y elige tu comida favorita en
                                    segundos
                                </p>
                            </div>
                            <div
                                class="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"

                            >
                                <div
                                    class="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full flex items-center justify-center animate-pulse"

                                >
                                    <Icon path={mdiChevronRight} size={1} className="text-white" />
                                </div>
                            </div>
                        </div>
                        <div
                            class="group relative animate-fade-in-up"
                            style={{ animationDelay: "200ms" }}

                        >
                            <div
                                class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"

                            >
                                <div
                                    class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-500"

                                ></div>
                                <div
                                    class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg"

                                >
                                    <Icon path={mdiMotorbike} size={2.5} className="text-white" />
                                </div>
                                <div
                                    class="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors"

                                >
                                    2
                                </div>
                                <h3 class="text-2xl font-bold mb-4 text-gray-800 relative z-10">
                                    Motorizado en Camino
                                </h3>
                                <p class="text-gray-600 leading-relaxed relative z-10">
                                    Nuestro motorizado recoge tu pedido y lo lleva directamente a
                                    tu puerta
                                </p>
                            </div>
                            <div
                                class="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"

                            >
                                <div
                                    class="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full flex items-center justify-center animate-pulse"

                                >
                                    <Icon path={mdiChevronRight} size={1} className="text-white" />
                                </div>
                            </div>
                        </div>
                        <div
                            class="group relative animate-fade-in-up"
                            style={{ animationDelay: "400ms" }}

                        >
                            <div
                                class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"

                            >
                                <div
                                    class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-red-700"

                                ></div>
                                <div
                                    class="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg"

                                >
                                    <Icon path={mdiCreditCardOutline} size={2.5} className="text-white" />
                                </div>
                                <div
                                    class="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors"

                                >
                                    3
                                </div>
                                <h3 class="text-2xl font-bold mb-4 text-gray-800 relative z-10">
                                    Paga Contra Entrega
                                </h3>
                                <p class="text-gray-600 leading-relaxed relative z-10">
                                    Sin complicaciones, paga en efectivo cuando recibas tu pedido
                                </p>
                            </div>
                            <div
                                class="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"

                            >
                                <div
                                    class="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full flex items-center justify-center animate-pulse"

                                >
                                    <Icon path={mdiChevronRight} size={1} className="text-white" />
                                </div>
                            </div>
                        </div>
                        <div
                            class="group relative animate-fade-in-up"
                            style={{ animationDelay: "600ms" }}

                        >
                            <div
                                class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"

                            >
                                <div
                                    class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 to-yellow-600"

                                ></div>
                                <div
                                    class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg"

                                >
                                    <Icon path={mdiCheckCircleOutline} size={2.5} className="text-white" />
                                </div>
                                <div
                                    class="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors"

                                >
                                    4
                                </div>
                                <h3 class="text-2xl font-bold mb-4 text-gray-800 relative z-10">
                                    Disfruta
                                </h3>
                                <p class="text-gray-600 leading-relaxed relative z-10">
                                    Relájate y disfruta de tu comida caliente y deliciosa
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="mt-16 text-center animate-fade-in-up animation-delay-800"

                    >
                        <div
                            class="inline-block bg-gradient-to-r from-red-600 to-yellow-400 p-1 rounded-2xl shadow-xl"

                        >
                            <div class="bg-white rounded-2xl px-8 py-6">
                                <p class="text-2xl font-bold text-gray-800">
                                    Tiempo promedio de entrega:
                                    <span class="text-red-600">25-35 minutos</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
