import Link from "next/link";
import { FilePdf, FirstAid, LockKey, MapPin, Phone, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { commercialHours, santiagoOffice } from "@/lib/contact-details";
import { contactPhones } from "@/lib/contact-phones";

export function SiteFooter() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <Link className="footer__logo" href="/#inicio" aria-label="Home Medical Clinic, volver al inicio"><FirstAid size={58} weight="fill" aria-hidden="true" /><span>Home<br /><strong>Medical</strong><br />Clinic</span></Link>
          <p>Atención domiciliaria con el respaldo de</p>
          <span className="footer__backing" role="img" aria-label="Empresas Banmédica" />
          <small>Experiencia en salud, más cerca de ti.</small>
        </div>

        <nav className="footer__column" aria-label="Servicios">
          <h2>Servicios</h2>
          <Link href="/servicios#hospitalizacion">Hospitalización domiciliaria</Link>
          <Link href="/servicios#rehabilitacion">Rehabilitación</Link>
          <Link href="/servicios#cuidados">Cuidados a domicilio</Link>
          <Link href="/servicios">Ver todos los servicios</Link>
        </nav>
        <nav className="footer__column" aria-label="Enlaces">
          <h2>Enlaces</h2>
          <Link href="/#inicio">Inicio</Link>
          <Link href="/#como-funciona">Cómo funciona</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
          <Link href="/contacto">Contacto</Link>
          <span className="navigation-pending">Blog <small>Próximamente</small></span>
        </nav>
        <div className="footer__column footer__contact">
          <h2>Contacto</h2>
          <a href={contactPhones.salesMobile.href}><Phone size={18} aria-hidden="true" />{contactPhones.salesMobile.label}</a>
          <a href={contactPhones.landline.href}><Phone size={18} aria-hidden="true" />{contactPhones.landline.label}</a>
          <a href="mailto:contacto@hmc.cl">contacto@hmc.cl</a>
          <p><MapPin size={18} aria-hidden="true" /><span>{santiagoOffice.address}<br />{santiagoOffice.city}</span></p>
          <span>{commercialHours.days}<br />{commercialHours.opens} a {commercialHours.closes} hrs</span>
        </div>
        <div className="footer__message"><i aria-hidden="true" /><p>Tu salud,<br /><strong>en buenas manos</strong></p></div>
      </div>

      <div className="footer__bottom"><p>© 2026 Home Medical Clinic. Todos los derechos reservados.</p><nav aria-label="Información legal"><Link className="footer__ethics" href="/etica-y-cumplimiento"><ShieldCheck size={18} aria-hidden="true" /> Ética y cumplimiento</Link><a className="footer__ethics" href="/pdf/Carta_de_derechos.pdf" target="_blank" rel="noopener noreferrer"><FilePdf size={18} aria-hidden="true" /> Derechos y deberes del paciente</a><Link className="footer__ethics" href="/politicas-y-condiciones"><LockKey size={18} aria-hidden="true" /> Políticas y condiciones</Link></nav><span>Desarrollado por SmartPro</span></div>
    </footer>
  );
}
