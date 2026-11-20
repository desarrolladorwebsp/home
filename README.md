This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Vista local del formulario de evaluación

Configura estas variables en `.env.local` (sin subirlo al repositorio):

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: clave pública de un reCAPTCHA v2 (casilla).
- `RECAPTCHA_SECRET_KEY`: secreto del mismo sitio, solo en el servidor.
- `RECAPTCHA_ALLOWED_HOSTNAMES`: lista separada por comas, sin protocolo ni puerto. Usa el hostname exacto registrado y utilizado para acceder (por ejemplo, `localhost` en pruebas).

Reinicia el servidor de desarrollo o vuelve a compilar después de cambiar la clave pública. El servidor valida el formulario y el token. Google solo recibe el token y el secreto de verificación, no los campos del formulario. No hay entrega ni almacenamiento de solicitudes.

El bloque de contacto ofrece cotización, reclamos y sugerencias, y postulación laboral. Los tres comparten reCAPTCHA cuando está configurado. En postulación, el currículum se selecciona y valida (extensión y tamaño) solo en el navegador: no se transmite al servidor ni a Google. Antes de habilitar postulaciones reales se debe definir el canal de recepción, la privacidad y la validación segura de adjuntos en el servidor.
