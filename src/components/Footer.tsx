export function Footer() {
  return (
    <footer className="w-full border-t border-[#eaeaea] bg-[#fcfcfc]/90 backdrop-blur-xs py-8 mt-auto relative z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#888888]">
        <div className="flex items-center gap-2.5">
          <img
            src="https://raw.githubusercontent.com/SparklyFrog2060/WinterlabResources/refs/heads/main/logos/Ikona.svg"
            alt="Winterlab"
            className="w-4 h-4 object-contain filter contrast-125 opacity-60"
            referrerPolicy="no-referrer"
          />
          <span className="font-semibold text-[#1a1a1a]">winterlab.pl</span>
          <span className="text-[#eaeaea]">/</span>
          <span className="font-light">Domowa infrastruktura i Smart Home</span>
        </div>

        <div className="flex items-center gap-4 tech-mono text-[10px] tracking-wider uppercase text-[#888888]">
          <a
            href="https://home.winterlab.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1a1a1a] transition-colors underline underline-offset-2"
          >
            home.winterlab.pl
          </a>
          <span className="text-slate-300">·</span>
          <span>SSL / HTTPS SECURE</span>
        </div>
      </div>
    </footer>
  );
}

