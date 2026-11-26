import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Clock, DeviceMobile, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { commercialHours } from "@/lib/contact-details";
import { contactPhone } from "@/lib/contact-phones";
import { AgreementsSection } from "@/components/sections/agreements-section";
import { EvaluationSection } from "@/components/sections/evaluation-section";
import motion from "@/components/hero-motion.module.css";
import { OfficeDirectory } from "./office-directory";
import { pageMetadata } from "@/lib/site-seo";
import styles from "./page.module.css";

export const metadata = pageMetadata("/contacto");

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section data-replay className={styles.hero} aria-labelledby="contact-page-title">
        <div className={styles.heroInner}>
          <div className={`${styles.heroCopy} ${motion.intro}`}>
            <h1 id="contact-page-title">¿Cómo podemos <span>ayudarte?</span></h1>
            <p className={styles.lead}>Cotiza atención domiciliaria, comparte tu experiencia o postula a nuestro equipo.</p>
            <nav aria-label="Accesos de contacto" className={`${styles.heroActions} ${motion.actions}`}>
              <a className={`${styles.callLink} ${motion.interactive}`} href={contactPhone.href}>Llamar <Phone size={20} aria-hidden="true" /></a>
              <a className={`${styles.primary} ${motion.interactive} ${motion.down}`} href="#contacto">Ir al formulario <ArrowDown size={18} aria-hidden="true" /></a>
              <a className={`${styles.officeLink} ${motion.interactive}`} href="#oficinas">Ver oficina <MapPin size={18} aria-hidden="true" /></a>
            </nav>
            <section className={styles.channels} aria-label="Ventas y consultas comerciales">
              <ul className={`${styles.channelList} ${motion.stagger}`}>
                <li>
                  <a className={motion.interactive} href={contactPhone.href}>
                    <span className={styles.channelIcon}><DeviceMobile size={22} weight="duotone" aria-hidden="true" /></span>
                    <span><small>Celular de ventas</small>{contactPhone.label}</span>
                  </a>
                </li>
                <li>
                  <a className={motion.interactive} href="mailto:contacto@hmc.cl">
                    <span className={styles.channelIcon}><EnvelopeSimple size={22} weight="duotone" aria-hidden="true" /></span>
                    <span><small>Correo electrónico</small>contacto@hmc.cl</span>
                  </a>
                </li>
              </ul>
              <p className={styles.hours}><Clock size={20} aria-hidden="true" /> {commercialHours.days}, de {commercialHours.opens} a {commercialHours.closes} hrs</p>
            </section>
          </div>
          <div className={styles.heroPhoto}>
            <Image
              src="/contacto-atencion-domiciliaria.webp"
              alt="Una profesional de la salud conversa con una paciente en casa"
              fill
              preload
              sizes="(max-width: 830px) 88vw, (max-width: 1450px) 42vw, 560px"
            />
          </div>
        </div>
      </section>
      <section id="oficinas" className={styles.section} aria-labelledby="offices-title">
        <div className={styles.shell}>
          <p className={styles.eyebrow}>Dónde encontrarnos</p>
          <h2 id="offices-title">Oficina administrativa</h2>
          <OfficeDirectory />
        </div>
      </section>
      <AgreementsSection />
      <EvaluationSection />
      <section id="documentos" className={styles.complianceSection} aria-labelledby="contact-documents-title">
        <div className={`${styles.shell} ${styles.complianceBanner}`}>
          <div className={styles.complianceCopy}>
            <h2 id="contact-documents-title">Ética y Cumplimiento</h2>
            <p>Consulta los códigos de conducta y manuales de prevención.</p>
            <Link className={styles.complianceLink} href="/etica-y-cumplimiento#documents-title">
              Ver documentos <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.complianceArt}>
            <Image src="/contacto-etica-documentos.webp" alt="" fill unoptimized />
          </div>
        </div>
      </section>
    </main>
  );
}
