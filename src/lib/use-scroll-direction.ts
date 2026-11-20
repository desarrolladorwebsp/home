"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(keepVisible?: () => boolean) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;

    function onScroll() {
      const currentY = Math.max(0, window.scrollY);
      if (Math.abs(currentY - previousY) < 8 && currentY > 80) return;
      setHidden(currentY > previousY && currentY > 80 && !keepVisible?.());
      previousY = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [keepVisible]);

  return hidden;
}
