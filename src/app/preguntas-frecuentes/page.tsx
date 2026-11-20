import type { Metadata } from "next";
import Link from "next/link";
import { ChatCircleText, Phone, Plus } from "@phosphor-icons/react/dist/ssr";
import { AgreementsSection } from "@/components/sections/agreements-section";
import { EvaluationSection } from "@/components/sections/evaluation-section";
import { contactPhones } from "@/lib/contact-phones";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Home Medical Clinic",
  description: "Información sobre ingreso a hospitalización domiciliaria, solicitudes de servicios, cobertura de Isapres, Fonasa y disponibilidad regional de Home Medical Clinic.",
};

function BudgetContact() {
  return <><Link href="#contacto">Solicitud de Presupuesto</Link>, o llamando al <a href={contactPhones.salesMobile.href}>{contactPhones.salesMobile.label}</a>.</>;
}

const questions = [
  {
    id: "ingreso",
    title: "¿Cómo funciona el ingreso a Hospitalización Domiciliaria?",
    answer: <p>El ingreso al programa de Hospitalización Domiciliaria se realiza mediante una derivación directa de la Isapre, de acuerdo con la condición clínica y las necesidades de cada paciente.</p>,
  },
  {
    id: "solicitar-servicios",
    title: "¿Cómo puedo solicitar los demás servicios?",
    answer: <>
      <p>Para Rehabilitación, Cuidados Paliativos, Curaciones, Administración de Medicamentos y Antibióticos o Apoyo en Alimentación, es necesario contar con una orden médica.</p>
      <p>Con estos antecedentes, Home Medical Clinic prepara un presupuesto y consulta la cobertura disponible con la Isapre. Actualmente, esta gestión se realiza con las Isapres Banmédica, Vida Tres y Colmena.</p>
      <p>Si la aseguradora de salud cubre solo una parte de las prestaciones indicadas, se entrega un presupuesto particular por el monto no cubierto. De esta manera, el paciente o su familia pueden decidir si contratan únicamente las prestaciones autorizadas por la Isapre o el plan completo indicado por el médico.</p>
      <p>Estos servicios pueden solicitarse a través de la sección de <BudgetContact /></p>
    </>,
  },
  {
    id: "fonasa",
    title: "¿Home Medical Clinic tiene convenio con Fonasa?",
    answer: <p>Actualmente, Home Medical no cuenta con convenio con Fonasa. Si te gustaría evaluar la contratación particular de nuestros servicios, contáctanos a través de la sección <BudgetContact /></p>,
  },
  {
    id: "regiones",
    title: "¿En qué regiones están disponibles los servicios?",
    answer: <p>Home Medical Clinic cuenta con capacidad de atención en las principales regiones del país. La disponibilidad y cobertura se evalúan según el servicio requerido y la ubicación del paciente. Contáctanos a través de la sección <Link href="#contacto">Solicitud de Presupuesto</Link>, para revisar las alternativas disponibles en tu zona.</p>,
  },
];

export default function FrequentlyAskedQuestionsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="faq-title">
        <div className={styles.container}>
          <div data-replay className={styles.heroCopy}>
            <p className={styles.eyebrow}>Estamos para orientarte</p>
            <h1 id="faq-title">Preguntas <span>frecuentes.</span></h1>
            <p className={styles.lead}>Encuentra información sobre el ingreso, la cobertura y la disponibilidad de nuestros servicios.</p>
          </div>
          <div data-replay className={styles.help}>
            <ChatCircleText size={34} weight="duotone" aria-hidden="true" />
            <h2>¿Necesitas orientación?</h2>
            <p>Conversemos sobre el cuidado que necesitas tú o tu familiar.</p>
            <a href={contactPhones.salesMobile.href}><Phone size={19} aria-hidden="true" /> {contactPhones.salesMobile.label}</a>
          </div>
        </div>
      </section>
      <section className={styles.questions} aria-labelledby="coverage-title">
        <div className={styles.questionLayout}>
          <header data-replay className={styles.category}>
            <p className={styles.eyebrow}>Resuelve tus dudas</p>
            <h2 id="coverage-title">Cobertura <span>y acceso.</span></h2>
          </header>
          <div className={styles.accordion}>
            {questions.map(({ id, title, answer }, index) => (
              <details data-replay className={styles.item} name="coverage-faq" key={id} id={`pregunta-${id}`} open={index === 0}>
                <summary>
                  <h3>{title}</h3>
                  <Plus className={styles.toggle} size={23} aria-hidden="true" />
                </summary>
                <div className={styles.answer}>{answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <AgreementsSection />
      <EvaluationSection />
    </main>
  );
}
