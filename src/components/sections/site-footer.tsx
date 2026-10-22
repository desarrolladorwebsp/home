"use client";

import { FirstAid, MapPin, Phone } from "@phosphor-icons/react";

export function SiteFooter() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <a className="footer__logo" href="#" aria-label="Home Medical Clinic, volver al inicio"><FirstAid size={58} weight="fill" aria-hidden="true" /><span>Home<br /><strong>Medical</strong><br />Clinic</span></a>
          <p>Atención domiciliaria con el respaldo de</p>
          <strong className="footer__backing">Grupo Banmédica</strong>
          <small>Experiencia en salud, más cerca de ti.</small>
        </div>

        <nav className="footer__column" aria-label="Servicios"><h2>Servicios</h2><a href="#">Hospitalización domiciliaria</a><a href="#">Rehabilitación domiciliaria</a><a href="#">Enfermería domiciliaria</a><a href="#">Cuidado adulto mayor</a></nav>
        <nav className="footer__column" aria-label="Enlaces"><h2>Enlaces</h2><a href="#">Inicio</a><a href="#">Nosotros</a><a href="#">Servicios</a><a href="#">Blog</a><a href="#contacto">Contacto</a></nav>
        <div className="footer__column footer__contact"><h2>Contacto</h2><a href="tel:+56227502800"><Phone size={18} aria-hidden="true" />+56 2 2750 2800</a><a href="mailto:contacto@hmc.cl">contacto@hmc.cl</a><p><MapPin size={18} aria-hidden="true" />Santiago, Chile</p><span>Lunes a viernes<br />09:00 a 18:00 hrs</span></div>
        <div className="footer__message"><i aria-hidden="true" /><p>Tu salud,<br /><strong>en buenas manos</strong></p></div>
      </div>

      <div className="footer__bottom"><p>© 2026 Home Medical Clinic. Todos los derechos reservados.</p><nav aria-label="Información legal"><a href="#">Política de privacidad</a><a href="#">Términos y condiciones</a></nav><span>Desarrollado por SmartPro</span></div>
    </footer>
  );
}
