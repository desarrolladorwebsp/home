import { isContactMode, validateContact } from "@/lib/evaluation";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site" ||
      (origin && origin !== new URL(request.url).origin)) {
    return Response.json({ message: "Origen de solicitud no permitido." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.startsWith("application/x-www-form-urlencoded")) {
    return Response.json({ message: "Formato no admitido." }, { status: 415 });
  }
  const reader = request.body?.getReader();
  if (!reader) return Response.json({ message: "Completa el formulario." }, { status: 400 });
  let size = 0;
  const decoder = new TextDecoder();
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24_000) {
        await reader.cancel();
        return Response.json({ message: "La solicitud supera el tamaño permitido." }, { status: 413 });
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } catch {
    return Response.json({ message: "No se pudo leer la solicitud." }, { status: 400 });
  }

  const fields = new FormData();
  for (const [key, value] of new URLSearchParams(body)) fields.append(key, value);
  const mode = fields.get("modo");
  if (!isContactMode(mode) || Object.values(validateContact(mode, fields)).some(Boolean)) {
    return Response.json({ message: "Revisa los campos del formulario." }, { status: 400 });
  }
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const hostnames = process.env.RECAPTCHA_ALLOWED_HOSTNAMES?.split(",").map((host) => host.trim().toLowerCase()).filter(Boolean);
  if (!secret || !hostnames?.length) {
    return Response.json({ message: "reCAPTCHA aún no está configurado." }, { status: 503 });
  }
  const token = fields.get("captcha");
  if (typeof token !== "string" || !token.trim() || token.length > 4096) {
    return Response.json({ message: "Completa la verificación de reCAPTCHA." }, { status: 400 });
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("siteverify failed");
    const result = await response.json();
    if (result.success !== true || typeof result.hostname !== "string" || !hostnames.includes(result.hostname.toLowerCase())) {
      return Response.json({ message: "No se pudo verificar reCAPTCHA. Inténtalo de nuevo." }, { status: 400 });
    }
    return Response.json({ message: "Datos y reCAPTCHA validados. Esta vista de prueba no envió ni guardó tu solicitud." });
  } catch {
    return Response.json({ message: "El servicio de verificación no está disponible. Inténtalo más tarde." }, { status: 503 });
  }
}
