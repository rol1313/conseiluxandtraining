"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionOffset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
