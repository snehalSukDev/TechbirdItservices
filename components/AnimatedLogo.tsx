"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export default function AnimatedLogo({ size = 36, className = "" }: AnimatedLogoProps) {
  const controls = useAnimation();
  const filterRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const uid = "liquid-logo";

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1400; // ms

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    function tick(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);

      // Turbulence goes from 0.06 → 0
      const freq = 0.06 * (1 - eased);
      // Displacement scale goes from 30 → 0
      const scale = 30 * (1 - eased);

      if (filterRef.current) {
        filterRef.current.setAttribute("baseFrequency", String(freq.toFixed(4)));
      }
      if (dispRef.current) {
        dispRef.current.setAttribute("scale", String(scale.toFixed(2)));
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    // Kick off Framer Motion reveal
    controls.start({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    // Kick off SVG liquid distortion
    requestAnimationFrame(tick);
  }, [controls]);

  return (
    <>
      {/* Hidden SVG filter — liquid goo effect */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id={uid} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={filterRef}
              type="turbulence"
              baseFrequency="0.06"
              numOctaves="3"
              result="noise"
              seed="5"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feComposite in="displaced" in2="SourceGraphic" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.75, filter: "blur(8px)" }}
        animate={controls}
        className={`flex-shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          filter: `url(#${uid})`,
          willChange: "filter, transform, opacity",
        }}
      >
        <Image
          src="/logo.png"
          alt="WebTech Logo"
          width={size}
          height={size}
          priority
          className="object-contain w-full h-full drop-shadow-lg"
        />
      </motion.div>
    </>
  );
}
