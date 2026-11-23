import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import motion from "@/components/hero-motion.module.css";
import { AgreementsSection } from "@/components/sections/agreements-section";
import { EvaluationSection } from "@/components/sections/evaluation-section";
import { HomeCareSection } from "@/components/sections/home-care-section";
import { pageMetadata } from "@/lib/site-seo";
import styles from "./page.module.css";

export const metadata = pageMetadata("/servicios");

export default function ServicesPage() {
  return (
    <main>
      <section data-replay className={styles.hero} aria-labelledby="services-title">
        <div className={styles.media}>
          <Image
            className={styles.photo}
            src="/servicios/portada.webp"
            alt="Una profesional conversa con una paciente y su familiar en casa"
            fill
            sizes="(max-width: 760px) 100vw, 68vw"
            preload
          />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.copy}>
            <div className={`${styles.heading} ${motion.intro}`}>
              <p className={styles.eyebrow}>Nuestros servicios</p>
              <h1 id="services-title">Atención clínica en casa, adaptada <span>a cada paciente</span></h1>
              <p className={styles.description}>Entregamos atención a pacientes que necesitan continuar tratamientos, avanzar en su recuperación, realizar rehabilitación o recibir cuidados clínicos en su hogar, con apoyo profesional y la tranquilidad de estar junto a su familia.</p>
            </div>
            <div className={`${styles.action} ${motion.actions}`}>
              <a className={`hero__primary ${styles.button} ${motion.interactive}`} href="#contacto">
                Solicita tu presupuesto <ArrowRight size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <HomeCareSection />
      <AgreementsSection />
      <EvaluationSection />
    </main>
  );
}
