import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { contentConfig, Note } from "../content";
import Sparkle from "./Sparkle";

interface SceneCardsProps {
  onComplete: () => void;
}

function FlipCard({
  item,
  index,
}: {
  item: Note;
  index: number;
  key?: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Border and badge color cycling gold -> blue -> gold
  const isBlue = index === 1;
  const borderColorClass = isBlue
    ? "border-sky-blue/50 shadow-sky-blue/5"
    : "border-mustard-gold/50 shadow-mustard-gold/5";
  const badgeColorClass = isBlue ? "bg-sky-blue text-white" : "bg-mustard-gold text-white";

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="w-full h-64 cursor-pointer perspective-[1000px] select-none"
      id={`flip-card-${index}`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 16 }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT PORTION OF CARD (CLOSED) */}
        <div
          className={`absolute inset-0 bg-[#FCFBF8] border-[1.5px] ${borderColorClass} rounded-[24px] shadow-[0_8px_20px_rgba(30,42,58,0.04)] p-6 flex flex-col justify-between`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top Row: Circular Badge */}
          <div className="flex justify-between items-center">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center font-serif text-xs font-bold ${badgeColorClass}`}
            >
              {index + 1}
            </span>
            <Sparkle color={isBlue ? "blue" : "gold"} size={14} />
          </div>

          {/* Centered Emoji Icon with decorative doodle circle */}
          <div className="flex flex-col items-center justify-center flex-1 py-4">
            <div className="w-20 h-20 rounded-full bg-cream-dark/60 flex items-center justify-center border border-dashed border-slate/15 relative">
              <span className="text-4xl filter drop-shadow-sm">{item.icon}</span>
              
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-sky-blue/10 animate-ping opacity-25" />
            </div>
          </div>

          {/* Tap Prompt Label */}
          <p className="text-center font-sans text-[10px] font-extrabold tracking-widest text-slate/50 uppercase">
            ✦ tap to reveal ✦
          </p>
        </div>

        {/* BACK PORTION OF CARD (REVEALED / FLIPPED) */}
        <div
          className={`absolute inset-0 bg-[#FCFBF8] border-[1.5px] ${borderColorClass} rounded-[24px] shadow-[0_12px_28px_rgba(30,42,58,0.08)] p-6 flex flex-col justify-between text-center overflow-y-auto`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top Row: Small Caps Header Label */}
          <p className="font-sans text-[10px] font-bold tracking-widest text-slate/80 uppercase select-none pb-2 border-b border-dashed border-slate/10">
            {item.label}
          </p>

          {/* Centered handwritten card body note */}
          <p className="font-script text-[19px] leading-relaxed text-navy py-4 flex-1 flex items-center justify-center font-medium">
            {item.note}
          </p>

          {/* Bottom flipped signifier */}
          <div className="flex justify-center">
            <span className="text-xs text-dusty-rose">♥</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SceneCards({ onComplete }: SceneCardsProps) {
  const [fullyTriggered, setFullyTriggered] = useState(false);

  return (
    <div className="w-full flex flex-col items-center py-4 px-4 text-center select-none">
      {/* Sparkles decorations */}
      <div className="absolute top-10 right-10">
        <Sparkle color="pink" size={22} delay={0.4} />
      </div>

      {/* Pill Eyebrow */}
      <div className="inline-flex items-center px-4 py-1 bg-dusty-rose/10 text-dusty-rose text-[11px] font-sans font-bold tracking-[0.12em] rounded-full uppercase mb-3">
        {contentConfig.recipient.eyebrowNotes}
      </div>

      {/* Serif heading & script instructional captions */}
      <h2 className="font-serif text-3xl md:text-3.5xl text-navy tracking-tight leading-tight lowercase font-medium mb-1 max-w-sm">
        {contentConfig.notesSection.heading}
      </h2>
      <p className="font-script text-sky-blue text-lg tracking-wide mb-8">
        {contentConfig.notesSection.caption}
      </p>

      {/* Three vertical/horizontal columns flip cards deck */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-[340px] sm:max-w-xl pb-6">
        {contentConfig.notesSection.notes.map((item, idx) => (
          <FlipCard key={item.id} item={item} index={idx} />
        ))}
      </div>

      {/* Interactive Dot pagination markers decor */}
      <div className="flex gap-2 justify-center items-center py-4">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-sky-blue" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
      </div>

      {/* Next transition CTA pill buttons */}
      <div className="mt-8 select-none w-full max-w-[340px]">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 px-6 rounded-full bg-sky-blue hover:bg-sky-blue-hover text-white font-serif tracking-normal text-base uppercase flex items-center justify-center gap-2 shadow-[0_6px_20px_-4px_rgba(74,144,217,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(74,144,217,0.5)] cursor-pointer"
          onClick={onComplete}
          id="notes-next-btn"
        >
          continue my story <ArrowRight size={18} className="inline stroke-[2.5]" />
        </motion.button>
      </div>
    </div>
  );
}
