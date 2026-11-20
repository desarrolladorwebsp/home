import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Clock, DeviceMobile, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { commercialHours, santiagoOffice } from "@/lib/contact-details";
import { contactPhones } from "@/lib/contact-phones";
import { AgreementsSection } from "@/components/sections/agreements-section";
import { EvaluationSection } from "@/components/sections/evaluation-section";
import motion from "@/components/hero-motion.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contacto y oficinas administrativas | Home Medical Clinic",
  description: "Canales de consulta, horarios comerciales y oficinas administrativas de Home Medical Clinic en Santiago, Concepción y Temuco.",
};

const offices = [
  { ...santiagoOffice, phone: contactPhones.landline },
  { region: "Región del Biobío", city: "Concepción", address: "Av. Bernardo O’Higgins 420, piso 7, oficinas 701–702", phone: contactPhones.landline },
  { region: "Región de La Araucanía", city: "Temuco", address: "Antonio Varas 979, oficina 503", phone: contactPhones.salesMobile, phonePrefix: "Consultas comerciales: " },
] as const;

const { landline, salesMobile } = contactPhones;

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section data-replay className={styles.hero} aria-labelledby="contact-page-title">
        <div className={styles.heroInner}>
          <div className={`${styles.heroCopy} ${motion.intro}`}>
            <p className={styles.eyebrow}>Contacto</p>
            <h1 id="contact-page-title">¿Cómo podemos <span>ayudarte?</span></h1>
            <nav aria-label="Accesos de contacto" className={`${styles.heroActions} ${motion.actions}`}>
              <a className={`${styles.callLink} ${motion.interactive}`} href={salesMobile.href}>Llamar <Phone size={20} aria-hidden="true" /></a>
              <a className={`${styles.primary} ${motion.interactive} ${motion.down}`} href="#contacto">Ir al formulario <ArrowDown size={18} aria-hidden="true" /></a>
              <a className={`${styles.officeLink} ${motion.interactive}`} href="#oficinas">Ver oficinas <MapPin size={18} aria-hidden="true" /></a>
            </nav>
            <p className={styles.lead}>Cotiza atención domiciliaria, comparte tu experiencia o postula a nuestro equipo.</p>
          </div>
          <section className={`${styles.channels} ${motion.panel}`} aria-labelledby="commercial-title">
            <div className={styles.channelHeader}>
              <h2 id="commercial-title">Ventas y consultas comerciales</h2>
              <p><Clock size={17} aria-hidden="true" /> {commercialHours.days}, de {commercialHours.opens} a {commercialHours.closes} hrs</p>
            </div>
            <ul className={`${styles.channelList} ${motion.stagger}`}>
              <li>
                <a className={motion.interactive} href={landline.href}>
                  <span className={styles.channelIcon}><Phone size={22} weight="duotone" aria-hidden="true" /></span>
                  <span><small>Teléfono</small>{landline.label}</span>
                  <ArrowUpRight className={styles.channelArrow} size={17} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a className={motion.interactive} href={salesMobile.href}>
                  <span className={styles.channelIcon}><DeviceMobile size={22} weight="duotone" aria-hidden="true" /></span>
                  <span><small>Celular de ventas</small>{salesMobile.label}</span>
                  <ArrowUpRight className={styles.channelArrow} size={17} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a className={motion.interactive} href="mailto:contacto@hmc.cl">
                  <span className={styles.channelIcon}><EnvelopeSimple size={22} weight="duotone" aria-hidden="true" /></span>
                  <span><small>Correo electrónico</small>contacto@hmc.cl</span>
                  <ArrowUpRight className={styles.channelArrow} size={17} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
      <section id="oficinas" className={styles.section} aria-labelledby="offices-title">
        <div className={styles.shell}>
          <p className={styles.eyebrow}>Dónde encontrarnos</p>
          <h2 id="offices-title">Oficinas administrativas</h2>
          <ul className={styles.offices}>
            {offices.map((office) => {
              const { region, city, address, phone } = office;
              const location = encodeURIComponent(`${address.split(",")[0]}, ${city}, Chile`);

              return (
                <li key={region} className={styles.office}>
                  <MapPin size={28} weight="duotone" aria-hidden="true" />
                  <p className={styles.region}>{region}</p>
                  <h3>{city}</h3>
                  <address>{address}</address>
                  <a className={styles.phone} href={phone.href}>
                    {"phonePrefix" in office && office.phonePrefix}{phone.label}
                  </a>
                  <iframe
                    className={styles.officeMap}
                    src={`https://maps.google.com/maps?q=${location}&z=16&output=embed`}
                    title={`Mapa de la oficina de HMC en ${city}`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  <a className={styles.map} aria-label={`Ver en Google Maps: ${city}`} href={`https://www.google.com/maps/search/?api=1&query=${location}`}>
                    Ver en Google Maps <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <AgreementsSection />
      <EvaluationSection />
    </main>
  );
}
