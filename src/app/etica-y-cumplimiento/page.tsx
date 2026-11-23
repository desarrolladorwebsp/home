import Link from "next/link";
import { ArrowLeft, ArrowUpRight, EnvelopeSimple, FilePdf, MapPin, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { pageMetadata } from "@/lib/site-seo";
import styles from "./page.module.css";

export const metadata = pageMetadata("/etica-y-cumplimiento");

const portal = "https://secure.ethicspoint.com/domain/media/es/gui/79805/index.html";
const email = "centrodeayudaetica@hmc.cl";
const documents = [
  ["Código de conducta de terceras partes", "codigo_etica_2025_3ros.pdf"],
  ["Manual del modelo de prevención", "manual_mpd_hmc_mhl_2025.pdf"],
  ["Código de conducta de colaboradores", "codigo_etica_2025_colaboradores_no.pdf"],
  ["Manual de prevención profesional", "modelo_prevencion_profesional_2025.pdf"],
] as const;

export default function CompliancePage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/" className={styles.back}><ArrowLeft size={19} aria-hidden="true" /> Volver al inicio</Link>
        <section className={styles.hero} aria-labelledby="ethics-title">
          <div>
            <p className={styles.eyebrow}>Modelo de prevención</p>
            <h1 id="ethics-title">Centro de Ayuda <span>Ética y Cumplimiento</span></h1>
            <p>Conoce cuándo corresponde usar el canal oficial de denuncias de Home Medical Clinic y consulta sus documentos de conducta y prevención.</p>
          </div>
          <div className={styles.portal}>
            <ShieldCheck size={46} weight="light" aria-hidden="true" />
            <h2>Canal oficial de denuncias</h2>
            <p>Accede al portal externo de EthicsPoint para ingresar tu denuncia.</p>
            <a className={styles.primary} href={portal}>Ir al canal de denuncias <ArrowUpRight size={20} aria-hidden="true" /></a>
          </div>
        </section>

        <div className={styles.grid}>
          <section className={styles.card} aria-labelledby="use-title">
            <h2 id="use-title">Cuándo usar este canal</h2>
            <p>HMC cuenta con un Modelo de Prevención en el marco de la Ley N.º 20.393 y sus modificaciones. Busca prevenir delitos económicos y otras conductas contrarias a la ley o al Código de Conducta, como el lavado de activos, el cohecho, la corrupción y el fraude.</p>
            <p>Usa este canal si tienes una sospecha fundada o certeza de una posible infracción a la ley o a las normas y políticas de HMC. En general, puedes denunciar de forma anónima o identificándote.</p>
            <aside className={styles.note} aria-labelledby="workplace-title">
              <h3 id="workplace-title">Acoso o violencia en el trabajo</h3>
              <p>Según la información publicada por HMC sobre la Ley N.º 21.643, las denuncias por acoso laboral, acoso sexual o violencia laboral deben identificar a la persona denunciante y a la denunciada. Si falta esa información, HMC indica que no podrá iniciar la investigación interna.</p>
            </aside>
          </section>

          <section className={styles.card} aria-labelledby="channels-title">
            <h2 id="channels-title">Otras vías de denuncia</h2>
            <div className={styles.channel}>
              <EnvelopeSimple size={24} aria-hidden="true" />
              <div><h3>Correo electrónico</h3><a href={`mailto:${email}`}>{email}</a></div>
            </div>
            <div className={styles.channel}>
              <MapPin size={24} aria-hidden="true" />
              <div><h3>Correspondencia confidencial</h3><p>Envía un sobre confidencial a nombre del Oficial de Cumplimiento.</p><p>Av. Apoquindo 3600, piso 12<br />Las Condes, Santiago, Chile</p></div>
            </div>
            <p className={styles.contact}>¿Quieres comentar tu experiencia de atención? <Link href="/contacto#contacto">Ve a la sección de contacto</Link>.</p>
          </section>
        </div>

        <section className={styles.documents} aria-labelledby="documents-title">
          <p className={styles.eyebrow}>Documentación oficial</p>
          <h2 id="documents-title">Códigos y manuales de prevención</h2>
          <ul>
            {documents.map(([label, filename]) => (
              <li key={filename}>
                <a className={styles.document} href={`https://www.hmc.cl/pdf/${filename}`}>
                  <FilePdf size={28} aria-hidden="true" />
                  <span>{label}<small>Ver PDF</small></span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
