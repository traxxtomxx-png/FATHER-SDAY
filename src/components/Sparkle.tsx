import { motion } from "motion/react";

interface SparkleProps {
  color?: "gold" | "blue" | "pink";
  size?: number;
  delay?: number;
  className?: string;
}

export default function Sparkle({
  color = "gold",
  size = 18,
  delay = 0,
  className = "",
}: SparkleProps) {
  const colorMap = {
    gold: "text-mustard-gold",
    blue: "text-sky-blue",
    pink: "text-dusty-rose",
  };

  return (
    <motion.span
      className={`inline-block select-none pointer-events-none ${colorMap[color]} ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -4, 0],
        opacity: [0.6, 1, 0.6],
        scale: [0.9, 1.1, 0.9],
      }}
      transition={{
        duration: 3 + delay * 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
      </svg>
    </motion.span>
  );
}
