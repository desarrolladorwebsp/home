import Image from "next/image";
import styles from "./agreements-section.module.css";

const partners = [
  { name: "Clínica Santa María", file: "santa-maria" },
  { name: "Clínica Dávila", file: "davila" },
  { name: "Clínica Dávila Vespucio", file: "davila-vespucio" },
  { name: "Clínica Biobío", file: "biobio" },
  { name: "Clínica Ciudad del Mar", file: "ciudad-del-mar" },
  { name: "HELP Rescate", file: "help" },
  { name: "Banmédica", file: "banmedica" },
  { name: "Vida Tres", file: "vida-tres" },
  { name: "Colmena", file: "colmena" },
] as const;

function PartnerLogos({ repeated = false }: { repeated?: boolean }) {
  return (
    <ul role="list" className={repeated ? styles.repeated : styles.logos} aria-hidden={repeated || undefined}>
      {partners.map(({ name, file }) => (
        <li key={file} className={styles.tile}>
          <Image
            src={`/convenios/${file}.png`}
            alt={repeated ? "" : name}
            width={156}
            height={52}
            unoptimized
          />
        </li>
      ))}
    </ul>
  );
}

export function AgreementsSection() {
  return (
    <section id="convenios" className={styles.section} aria-labelledby="agreements-title">
      <div className={styles.inner}>
        <h2 id="agreements-title">Convenios</h2>
        <div className={styles.viewport} role="group" aria-label="Logos de convenios" tabIndex={0}>
          <div className={styles.track}>
            <PartnerLogos />
            <PartnerLogos repeated />
          </div>
        </div>
      </div>
    </section>
  );
}
