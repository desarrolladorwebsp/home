"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CalendarDots } from "@phosphor-icons/react";
import { validatePersonalDetails } from "@/lib/evaluation";

const specialties = ["Medicina", "Enfermería", "Kinesiología", "Necesito orientación"];
const times = Array.from({ length: 9 }, (_, index) => `${String(index + 9).padStart(2, "0")}:00`);
const chileClock = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Santiago",
  dateStyle: "short",
  timeStyle: "short",
});
const displayDate = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const personalFields = [
  { name: "nombre", label: "Nombre y apellido", type: "text", autoComplete: "name", maxLength: 100 },
  { name: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel", maxLength: 25 },
  { name: "correo", label: "Correo electrónico", type: "email", autoComplete: "email", maxLength: 254 },
  { name: "comuna", label: "Comuna", type: "text", autoComplete: "address-level3", maxLength: 80 },
] as const;

type Selection = { date: string; time: string; specialty: string };
type PersonalErrors = Partial<ReturnType<typeof validatePersonalDetails>>;

export function BookingStrip() {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [errors, setErrors] = useState<PersonalErrors>({});
  const [notice, setNotice] = useState("");
  const dateField = useRef<HTMLInputElement>(null);
  const detailsTitle = useRef<HTMLLegendElement>(null);

  function editSelection() {
    setSelection(null);
    setNotice("");
    requestAnimationFrame(() => dateField.current?.focus());
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setNotice("");

    if (!selection) {
      const date = String(data.get("fecha") ?? "");
      const time = String(data.get("hora") ?? "");
      const specialty = String(data.get("especialidad") ?? "");
      const day = new Date(`${date}T00:00:00Z`).getUTCDay();
      if (!Number.isInteger(day) || day === 0 || day === 6) {
        setNotice("Elige una fecha de lunes a viernes.");
        dateField.current?.focus();
        return;
      }
      if (!times.includes(time) || !specialties.includes(specialty) || `${date} ${time}` <= chileClock.format(new Date())) {
        setNotice("Elige una fecha y hora futuras y selecciona una especialidad.");
        return;
      }
      setErrors({});
      setSelection({ date, time, specialty });
      requestAnimationFrame(() => detailsTitle.current?.focus());
      return;
    }

    if (`${selection.date} ${selection.time}` <= chileClock.format(new Date())) {
      editSelection();
      setNotice("La hora elegida ya pasó. Selecciona otra.");
      return;
    }

    const validation = validatePersonalDetails(data);
    setErrors(validation);
    const firstError = Object.entries(validation).find(([, message]) => message);
    if (firstError) {
      setNotice("Revisa los datos indicados.");
      (form.elements.namedItem(firstError[0]) as HTMLElement | null)?.focus();
      return;
    }

    setNotice("Datos validados para la vista de prueba. No se agendó ni se envió una solicitud.");
  }

  return (
    <section className="booking" id="agenda" aria-labelledby="booking-title">
      <div className="booking__panel">
        <div className="booking__intro">
          <CalendarDots size={42} weight="duotone" aria-hidden="true" />
          <div>
            <h2 id="booking-title">Solicita atención domiciliaria</h2>
            <p>Elige un horario de preferencia para tu evaluación.</p>
          </div>
          <dl className="booking__hours">
            <div><dt>Lunes a viernes</dt><dd>09:00 – 18:00</dd></div>
          </dl>
        </div>
        <form className="booking__action" method="post" onSubmit={submit} aria-labelledby="booking-title">
          <fieldset hidden={Boolean(selection)} disabled={Boolean(selection)}>
            <legend>Paso 1 de 2 · Fecha, hora y especialidad</legend>
            <div className="booking__fields">
              <label>Día y fecha<input ref={dateField} type="date" name="fecha" required /></label>
              <label>Hora <small>(Chile continental)</small>
                <select name="hora" defaultValue="" required>
                  <option value="" disabled>Selecciona una hora</option>
                  {times.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
              </label>
              <label className="booking__wide">Especialidad
                <select name="especialidad" defaultValue="" required>
                  <option value="" disabled>Selecciona una especialidad</option>
                  {specialties.map(specialty => <option key={specialty} value={specialty}>{specialty}</option>)}
                </select>
              </label>
            </div>
          </fieldset>
          <fieldset hidden={!selection} disabled={!selection}>
            <legend ref={detailsTitle} tabIndex={-1}>Paso 2 de 2 · Tus datos de contacto</legend>
            {selection && (
              <div className="booking__summary">
                <p>{displayDate.format(new Date(`${selection.date}T00:00:00Z`))} · {selection.time} · {selection.specialty}</p>
                <button type="button" onClick={editSelection}>Cambiar selección</button>
              </div>
            )}
            <div className="booking__fields">
              {personalFields.map(({ name, label, type, autoComplete, maxLength }) => (
                <label key={name}>{label}
                  <input
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    required
                    aria-invalid={Boolean(errors[name])}
                    aria-describedby={errors[name] ? `booking-error-${name}` : undefined}
                    onChange={() => setErrors(previous => ({ ...previous, [name]: "" }))}
                  />
                  {errors[name] && <small className="booking__error" id={`booking-error-${name}`}>{errors[name]}</small>}
                </label>
              ))}
            </div>
          </fieldset>
          <button className="booking__button" type="submit">
            {selection ? "Validar solicitud" : "Continuar"} <ArrowRight size={20} aria-hidden="true" />
          </button>
          <p className="booking__hint">Vista de prueba. No confirma una cita.</p>
          <p className="booking__notice" role="status">{notice}</p>
        </form>
      </div>
    </section>
  );
}
