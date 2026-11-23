import Link from "next/link";
import {
  ArrowRight, FilePdf, FileText, LockKey, ShieldCheck, Timer,
} from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/site-seo";
import styles from "./page.module.css";

export const metadata = pageMetadata("/politicas-y-condiciones");

const securityPrinciples = [
  {
    title: "Confidencialidad",
    description: "Solo las personas autorizadas pueden acceder a tu información para fines relacionados con tu atención de salud.",
    Icon: LockKey,
  },
  {
    title: "Integridad",
    description: "Cuidamos que tus datos se mantengan completos y sin alteraciones indebidas.",
    Icon: FileText,
  },
  {
    title: "Disponibilidad",
    description: "Buscamos que la información esté disponible cuando el equipo autorizado la necesite para tu atención.",
    Icon: Timer,
  },
] as const;

export default function PoliciesPage() {
  return (
    <main>
      <div className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <h1>Políticas y <span>condiciones</span></h1>
            <p>Consulta cómo cuidamos tu información y accede a los recursos institucionales de Home Medical Clinic.</p>
          </header>

          <section id="seguridad-de-la-informacion" className={styles.security} aria-labelledby="security-title">
            <div className={styles.securityIntro}>
              <ShieldCheck className={styles.securityIcon} size={36} weight="duotone" aria-hidden="true" />
              <h2 id="security-title">Seguridad de la información</h2>
              <p>En Home Medical Clinic, proteger la información de nuestros pacientes, familias y colaboradores es una prioridad. Aplicamos políticas, procedimientos y tecnologías para cuidar los datos personales y clínicos.</p>
            </div>
            <ul role="list" className={styles.principles}>
              {securityPrinciples.map(({ title, description, Icon }) => (
                <li className={styles.card} key={title}>
                  <Icon size={26} weight="duotone" aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.resources} aria-labelledby="legal-resources-title">
            <h2 id="legal-resources-title">Recursos institucionales</h2>
            <div className={styles.resourceLinks}>
              <Link href="/etica-y-cumplimiento">
                <ShieldCheck size={24} aria-hidden="true" />
                <span>Ética y cumplimiento</span>
                <ArrowRight size={19} aria-hidden="true" />
              </Link>
              <a href="/pdf/Carta_de_derechos.pdf" target="_blank" rel="noopener noreferrer">
                <FilePdf size={24} aria-hidden="true" />
                <span>Derechos y deberes del paciente <small>(PDF)</small></span>
                <ArrowRight size={19} aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
