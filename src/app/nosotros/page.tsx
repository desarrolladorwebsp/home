import type { Metadata } from "next";
import Image from "next/image";
import {
  Ambulance, ArrowRight, ClipboardText, FirstAid, Headset, Heartbeat,
  PersonSimpleWalk, Stethoscope,
} from "@phosphor-icons/react/dist/ssr";
import motion from "@/components/hero-motion.module.css";
import { HeroVideo } from "./hero-video";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Nosotros y nuestros especialistas | Home Medical Clinic",
  description: "Conoce a Home Medical Clinic y al equipo de medicina, enfermería y kinesiología que acompaña la atención domiciliaria.",
};

const specialties = [
  {
    title: "Medicina",
    description: "El médico tratante orienta el plan clínico y coordina las decisiones de cuidado con el equipo y la familia.",
    Icon: Stethoscope,
  },
  {
    title: "Enfermería",
    description: "El equipo de enfermería acompaña el cuidado diario y orienta a la familia durante la atención en el hogar.",
    Icon: FirstAid,
  },
  {
    title: "Kinesiología",
    description: "El equipo de kinesiología participa en la rehabilitación motora y respiratoria según las necesidades del paciente.",
    Icon: PersonSimpleWalk,
  },
];

const careSupport = [
  {
    title: "Monitoreo clínico",
    description: "Seguimiento de la evolución del paciente en línea.",
    Icon: Heartbeat,
  },
  {
    title: "Ficha clínica electrónica",
    description: "Registro para dar continuidad a la atención.",
    Icon: ClipboardText,
  },
  {
    title: "Asistencia telefónica de enfermería 24/7",
    description: "Canal de orientación y apoyo clínico.",
    Icon: Headset,
  },
  {
    title: "Rescate médico HELP",
    description: "Apoyo coordinado ante urgencias o emergencias clínicas.",
    Icon: Ambulance,
  },
] as const;

export default function AboutPage() {
  const configuredVideoId = process.env.HMC_TEAM_YOUTUBE_ID?.trim() ?? "";
  const hasTeamVideo = /^[A-Za-z0-9_-]{11}$/.test(configuredVideoId);
  const isPreview = !hasTeamVideo && process.env.NODE_ENV === "development";
  const videoId = hasTeamVideo ? configuredVideoId : isPreview ? "FpZtZbliUGs" : "";

  return (
    <main className={styles.aboutPage}>
      <section data-replay className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroInner}>
          <div className={styles.photo} aria-hidden="true">
            <Image src="/equipo-atencion-domiciliaria.webp" alt="" fill preload sizes="100vw" />
          </div>
          {videoId ? (
            <HeroVideo videoId={videoId} preview={isPreview} />
          ) : (
            <span className={styles.photoCaption}>Imagen ilustrativa</span>
          )}
          <div className={`${styles.heroCopy} ${motion.intro}`}>
            <h1 id="about-title">El equipo detrás <span>de tu cuidado.</span></h1>
          </div>
        </div>
      </section>
      <section id="especialistas" className={styles.specialists} aria-labelledby="team-title">
        <div className={`${styles.team} ${styles.specialistsLayout}`}>
          <div className={styles.specialistsPhoto}>
            <Image
              src="/especialistas-atencion-domiciliaria.webp"
              alt="Una paciente conversa con dos profesionales de la salud y un familiar en su casa"
              fill
              sizes="(max-width: 760px) 90vw, (max-width: 1440px) 38vw, 540px"
            />
          </div>
          <div className={styles.specialistsCopy}>
            <p className={styles.eyebrow}>Nuestros especialistas</p>
            <h2 id="team-title">Así trabaja tu equipo tratante</h2>
            <p className={styles.lead}>Desde el plan clínico hasta el cuidado diario y la rehabilitación, cada disciplina aporta al mismo objetivo.</p>
            <ul data-replay role="list" className={styles.specialtyList}>
              {specialties.map(({ title, description, Icon }) => (
                <li key={title} className={styles.specialtyRow}>
                  <span className={styles.specialtyIcon}><Icon size={29} aria-hidden="true" /></span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a className={`${styles.action} ${motion.interactive}`} href="/contacto#contacto">
              Solicitar atención <ArrowRight size={19} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section id="conectados-para-cuidarte" className={styles.connected} aria-labelledby="connected-title">
        <div className={styles.team}>
          <div className={styles.connectedIntro}>
            <div>
              <h2 id="connected-title">Conectados <span>para cuidarte</span></h2>
              <p className={styles.lead}>Médicos especialistas y profesionales de enfermería, kinesiología, terapia ocupacional, fonoaudiología, psicología, nutrición, TENS y otras disciplinas trabajan de forma coordinada junto al paciente y su familia.</p>
            </div>
            <p className={styles.teamSize}><strong>Más de 300</strong> profesionales de la salud forman parte de nuestro equipo multidisciplinario.</p>
          </div>
          <div className={styles.supportNetwork}>
            <svg className={styles.supportConnections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 25H15L43 50M100 25H85L57 50M0 75H15L43 50M100 75H85L57 50" vectorEffect="non-scaling-stroke" />
            </svg>
            <figure className={styles.patientPhoto}>
              <Image src="/paciente-y-familia-hmc.webp" alt="Una mujer mayor conversa con su hijo en casa" fill sizes="(max-width: 820px) 216px, (max-width: 1440px) 23vw, 320px" />
              <figcaption>Paciente y familia</figcaption>
            </figure>
            <ul role="list" data-replay className={`${styles.supportGrid} ${motion.stagger}`}>
              {careSupport.map(({ title, description, Icon }) => (
                <li key={title} className={styles.supportItem}>
                  <span className={styles.supportIcon}><Icon size={27} weight="duotone" aria-hidden="true" /></span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
