import Icon from "@mdi/react";
import { mdiStoreOutline } from "@mdi/js";

const Brands = () => {
    const brands = [
        { icon: '🍔', name: 'Burger King' },
        { icon: '🍕', name: 'Pizza Hut' },
        { icon: '🍗', name: 'KFC' },
        { icon: '🌮', name: 'Taco Bell' },
        { icon: '🥪', name: 'Subway' },
        { icon: '🍕', name: 'Dominos' },
        { icon: '🍔', name: 'McDonalds' },
        { icon: '🍗', name: 'Popeyes' },
        { icon: '🌶️', name: 'Chilis' },
        { icon: '☕', name: 'Starbucks' },
        { icon: '🍩', name: 'Dunkin' },
        { icon: '🍔', name: 'Wendys' },
    ];

    // Duplicate to enable infinite scroll
    const duplicated = [...brands, ...brands];

    return (
        <section className="py-16 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="text-center animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full mb-4">
                        <Icon path={mdiStoreOutline} size={1} className="w-5 h-5" />
                        <span className="font-bold">Marcas Asociadas</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                        Trabajamos con las Mejores Marcas
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Más de 500 restaurantes confían en nosotros
                    </p>
                </div>

                <div className="relative py-10 overflow-hidden">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    {/* Infinite horizontal scroll container */}
                    <div className="overflow-visible">
                        {/* Pause on hover */}
                        <div className="flex animate-scroll-infinite hover:[animation-play-state:paused]">
                            {duplicated.map((b, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 mx-6 group cursor-default"
                                    style={{ width: '200px' }}
                                >
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="text-5xl group-hover:scale-125 transition-transform duration-300">
                                                {b.icon}
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">
                                                    {b.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-infinite {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-scroll-infinite {
                    display: flex;
                    animation: scroll-infinite 30s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Brands