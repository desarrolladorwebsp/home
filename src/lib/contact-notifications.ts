import type { ContactMode } from "./evaluation";
import { socialProfiles } from "./social-profiles";

type Contact = { name: string; email: string };
type ContactNotice =
  | (Contact & { mode: "cotizacion"; phone: string; service: string; commune: string })
  | (Contact & { mode: "postulacion"; specialty: string; location: string })
  | (Contact & { mode: "opiniones"; phone: string; category: string; area: string })
  | (Contact & { mode: "pagos"; phone: string });

type EmailContent = {
  subject: string;
  intro: string;
  body: string;
  icon: ContactMode | "confirmation";
  details?: ReadonlyArray<readonly [label: string, value: string]>;
};

type EmailBrand = {
  website: string;
  assets: string;
};

const confirmation = {
  cotizacion: {
    subject: "Recibimos tu solicitud de cotización",
    intro: "Gracias por solicitar una cotización a Home Medical Clinic.",
    body: "Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo para orientarte y confirmar los próximos pasos.",
  },
  postulacion: {
    subject: "Recibimos tu postulación",
    intro: "Gracias por tu interés en trabajar con Home Medical Clinic.",
    body: "Nuestro equipo revisará tu postulación y se pondrá en contacto contigo si necesitamos más información o si avanzas a una siguiente etapa.",
  },
  opiniones: {
    subject: "Recibimos tu mensaje",
    intro: "Gracias por compartir tu experiencia con Home Medical Clinic.",
    body: "Derivaremos tu mensaje al área correspondiente. Si necesitamos más información o corresponde darte una respuesta, te contactaremos por este medio.",
  },
  pagos: {
    subject: "Recibimos tu consulta de pago",
    intro: "Gracias por contactar a Home Medical Clinic a través de «Pagar mis cuentas».",
    body: "Nuestro equipo revisará tu consulta y te contactará para confirmar el saldo y orientarte sobre los medios de pago disponibles.",
  },
} satisfies Record<ContactMode, Omit<EmailContent, "icon" | "details">>;

const internal = {
  cotizacion: {
    subject: "Nueva solicitud de cotización",
    intro: "Se recibió una solicitud desde el formulario de cotización de HMC.",
    body: "Contacta a la persona para conocer sus necesidades y coordinar la cotización.",
  },
  postulacion: {
    subject: "Nueva postulación laboral",
    intro: "Se recibió una postulación desde «Trabaja con nosotros».",
    body: "Revisa la especialidad y ubicación de interés antes de dar seguimiento.",
  },
  opiniones: {
    subject: "Nuevo mensaje de experiencia",
    intro: "Se recibió un mensaje desde el formulario de reclamos, sugerencias y felicitaciones.",
    body: "Deriva el mensaje al área indicada y coordina la respuesta cuando corresponda.",
  },
  pagos: {
    subject: "Nueva consulta de pago",
    intro: "Se recibió una solicitud de contacto desde «Pagar mis cuentas».",
    body: "Valida la identidad de la persona y revisa su cuenta antes de informar saldos o instrucciones de pago.",
  },
} satisfies Record<ContactMode, Omit<EmailContent, "icon" | "details">>;

const networkNames = {
  facebook: "Facebook",
  youtube: "YouTube",
  instagram: "Instagram",
  linkedin: "LinkedIn",
} satisfies Record<keyof typeof socialProfiles, string>;

const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => htmlEntities[character]);
}

function httpsUrl(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    throw new Error("Configura una URL HTTPS pública para el correo de HMC.");
  }
  return url;
}

function contactDetails(notice: ContactNotice): NonNullable<EmailContent["details"]> {
  const contact = [
    ["Nombre", notice.name],
    ["Correo electrónico", notice.email],
  ] as const;

  switch (notice.mode) {
    case "cotizacion":
      return [...contact, ["Teléfono", notice.phone], ["Servicio de interés", notice.service], ["Comuna", notice.commune]];
    case "postulacion":
      return [...contact, ["Especialidad", notice.specialty], ["Ubicación", notice.location]];
    case "opiniones":
      return [...contact, ["Teléfono", notice.phone], ["Categoría", notice.category], ["Área", notice.area]];
    case "pagos":
      return [...contact, ["Teléfono", notice.phone]];
  }
}

function renderEmail(content: EmailContent, brand: EmailBrand, greeting: string) {
  const { subject, intro, body, icon, details } = content;
  const site = httpsUrl(brand.website);
  const assetBase = httpsUrl(brand.assets);
  const asset = (name: string) => escapeHtml(new URL(`/email/${name}.png`, assetBase).href);
  const socialIcons = (Object.keys(networkNames) as Array<keyof typeof networkNames>).map((network) =>
    `<td style="padding:4px 4px 0 0">
      <a href="${escapeHtml(socialProfiles[network])}" style="display:block;width:44px;height:44px;background-color:#ffffff;border:1px solid #cfe0d5;border-radius:8px;color:#104e39;text-align:center;text-decoration:none">
        <img src="${asset(network)}" width="24" height="24" alt="${networkNames[network]} de Home Medical Clinic" style="display:block;margin:10px auto;border:0;font-size:10px;color:#104e39">
      </a>
    </td>`).join("");

  const summary = details ? `
    <h2 style="font-size:18px;line-height:25px;margin:0 0 10px">Datos de contacto y derivación</h2>
    <table role="presentation" class="details" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#edf4e8" style="background-color:#edf4e8;border-radius:8px;table-layout:fixed;margin-bottom:20px">
      <tr><td style="padding:16px 18px">
        ${details.map(([label, value]) => `<p style="margin:0 0 10px;overflow-wrap:anywhere;word-break:break-word"><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value)}</p>`).join("")}
      </td></tr>
    </table>` : "";

  const html = `<!doctype html>
<html lang="es-CL" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${escapeHtml(subject)}</title>
  <style>
    :root { color-scheme:light dark; supported-color-schemes:light dark; }
    @media only screen and (max-width:480px) {
      .frame { padding:12px 8px !important; }
      .pad { padding-right:18px !important; padding-left:18px !important; }
      .title { font-size:23px !important; line-height:29px !important; }
    }
    @media (prefers-color-scheme:dark) {
      .canvas { background-color:#101b17 !important; }
      .panel,.copy { background-color:#192a23 !important;color:#f3f9f5 !important; }
      .panel { border-color:#3b5648 !important; }
      .details,.footer { background-color:#223a30 !important;color:#f3f9f5 !important; }
      .web-link { color:#d8f2e3 !important; }
    }
    [data-ogsc] .canvas { background-color:#101b17 !important; }
    [data-ogsc] .panel,[data-ogsc] .copy { background-color:#192a23 !important;color:#f3f9f5 !important; }
    [data-ogsc] .details,[data-ogsc] .footer { background-color:#223a30 !important;color:#f3f9f5 !important; }
    [data-ogsc] .web-link { color:#d8f2e3 !important; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#eef3ef">
  <div class="canvas" lang="es-CL" dir="ltr" style="background-color:#eef3ef;font-family:Arial,Helvetica,sans-serif">
    <div style="display:none;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">${escapeHtml(subject)} · Home Medical Clinic</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="frame" align="center" style="padding:30px 12px">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
        <table role="presentation" class="panel" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:600px;background-color:#ffffff;border:1px solid #ceded4;border-radius:14px;overflow:hidden">
          <tr><td class="pad copy" style="padding:20px 26px;background-color:#ffffff;color:#243b54">
            <img src="${asset("logo-hmc")}" width="156" height="60" alt="Home Medical Clinic" style="display:block;border:0;border-radius:6px;background-color:#ffffff;color:#104e39">
          </td></tr>
          <tr><td class="pad" bgcolor="#104e39" style="padding:19px 26px;background-color:#104e39;color:#ffffff">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="40" valign="middle"><img src="${asset(icon)}" width="30" height="30" alt="" style="display:block;border:0"></td>
                <td valign="middle"><h1 class="title" style="font-size:27px;line-height:34px;font-weight:700;color:#ffffff;margin:0">${escapeHtml(subject)}</h1></td>
              </tr>
            </table>
          </td></tr>
          <tr><td class="pad copy" style="padding:24px 26px;background-color:#ffffff;color:#243b54;font-size:16px;line-height:25px">
            <p style="margin:0 0 12px">${escapeHtml(greeting)}</p>
            <p style="margin:0 0 12px">${escapeHtml(intro)}</p>
            ${summary}
            <p style="margin:0 0 18px">${escapeHtml(body)}</p>
            <p style="margin:0">Saludos,<br><strong>Equipo Home Medical Clinic</strong></p>
          </td></tr>
          <tr><td class="pad footer" style="padding:17px 26px 20px;border-top:1px solid #cfe0d5;background-color:#edf4e8;color:#243b54;font-size:14px;line-height:20px">
            <a class="web-link" href="${escapeHtml(site.href)}" style="color:#104e39;font-weight:700;text-decoration:underline">Sitio web de Home Medical Clinic</a>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${socialIcons}</tr></table>
          </td></tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td></tr>
    </table>
  </div>
</body>
</html>`;

  const text = [
    subject,
    greeting,
    intro,
    details?.map(([label, value]) => `${label} — ${value}`).join("\n"),
    body,
    "Saludos,\nEquipo Home Medical Clinic",
    `Sitio web de Home Medical Clinic — ${site.href}`,
    ...Object.entries(socialProfiles).map(([network, url]) => `${networkNames[network as keyof typeof networkNames]} — ${url}`),
  ].filter(Boolean).join("\n\n");

  return { subject, html, text };
}

export function customerConfirmation(mode: ContactMode, brand: EmailBrand) {
  return renderEmail({ ...confirmation[mode], icon: "confirmation" }, brand, "Hola,");
}

export function internalNotification(notice: ContactNotice, brand: EmailBrand) {
  return renderEmail({
    ...internal[notice.mode],
    icon: notice.mode,
    details: contactDetails(notice),
  }, brand, "Hola, equipo:");
}
