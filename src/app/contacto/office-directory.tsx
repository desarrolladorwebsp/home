import { ArrowUpRight, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { santiagoOffice } from "@/lib/contact-details";
import { contactPhone } from "@/lib/contact-phones";
import styles from "./page.module.css";

const location = encodeURIComponent(`${santiagoOffice.address}, ${santiagoOffice.city}, Chile`);

export function OfficeDirectory() {
  const directions = (
    <a
      className={styles.directions}
      href={`https://www.google.com/maps/dir/?api=1&destination=${location}`}
      aria-label={`Cómo llegar a la oficina de ${santiagoOffice.city}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Cómo llegar <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );

  return (
    <div className={styles.offices}>
      <div className={styles.office}>
        <h3 className={styles.officeCity}>{santiagoOffice.city}</h3>
        <address>
          <MapPin size={16} aria-hidden="true" /> {santiagoOffice.address}
        </address>
        <a className={styles.phone} href={contactPhone.href}>
          <Phone size={16} aria-hidden="true" /> {contactPhone.label}
        </a>
        <div className={styles.officeActions}>{directions}</div>
      </div>

      <div className={styles.mapPanel}>
        <iframe
          className={styles.officeMap}
          src={`https://maps.google.com/maps?q=${location}&z=16&output=embed`}
          title={`Mapa de la oficina de HMC en ${santiagoOffice.city}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className={styles.mapActions}>{directions}</div>
      </div>
    </div>
  );
}
