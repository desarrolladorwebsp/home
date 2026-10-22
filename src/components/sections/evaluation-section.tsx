"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import styles from "./contact-section.module.css";

const categories = ["Felicitaciones", "Sugerencias", "Reclamos"];
const areas = ["Comercial", "Facturación y cobranzas", "Auxiliares", "Enfermería", "Kinesiología", "Equipos Médicos", "Abastecimiento (insumos y medicamentos)", "Otro"];

export function EvaluationSection() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("El envío aún no está habilitado en esta vista local. No se ha enviado tu mensaje.");
  }

  return (
    <section className={styles.section} id="contacto" aria-labelledby="contact-title">
      <div className={styles.card}>
        <div className={styles.intro}>
          <div className={styles.photo} aria-hidden="true">
            <Image src="/hero-home-care.png" alt="" fill sizes="(max-width: 700px) 100vw, 40vw" />
          </div>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Contacto</p>
            <h2 id="contact-title">Queremos<br />escucharte</h2>
            <p>Comparte tus felicitaciones, sugerencias o reclamos.</p>
          </div>
        </div>
        <form className={styles.form} aria-label="Formulario de contacto" onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <label className={styles.field}>
              <span>Categoría</span>
              <span className={styles.select}>
                <select name="categoria" defaultValue="" required>
                  <option value="" disabled>Selecciona una opción</option>
                  {categories.map((category, index) => <option key={category} value={index + 1}>{category}</option>)}
                </select>
                <CaretDown size={16} aria-hidden="true" />
              </span>
            </label>
            <label className={styles.field}>
              <span>Área</span>
              <span className={styles.select}>
                <select name="area" defaultValue="" required>
                  <option value="" disabled>Selecciona un área</option>
                  {areas.map((area, index) => <option key={area} value={index + 1}>{area}</option>)}
                </select>
                <CaretDown size={16} aria-hidden="true" />
              </span>
            </label>
            <label className={styles.field}><span>Nombre</span><input name="paciente" type="text" autoComplete="name" required /></label>
            <label className={styles.field}><span>Teléfono</span><input name="telefono" type="tel" autoComplete="tel" required /></label>
            <label className={`${styles.field} ${styles.wide}`}><span>Correo electrónico</span><input name="correo" type="email" autoComplete="email" required /></label>
            <label className={`${styles.field} ${styles.wide}`}><span>Mensaje</span><textarea name="motivo" rows={5} required /></label>
          </div>
          <button className={styles.button} type="submit">Enviar mensaje <ArrowRight size={22} aria-hidden="true" /></button>
          <p className={styles.notice} role="status">{notice}</p>
        </form>
      </div>
    </section>
  );
}
