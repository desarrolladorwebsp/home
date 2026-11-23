"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Briefcase, ChatCircleText, ClipboardText, Receipt } from "@phosphor-icons/react";
import { InlineSocialLinks } from "@/components/social-links";
import { areas, categories, interests, locations, specialties, validateContact, type ContactMode } from "@/lib/evaluation";
import styles from "./contact-section.module.css";

type Captcha = {
  render: (element: HTMLElement, options: { sitekey: string; size: "normal" | "compact"; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => number;
  reset: (id: number) => void;
};
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const modes = {
  cotizacion: { label: "Solicitar cotización", title: "Solicita una evaluación", subtitle: "Cuéntanos qué atención necesitas para orientarte.", submit: "Enviar solicitud", Icon: ClipboardText },
  opiniones: { label: "Reclamos y sugerencias", title: "Queremos escucharte", subtitle: "Comparte tus felicitaciones, sugerencias o reclamos.", submit: "Enviar mensaje", Icon: ChatCircleText },
  postulacion: { label: "Trabaja con nosotros", title: "Postula a nuestro equipo", subtitle: "Completa tus datos y adjunta tu currículum.", submit: "Enviar postulación", Icon: Briefcase },
  pagos: { label: "Pagar mis cuentas", title: "Pagar mis cuentas", subtitle: "Déjanos tus datos para que el equipo de HMC te contacte, confirme tu saldo y te indique cómo pagar.", submit: "Solicitar contacto", Icon: Receipt },
} as const;

const helpText: Record<ContactMode, string> = {
  cotizacion: "Evita incluir diagnósticos, fichas clínicas u otros datos médicos sensibles.",
  opiniones: "Evita incluir diagnósticos, fichas clínicas u otros datos médicos sensibles.",
  postulacion: "Usa solo los datos necesarios para tu postulación.",
  pagos: "El equipo podrá enviarte un enlace de pago o los datos para transferir.",
};

export function EvaluationSection() {
  const formHeading = useRef<HTMLHeadingElement>(null);
  const revealOnModeChange = useRef(false);
  const captcha = useRef<Captcha>(null);
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [token, setToken] = useState("");
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mode, setMode] = useState<ContactMode>("cotizacion");
  const [location, setLocation] = useState("");
  const active = modes[mode];

  function revealForm() {
    formHeading.current?.focus({ preventScroll: true });
    formHeading.current?.scrollIntoView({ block: "start" });
  }

  useEffect(() => {
    if (!revealOnModeChange.current) return;
    revealOnModeChange.current = false;
    revealForm();
  }, [mode]);

  function changeMode(next: ContactMode) {
    if (pending) return;
    const shouldReveal = window.matchMedia("(max-width: 880px)").matches;
    if (next === mode) {
      if (shouldReveal) revealForm();
      return;
    }
    revealOnModeChange.current = shouldReveal;
    if (widgetId.current !== null) captcha.current?.reset(widgetId.current);
    setToken("");
    setErrors({});
    setNotice("");
    setLocation("");
    setMode(next);
  }

  function renderCaptcha() {
    const api = (window as Window & { grecaptcha?: Captcha }).grecaptcha;
    if (!api || !widget.current || !siteKey || widgetId.current !== null) return;
    captcha.current = api;
    widgetId.current = api.render(widget.current, {
      sitekey: siteKey,
      size: widget.current.clientWidth < 310 ? "compact" : "normal",
      callback: (value) => { setToken(value); setNotice(""); },
      "expired-callback": () => { setToken(""); setNotice("La verificación venció. Vuelve a marcar reCAPTCHA."); },
      "error-callback": () => { setToken(""); setNotice("No se pudo cargar reCAPTCHA. Revisa tu conexión y recarga la página."); },
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const currentErrors = validateContact(mode, data, true);
    setErrors(currentErrors);
    const firstError = Object.entries(currentErrors).find(([, message]) => message)?.[0];
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement | null)?.focus();
      setNotice("Revisa los campos indicados.");
      return;
    }
    if (!siteKey) return setNotice("Los campos son válidos. Falta configurar reCAPTCHA; no se envió ni se guardó la solicitud.");
    if (!token) return setNotice("Completa la verificación de reCAPTCHA para continuar.");
    setPending(true);
    setNotice("Verificando…");
    const body = new URLSearchParams();
    for (const key of Object.keys(currentErrors)) {
      const value = data.get(key);
      if (typeof value === "string") body.set(key, value);
    }
    body.set("modo", mode);
    body.set("captcha", token);
    try {
      const response = await fetch("/api/evaluacion", { method: "POST", body, signal: AbortSignal.timeout(10000) });
      const result = await response.json();
      setNotice(result.message || "No se pudo verificar la solicitud.");
    } catch {
      setNotice("No se pudo verificar la solicitud. Inténtalo de nuevo.");
    } finally {
      if (widgetId.current !== null) captcha.current?.reset(widgetId.current);
      setToken("");
      setPending(false);
    }
  }

  function fieldProps(name: string, required = true) {
    return { name, required, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `eval-error-${name}` : undefined, onChange: () => { if (errors[name]) setErrors((current) => ({ ...current, [name]: "" })); } };
  }

  function errorText(name: string) {
    return errors[name] ? <small className={styles.error} id={`eval-error-${name}`}>{errors[name]}</small> : null;
  }

  function selectField(name: string, label: string, options: string[], onValue?: (value: string) => void) {
    const props = fieldProps(name);
    return <label className={styles.field}><span>{label}*</span><select {...props} defaultValue="" onChange={(event) => { props.onChange(); onValue?.(event.target.value); }}><option value="" disabled>Selecciona una opción</option>{options.map((option, index) => <option key={option} value={index + 1}>{option}</option>)}</select>{errorText(name)}</label>;
  }

  return (
    <section className={styles.section} id="contacto" aria-labelledby="contact-title">
      <div className={styles.layout}>
        <div data-replay className={styles.copy}>
          <p className={styles.eyebrow}>Atención domiciliaria</p>
          <h2 id="contact-title">Estamos <strong>para ayudarte</strong></h2>
          <p className={styles.intro}>Elige cómo quieres comunicarte con nosotros.</p>
          <div className={styles.modeList} role="group" aria-label="Motivo de contacto">
            {(Object.keys(modes) as ContactMode[]).map((id) => {
              const { label, Icon } = modes[id];
              return <button key={id} type="button" aria-pressed={id === mode} aria-controls="evaluation-fields" disabled={pending} onClick={() => changeMode(id)}><Icon size={22} aria-hidden="true" /><span>{label}</span><ArrowRight size={17} aria-hidden="true" /></button>;
            })}
          </div>
        </div>
        <form data-replay className={styles.form} aria-labelledby="evaluation-title" method="post" action="/api/evaluacion" onSubmit={handleSubmit}>
          <div id="evaluation-fields" key={mode} className={styles.modePanel}>
            <h3 id="evaluation-title" ref={formHeading} tabIndex={-1} aria-live="polite">{active.title}</h3>
            <p className={styles.subtitle}>{active.subtitle} Los campos con * son obligatorios.</p>
            <input type="hidden" name="modo" value={mode} />
            <div className={styles.grid}>
              {mode === "opiniones" && <>
                {selectField("categoria", "Categoría", categories)}
                {selectField("area", "Área", areas)}
              </>}
              {mode === "postulacion" && <>
                {selectField("especialidad", "Especialidad", specialties)}
                {selectField("ubicacion", "¿Dónde quieres postular?", locations, setLocation)}
                {location === "4" && <label className={`${styles.field} ${styles.wide}`}><span>Indica la ubicación*</span><input {...fieldProps("otraUbicacion")} maxLength={80} />{errorText("otraUbicacion")}</label>}
              </>}
              <label className={styles.field}><span>{mode === "cotizacion" || mode === "pagos" ? "Nombre y apellido" : "Nombre"}*</span><input {...fieldProps("nombre")} autoComplete={mode === "postulacion" ? "given-name" : "name"} maxLength={100} />{errorText("nombre")}</label>
              {mode === "postulacion" ? <label className={styles.field}><span>Apellidos*</span><input {...fieldProps("apellidos")} autoComplete="family-name" maxLength={100} />{errorText("apellidos")}</label>
                : <label className={styles.field}><span>Teléfono*</span><input {...fieldProps("telefono")} type="tel" autoComplete="tel" maxLength={25} placeholder="+56 9 1234 5678" />{errorText("telefono")}</label>}
              <label className={`${styles.field} ${mode === "cotizacion" ? "" : styles.wide}`}><span>Correo electrónico*</span><input {...fieldProps("correo")} type="email" autoComplete="email" maxLength={254} />{errorText("correo")}</label>
              {mode === "cotizacion" && <>
                <label className={styles.field}><span>Servicio de interés*</span><select {...fieldProps("servicio")} defaultValue=""><option value="" disabled>Selecciona un servicio</option>{interests.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select>{errorText("servicio")}</label>
                <label className={`${styles.field} ${styles.wide}`}><span>Comuna*</span><input {...fieldProps("comuna")} autoComplete="address-level3" maxLength={80} placeholder="Comuna del domicilio" />{errorText("comuna")}</label>
              </>}
              {mode === "postulacion" ? <>
                <label className={`${styles.field} ${styles.wide}`}><span>Comentarios (opcional)</span><textarea {...fieldProps("comentarios", false)} rows={3} maxLength={1000} />{errorText("comentarios")}</label>
                <label className={`${styles.field} ${styles.wide}`}><span>Currículum*</span><input {...fieldProps("cv")} type="file" accept=".pdf,.doc,.docx" aria-describedby={errors.cv ? "cv-help eval-error-cv" : "cv-help"} /><small id="cv-help">PDF, DOC o DOCX · Hasta 5 MB. El archivo no se sube en esta vista.</small>{errorText("cv")}</label>
              </> : mode !== "pagos" && <label className={`${styles.field} ${styles.wide}`}><span>{mode === "cotizacion" ? "Cuéntanos sobre tu necesidad" : "Mensaje"}*</span><textarea {...fieldProps("mensaje")} rows={3} maxLength={1000} placeholder="Cuéntanos brevemente" />{errorText("mensaje")}</label>}
            </div>
            <p className={styles.help}>{helpText[mode]}</p>
          </div>
          {siteKey ? <><div className={styles.captcha} ref={widget} /><Script src="https://www.google.com/recaptcha/api.js?render=explicit&hl=es" onReady={renderCaptcha} onError={() => setNotice("No se pudo cargar reCAPTCHA. Recarga la página para volver a intentar.")} /></> : <p className={styles.captchaPlaceholder}>reCAPTCHA pendiente de configuración</p>}
          <button className={styles.button} type="submit" disabled={pending}>{pending ? "Verificando…" : active.submit} <ArrowRight size={21} aria-hidden="true" /></button>
          <p className={styles.preview}>Vista local · No envía ni almacena solicitudes.</p>
          <p className={styles.notice} role="status">{notice}</p>
        </form>
        <div className={styles.brand}>
          <Image src="/logo-hmc.png" alt="Home Medical Clinic" width={259} height={100} />
          <p>Experiencia en salud, más cerca de ti.</p>
          <InlineSocialLinks />
        </div>
      </div>
    </section>
  );
}
