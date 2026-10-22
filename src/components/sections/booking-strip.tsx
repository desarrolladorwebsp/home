"use client";

import {
  ArrowRight,
  CalendarDots,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  User,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";

const socialItems = [
  { label: "X", Icon: XLogo },
  { label: "Facebook", Icon: FacebookLogo },
  { label: "Instagram", Icon: InstagramLogo },
  { label: "YouTube", Icon: YoutubeLogo },
] as const;

export function BookingStrip() {
  return (
    <section className="booking" id="agenda" aria-labelledby="booking-title">
      <aside className="booking__social" aria-label="Redes sociales">
        {socialItems.map(({ label, Icon }) => (
          <button className="booking__social-button" type="button" aria-label={label} key={label}>
            <Icon size={23} weight="fill" aria-hidden="true" />
          </button>
        ))}
      </aside>

      <div className="booking__panel">
        <div className="booking__intro">
          <CalendarDots size={42} weight="duotone" aria-hidden="true" />
          <div>
            <h2 id="booking-title">Agenda tu hora</h2>
            <p>Horarios de atención</p>
          </div>
          <dl className="booking__hours">
            <div><dt>Lunes - viernes</dt><dd>8:00 - 17:00</dd></div>
            <div><dt>Sábado - domingo</dt><dd>8:00 - 15:00</dd></div>
          </dl>
        </div>

        <form className="booking__form" aria-label="Formulario visual de reserva">
          <label className="field">
            <span>Nombre</span>
            <span className="field__control"><User size={18} aria-hidden="true" /><input type="text" placeholder="Tu nombre" /></span>
          </label>
          <label className="field">
            <span>Servicio</span>
            <select defaultValue=""><option value="" disabled>Selecciona un servicio</option><option>Hospitalización domiciliaria</option><option>Enfermería domiciliaria</option><option>Rehabilitación domiciliaria</option></select>
          </label>
          <label className="field">
            <span>Correo electrónico</span>
            <span className="field__control"><EnvelopeSimple size={18} aria-hidden="true" /><input type="email" placeholder="tu@correo.cl" /></span>
          </label>
          <label className="field">
            <span>Fecha</span>
            <span className="field__control"><CalendarDots size={18} aria-hidden="true" /><input type="text" placeholder="Selecciona una fecha" /></span>
          </label>
          <button className="booking__button" type="button">Reservar <ArrowRight size={20} aria-hidden="true" /></button>
        </form>
      </div>
    </section>
  );
}
