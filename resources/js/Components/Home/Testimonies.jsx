import Icon from '@mdi/react';
import { mdiFormatQuoteClose, mdiFormatQuoteOpen, mdiStar, mdiStarOutline } from '@mdi/js';

const Testimonies = () => {

  return <section id="testimonies" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
    <div className="absolute inset-0 opacity-5" bis_skin_checked="1">
      <div className="absolute top-20 left-20 w-96 h-96 bg-red-500 rounded-full blur-3xl" bis_skin_checked="1">
      </div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" bis_skin_checked="1">
      </div>
    </div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" bis_skin_checked="1">
      <div className="text-center mb-16 animate-fade-in-up" bis_skin_checked="1">
        <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">Lo Que Dicen Nuestros Clientes</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Miles de personas confían en nosotros cada día</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" bis_skin_checked="1">
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0ms' }} bis_skin_checked="1">
          <div className="flex items-center gap-4 mb-6" bis_skin_checked="1">
            <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=300" alt="María González" className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-400" />
            <div bis_skin_checked="1">
              <h4 className="font-bold text-gray-800 text-lg">María González</h4>
              <p className="text-gray-600 text-sm">Cliente Frecuente</p>
            </div>
          </div>
          <div className="flex gap-1 mb-4" bis_skin_checked="1">
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
          </div>
          <p className="text-gray-700 leading-relaxed italic">"El servicio es increíble. Siempre llega caliente y a tiempo. Los motorizados son muy amables y profesionales."</p>
          <div className="absolute top-4 right-4 opacity-10" bis_skin_checked="1">
            <Icon path={mdiFormatQuoteClose} size={4} className="text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '100ms' }} bis_skin_checked="1">
          <div className="flex items-center gap-4 mb-6" bis_skin_checked="1">
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=300" alt="Carlos Ramírez" className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-400" />
            <div bis_skin_checked="1">
              <h4 className="font-bold text-gray-800 text-lg">Carlos Ramírez</h4>
              <p className="text-gray-600 text-sm">Dueño de Restaurante</p>
            </div>
          </div>
          <div className="flex gap-1 mb-4" bis_skin_checked="1">
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
          </div>
          <p className="text-gray-700 leading-relaxed italic">"Desde que me asocié con Misky Fast, mis ventas aumentaron un 40%. La plataforma es fácil de usar y el apoyo es excelente."</p>
          <div className="absolute top-6 right-6 opacity-10" bis_skin_checked="1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-quote w-12 h-12 text-red-600"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '200ms' }} bis_skin_checked="1">
          <div className="flex items-center gap-4 mb-6" bis_skin_checked="1">
            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=300" alt="Ana Torres" className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-400" />
            <div bis_skin_checked="1">
              <h4 className="font-bold text-gray-800 text-lg">Ana Torres</h4>
              <p className="text-gray-600 text-sm">Clienta</p>
            </div>
          </div>
          <div className="flex gap-1 mb-4" bis_skin_checked="1">
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
          </div>
          <p className="text-gray-700 leading-relaxed italic">"Me encanta poder pagar contra entrega. Es muy conveniente y seguro. Definitivamente mi app favorita de delivery."</p>
          <div className="absolute top-6 right-6 opacity-10" bis_skin_checked="1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-quote w-12 h-12 text-red-600"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '300ms' }} bis_skin_checked="1">
          <div className="flex items-center gap-4 mb-6" bis_skin_checked="1">
            <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=300" alt="Roberto Silva" className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-400" />
            <div bis_skin_checked="1">
              <h4 className="font-bold text-gray-800 text-lg">Roberto Silva</h4>
              <p className="text-gray-600 text-sm">Motorizado</p>
            </div>
          </div>
          <div className="flex gap-1 mb-4" bis_skin_checked="1">
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
          </div>
          <p className="text-gray-700 leading-relaxed italic">"Trabajo flexible y buenos ingresos. La app es intuitiva y el sistema de bonos es motivador. Muy contento con Misky Fast."</p>
          <div className="absolute top-6 right-6 opacity-10" bis_skin_checked="1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-quote w-12 h-12 text-red-600"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '400ms' }} bis_skin_checked="1">
          <div className="flex items-center gap-4 mb-6" bis_skin_checked="1">
            <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=300" alt="Lucía Medina" className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-400" />
            <div bis_skin_checked="1">
              <h4 className="font-bold text-gray-800 text-lg">Lucía Medina</h4>
              <p className="text-gray-600 text-sm">Cliente</p>
            </div>
          </div>
          <div className="flex gap-1 mb-4" bis_skin_checked="1">
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStarOutline} size={1} className="text-yellow-400" />
          </div>
          <p className="text-gray-700 leading-relaxed italic">"La variedad de restaurantes es impresionante. Siempre encuentro algo nuevo para probar. El servicio es de primera."</p>
          <div className="absolute top-6 right-6 opacity-10" bis_skin_checked="1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-quote w-12 h-12 text-red-600"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '500ms' }} bis_skin_checked="1">
          <div className="flex items-center gap-4 mb-6" bis_skin_checked="1">
            <img src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=300" alt="Diego Vargas" className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-400" />
            <div bis_skin_checked="1">
              <h4 className="font-bold text-gray-800 text-lg">Diego Vargas</h4>
              <p className="text-gray-600 text-sm">Dueño de Restaurante</p>
            </div>
          </div>
          <div className="flex gap-1 mb-4" bis_skin_checked="1">
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
            <Icon path={mdiStar} size={1} className="text-yellow-400" />
          </div>
          <p className="text-gray-700 leading-relaxed italic">"La mejor decisión fue unirme a esta plataforma. El proceso fue muy simple y ahora llego a más clientes cada día."</p>
          <div className="absolute top-6 right-6 opacity-10" bis_skin_checked="1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-quote w-12 h-12 text-red-600"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center animate-fade-in-up animation-delay-600" bis_skin_checked="1">
        <div className="inline-block bg-white rounded-2xl shadow-xl p-8" bis_skin_checked="1">
          <div className="flex items-center justify-center gap-12 flex-wrap" bis_skin_checked="1">
            <div className="text-center" bis_skin_checked="1">
              <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-400 bg-clip-text text-transparent mb-2" bis_skin_checked="1">50,000+
              </div><p className="text-gray-600 font-medium">Clientes Felices</p>
            </div>
            <div className="text-center" bis_skin_checked="1">
              <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-400 bg-clip-text text-transparent mb-2" bis_skin_checked="1">4.9/5
              </div><p className="text-gray-600 font-medium">Valoración</p>
            </div>
            <div className="text-center" bis_skin_checked="1">
              <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-400 bg-clip-text text-transparent mb-2" bis_skin_checked="1">98%
              </div><p className="text-gray-600 font-medium">Satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
};

export default Testimonies;
