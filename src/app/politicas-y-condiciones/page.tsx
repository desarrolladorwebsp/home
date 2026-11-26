import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, EnvelopeSimple, FilePdf, FileText, LockKey, ShieldCheck, Timer,
} from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/site-seo";
import styles from "./page.module.css";

export const metadata = pageMetadata("/politicas-y-condiciones");

const securityPrinciples = [
  {
    title: "Confidencialidad",
    description: "Solo las personas autorizadas pueden acceder a tu información para fines relacionados con tu atención.",
    Icon: LockKey,
  },
  {
    title: "Integridad",
    description: "Cuidamos que tus datos se mantengan completos y sin alteraciones.",
    Icon: FileText,
  },
  {
    title: "Disponibilidad",
    description: "Protegemos tu información y procuramos que esté disponible cuando se necesite para tu atención.",
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

          <section id="seguridad-de-la-informacion" aria-labelledby="security-title">
            <div className={styles.security}>
              <div className={styles.securityIntro}>
                <ShieldCheck className={styles.securityIcon} size={36} weight="duotone" aria-hidden="true" />
                <h2 id="security-title">Seguridad de la información</h2>
                <p className={styles.securityLead}>Comprometidos con el cuidado de tu información</p>
                <p>En Home Medical Clinic, entendemos que tu información personal y médica es tan importante como tu bienestar físico. Por eso, cuidamos tus datos con el mismo compromiso con el que cuidamos tu salud.</p>
              </div>
              <ul role="list" className={styles.principles} aria-label="Pilares de la seguridad de la información">
                {securityPrinciples.map(({ title, description, Icon }) => (
                  <li className={styles.card} key={title}>
                    <Icon size={26} weight="duotone" aria-hidden="true" />
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.securityDetails}>
              <div className={styles.card}>
                <h3>Normativa chilena</h3>
                <ul className={styles.detailList}>
                  <li>
                    <a href="https://www.bcn.cl/leychile/navegar?idNorma=1177743">
                      Ley 21.459 sobre delitos informáticos <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.bcn.cl/leychile/navegar?idNorma=1202434">
                      Ley Marco de Ciberseguridad (21.663) <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.bcn.cl/leychile/navegar?idNorma=1209272">
                      Ley 21.719 sobre protección de datos personales <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    <small>Vigencia desde el <time dateTime="2026-12-01">1 de diciembre de 2026</time>.</small>
                  </li>
                </ul>
              </div>

              <div className={styles.card}>
                <h3>Contacto de Seguridad de la información</h3>
                <dl className={styles.detailList}>
                  <div>
                    <dt>Consultas</dt>
                    <dd>
                      <a href="mailto:infosec@hmc.cl">
                        <EnvelopeSimple size={18} aria-hidden="true" /> infosec@hmc.cl
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>Incidentes</dt>
                    <dd>
                      <a href="mailto:csirt@hmc.cl">
                        <EnvelopeSimple size={18} aria-hidden="true" /> csirt@hmc.cl
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
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
