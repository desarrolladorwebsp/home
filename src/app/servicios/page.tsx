import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import motion from "@/components/hero-motion.module.css";
import { AgreementsSection } from "@/components/sections/agreements-section";
import { EvaluationSection } from "@/components/sections/evaluation-section";
import { HomeCareSection } from "@/components/sections/home-care-section";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Servicios de atención domiciliaria | Home Medical Clinic",
  description: "Conoce las siete prestaciones de atención domiciliaria de Home Medical Clinic y revisa cómo acceder a ellas.",
};

export default function ServicesPage() {
  return (
    <main>
      <section data-replay className={styles.hero} aria-labelledby="services-title">
        <div className={styles.heroInner}>
          <div>
            <div className={`${styles.heading} ${motion.intro}`}>
              <p className={styles.eyebrow}>Nuestros servicios</p>
              <h1 id="services-title">Atención&nbsp;clínica en casa, <span>adaptada a cada paciente</span></h1>
              <p className={styles.description}>Entregamos atención a pacientes que necesitan continuar tratamientos, avanzar en su recuperación, realizar rehabilitación o recibir cuidados clínicos en su hogar, con apoyo profesional y la tranquilidad de estar junto a su familia.</p>
            </div>
            <div className={`${styles.action} ${motion.actions}`}>
              <a className={`hero__primary ${motion.interactive}`} href="#contacto">
                Solicita tu presupuesto <ArrowRight size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          <Image className={styles.photo} src="/servicios/portada.webp" alt="Una profesional conversa con una paciente y su familiar en casa" width={1448} height={1086} sizes="(max-width: 760px) 90vw, (max-width: 1500px) 45vw, 680px" preload />
        </div>
      </section>
      <HomeCareSection />
      <AgreementsSection />
      <EvaluationSection />
    </main>
  );
}
