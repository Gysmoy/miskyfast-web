import Icon from "@mdi/react";
import {
    mdiChevronRight,
    mdiCellphone
} from "@mdi/js";
import Image1 from './Images/image-1.webp'
import Image2 from './Images/image-2.jpeg'
import Image3 from './Images/image-3.webp'

const Banner = () => {
    return <div id="inicio">
        <section section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-yellow-300" >
            <div class="absolute inset-0 bg-black/20">
            </div>
            <div class="absolute inset-0 opacity-10" style={{
                backgroundImage: "url(/assets/img/main-burger.jpeg)",
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }}>

            </div>
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div class="text-white animate-fade-in-up">
                        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 animate-bounce-slow">
                            <Icon path={mdiCellphone} className="w-4 h-4" />
                            <span class="text-sm font-medium">
                                App disponible pronto
                            </span>
                        </div>
                        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Tu comida favorita
                            <span class="block text-yellow-300 animate-pulse-slow">en minutos</span>
                        </h1>
                        <p class="text-xl sm:text-2xl mb-8 text-white/90 leading-relaxed">
                            Pide rápido, recibe rápido, paga contra entrega. La forma más fácil de disfrutar tu comida favorita.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 mb-12">
                            <button class="group bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-300/50 flex items-center justify-center gap-2">
                                Registra tu Restaurante
                                <Icon path={mdiChevronRight} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button class="group bg-yellow-300 text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/50 flex items-center justify-center gap-2">
                                Trabaja con Nosotros
                                <Icon path={mdiChevronRight} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div class="flex items-center gap-8 text-sm">
                            <div class="flex items-center gap-2">
                                <div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-primary text-xl">
                                    500+
                                </div>
                                <span>Restaurantes</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-primary text-xl">
                                    10k+
                                </div>
                                <span>Pedidos</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-primary text-xl">
                                    4.9
                                </div>
                                <span>Valoración</span>
                            </div>
                        </div>
                    </div>
                    <div class="relative hidden lg:block animate-fade-in-right">
                        <div class="relative w-full h-[600px]">
                            <img src={Image3} alt="Delicious burger" class="absolute top-10 right-20 w-64 h-64 object-cover rounded-3xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 animate-float" />
                            <img src={Image1} alt="Pizza" class="absolute bottom-20 left-10 w-56 h-56 object-cover rounded-3xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 animate-float animation-delay-500" />
                            <img src={Image2} alt="Tacos" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 object-cover rounded-3xl shadow-2xl hover:scale-110 transition-transform duration-500 animate-float animation-delay-1000" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent">
            </div></section >
    </div >
}

export default Banner