import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, ArrowRight, Music, Heart, Settings, Upload, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { contentConfig } from "../content";
import BrandSeal from "./BrandSeal";
import Sparkle from "./Sparkle";

interface SceneHeroProps {
  onNext: () => void;
  customAudioUrl: string | null;
  setCustomAudioUrl: (url: string | null) => void;
  customAudioName: string | null;
  setCustomAudioName: (name: string | null) => void;
}

const PAPA_MERI_JAAN_SOURCES = [
  "/Papa Meri Jaan Animal 128 Kbps.mp3"
];

export default function SceneHero({ 
  onNext,
  customAudioUrl,
  setCustomAudioUrl,
  customAudioName,
  setCustomAudioName
}: SceneHeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [inputLink, setInputLink] = useState("");
  const [showMusicCustomizer, setShowMusicCustomizer] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const handleAudioError = () => {
    // Only cycle default list if no user custom URL overrides it
    if (customAudioUrl) {
      console.warn("User custom audio file playback error.");
      return;
    }
    console.warn("Playback failed on source index " + sourceIndex + ": " + PAPA_MERI_JAAN_SOURCES[sourceIndex]);
    if (sourceIndex < PAPA_MERI_JAAN_SOURCES.length - 1) {
      const nextIndex = sourceIndex + 1;
      setSourceIndex(nextIndex);
      
      setTimeout(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.load();
          if (isPlaying) {
            audio.play().catch((err) => console.warn("Autoplay fallback blocked:", err));
          }
        }
      }, 150);
    }
  };

  useEffect(() => {
    // Sync duration once loaded
    const audio = document.getElementById('global-audio') as HTMLAudioElement;
    audioRef.current = audio;
    if (!audio) return;

    // Sync initial state on mount
    setIsPlaying(!audio.paused);
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => {
        console.warn("Autoplay / Audio load error:", err);
      });
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressBarRef.current;
    if (!audio || !bar || duration === 0) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    
    audio.currentTime = percentage * duration;
    setCurrentTime(percentage * duration);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full flex flex-col items-center py-4 px-4 text-center select-none">

      {/* Reusable BrandSeal top center */}
      <div className="mb-6">
        <BrandSeal variant="gold" size={90} />
      </div>

      {/* Pill Eyebrow */}
      <div className="inline-flex items-center px-4 py-1 bg-dusty-rose/10 text-dusty-rose text-[11px] font-sans font-bold tracking-[0.12em] rounded-full uppercase mb-3">
        {contentConfig.recipient.eyebrowHero}
      </div>

      {/* Serif heading & script subheading */}
      <h2 className="font-serif text-3.5xl md:text-4xl text-navy tracking-tight lowercase leading-tight font-medium mb-1">
        {contentConfig.hero.heading}
      </h2>
      <p className="font-script text-sky-blue text-xl font-bold mb-4">
        {contentConfig.hero.subheading}
      </p>

      {/* Dashed divider with decorative centered sparkles */}
      <div className="flex items-center justify-center gap-3 w-full max-w-xs mb-6">
        <div className="h-[1px] bg-sky-blue/20 flex-1 border-t border-dashed" />
        <Sparkle color="gold" size={15} />
        <div className="h-[1px] bg-sky-blue/20 flex-1 border-t border-dashed" />
      </div>

      {/* Centered romantic storytelling greeting body paragraph */}
      <p className="font-sans text-[14.5px] leading-relaxed text-slate max-w-sm px-2 mb-8">
        {contentConfig.hero.body}
      </p>

      {/* CUSTOM BRANDED EMBEDDED AUDIO PLAYER CARD */}
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full max-w-[340px] bg-[#FCFBF8] border-[1.5px] border-mustard-gold/20 rounded-[24px] shadow-[0_8px_24px_rgba(30,42,58,0.06)] p-5 mb-5 flex flex-col gap-4 relative overflow-hidden"
      >
        <div className="flex items-center gap-4">
          
          {/* Vinyl rotating album art */}
          <div className="relative w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center border border-navy/5 overflow-hidden flex-shrink-0">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-full h-full"
            >
              <BrandSeal variant="rose" size={56} text="NOW PLAYING ✦ FOR YOU ✦" monogram="♪" />
            </motion.div>
            {/* Center vinyl pin */}
            <div className="absolute w-2 h-2 rounded-full bg-[#FAF7F0] border border-navy/10 z-10" />
          </div>

          {/* Playing track tags */}
          <div className="flex-1 text-left min-w-0">
            <h4 className="font-sans text-sm font-bold text-navy truncate" title={customAudioName || contentConfig.hero.audioTitle}>
              {customAudioName || contentConfig.hero.audioTitle}
            </h4>
            <p className="font-sans text-[9px] font-extrabold tracking-widest text-[#B28A43] uppercase mt-0.5 flex items-center gap-1">
              <Music size={10} className="text-mustard-gold" /> {customAudioUrl ? "Personalized Track" : contentConfig.hero.audioSubtitle}
            </p>
          </div>

          {/* Circular pink play/pause CTA */}
          <button
            onClick={togglePlay}
            className="w-11 h-11 rounded-full bg-dusty-rose text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(232,136,155,0.3)] transition-transform duration-250 cursor-pointer flex-shrink-0"
            id="hero-audio-play-btn"
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause size={18} className="fill-white stroke-[2.5]" />
            ) : (
              <Play size={18} className="translate-x-[1.5px] fill-white stroke-[2.5]" />
            )}
          </button>
        </div>

        {/* Dynamic Progress seeking drag-bar component */}
        <div className="flex flex-col gap-1 w-full mt-1">
          <div
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            className="w-full h-[6px] bg-slate/10 hover:h-[8px] rounded-full cursor-pointer transition-all duration-150 relative overflow-hidden"
            id="hero-audio-progress-track"
          >
            {/* Pink to purple dynamic progressive drag slider */}
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-dusty-rose to-[#A76BAC] rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate/75 select-none mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Dynamic Accordion control deck for customizing physical audio track */}
        <div className="flex flex-col w-full border-t border-slate-100/80 pt-2.5 mt-1">
          <button
            onClick={() => setShowMusicCustomizer(!showMusicCustomizer)}
            className="flex items-center justify-between w-full px-2.5 py-2 bg-slate-50 hover:bg-slate-100/80 rounded-xl text-xs text-slate-700 font-bold tracking-tight transition-colors cursor-pointer"
            id="cfg-music-toggle-btn"
          >
            <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-600">
              <Settings size={12} className="text-dusty-rose" /> 
              {customAudioUrl ? "Change Custom Music" : "Customize / Change Music 🎵"}
            </span>
            {showMusicCustomizer ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
          </button>

          <AnimatePresence initial={false}>
            {showMusicCustomizer && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden flex flex-col gap-3 pt-3 text-left"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                    Option A: Attach your own music file (MP3)
                  </span>
                  
                  <label className="flex flex-col items-center justify-center border-[1.5px] border-dashed border-mustard-gold/20 hover:border-mustard-gold/45 rounded-xl p-3 cursor-pointer transition-all bg-white hover:bg-slate-50 relative group">
                    <Upload size={16} className="text-dusty-rose mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] text-slate-700 text-center font-medium max-w-[240px] truncate">
                      {customAudioName && customAudioUrl?.startsWith("blob:") 
                        ? `✓ Attached: ${customAudioName}` 
                        : "Browse / Drag-and-drop local file"}
                    </span>
                    <input 
                      type="file" 
                      accept="audio/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setCustomAudioUrl(url);
                          setCustomAudioName(file.name);
                          setSourceIndex(0);
                          setIsPlaying(false);
                          
                          setTimeout(() => {
                            const audio = audioRef.current;
                            if (audio) {
                              audio.load();
                              audio.play().then(() => setIsPlaying(true)).catch(err => console.warn(err));
                            }
                          }, 100);
                        }
                      }} 
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                    Option B: Paste a direct MP3 audio link URL
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://example.com/yoursong.mp3"
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-dusty-rose text-slate-800"
                      value={inputLink}
                      onChange={(e) => setInputLink(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        if (inputLink.trim()) {
                          setCustomAudioUrl(inputLink.trim());
                          setCustomAudioName("Personalized Audio Link");
                          setIsPlaying(false);
                          
                          setTimeout(() => {
                            const audio = audioRef.current;
                            if (audio) {
                              audio.load();
                              audio.play().then(() => setIsPlaying(true)).catch(err => console.warn(err));
                            }
                          }, 100);
                        }
                      }}
                      className="px-3 bg-dusty-rose hover:bg-dusty-rose/90 text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer flex-shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {customAudioUrl && (
                  <button
                    onClick={() => {
                      setCustomAudioUrl(null);
                      setCustomAudioName(null);
                      setInputLink("");
                      setSourceIndex(0);
                      setIsPlaying(false);
                      setTimeout(() => {
                        const audio = audioRef.current;
                        if (audio) {
                          audio.load();
                        }
                      }, 100);
                    }}
                    className="flex items-center gap-1.5 text-[11px] text-red-500 hover:text-red-600 font-bold mt-1 self-start cursor-pointer hover:underline"
                  >
                    <RefreshCw size={11} /> Reset to "Papa Meri Jaan" original
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Script emotional caption below the player */}
      <p className="font-script text-sky-blue text-[17px] font-semibold leading-tight max-w-xs mb-8 whitespace-pre-line">
        {contentConfig.hero.audioCaption} ✦
      </p>

      {/* Action forward-transition pill button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="py-3.5 px-8 rounded-full bg-sky-blue hover:bg-sky-blue-hover text-white font-serif tracking-normal text-base uppercase flex items-center gap-2.5 shadow-[0_6px_20px_-4px_rgba(74,144,217,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(74,144,217,0.5)] transition-all cursor-pointer select-none"
        onClick={onNext}
        id="hero-next-btn"
      >
        see our album <ArrowRight size={18} className="inline stroke-[2.5]" />
      </motion.button>
    </div>
  );
}
