import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { contentConfig } from "../content";
import BrandSeal from "./BrandSeal";
import Sparkle from "./Sparkle";

interface SceneEnvelopeProps {
  onOpenComplete: () => void;
}

interface ConfettiParticle {
  id: number;
  symbol: string;
  x: number;
  y: number;
  rotate: number;
  color: string;
}

export default function SceneEnvelope({ onOpenComplete }: SceneEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Create a bursts of celebration emojis flanking outward
    const symbols = ["⭐", "🏆", "🏅", "🎗️", "✦", "💖", "✨"];
    const colors = ["text-mustard-gold", "text-sky-blue", "text-dusty-rose"];
    const list: ConfettiParticle[] = [];

    for (let i = 0; i < 12; i++) {
      // Choose random angles and distances for diagonal radial bursts
      const angle = (i * 30 + Math.random() * 15) * (Math.PI / 180);
      const distance = 80 + Math.random() * 120;
      list.push({
        id: i,
        symbol: symbols[i % symbols.length],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 40, // offset upward slightly
        rotate: Math.random() * 360,
        color: colors[i % colors.length],
      });
    }
    setParticles(list);

    // Dynamic delay to let flap flip and letter slide out completely before advance
    setTimeout(() => {
      onOpenComplete();
    }, 1800);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[75vh] py-8 text-center select-none">
      {/* Decorative top sparkles */}
      <div className="absolute top-10 left-10">
        <Sparkle color="gold" size={24} delay={0.2} />
      </div>
      <div className="absolute top-20 right-6">
        <Sparkle color="blue" size={20} delay={0.5} />
      </div>

      {/* Pill Eyebrow Label */}
      <div className="inline-flex items-center px-4 py-1 bg-dusty-rose/10 text-dusty-rose text-[11px] font-sans font-bold tracking-[0.12em] rounded-full uppercase mb-4 shadow-sm">
        {contentConfig.envelope.eyebrow}
      </div>

      {/* Primary serif greeting headlines */}
      <h1 className="font-serif text-3.5xl md:text-4.5xl text-navy tracking-tight lowercase font-medium leading-tight mb-2 max-w-sm">
        {contentConfig.envelope.heading}
      </h1>

      {/* Handwritten cursive invitation blue subtitle */}
      <p className="font-script text-sky-blue text-2xl font-bold tracking-wide mb-8">
        {contentConfig.envelope.subheading}
      </p>

      {/* Interactive Envelope Container Stage */}
      <div
        onClick={handleOpen}
        className="relative w-[280px] h-[220px] my-6 cursor-pointer flex items-center justify-center group"
        id="envelope-gate-stage"
      >
        {/* Floating Confetti bursting particles overlay */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, scale: 0.5, opacity: 1, rotate: 0 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [1, 1.2, 0.8],
                opacity: 0,
                rotate: p.rotate,
              }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className={`absolute text-2xl z-30 pointer-events-none select-none ${p.color}`}
            >
              {p.symbol}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* --- PHYSICAL LETTER INHERITANCE (Slides out from envelope pocket) --- */}
        <motion.div
          animate={
            isOpening
              ? { y: -120, scale: 0.95, opacity: 1, zIndex: 10 }
              : { y: 0, scale: 0.85, opacity: 0.8, zIndex: 5 }
          }
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
          className="absolute w-[86%] h-[80%] bg-[#FCFBF8] border border-mustard-gold/20 rounded-[12px] shadow-[0_8px_20px_-4px_rgba(30,42,58,0.1)] flex flex-col items-center justify-center p-4 z-5"
        >
          <motion.div
            animate={isOpening ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Heart size={38} className="text-dusty-rose fill-dusty-rose animate-pulse" />
          </motion.div>
          <p className="font-sans text-[10px] tracking-widest text-[#B28A43] font-bold mt-2 uppercase select-none">
            A STORY FOR YOU
          </p>
        </motion.div>

        {/* --- HAND-DRAWN ENVELOPE SVG BODY --- */}
        <div className="absolute inset-0 w-full h-full z-15 pointer-events-none">
          <svg
            viewBox="0 0 100 80"
            className="w-full h-full drop-shadow-[0_12px_28px_rgba(30,42,58,0.08)] filter"
          >
            {/* Base Envelope pocket (back fill) */}
            <path
              d="M2 12 C2 9 4 7 7 7 H93 C96 7 98 9 98 12 V70 C98 73 96 75 93 75 H7 C4 75 2 73 2 70 Z"
              fill="#FFFFFF"
              stroke="#B3CDE4"
              strokeWidth="0.8"
            />

            {/* Inner side wings flaps */}
            <path d="M2 12 L48 45 C49 46 51 46 52 45 L98 12" fill="none" stroke="#CEDEEB" strokeWidth="0.6" />
            
            {/* Bottom triangular flap */}
            <path d="M2 70 L48 41 C49 40 51 40 52 41 L98 70" fill="#FCFAF2" stroke="#B3CDE4" strokeWidth="0.7" />

            {/* Top flap line path */}
            {!isOpening && (
              <path
                d="M2 12 C2 12 30 38 48 42 C49 42.2 51 42.2 52 42 C70 38 98 12 98 12"
                fill="#FAF9F4"
                stroke="#B3CDE4"
                strokeWidth="0.8"
              />
            )}
          </svg>
        </div>

        {/* --- WAX SEAL (Flaps cover or sit centered) --- */}
        <div className="absolute inset-0 flex items-center justify-center z-22">
          <motion.div
            animate={
              isOpening
                ? { scale: [1, 1.2, 0], opacity: 0, rotate: 120 }
                : { y: 22 }
            }
            transition={{ duration: 0.45 }}
            className="origin-center"
          >
            <BrandSeal variant="gold" size={78} />
          </motion.div>
        </div>

        {/* Gentle background bobbing/hover glow guidelines */}
        <div className="absolute inset-[-4px] rounded-[32px] border border-dashed border-sky-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Floating Sparkle at lower left of envelope */}
      <div className="absolute bottom-20 left-12">
        <Sparkle color="pink" size={18} delay={0.9} />
      </div>

      {/* Click instructional CTA */}
      <motion.p
        animate={
          isOpening
            ? { opacity: 0, y: 10 }
            : {
                y: [0, -6, 0],
                opacity: [0.8, 1, 0.8],
              }
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="font-script text-slate font-medium text-lg tracking-wide mt-2 select-none"
      >
        {contentConfig.envelope.caption}
      </motion.p>
    </div>
  );
}
