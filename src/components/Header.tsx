import { useState, useEffect } from 'react';
import { Sparkles, QrCode, Wifi, Globe, Shield, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenQr: () => void;
  visualsEnabled: boolean;
  onToggleVisuals: () => void;
}

export function Header({ onOpenQr, visualsEnabled, onToggleVisuals }: HeaderProps) {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [ping, setPing] = useState<number>(18);
  const [isPinging, setIsPinging] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setDate(
        now.toLocaleDateString('pl-PL', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const refreshStatus = () => {
    setIsPinging(true);
    setTimeout(() => {
      setPing(Math.floor(Math.random() * 12) + 14);
      setIsPinging(false);
    }, 450);
  };

  return (
    <header className="w-full border-b border-[#eaeaea] bg-[#fcfcfc]/90 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo mark */}
        <div className="flex items-center gap-3">
          <a
            href="https://winterlab.pl"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 rounded-lg p-1 -m-1"
            title="Winterlab.pl"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-[#eaeaea] flex items-center justify-center p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:border-slate-300 transition-colors">
              <img
                src="https://raw.githubusercontent.com/SparklyFrog2060/WinterlabResources/refs/heads/main/logos/Ikona.svg"
                alt="Winterlab Icon"
                className="w-full h-full object-contain filter contrast-125"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-[#1a1a1a] group-hover:text-black transition-colors">
                winterlab.pl
              </span>
              <span className="text-[9px] tech-mono uppercase text-[#888888]">
                NODE // 01
              </span>
            </div>
          </a>
        </div>

        {/* Center Live Status Pill in Sleek Monospace */}
        <div className="hidden md:flex items-center gap-3 tech-mono text-[10px] tracking-[0.16em] uppercase text-[#888888] bg-white border border-[#eaeaea] px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[#1a1a1a] font-semibold">STATUS: ONLINE / LAB NODE 01</span>
          </div>
          <span className="text-[#eaeaea]">|</span>
          <button
            onClick={refreshStatus}
            className="flex items-center gap-1.5 text-[#888888] hover:text-[#1a1a1a] transition-colors"
            title="Kliknij, aby zmierzyć opóźnienie LAN"
          >
            <Wifi className="w-3 h-3 text-slate-500" />
            <span>LAN {ping}ms</span>
            <RefreshCw className={`w-2.5 h-2.5 opacity-60 hover:opacity-100 ${isPinging ? 'animate-spin' : ''}`} />
          </button>
          <span className="text-[#eaeaea]">|</span>
          <div className="flex items-center gap-1.5 text-[#888888]">
            <span className="text-[#1a1a1a]">{time}</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Visuals Toggle */}
          <button
            onClick={onToggleVisuals}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 transition-all ${
              visualsEnabled
                ? 'bg-slate-100/90 border-slate-300/80 text-slate-800'
                : 'bg-white border-[#eaeaea] text-[#888888] hover:text-[#1a1a1a] hover:bg-slate-50'
            }`}
            title={visualsEnabled ? 'Wyłącz cząsteczki' : 'Włącz cząsteczki'}
            aria-label="Przełącz efekty wizualne"
          >
            <Sparkles className={`w-3.5 h-3.5 ${visualsEnabled ? 'text-slate-700' : 'text-slate-400'}`} />
            <span className="hidden sm:inline tech-mono text-[10px] uppercase">FX</span>
          </button>

          {/* Quick QR button */}
          <button
            onClick={onOpenQr}
            className="p-2 rounded-lg border border-[#eaeaea] bg-white hover:bg-slate-50 text-slate-700 hover:text-black transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            title="Pokaż kod QR do połączenia z Home Assistant na telefonie"
            aria-label="Kod QR do Home Assistant"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
