import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./how-it-works-section.module.css";

const steps = [
  {
    title: "Evaluamos al paciente y sus requerimientos",
    description: "Revisamos sus necesidades, antecedentes clínicos y hogar para entregar el tratamiento de manera segura.",
  },
  {
    title: "Diseñamos un plan personalizado",
    description: "Definimos profesionales, prestaciones, equipamiento y frecuencia de atención según la condición clínica del paciente.",
  },
  {
    title: "Coordinamos el cuidado en casa",
    description: "Ponemos en marcha el plan y acompañamos al paciente y su familia durante todo el proceso.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className={styles.section} aria-labelledby="how-it-works-title">
      <div className={styles.container}>
        <header data-replay className={styles.header}>
          <p className={styles.eyebrow}>¿Cómo funciona?</p>
          <h2 id="how-it-works-title">La atención en casa, <span>paso a paso.</span></h2>
          <p className={styles.lead}>Desde la primera consulta hasta el inicio de la atención en el hogar.</p>
          <a className={styles.cta} href="#contacto">Solicita tu presupuesto <ArrowRight size={21} aria-hidden="true" /></a>
        </header>
        <ol className={styles.steps}>
          {steps.map(({ title, description }, index) => (
            <li data-replay className={styles.step} key={title}>
              <span className={styles.number} aria-hidden="true">{index + 1}</span>
              <div className={styles.copy}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
