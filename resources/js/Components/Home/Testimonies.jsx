import Icon from '@mdi/react';
import { mdiFormatQuoteClose, mdiFormatQuoteOpen, mdiStar, mdiStarOutline } from '@mdi/js';

const Testimonies = ({ items }) => {

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
        {
          items.map((testimony) => {
            return <div key={testimony.id} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0ms' }} bis_skin_checked="1">
              <div className="flex items-center gap-4 mb-6" bis_skin_checked="1">
                <img src={`/api/testimonies/media/${testimony.image || 'undefined'}`} alt="María González" className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-400"
                onError={e => e.target.src = '/api/profile/thumbnail/undefined'} />
                <div bis_skin_checked="1">
                  <h4 className="font-bold text-gray-800 text-lg">{testimony.name}</h4>
                  <p className="text-gray-600 text-sm">{testimony.position}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4" bis_skin_checked="1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    path={i < testimony.rating ? mdiStar : mdiStarOutline}
                    size={1}
                    className="text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed italic">"{testimony.description}"</p>
              <div className="absolute top-4 right-4 opacity-10" bis_skin_checked="1">
                <Icon path={mdiFormatQuoteClose} size={4} className="text-red-600" />
              </div>
            </div>
          })
        }
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
