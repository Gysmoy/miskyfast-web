import React from "react";
import Icon from "@mdi/react";
import {
  mdiFacebook,
  mdiInstagram,
  mdiTwitter,
  mdiYoutube,
  mdiFileDocumentOutline,
  mdiBookOutline,
  mdiMapMarker,
  mdiPhone,
  mdiEmail,
  mdiSilverwareForkKnife,
} from "@mdi/js";
import Global from "../../Utils/Global";

const Footer = ({ }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl">
                <img src="/assets/img/isotipo.svg" alt={Global.APP_NAME} className="h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Misky Fast</h3>
                <p className="text-gray-400 text-sm">Delivery de Comida</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              La forma más rápida y confiable de recibir tu comida favorita. Paga contra entrega y disfruta.
            </p>
            <div className="flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-red-600 p-2 rounded-full transition"
              >
                <Icon path={mdiFacebook} size={1} className="text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-red-600 p-2 rounded-full transition"
              >
                <Icon path={mdiInstagram} size={1} className="text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-red-600 p-2 rounded-full transition"
              >
                <Icon path={mdiTwitter} size={1} className="text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-red-600 p-2 rounded-full transition"
              >
                <Icon path={mdiYoutube} size={1} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition">Inicio</a>
              </li>
              <li>
                <a href="#howitworks" className="text-gray-400 hover:text-white transition">Cómo Funciona</a>
              </li>
              <li>
                <a href="#categories" className="text-gray-400 hover:text-white transition">Categorías</a>
              </li>
              <li>
                <a href="#testimonies" className="text-gray-400 hover:text-white transition">Testimonios</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#terminos" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <Icon path={mdiFileDocumentOutline} size={0.9} className="text-red-600" />
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#privacidad" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <Icon path={mdiFileDocumentOutline} size={0.9} className="text-red-600" />
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#reclamaciones" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <Icon path={mdiBookOutline} size={0.9} className="text-red-600" />
                  Libro de Reclamaciones
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <Icon path={mdiFileDocumentOutline} size={0.9} className="text-red-600" />
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <Icon path={mdiMapMarker} size={1} className="text-red-600 mt-1" />
                <span>Av. Principal 123, Lima, Perú</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Icon path={mdiPhone} size={1} className="text-red-600" />
                <a href="tel:+51999999999" className="hover:text-white transition">+51 999 999 999</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Icon path={mdiEmail} size={1} className="text-red-600" />
                <a href="mailto:contacto@miskyfast.com" className="hover:text-white transition">contacto@miskyfast.com</a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">Horario de Atención</p>
              <p className="text-white font-semibold">24/7 - Todos los días</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            2025 Misky Fast &copy;.
            Todos los derechos reservados.
            Powered by <a href="https://mundoweb.pe" className="text-white hover:text-yellow-400 transition">Mundo Web</a>
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <a href="#terminos" className="hover:text-white transition">Términos</a>
            <a href="#privacidad" className="hover:text-white transition">Privacidad</a>
            <a href="#reclamaciones" className="hover:text-white transition">Reclamaciones</a>
          </div>
        </div>

        <div className="pb-6 text-center">
          <a
            href="#reclamaciones"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold transition"
          >
            <Icon path={mdiBookOutline} size={0.9} />
            Libro de Reclamaciones Online
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
