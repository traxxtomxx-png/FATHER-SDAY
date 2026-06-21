import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, Camera } from "lucide-react";
import { Memory } from "../content";
import Sparkle from "./Sparkle";

interface GallerySectionProps {
  eyebrowEmoji?: string;
  subtitle?: string;
  memories: Memory[];
  onComplete: () => void;
}

export default function GallerySection({
  eyebrowEmoji = "our little album",
  subtitle = "a few moments i never want to forget ♡",
  memories,
  onComplete,
}: GallerySectionProps) {
  const [localMemories, setLocalMemories] = useState<Memory[]>(memories);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    if (currentIndex < localMemories.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setLocalMemories((prev) =>
          prev.map((m, idx) => (idx === currentIndex ? { ...m, image: dataUrl } : m))
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const isLast = currentIndex === localMemories.length - 1;
  const activeMemory = localMemories[currentIndex];

  // Animation variants for standard polaroid slip
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir * 200,
      opacity: 0,
      scale: 0.95,
      rotate: dir * 4,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
        rotate: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir * -200,
      opacity: 0,
      scale: 0.95,
      rotate: dir * -4,
      transition: {
        x: { duration: 0.3 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
        rotate: { duration: 0.25 },
      },
    }),
  };

  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      {/* Hidden file input for real-time personalization */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
        id="gallery-file-uploader"
      />

      {/* Header section styled exactly as requested */}
      <div className="text-center mb-8 relative w-full">
        <div className="inline-flex items-center px-4 py-1 bg-dusty-rose/10 text-dusty-rose text-[11px] font-sans font-bold tracking-[0.12em] rounded-full uppercase mb-3 select-none">
          ♥ {eyebrowEmoji}
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-navy tracking-tight lowercase mb-2">
          our little album
        </h2>
        <div className="font-script text-sky-blue text-lg select-none">
          {subtitle}
        </div>
        <div className="w-20 h-[1.5px] border-b border-dashed border-sky-blue/30 mx-auto mt-4" />
      </div>

      {/* Main card stage with overlapping deck layout */}
      <div className="relative w-full max-w-[340px] aspect-[4/5] flex items-center justify-center select-none">
        
        {/* Decorative elements - twinkling corner sparkles */}
        <div className="absolute -top-4 -left-2 z-10">
          <Sparkle color="gold" size={24} delay={0.2} />
        </div>
        <div className="absolute -bottom-2 -right-2 z-10">
          <Sparkle color="blue" size={20} delay={0.8} />
        </div>

        {/* --- DECK EFFECT WORKFLOW --- */}
        {/* Next card peeking behind (deck effect under current layout specs) */}
        {currentIndex < localMemories.length - 1 && (
          <div
            className="absolute inset-0 bg-[#FCFBF8] border-[1.5px] border-amber-600/10 rounded-[24px] shadow-[0_12px_24px_-4px_rgba(30,42,58,0.06)] pointer-events-none transition-all duration-300 transform scale-[0.96] translate-y-[-14px] rotate-[2deg] opacity-75 z-0 flex flex-col p-4 pr-5 pb-12"
          >
            <div className="w-full h-[72%] bg-slate-200/40 rounded-[14px]" />
          </div>
        )}
        
        {/* Over-next card (third card) peeking slightly more behind */}
        {currentIndex < localMemories.length - 2 && (
          <div
            className="absolute inset-0 bg-[#FCFBF8] border-[1.5px] border-blue-600/5 rounded-[24px] pointer-events-none transform scale-[0.92] translate-y-[-24px] rotate-[-2.5deg] opacity-40 z-[-1]"
          />
        )}

        {/* Carousel Window */}
        <div className="w-full h-full z-10 relative flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeMemory.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 bg-[#FCFBF8] border-[1.5px] border-mustard-gold/40 rounded-[24px] shadow-[0_16px_36px_rgba(30,42,58,0.1)] p-4 flex flex-col justify-between overflow-hidden"
            >
              {/* Polaroid Photo Frame with custom shadow & borders */}
              <div 
                onClick={triggerFileInput}
                className="w-full relative h-[70%] overflow-hidden rounded-[14px] bg-slate-100 shadow-[inset_0_2px_8px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.02)] border border-navy/5 cursor-pointer group/photo"
                title="Tap to change to your own picture"
              >
                <img
                  src={activeMemory.image}
                  alt={`Memory ${activeMemory.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Modern subtle overlay prompt to upload client-side files */}
                <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Camera size={18} className="stroke-[2.5]" />
                  </div>
                  <span className="font-sans text-[10px] uppercase font-bold tracking-widest bg-navy/60 px-2.5 py-1 rounded-full">
                    upload own picture
                  </span>
                </div>

                {/* Always visible tiny indicator badge */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/45 backdrop-blur-xs text-white p-1.5 rounded-full shadow-sm md:opacity-75 group-hover/photo:opacity-100 transition-opacity">
                  <Camera size={12} />
                </div>
              </div>

              {/* Memory Label details */}
              <div className="text-center pt-3 flex flex-col items-center flex-1 justify-center">
                <p className="font-sans text-[10px] uppercase font-semibold tracking-widest text-slate/80 select-none pb-1.5 border-b border-dashed border-slate/10 w-24">
                  MEMORY 0{currentIndex + 1} / 0{localMemories.length}
                </p>
                
                {/* Handwritten customized memory caption styled exactly to design specs */}
                <p className="font-script text-[19px] leading-tight text-sky-blue px-2 pt-2.5 max-h-[64px] overflow-y-auto select-none font-medium">
                  {activeMemory.caption} ✦
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Flanking navigation Buttons overlay (White pill shadow buttons, hide on last item CTA replace) */}
        <div className="absolute inset-x-[-12px] flex items-center justify-between z-20 pointer-events-none md:inset-x-[-20px]">
          {/* Left Arrow button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-11 h-11 rounded-full bg-[#FCFBF8] border border-mustard-gold/15 shadow-[0_4px_12px_rgba(30,42,58,0.08)] flex items-center justify-center text-navy font-bold hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed scale-90" : "opacity-100"
            }`}
            id="gallery-btn-prev"
            title="Previous memory"
          >
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </button>

          {/* Right Arrow button */}
          <button
            onClick={handleNext}
            disabled={isLast}
            className={`w-11 h-11 rounded-full bg-[#FCFBF8] border border-mustard-gold/15 shadow-[0_4px_12px_rgba(30,42,58,0.08)] flex items-center justify-center text-navy font-bold hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer ${
              isLast ? "opacity-30 cursor-not-allowed scale-90" : "opacity-100"
            }`}
            id="gallery-btn-next"
            title="Next memory"
          >
            <ChevronRight size={20} className="stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Pagination indicator dots below */}
      <div className="flex gap-2.5 items-center justify-center mt-6 select-none">
        {localMemories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-sky-blue w-6 rounded-md shadow-sm"
                : "bg-slate/30 hover:bg-slate/55"
            }`}
            id={`gallery-dot-${idx}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Contextual Action Triggering / Next scene pill CTA */}
      <div className="mt-8 select-none w-full max-w-[340px]">
        {isLast ? (
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full py-3.5 px-6 rounded-full bg-sky-blue hover:bg-sky-blue-hover text-white font-serif font-medium tracking-wide flex items-center justify-center gap-2 shadow-[0_6px_20px_-4px_rgba(74,144,217,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(74,144,217,0.5)] cursor-pointer tracking-normal text-base uppercase"
            onClick={onComplete}
            id="gallery-btn-complete"
          >
            open the cards <ArrowRight size={16} className="inline stroke-[2.5]" />
          </motion.button>
        ) : (
          <button
            className="w-full py-3.5 px-6 rounded-full bg-slate/10 hover:bg-slate/15 text-navy font-serif font-medium tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer text-sm"
            onClick={handleNext}
            id="gallery-btn-advance-prompt"
          >
            next memory please →
          </button>
        )}
      </div>
    </div>
  );
}
