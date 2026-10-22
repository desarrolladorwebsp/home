"use client";

import Image from "next/image";
import { ArrowRight, List } from "@phosphor-icons/react";

const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
] as const;

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav className={mobile ? "site-header__mobile-nav" : "site-header__nav"} aria-label="Navegación principal">
      {navigation.map((item) => (
        <a key={item.label} href={item.href}>{item.label}</a>
      ))}
      {mobile && (
        <a className="site-header__mobile-cta" href="#agenda">
          Reserva tu hora <ArrowRight aria-hidden="true" size={18} weight="bold" />
        </a>
      )}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#inicio" aria-label="Home Medical Clinic, inicio">
          <Image src="/logo-hmc.png" alt="Home Medical Clinic" width={259} height={100} priority />
        </a>

        <NavigationLinks />

        <a className="site-header__cta" href="#agenda">
          Reserva tu hora <ArrowRight aria-hidden="true" size={18} weight="bold" />
        </a>

        <details className="site-header__mobile-menu">
          <summary aria-label="Abrir menú de navegación"><List aria-hidden="true" size={27} /></summary>
          <NavigationLinks mobile />
        </details>
      </div>
    </header>
  );
}
