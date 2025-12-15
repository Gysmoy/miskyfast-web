import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';
import Banner from './Components/Home/Banner';
import HowItWorks from './Components/Home/HowItWorks';
import Categories from './Components/Home/Categories';
import Testimonies from './Components/Home/Testimonies';

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

  return <>
    <Banner />

    <HowItWorks />

    <Categories />

    <Testimonies />

    <section class="py-16 bg-white relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8" bis_skin_checked="1">
        <div class="text-center mb-12 animate-fade-in-up" bis_skin_checked="1">
          <div class="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-yellow-400 text-white px-6 py-3 rounded-full mb-4" bis_skin_checked="1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store w-5 h-5"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path></svg>
            <span class="font-bold">Marcas Asociadas
            </span>
          </div><h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Trabajamos con las Mejores Marcas</h2><p class="text-gray-600 text-lg">Más de 500 restaurantes confían en nosotros</p>
        </div>
        <div class="relative" bis_skin_checked="1">
          <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" bis_skin_checked="1">

          </div>
          <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" bis_skin_checked="1">

          </div>
          <div class="overflow-hidden" bis_skin_checked="1">
            <div class="flex animate-scroll-infinite" bis_skin_checked="1">
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍔

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Burger King</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍕

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Pizza Hut</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍗

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">KFC</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🌮

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Taco Bell</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🥪

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Subway</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍕

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Dominos</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍔

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">McDonalds</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍗

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Popeyes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🌶️

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Chilis</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">☕

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Starbucks</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍩

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Dunkin</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍔

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Wendys</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍔

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Burger King</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍕

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Pizza Hut</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍗

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">KFC</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🌮

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Taco Bell</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🥪

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Subway</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍕

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Dominos</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍔

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">McDonalds</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍗

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Popeyes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🌶️

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Chilis</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">☕

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Starbucks</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍩

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Dunkin</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0 mx-6 group" style={{ width: '200px' }} bis_skin_checked="1">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-gray-100 group-hover:border-red-300" bis_skin_checked="1">
                  <div class="flex flex-col items-center justify-center gap-3" bis_skin_checked="1">
                    <div class="text-5xl group-hover:scale-125 transition-transform duration-300" bis_skin_checked="1">🍔

                    </div>
                    <div class="text-center" bis_skin_checked="1"><p class="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">Wendys</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 text-center" bis_skin_checked="1"><p class="text-gray-600 mb-6">¿Tienes un restaurante? Únete a nuestra red de partners</p>
          <div class="flex justify-center gap-8 flex-wrap" bis_skin_checked="1">
            <div class="flex items-center gap-2 text-gray-700" bis_skin_checked="1">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse" bis_skin_checked="1">

              </div>
              <span class="font-medium">Comisiones Competitivas
              </span>
            </div>
            <div class="flex items-center gap-2 text-gray-700" bis_skin_checked="1">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse" bis_skin_checked="1">

              </div>
              <span class="font-medium">Soporte 24/7
              </span>
            </div>
            <div class="flex items-center gap-2 text-gray-700" bis_skin_checked="1">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse" bis_skin_checked="1">

              </div>
              <span class="font-medium">Sin Costos Iniciales
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})