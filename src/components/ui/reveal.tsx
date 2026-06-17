"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLiteMode } from "@/hooks/use-lite-mode";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
};

// Desktop: fade + rise + de-blur. Mobile/lite: simple opacity+y (no blur).
const fullVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const liteVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut", delay: Math.min(delay, 0.1) },
  }),
};

export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const lite = useLiteMode();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={lite ? liteVariants : fullVariants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const lite = useLiteMode();
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      variants={{ show: { transition: { staggerChildren: lite ? 0.03 : stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = fullVariants;
