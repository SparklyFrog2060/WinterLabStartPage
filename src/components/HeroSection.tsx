import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <section className="relative pt-4 pb-2 sm:pt-8 sm:pb-4 flex flex-col items-center text-center">
      {/* Sleek Monospace Top Chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full tech-mono text-[9px] uppercase tracking-[0.2em] bg-white text-[#888888] border border-[#eaeaea] mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-[#1a1a1a] font-medium">WL // ENV_01</span>
        <span className="text-[#eaeaea]">|</span>
        <span>LABORATORY PORTAL</span>
      </motion.div>

      {/* Main Logo Container - sleek interface style */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="relative max-w-lg w-full px-4 mb-2 flex items-center justify-center"
      >
        <div className="w-full p-6 sm:p-8 rounded-[20px] bg-white border border-[#eaeaea] shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all hover:border-slate-300">
          <img
            src="https://raw.githubusercontent.com/SparklyFrog2060/WinterlabResources/refs/heads/main/logos/Winterlab.svg"
            alt="Winterlab Logo"
            className="w-full max-w-[380px] sm:max-w-[420px] mx-auto h-auto object-contain filter contrast-125 select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* Sleek Subtitle & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-3 flex flex-col items-center gap-1.5 px-4"
      >
        <p className="text-sm sm:text-base text-[#1a1a1a] font-medium tracking-[0.02em]">
          Advanced Laboratory Environment
        </p>
        <p className="text-xs sm:text-sm text-[#888888] max-w-xl leading-relaxed font-light">
          Prywatny portal domowy, centrum zarządzania infrastrukturą lokalną oraz brama dostępowa do urządzeń smart home.
        </p>
      </motion.div>
    </section>
  );
}
