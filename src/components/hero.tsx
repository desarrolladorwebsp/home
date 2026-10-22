"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Bed, CaretDown, Stethoscope, UsersThree } from "@phosphor-icons/react";

const benefits = [
  { title: "Atención médica", description: "Profesionales comprometidos con tu bienestar.", Icon: Stethoscope },
  { title: "Acompañamiento", description: "Cercanía en cada etapa de tu salud.", Icon: UsersThree },
  { title: "Atención integral", description: "Soluciones médicas para ti y tu familia.", Icon: Bed },
] as const;

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__photo" aria-hidden="true"><Image src="/hero-home-care.png" alt="" fill priority sizes="100vw" className="object-cover object-[62%_center]" /></div>
      <div className="hero__wash" aria-hidden="true" />

      <motion.div className="hero__content" initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <p className="hero__eyebrow"><span>Un modelo de cuidado</span> pensado para ti y tu familia</p>
        <h1 id="hero-title" className="hero__title"><span>Hospitalización</span>domiciliaria</h1>
        <p className="hero__description">Atención especializada en la comodidad y seguridad de tu hogar, con el respaldo de nuestro equipo multidisciplinario.</p>
        <div className="hero__actions">
          <a className="hero__primary" href="#agenda">Reserva tu hora <ArrowRight aria-hidden="true" size={20} /></a>
          <a className="hero__secondary" href="#contacto">Contáctanos <CaretDown aria-hidden="true" size={16} /></a>
        </div>
      </motion.div>

      <motion.div className="hero__benefits" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        {benefits.map(({ title, description, Icon }, index) => <article className="hero__benefit" key={title}><Icon aria-hidden="true" size={44} weight="light" /><div><h2>{title}</h2><p>{description}</p></div><span className="hero__benefit-number">0{index + 1}</span></article>)}
      </motion.div>

      <div className="hero__pagination" aria-label="Diapositiva 1 de 3"><strong>01</strong><span>/ 02 / 03</span></div>
    </section>
  );
}
