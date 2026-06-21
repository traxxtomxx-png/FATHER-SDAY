import { motion } from "motion/react";
import { RotateCcw, Heart } from "lucide-react";
import { contentConfig } from "../content";
import BrandSeal from "./BrandSeal";
import Sparkle from "./Sparkle";

interface SceneLetterProps {
  onReset: () => void;
}

const BALLOONS_DATA = [
  { id: 1, left: "1.5%", size: 42, delay: 0, speed: 8.5, color: "#FFA4B4" },
  { id: 2, left: "95.5%", size: 48, delay: 1.8, speed: 10.0, color: "#9BC4EA" },
  { id: 3, left: "3%", size: 38, delay: 0.6, speed: 12.0, color: "#E0B86B" },
  { id: 4, left: "97%", size: 44, delay: 2.2, speed: 9.0, color: "#D98880" },
  { id: 5, left: "4.5%", size: 40, delay: 1.1, speed: 11.0, color: "#76D7C4" },
  { id: 6, left: "98.5%", size: 52, delay: 3.1, speed: 9.5, color: "#C39BD3" },
  { id: 7, left: "2%", size: 36, delay: 0.9, speed: 10.5, color: "#FFA4B4" },
  { id: 8, left: "96%", size: 50, delay: 2.6, speed: 8.0, color: "#9BC4EA" },
  { id: 9, left: "3.5%", size: 42, delay: 4.2, speed: 11.5, color: "#E0B86B" },
  { id: 10, left: "97.5%", size: 46, delay: 3.6, speed: 8.8, color: "#76D7C4" },
];

function FireworkBurst({ delay = 0 }: { delay: number }) {
  const particles = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * (360 / 16) * Math.PI) / 180;
    const distance = 45 + Math.random() * 55;
    return {
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      color: ["#E0B86B", "#9BC4EA", "#FFA4B4", "#C39BD3", "#FACC15", "#10B981"][i % 6],
    };
  });

  return (
    <div className="relative w-0 h-0 pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: p.dx,
            y: p.dy,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{
            duration: 1.4,
            delay: delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 1.6,
          }}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}` }}
        />
      ))}
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{
          duration: 1.1,
          delay: delay,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1.9,
        }}
        className="absolute w-8 h-8 -ml-4 -mt-4 border border-[#E0B86B]/30 rounded-full"
      />
    </div>
  );
}

export default function SceneLetter({ onReset }: SceneLetterProps) {
  const { finalLetter } = contentConfig;

  return (
    <div className="w-full flex flex-col items-center py-6 px-4 select-none relative overflow-hidden">
      {/* Floating Balloons flying across the full viewport! */}
      {BALLOONS_DATA.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "110vh", opacity: 0.9 }}
          animate={{
            y: "-120vh",
            x: [0, 15, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            y: {
              duration: b.speed,
              repeat: Infinity,
              delay: b.delay,
              ease: "linear",
            },
            x: {
              duration: b.speed / 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: b.speed / 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute pointer-events-none z-10"
          style={{ left: b.left }}
        >
          <div 
            className="relative flex flex-col items-center"
          >
            {/* Glossy spherical balloon body */}
            <div 
              className="rounded-full shadow-[inset_-6px_-8px_18px_rgba(0,0,0,0.25),inset_4px_4px_12px_rgba(255,255,255,0.55),0_10px_20px_rgba(0,0,0,0.15)] relative flex-shrink-0"
              style={{ 
                width: b.size, 
                height: b.size * 1.05, 
                backgroundColor: b.color 
              }}
            >
              {/* Glossy interior highlighted ellipse reflection in top left */}
              <div className="absolute top-[12%] left-[15%] w-[24%] h-[24%] bg-white/70 rounded-full z-20 pointer-events-none filter blur-[0.2px]" />
            </div>
            {/* Balloon knot tie nozzle */}
            <div 
              className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[7px] -mt-[1px] relative z-10 flex-shrink-0"
              style={{ borderBottomColor: b.color }}
            />
            {/* Fine stylized string below */}
            <div className="w-[1px] h-16 bg-slate-300/45 mt-[1px] flex-shrink-0" />
          </div>
        </motion.div>
      ))}

      {/* Firework Burst Stations on the sides of the stationary letter card */}
      <div className="absolute left-4 md:-left-12 top-1/4 z-20">
        <FireworkBurst delay={0} />
      </div>
      <div className="absolute right-4 md:-right-12 top-1/3 z-20">
        <FireworkBurst delay={0.8} />
      </div>
      <div className="absolute left-6 md:-left-8 top-2/3 z-20">
        <FireworkBurst delay={1.5} />
      </div>
      <div className="absolute right-6 md:-right-8 top-[80%] z-20">
        <FireworkBurst delay={2.2} />
      </div>
      {/* Tiny tracked-out descriptive header */}
      <span className="font-sans text-[10px] uppercase font-bold tracking-[0.16em] text-slate/70 mb-5 select-none">
        {finalLetter.eyebrow}
      </span>

      {/* Floating Sparkles decorative widgets */}
      <div className="absolute top-12 left-10">
        <Sparkle color="blue" size={22} delay={0.1} />
      </div>

      {/* Structured paper stationery back-card */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", damping: 18 }}
        className="w-full max-w-[350px] bg-[#FCFBF8] border-[1.5px] border-mustard-gold/20 rounded-[28px] shadow-[0_12px_36px_rgba(30,42,58,0.05)] p-7 md:p-8 flex flex-col gap-5 relative"
      >
        {/* Floating corner stamp */}
        <div className="absolute top-6 right-6 opacity-90 select-none scale-100 hover:scale-105 transition-transform duration-300">
          <BrandSeal variant="gold" size={64} text="SEAL OF DEVOTION" />
        </div>

        {/* Salutation dear recipient heading */}
        <h3 className="font-script text-sky-blue text-2.5xl font-bold text-left pt-3">
          {finalLetter.salutation}
        </h3>

        {/* Dashed line divider with center star */}
        <div className="flex items-center gap-3 w-full my-1">
          <div className="h-[1px] bg-slate/10 flex-1 border-t border-dashed" />
          <Sparkle color="gold" size={14} />
          <div className="h-[1px] bg-slate/10 flex-1 border-t border-dashed" />
        </div>

        {/* Intimate left-aligned body paragraphs */}
        <div className="flex flex-col gap-4 text-left font-sans text-[14px] leading-relaxed text-slate tracking-wide">
          {finalLetter.paragraphs.map((para, idx) => (
            <p key={idx} className="first-letter:uppercase first-letter:font-serif first-letter:text-navy">
              {para}
            </p>
          ))}
        </div>

        {/* Micro heart divider */}
        <div className="flex justify-center py-2 text-dusty-rose">
          <Heart size={20} className="fill-dusty-rose animate-pulse" />
        </div>

        {/* Handwritten sign-off blocks */}
        <div className="text-left pt-2">
          <p className="font-script text-sky-blue text-xl font-bold">
            {finalLetter.signOff}
          </p>
          <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-navy mt-1">
            {finalLetter.sender}
          </p>
        </div>
      </motion.div>

      {/* Bottom Footer block containing resetting capabilities */}
      <div className="mt-10 flex flex-col items-center gap-3 w-full max-w-[350px]">
        {/* Author sign of footers */}
        <p className="font-sans text-[10px] uppercase font-bold tracking-[0.14em] text-slate/50 select-none text-center">
          {finalLetter.footer}
        </p>

        {/* Start-again rotation button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
          className="py-2.5 px-6 rounded-full bg-cream-dark hover:bg-cream-dark/80 text-navy font-sans text-xs font-bold tracking-wider flex items-center gap-2 border border-navy/10 hover:border-navy/20 transition-all shadow-sm cursor-pointer mt-2"
          id="final-letter-restart-btn"
        >
          <RotateCcw size={13} className="stroke-[2.5]" />
          start again
        </motion.button>
      </div>
    </div>
  );
}
