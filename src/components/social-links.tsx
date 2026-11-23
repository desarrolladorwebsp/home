"use client";

import { useScrollDirection } from "@/lib/use-scroll-direction";
import { socialProfiles } from "@/lib/social-profiles";
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
      <a className="social-links__facebook" href={socialProfiles.facebook} target="_blank" rel="noopener noreferrer"
        aria-label="Facebook de Home Medical Clinic" title="Facebook">
        <FacebookLogo size={22} weight="fill" aria-hidden="true" />
      </a>
      <a className="social-links__youtube" href={socialProfiles.youtube} target="_blank" rel="noopener noreferrer"
        aria-label="YouTube de Home Medical Clinic" title="YouTube">
        <YoutubeLogo size={22} weight="fill" aria-hidden="true" />
      </a>
      <a className="social-links__instagram" href={socialProfiles.instagram} target="_blank" rel="noopener noreferrer"
        aria-label="Instagram de Home Medical Clinic" title="Instagram">
        <InstagramLogo size={22} aria-hidden="true" />
      </a>
      <a className="social-links__linkedin" href={socialProfiles.linkedin} target="_blank" rel="noopener noreferrer"
        aria-label="LinkedIn de Home Medical Clinic" title="LinkedIn">
        <LinkedinLogo size={22} weight="fill" aria-hidden="true" />
      </a>
    </>
  );
}
