"use client";

import { useState } from "react";
import { ArrowUpRight, CaretRight, MapPin, Phone } from "@phosphor-icons/react";
import { santiagoOffice } from "@/lib/contact-details";
import { contactPhones } from "@/lib/contact-phones";
import styles from "./page.module.css";

const offices = [
  { ...santiagoOffice, phone: contactPhones.landline },
  { region: "Región del Biobío", city: "Concepción", address: "Av. Bernardo O’Higgins 420, piso 7, oficinas 701–702", phone: contactPhones.landline },
  { region: "Región de La Araucanía", city: "Temuco", address: "Antonio Varas 979, oficina 503", phone: contactPhones.salesMobile, phonePrefix: "Consultas comerciales: " },
] as const;

export function OfficeDirectory() {
  const [selected, setSelected] = useState(0);
  const office = offices[selected];
  const location = encodeURIComponent(`${office.address.split(",")[0]}, ${office.city}, Chile`);
  const directions = (
    <a
      className={styles.directions}
      href={`https://www.google.com/maps/dir/?api=1&destination=${location}`}
      aria-label={`Cómo llegar a la oficina de ${office.city}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Cómo llegar <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );

  return (
    <div className={styles.offices}>
      <ul className={styles.officeList} aria-label="Selecciona una oficina">
        {offices.map((item, index) => {
          const active = index === selected;

          return (
            <li key={item.city} className={styles.office} data-active={active}>
              <button
                type="button"
                className={styles.officeButton}
                aria-pressed={active}
                aria-controls="office-map"
                onClick={() => setSelected(index)}
              >
                {item.city}
                <CaretRight size={18} aria-hidden="true" />
              </button>
              {active && (
                <div className={styles.officeDetails}>
                  <p className={styles.region}>{item.region}</p>
                  <address>
                    <MapPin size={16} aria-hidden="true" /> {item.address}
                  </address>
                  <a className={styles.phone} href={item.phone.href}>
                    <Phone size={16} aria-hidden="true" />
                    <span>{"phonePrefix" in item && item.phonePrefix}{item.phone.label}</span>
                  </a>
                  <div className={styles.officeActions}>{directions}</div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div id="office-map" className={styles.mapPanel}>
        <iframe
          className={styles.officeMap}
          src={`https://maps.google.com/maps?q=${location}&z=16&output=embed`}
          title={`Mapa de la oficina de HMC en ${office.city}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className={styles.mapActions}>{directions}</div>
      </div>
    </div>
  );
}
