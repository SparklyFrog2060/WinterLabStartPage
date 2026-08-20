import { useState, type MouseEvent } from 'react';
import { ExternalLink, Copy, Check, ShieldCheck, Zap, Cpu, ArrowUpRight, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeAssistantCardProps {
  onOpenQr: () => void;
}

export function HomeAssistantCard({ onOpenQr }: HomeAssistantCardProps) {
  const [copied, setCopied] = useState(false);
  const homeUrl = 'https://home.winterlab.pl';

  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(homeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative w-full rounded-[20px] bg-white border border-[#eaeaea] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all overflow-hidden group"
    >
      <div className="p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Logo & Details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 w-full md:w-auto">
          {/* Logo container with delicate sleek light background */}
          <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#fcfcfc] border border-[#eaeaea] p-3 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:border-slate-300 transition-colors">
            <img
              src="https://raw.githubusercontent.com/SparklyFrog2060/WinterlabResources/refs/heads/main/logos/WinterlabHome.svg"
              alt="Winterlab Home Assistant Logo"
              className="w-full h-full object-contain filter contrast-125 transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Live status badge on logo */}
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full tech-mono text-[9px] font-bold bg-white text-emerald-700 border border-[#eaeaea] shadow-[0_2px_6px_rgba(0,0,0,0.04)] flex items-center gap-1 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ONLINE
            </span>
          </div>

          {/* Text Info */}
          <div className="flex flex-col gap-2 max-w-lg">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-md tech-mono text-[10px] tracking-[0.14em] uppercase font-semibold bg-slate-100/90 text-slate-800 border border-slate-200/80">
                PORTAL // 01
              </span>
              <span className="text-xs tech-mono text-[#888888]">
                home.winterlab.pl
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] tracking-tight">
              Home Assistant
            </h2>

            <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
              Centrala automatyki domowej Winterlab. Sterowanie oświetleniem, czujnikami, klimatem oraz inteligentnymi scenami w Twoim domu.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fcfcfc] border border-[#eaeaea] tech-mono text-[10px] text-[#888888]">
                <Zap className="w-3 h-3 text-amber-500" />
                AUTOMATION
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fcfcfc] border border-[#eaeaea] tech-mono text-[10px] text-[#888888]">
                <Cpu className="w-3 h-3 text-slate-600" />
                ZIGBEE & WI-FI
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fcfcfc] border border-[#eaeaea] tech-mono text-[10px] text-[#888888]">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                LOCAL ACCESS
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-60 shrink-0">
          {/* Main Redirect Button - sleek styling */}
          <a
            href={homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1a1a1a] hover:bg-black active:bg-slate-900 text-white font-semibold tech-mono text-[11px] uppercase tracking-[0.16em] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all group/btn"
          >
            <span>Enter Smart Home</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>

          {/* Secondary Quick Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-[#eaeaea] bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
              title="Skopiuj adres do schowka"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold text-[11px]">Skopiowano</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px]">Kopiuj link</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenQr}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-[#eaeaea] bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
              title="Pokaż kod QR do skanowania na telefonie"
            >
              <QrCode className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px]">Kod QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Direct link footer bar inside card */}
      <div className="bg-[#fcfcfc] border-t border-[#eaeaea] px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#888888]">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#1a1a1a] tech-mono text-[10px] uppercase">URL:</span>
          <a
            href={homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a1a1a] hover:underline underline-offset-2 tech-mono text-[11px]"
          >
            https://home.winterlab.pl
          </a>
        </div>
        <div className="flex items-center gap-3 tech-mono text-[10px] uppercase text-[#888888]">
          <span>PORT // 8123</span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
          <span>HTTPS / SSL</span>
        </div>
      </div>
    </motion.div>
  );
}
