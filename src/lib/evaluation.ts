export const interests = [
  ["hospitalizacion", "Hospitalización domiciliaria"],
  ["cuidados", "Cuidados especializados"],
  ["rehabilitacion", "Rehabilitación"],
  ["procedimientos", "Procedimientos clínicos"],
  ["orientacion", "Necesito orientación"],
] as const;

function readField(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function validatePersonalDetails(data: FormData) {
  const name = readField(data, "nombre");
  const phone = readField(data, "telefono");
  const email = readField(data, "correo");
  const commune = readField(data, "comuna");
  const digits = phone.replace(/\D/g, "");
  return {
    nombre: name.length >= 2 && name.length <= 100 ? "" : "Ingresa tu nombre y apellido.",
    telefono: /^[+\d().\s-]{8,25}$/.test(phone) && digits.length >= 8 && digits.length <= 15 ? "" : "Ingresa un teléfono válido.",
    correo: email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Ingresa un correo electrónico válido.",
    comuna: commune.length >= 2 && commune.length <= 80 ? "" : "Ingresa la comuna del domicilio.",
  };
}

export function validateEvaluation(data: FormData) {
  const service = readField(data, "servicio");
  const message = readField(data, "mensaje");
  return {
    ...validatePersonalDetails(data),
    servicio: interests.some(([value]) => value === service) ? "" : "Selecciona un servicio.",
    mensaje: message.length >= 5 && message.length <= 1000 ? "" : "Describe tu necesidad en 5 a 1000 caracteres.",
  };
}

export const specialties = ["Auxiliar para enfermería", "Enfermería", "Kinesiología", "Otros profesionales de la salud"];
export const locations = ["Santiago", "Temuco", "Concepción", "Otra ubicación"];
export const categories = ["Felicitaciones", "Sugerencias", "Reclamos"];
export const areas = ["Comercial", "Facturación y cobranzas", "Auxiliares", "Enfermería", "Kinesiología", "Equipos Médicos", "Abastecimiento (insumos y medicamentos)", "Otro"];
export const cvLimit = 5 * 1024 * 1024;
export type ContactMode = "cotizacion" | "opiniones" | "postulacion" | "pagos";

export function isContactMode(value: unknown): value is ContactMode {
  return value === "cotizacion" || value === "opiniones" || value === "postulacion" || value === "pagos";
}

export function validateContact(mode: ContactMode, data: FormData, checkFile = false): Record<string, string> {
  const base = validateEvaluation(data);
  if (mode === "cotizacion") return base;
  if (mode === "pagos") return { nombre: base.nombre, telefono: base.telefono, correo: base.correo };
  const read = (key: string) => { const value = data.get(key); return typeof value === "string" ? value.trim() : ""; };
  const inList = (key: string, list: string[]) => list.some((_, i) => read(key) === String(i + 1));
  if (mode === "opiniones") {
    return {
      categoria: inList("categoria", categories) ? "" : "Selecciona una categoría.",
      area: inList("area", areas) ? "" : "Selecciona un área.",
      nombre: base.nombre ? "Ingresa tu nombre." : "",
      telefono: base.telefono,
      correo: base.correo,
      mensaje: base.mensaje ? "Escribe un mensaje de 5 a 1000 caracteres." : "",
    };
  }
  const cv = data.get("cv");
  return {
    especialidad: inList("especialidad", specialties) ? "" : "Selecciona una especialidad.",
    ubicacion: inList("ubicacion", locations) ? "" : "Selecciona una ubicación.",
    ...(read("ubicacion") === "4" ? {
      otraUbicacion: read("otraUbicacion").length >= 2 && read("otraUbicacion").length <= 80 ? "" : "Indica dónde quieres postular.",
    } : {}),
    nombre: base.nombre ? "Ingresa tu nombre." : "",
    apellidos: read("apellidos").length >= 2 && read("apellidos").length <= 100 ? "" : "Ingresa tus apellidos.",
    correo: base.correo,
    comentarios: read("comentarios").length <= 1000 ? "" : "Usa hasta 1000 caracteres.",
    ...(checkFile ? { cv: typeof cv !== "string" && cv && cv.size > 0 && cv.size <= cvLimit && /\.(pdf|docx?)$/i.test(cv.name) ? "" : "Adjunta un PDF, DOC o DOCX de hasta 5 MB." } : {}),
  };
}
