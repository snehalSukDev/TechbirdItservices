"use client";

import { useEffect, useRef } from "react";

const SECTION_IDS = ["hero", "trustedby", "services", "about", "portfolio", "process", "testimonials", "blog"];
const COOLDOWN = 900;

export default function ForceScroll() {
  const locked = useRef(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    /* skip on touch-primary devices */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const getSections = () =>
      SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const getActiveIdx = (els: HTMLElement[]) => {
      const scrollTop = window.scrollY + 60;
      let best = 0;
      for (let i = els.length - 1; i >= 0; i--) {
        const top = els[i].getBoundingClientRect().top + window.scrollY;
        if (top <= scrollTop) { best = i; break; }
      }
      return best;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 15) return; /* ignore trackpad micro-scrolls */
      const now = Date.now();
      if (locked.current || now - lastScroll.current < COOLDOWN) return;

      const els = getSections();
      if (!els.length) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const cur = getActiveIdx(els);
      const next = Math.max(0, Math.min(els.length - 1, cur + dir));
      if (next === cur) return;

      e.preventDefault();
      locked.current = true;
      lastScroll.current = now;

      els[next].scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => { locked.current = false; }, COOLDOWN);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return null;
}
