"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnimationReplay() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = document.querySelectorAll<HTMLElement>("[data-replay]");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (motionPreference.matches) continue;
        if (!entry.isIntersecting) {
          entry.target.setAttribute("data-motion-out", "");
        } else if (entry.intersectionRatio >= 0.12) {
          entry.target.removeAttribute("data-motion-out");
        }
      }
    }, { threshold: [0, 0.12] });

    function syncMotionPreference() {
      observer.disconnect();
      for (const element of elements) {
        element.removeAttribute("data-motion-out");
        if (!motionPreference.matches) observer.observe(element);
      }
    }

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", syncMotionPreference);
      for (const element of elements) element.removeAttribute("data-motion-out");
    };
  }, [pathname]);

  return null;
}
