import Icon from "@mdi/react";
import {
    mdiChevronRight,
    mdiCellphone
} from "@mdi/js";
import Image1 from './Images/image-1.webp'
import Image2 from './Images/image-2.jpeg'
import Image3 from './Images/image-3.webp'

const Banner = ({ onOpenRestaurantForm, onOpenDriverForm }) => {
    return <div id="home">
        <section section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-yellow-300" >
            <div className="absolute inset-0 bg-black/20">
            </div>
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "url(/assets/img/backgrounds/main-burger.jpeg)",
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }}>

            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white animate-fade-in-up">
                        <a href="https://expo.dev/artifacts/eas/FyaApcDf82P3CmPSxYJ3P.apk"
                            className="inline-flex animate-bounce animate-duration-[2500ms] items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 animate-bounce-slow" >
                            <Icon path={mdiCellphone} className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                ¡Descarga la app aquí!
                            </span>
                        </a>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Tu comida favorita
                            <span className="block text-yellow-300 animate-pulse-slow">en minutos</span>
                        </h1>
                        <p className="text-xl sm:text-2xl mb-8 text-white/90 leading-relaxed">
                            Pide rápido, recibe rápido, paga contra entrega. La forma más fácil de disfrutar tu comida favorita.
                        </p>
                        <div className="flex flex-wrap flex-col sm:flex-row gap-4 mb-12">
                            <button className="group bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-300/50 flex items-center justify-center gap-2" onClick={onOpenRestaurantForm}>
                                Registra tu Restaurante
                                <Icon path={mdiChevronRight} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="group bg-yellow-300 text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/50 flex items-center justify-center gap-2" onClick={onOpenDriverForm}>
                                Trabaja con Nosotros
                                <Icon path={mdiChevronRight} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-primary text-xl">
                                    500+
                                </div>
                                <span>Restaurantes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-primary text-xl">
                                    10k+
                                </div>
                                <span>Pedidos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center font-bold text-primary text-xl">
                                    4.9
                                </div>
                                <span>Valoración</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden lg:block animate-fade-in-right">
                        <div className="relative w-full h-[600px]">
                            <img src={Image3} alt="Hamburguesa con palito" className="absolute animate-bounce animate-duration-[5000ms] top-10 right-20 w-64 h-64 object-cover rounded-3xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 animate-float" />
                            <img src={Image1} alt="Tacos" className="absolute animate-bounce animate-duration-[5000ms] bottom-20 left-10 w-56 h-56 object-cover rounded-3xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 animate-float animation-delay-500" />
                            <img src={Image2} alt="Hamburguesa Clásica" className="absolute animate-bounce animate-duration-[5000ms] animate-delay-1000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 object-cover rounded-3xl shadow-2xl hover:scale-110 transition-transform duration-500 animate-float animation-delay-1000" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>
    </div>
}

export default Banner