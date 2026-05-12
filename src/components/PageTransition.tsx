"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode, useState, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const easeTransition: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeTransition,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.99,
    transition: {
      duration: 0.3,
      ease: easeTransition,
    },
  },
};

const overlayVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 0,
    transition: {
      duration: 0.5,
      ease: easeTransition,
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.3,
      ease: easeTransition,
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    // Skip animation on first mount
    if (isFirstMount) {
      setIsFirstMount(false);
    }
  }, [isFirstMount]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={isFirstMount ? false : "initial"}
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        {children}

        {/* Overlay transition effect */}
        <motion.div
          variants={overlayVariants}
          className="fixed inset-0 bg-gradient-to-b from-primary to-primary-dark pointer-events-none z-50"
          style={{ originY: 1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
