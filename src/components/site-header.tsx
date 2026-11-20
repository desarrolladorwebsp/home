"use client";

import { useCallback, useRef } from "react";
import { useScrollDirection } from "@/lib/use-scroll-direction";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, List } from "@phosphor-icons/react";

const navigation = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "FAQ", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "/contacto" },
] as const;

function NavigationLinks({ mobile = false, budgetHref }: { mobile?: boolean; budgetHref: string }) {
  return (
    <nav className={mobile ? "site-header__mobile-nav" : "site-header__nav"} aria-label="Navegación principal">
      {navigation.map((item) => (
        <Link key={item.label} href={item.href}>{item.label}</Link>
      ))}
      {mobile && (
        <Link className="site-header__mobile-cta" href={budgetHref}>
          Solicita tu presupuesto <ArrowRight aria-hidden="true" size={18} weight="bold" />
        </Link>
      )}
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const hasForm = pathname === "/" || pathname === "/servicios" || pathname === "/contacto" || pathname === "/preguntas-frecuentes";
  const budgetHref = hasForm ? "#contacto" : "/contacto#contacto";
  const menu = useRef<HTMLDetailsElement>(null);
  const keepVisible = useCallback(() => Boolean(menu.current?.open), []);
  const hidden = useScrollDirection(keepVisible);

  return (
    <header className={hidden ? "site-header site-header--hidden" : "site-header"}>
      <div className="site-header__inner">
        <Link className="site-header__brand" href="/#inicio" aria-label="Home Medical Clinic, inicio">
          <Image src="/logo-hmc.png" alt="Home Medical Clinic" width={259} height={100} priority />
        </Link>

        <NavigationLinks budgetHref={budgetHref} />

        <Link className="site-header__cta" href={budgetHref}>
          Solicita tu presupuesto <ArrowRight aria-hidden="true" size={18} weight="bold" />
        </Link>

        <details ref={menu} className="site-header__mobile-menu"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) menu.current?.removeAttribute("open");
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              menu.current?.removeAttribute("open");
              menu.current?.querySelector("summary")?.focus();
            }
          }}>
          <summary aria-label="Abrir menú de navegación"><List aria-hidden="true" size={27} /></summary>
          <NavigationLinks mobile budgetHref={budgetHref} />
        </details>
      </div>
    </header>
  );
}
