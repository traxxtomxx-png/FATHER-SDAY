import { contentConfig } from "../content";

interface BrandSealProps {
  className?: string;
  size?: number;
  text?: string;
  variant?: "gold" | "rose" | "blue";
  monogram?: string;
}

export default function BrandSeal({
  className = "",
  size = 110,
  text,
  variant = "gold",
  monogram,
}: BrandSealProps) {
  const displayMonogram = monogram || contentConfig.recipient.envelopeLetterLogo;
  
  // Dynamic curved text if not provided
  const displayText =
    text ||
    `BEST ${contentConfig.recipient.relationship.toUpperCase()} EVER · THANK YOU ·`;

  const colorThemes = {
    gold: {
      bg: "bg-mustard-gold text-[#F8F1E5]",
      border: "border-amber-600/30",
      sealHex: "#D4A24C",
      textHex: "#FFF3DC",
      centerTextHex: "#FFFFFF",
    },
    rose: {
      bg: "bg-dusty-rose text-[#FFF0F2]",
      border: "border-rose-400/30",
      sealHex: "#E8889B",
      textHex: "#FFF0F2",
      centerTextHex: "#FFFFFF",
    },
    blue: {
      bg: "bg-sky-blue text-white",
      border: "border-blue-700/20",
      sealHex: "#4A90D9",
      textHex: "#F0F7FF",
      centerTextHex: "#FFFFFF",
    },
  };

  const theme = colorThemes[variant];

  return (
    <div
      className={`relative select-none flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 3D Wax Seal shadow and irregular outer layer */}
      <div 
        className="absolute inset-0 rounded-full shadow-[0_4px_12px_rgba(30,42,58,0.12),inset_0_-2px_4px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.2)]"
        style={{
          borderRadius: "48% 52% 51% 49% / 51% 49% 52% 48%",
          backgroundColor: theme.sealHex,
        }}
      />

      {/* SVG Canvas for precision circular text path */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite] hover:[animation-play-state:paused]"
      >
        <defs>
          {/* A path centered at (50,50) list radius ~34 for text alignment */}
          <path
            id="seal-text-path"
            d="M 16,50 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
            fill="none"
          />
        </defs>

        <text className="font-sans text-[7.5px] font-bold tracking-[0.06em]">
          <textPath
            href="#seal-text-path"
            startOffset="0%"
            fill={theme.textHex}
            className="select-none font-bold"
          >
            {displayText}
          </textPath>
        </text>
      </svg>

      {/* Embedded inner ring and Monogram */}
      <div
        className="absolute w-[56%] h-[56%] rounded-full flex items-center justify-center border border-dashed border-white/20 select-none"
        style={{
          borderRadius: "50%",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2), 0 1px 1px rgba(255,255,255,0.1)",
        }}
      >
        <span
          className="font-serif select-none translate-y-[-1px]"
          style={{
            fontSize: `${size * 0.28}px`,
            fontWeight: "700",
            color: theme.centerTextHex,
            fontStyle: "italic",
            textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
          }}
        >
          {displayMonogram}
        </span>
      </div>
    </div>
  );
}
