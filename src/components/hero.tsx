import motion from "./hero-motion.module.css";
import Image from "next/image";
import { ArrowRight, HouseLine, User, Heartbeat, Users } from "@phosphor-icons/react/dist/ssr";

const benefits = [
  { title: "Junto a los que más quieres", Icon: HouseLine },
  { title: "Diseñado para ti", Icon: User },
  { title: "Atención integral", Icon: Heartbeat },
  { title: "Pacientes adultos y pediátricos", Icon: Users },
] as const;

export function Hero() {
  return (
    <section data-replay className="hero" aria-labelledby="hero-title">
      <div className="hero__photo" aria-hidden="true"><Image src="/hospitalizacion-domiciliaria-hero.webp" alt="" fill preload quality={90} sizes="100vw" className={`object-cover ${motion.photo}`} /></div>
      <div className="hero__wash" aria-hidden="true" />

      <div className={`hero__content ${motion.intro}`}>
        <p className="hero__eyebrow"><span>Home Medical Clinic</span> · Atención domiciliaria</p>
        <h1 id="hero-title" className="hero__title"><span>25 años entregando</span>cuidados clínicos en casa</h1>
        <p className="hero__description">Nuestra experiencia y equipo multidisciplinario nos permiten ofrecer atención y hospitalización domiciliaria de baja, mediana y alta complejidad, con los altos estándares de calidad y seguridad de uno de los grupos de salud más importantes del país.</p>
        <div className={`hero__actions ${motion.actions}`}>
          <a className={`hero__primary ${motion.interactive}`} href="#contacto">Solicita tu presupuesto <ArrowRight aria-hidden="true" size={20} /></a>
        </div>
      </div>

      <div className={`hero__benefits ${motion.stagger}`}>
        {benefits.map(({ title, Icon }) => <article className="hero__benefit" key={title}><Icon aria-hidden="true" size={44} weight="light" /><h2>{title}</h2></article>)}
        <div className="hero__backing">
          <p>Somos parte de Empresas Banmédica</p>
          <Image src="/logo-empresas-banmedica.png" alt="Empresas Banmédica" width={247} height={115} sizes="176px" className="hero__backing-logo" />
        </div>
      </div>

    </section>
  );
}
