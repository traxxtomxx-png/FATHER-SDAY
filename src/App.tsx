import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { contentConfig } from "./content";
import SceneEnvelope from "./components/SceneEnvelope";
import SceneHero from "./components/SceneHero";
import GallerySection from "./components/GallerySection";
import SceneCards from "./components/SceneCards";
import SceneClosing from "./components/SceneClosing";
import SceneLetter from "./components/SceneLetter";

export default function App() {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [customAudioName, setCustomAudioName] = useState<string | null>(null);

  const renderActiveScene = () => {
    switch (currentScene) {
      case 0:
        return (
          <SceneEnvelope
            onOpenComplete={() => setCurrentScene(1)}
          />
        );
      case 1:
        return (
          <SceneHero
            onNext={() => setCurrentScene(2)}
            customAudioUrl={customAudioUrl}
            setCustomAudioUrl={setCustomAudioUrl}
            customAudioName={customAudioName}
            setCustomAudioName={setCustomAudioName}
          />
        );
      case 2:
        return (
          <GallerySection
            memories={contentConfig.gallery.memories}
            subtitle={contentConfig.gallery.subtitle}
            eyebrowEmoji={contentConfig.gallery.eyebrowEmoji}
            onComplete={() => setCurrentScene(3)}
          />
        );
      case 3:
        return (
          <SceneCards
            onComplete={() => setCurrentScene(4)}
          />
        );
      case 4:
        return (
          <SceneClosing
            onNext={() => setCurrentScene(5)}
          />
        );
      case 5:
        return (
          <SceneLetter
            onReset={() => setCurrentScene(0)}
          />
        );
      default:
        return <SceneEnvelope onOpenComplete={() => setCurrentScene(1)} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F0] bg-gradient-to-b from-[#FAF7F0] to-[#F5F0E6] text-navy flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <audio id="global-audio" src={customAudioUrl || "/Papa Meri Jaan Animal 128 Kbps.mp3"} preload="metadata" loop />
      
      {/* Ambient Background Elements from the Design Spec (shown on desktop only for premium visual polish) */}
      <div className="hidden lg:block absolute top-12 left-12 w-48 h-64 bg-white rotate-[-6deg] p-3 pb-5 shadow-[0_12px_28px_rgba(30,42,58,0.08)] border border-[#9BC4EA]/30 rounded-xs select-none hover:rotate-[-2deg] transition-transform duration-500 group">
        <div className="w-full h-44 bg-slate-100 rounded-sm overflow-hidden mb-3">
          <img 
            src="/photos/then.jpeg" 
            alt="then memory" 
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-[11px] text-[#5B6573] font-serif italic text-center">then</p>
      </div>

      <div className="hidden lg:block absolute bottom-12 right-12 w-48 h-64 bg-white rotate-[8deg] p-3 pb-5 shadow-[0_12px_28px_rgba(30,42,58,0.08)] border border-[#E0B86B]/30 rounded-xs select-none hover:rotate-[3deg] transition-transform duration-500 group">
        <div className="w-full h-44 bg-slate-100 rounded-sm overflow-hidden mb-3">
          <img 
            src="/photos/now.jpeg" 
            alt="now memory" 
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-[11px] text-[#5B6573] font-serif italic text-center">now</p>
      </div>

      {/* Floating Sparkles in Background */}
      <div className="absolute top-20 right-[15%] text-[#D4A24C] text-[32px] opacity-30 select-none animate-[pulse_3s_infinite_alternate]">✦</div>
      <div className="absolute bottom-32 left-[15%] text-[#4A90D9] text-[28px] opacity-30 select-none animate-[pulse_4s_infinite_alternate]">✦</div>

      {/* Intimate ambient atmosphere background blurs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-dusty-rose/5 rounded-full blur-[64px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-sky-blue/5 rounded-full blur-[72px] pointer-events-none select-none" />

      {/* Main columns frame structured perfectly for mobile-first centering */}
      <div className="w-full max-w-md relative flex flex-col items-center justify-center z-10 py-6 min-h-[85vh]">
        
        {/* Subtle timeline track showing user story progress */}
        {currentScene > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 0.5, y: 0 }}
            whileHover={{ opacity: 0.9 }}
            className="flex gap-2.5 items-center justify-center mb-6 select-none transition-opacity duration-300 h-8"
            id="app-timeline-indicators"
          >
            {[1, 2, 3, 4, 5].map((step) => {
              const isActive = currentScene >= step;
              return (
                <div
                  key={step}
                  className={`h-[3px] rounded-full transition-all duration-500 ease-out ${
                    isActive ? "bg-navy w-5" : "bg-navy/15 w-2"
                  }`}
                  title={`Story beat ${step}`}
                />
              );
            })}
          </motion.div>
        )}

        {/* Scenic carousel component layout with AnimatePresence */}
        <div className="w-full flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex flex-col items-center justify-center"
              id={`story-scene-${currentScene}`}
            >
              {renderActiveScene()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Design Script Hint at Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#5B6573]/50 text-[10px] uppercase tracking-[0.2em] font-bold select-none pointer-events-none text-center">
        tap to advance & open letters ✦
      </div>
    </div>
  );
}
