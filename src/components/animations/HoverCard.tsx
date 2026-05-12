"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  lift?: number;
}

const HoverCard = ({
  children,
  className = "",
  scale = 1.02,
  lift = -8,
}: HoverCardProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        y: lift,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;
