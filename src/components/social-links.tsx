"use client";

import { useScrollDirection } from "@/lib/use-scroll-direction";
import { FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react";

export function SocialLinks() {
  const hidden = useScrollDirection();

  return (
    <aside className={hidden ? "social-links social-links--hidden" : "social-links"} aria-label="Redes sociales de HMC">
      <SocialLinkItems />
    </aside>
  );
}

export function InlineSocialLinks() {
  return (
    <nav className="social-links-inline" aria-label="Redes sociales de HMC en contacto">
      <SocialLinkItems />
    </nav>
  );
}

function SocialLinkItems() {
  return (
    <>
      <a className="social-links__facebook" href="https://www.facebook.com/profile.php?id=61595149133544" target="_blank" rel="noopener noreferrer"
        aria-label="Facebook de Home Medical Clinic" title="Facebook">
        <FacebookLogo size={22} weight="fill" aria-hidden="true" />
      </a>
      <a className="social-links__youtube" href="https://www.youtube.com/@hmc_cl" target="_blank" rel="noopener noreferrer"
        aria-label="YouTube de Home Medical Clinic" title="YouTube">
        <YoutubeLogo size={22} weight="fill" aria-hidden="true" />
      </a>
      <a className="social-links__instagram" href="https://www.instagram.com/hmc_cl/" target="_blank" rel="noopener noreferrer"
        aria-label="Instagram de Home Medical Clinic" title="Instagram">
        <InstagramLogo size={22} aria-hidden="true" />
      </a>
      <button className="social-links__linkedin" type="button" disabled aria-label="LinkedIn, enlace pendiente"
        title="LinkedIn · enlace pendiente">
        <LinkedinLogo size={22} weight="fill" aria-hidden="true" />
      </button>
    </>
  );
}
