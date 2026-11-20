import Image from "next/image";
import { Heart, ShieldPlus, TrendUp, Wallet } from "@phosphor-icons/react/dist/ssr";
import styles from "./home-benefits-section.module.css";

const benefits = [
  {
    title: "Mejor experiencia",
    description: "La atención en un entorno familiar favorece la comodidad y satisfacción del paciente y sus seres queridos.",
    Icon: Heart,
  },
  {
    title: "Continuidad y resultados",
    description: "Mejor adherencia al tratamiento y seguimiento clínico, lo que favorece, en general, una recuperación más rápida.",
    Icon: TrendUp,
  },
  {
    title: "Menos traslados y riesgos evitables",
    description: "Reduce desplazamientos, consultas de urgencia, hospitalizaciones y exposición a infecciones intrahospitalarias.",
    Icon: ShieldPlus,
  },
  {
    title: "Menor costo para el paciente y su familia",
    description: "Existe una disminución significativa en los gastos asociados al tratamiento y traslados.",
    Icon: Wallet,
  },
] as const;

export function HomeBenefitsSection() {
  return (
    <section id="beneficios" className={styles.section} aria-labelledby="home-benefits-title">
      <div className={styles.container}>
        <div data-replay className={styles.intro}>
          <div className={styles.photo}>
            <Image src="/familia-hogar-chileno-beneficios.webp" alt="Familia de tres generaciones reunida frente a una casa chilena con jardín" fill sizes="(max-width: 600px) 90vw, (max-width: 1050px) 45vw, 33vw" quality={85} />
          </div>
          <h2 id="home-benefits-title">Beneficios del cuidado <span>en el hogar.</span></h2>
          <span className={styles.caption}>Imagen ilustrativa</span>
        </div>
        <ol className={styles.list}>
          {benefits.map(({ title, description, Icon }, index) => (
            <li data-replay key={title} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.icon}><Icon size={30} weight="duotone" aria-hidden="true" /></span>
                <span className={styles.number} aria-hidden="true">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
