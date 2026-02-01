import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => setLanguage("sv")}
        className={`w-10 h-7 rounded overflow-hidden border-2 transition-all ${
          language === "sv" ? "border-accent scale-110" : "border-transparent opacity-70 hover:opacity-100"
        }`}
        title="Svenska"
        aria-label="Byt till svenska"
      >
        {/* Swedish flag */}
        <svg viewBox="0 0 16 10" className="w-full h-full">
          <rect width="16" height="10" fill="#006AA7" />
          <rect x="5" y="0" width="2" height="10" fill="#FECC00" />
          <rect x="0" y="4" width="16" height="2" fill="#FECC00" />
        </svg>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`w-10 h-7 rounded overflow-hidden border-2 transition-all ${
          language === "en" ? "border-accent scale-110" : "border-transparent opacity-70 hover:opacity-100"
        }`}
        title="English"
        aria-label="Switch to English"
      >
        {/* UK flag */}
        <svg viewBox="0 0 60 30" className="w-full h-full">
          <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
          </clipPath>
          <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
        </svg>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
