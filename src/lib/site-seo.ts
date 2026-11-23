import type { Metadata } from "next";

export const siteName = "Home Medical Clinic";
export const siteOrigin = new URL(
  process.env.SITE_URL?.trim() || "https://home-rose-psi.vercel.app",
).origin;
export const isIndexable = process.env.VERCEL_ENV !== "preview";

export const sitePages = {
  "/": {
    title: "Hospitalización y atención domiciliaria en Chile",
    description: "Home Medical Clinic ofrece hospitalización domiciliaria, rehabilitación y cuidados clínicos en casa. Conoce nuestros servicios y solicita un presupuesto.",
  },
  "/servicios": {
    title: "Servicios de atención domiciliaria",
    description: "Conoce los servicios de Home Medical Clinic en casa, desde hospitalización y rehabilitación hasta curaciones, cuidados paliativos y apoyo nutricional.",
  },
  "/nosotros": {
    title: "Nosotros y nuestros especialistas",
    description: "Conoce al equipo de Home Medical Clinic y cómo sus profesionales de medicina, enfermería y kinesiología coordinan la atención domiciliaria.",
  },
  "/preguntas-frecuentes": {
    title: "Preguntas frecuentes sobre atención domiciliaria",
    description: "Resuelve dudas sobre el ingreso a hospitalización domiciliaria, la solicitud de servicios, la cobertura de Isapres y la disponibilidad por región.",
  },
  "/contacto": {
    title: "Contacto y oficinas administrativas",
    description: "Solicita una cotización de atención domiciliaria o consulta los teléfonos, horarios y oficinas de Home Medical Clinic en Santiago, Concepción y Temuco.",
  },
  "/etica-y-cumplimiento": {
    title: "Centro de Ayuda Ética y Cumplimiento",
    description: "Consulta el canal oficial de denuncias de Home Medical Clinic, sus códigos de conducta y los manuales de prevención.",
  },
  "/politicas-y-condiciones": {
    title: "Políticas y condiciones",
    description: "Conoce los principios de seguridad de la información de Home Medical Clinic y consulta sus recursos institucionales.",
  },
} as const;

export function siteUrl(path: string) {
  return new URL(path, siteOrigin).href;
}

export function pageMetadata(path: keyof typeof sitePages): Metadata {
  const page = sitePages[path];
  const title = `${page.title} | ${siteName}`;
  const url = siteUrl(path);
  const image = {
    url: siteUrl("/seo/hmc-social.jpg"),
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: "Home Medical Clinic. Atención clínica en casa con una profesional, una paciente y su familiar.",
  };

  return {
    title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_CL",
      siteName,
      title,
      description: page.description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
