"use client";

import { useState, useSyncExternalStore } from "react";
import { Play, Stop } from "@phosphor-icons/react";
import styles from "./page.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

export function HeroVideo({ videoId, preview }: { videoId: string; preview: boolean }) {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );
  const [playback, setPlayback] = useState<boolean | null>(null);
  const playing = playback ?? !reducedMotion;

  return (
    <>
      {playing && (
        <div className={styles.videoFrame} aria-hidden="true">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&playsinline=1&rel=0`}
            title={preview ? "Video de prueba sobre atención domiciliaria" : "Video del equipo de Home Medical Clinic"}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </div>
      )}
      {preview && <span className={styles.previewLabel}>Video de prueba</span>}
      <button
        type="button"
        className={styles.videoToggle}
        onClick={() => setPlayback(!playing)}
      >
        {playing ? <Stop size={16} weight="fill" aria-hidden="true" /> : <Play size={16} weight="fill" aria-hidden="true" />}
        {playing ? "Detener video" : "Reproducir video"}
      </button>
    </>
  );
}
