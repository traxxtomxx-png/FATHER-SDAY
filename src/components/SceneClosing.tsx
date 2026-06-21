import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { contentConfig } from "../content";
import BrandSeal from "./BrandSeal";
import Sparkle from "./Sparkle";

interface SceneClosingProps {
  onNext: () => void;
}

export default function SceneClosing({ onNext }: SceneClosingProps) {
  return (
    <div className="w-full flex items-center justify-center py-6 px-4 select-none">
      {/* Container Card Frame with soft shadows and double borders */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative w-full max-w-[350px] bg-[#FCFBF8] border-[1.5px] border-mustard-gold/30 rounded-[28px] shadow-[0_16px_40px_rgba(30,42,58,0.06)] p-8 text-center"
      >
        {/* Sparkles flanking diagonal card corners */}
        <div className="absolute -top-3 -left-3">
          <Sparkle color="gold" size={24} delay={0.2} />
        </div>
        <div className="absolute -bottom-3 -right-3">
          <Sparkle color="blue" size={22} delay={0.8} />
        </div>

        {/* Center wax stamp on card centerhead */}
        <div className="flex justify-center mb-6">
          <BrandSeal variant="rose" size={96} text="WITH DEEPEST GRATITUDE" />
        </div>

        {/* Serif Headings */}
        <h2 className="font-serif text-3.5xl text-navy leading-tight lowercase font-semibold mb-4">
          {contentConfig.closing.heading}
        </h2>

        {/* Muted warm paragraph narration */}
        <p className="font-sans text-[14.5px] leading-relaxed text-slate px-1.5 mb-8">
          {contentConfig.closing.body}
        </p>

        {/* Inner double border divider effect block */}
        <div className="relative py-4 flex items-center justify-center my-2 select-none">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-[1px] bg-sky-blue/15 border-t border-dashed" />
          </div>
          <span className="relative px-3 bg-[#FCFBF8] text-mustard-gold font-serif italic text-sm">
            with all my heart · ✦
          </span>
        </div>

        {/* Big pill call to action transition */}
        <div className="mt-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-4 px-6 rounded-full bg-sky-blue hover:bg-sky-blue-hover text-white font-serif tracking-normal text-base uppercase flex items-center justify-center gap-2 shadow-[0_6px_20px_-4px_rgba(74,144,217,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(74,144,217,0.5)] transition-all cursor-pointer"
            onClick={onNext}
            id="closing-next-btn"
          >
            read my letter <ArrowRight size={18} className="inline stroke-[2.5]" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
