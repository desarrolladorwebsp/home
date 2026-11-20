import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AnimationReplay } from "@/components/animation-replay";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SocialLinks } from "@/components/social-links";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Medical Clinic | Hospitalización domiciliaria",
  description: "Atención médica especializada en la comodidad y seguridad de tu hogar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
        <AnimationReplay />
        <SocialLinks />
      </body>
    </html>
  );
}
