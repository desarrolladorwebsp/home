"use client";

import Image from "next/image";
import { Pause, Play } from "@phosphor-icons/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import motion from "./hero-motion.module.css";
import styles from "./hero-photos.module.css";

const photos = [
  { src: "/hospitalizacion-domiciliaria-hero.webp", framing: styles.original },
  { src: "/hmc-hero-rehabilitacion-pared-clara.webp", framing: styles.rehabilitation },
  { src: "/hmc-hero-familia-pared-clara.webp", framing: styles.family },
];
const rotationInterval = 3000;
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

export function HeroPhotos() {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );
  const [playback, setPlayback] = useState<boolean | null>(null);
  const [slide, setSlide] = useState({ current: 0, previous: -1 });
  const loaded = useRef<boolean[]>([]);
  const playing = playback ?? !reducedMotion;
  const toggleLabel = playing ? "Pausar fotos" : "Reproducir fotos";

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;

      const ready = loaded.current.slice();
      setSlide((active) => {
        // Keep a decoded photo on screen if an incoming photo is still loading.
        for (let offset = 1; offset < photos.length; offset++) {
          const next = (active.current + offset) % photos.length;
          if (ready[next]) return { current: next, previous: active.current };
        }
        return active;
      });
    }, rotationInterval);

    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <>
      <div className="hero__photo" aria-hidden="true">
        {photos.map(({ src, framing }, index) => (
          <div
            key={src}
            className={`${styles.frame} ${framing}`}
            data-slide={index}
            data-state={index === slide.current ? "current" : index === slide.previous ? "previous" : "waiting"}
            data-fade={index === slide.current && slide.previous >= 0 ? "true" : undefined}
          >
            <Image
              src={src}
              alt=""
              fill
              preload={index === 0}
              fetchPriority={index === 0 ? undefined : "low"}
              quality={index === 0 ? 90 : 75}
              sizes="100vw"
              className={`object-cover ${index === 0 ? motion.photo : ""}`}
              onLoad={() => { loaded.current[index] = true; }}
              onError={() => { loaded.current[index] = false; }}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.toggle}
        aria-label={toggleLabel}
        title={toggleLabel}
        onClick={() => setPlayback(!playing)}
      >
        {playing ? <Pause size={17} weight="fill" aria-hidden="true" /> : <Play size={17} weight="fill" aria-hidden="true" />}
      </button>
    </>
  );
}
