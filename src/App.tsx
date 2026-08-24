import { motion } from 'motion/react';

// =========================================================================
// 🚀 ŁATWA KONFIGURACJA KAFELKÓW (DODAJ TUTAJ KOLEJNE KAFELKI)
// =========================================================================
export interface TileItem {
  id: string;
  name: string;
  url: string;
  logo?: string;
}

const TILES: TileItem[] = [
  {
    id: 'home-assistant',
    name: 'Home Assistant',
    url: 'https://home.winterlab.pl',
    logo: 'https://raw.githubusercontent.com/SparklyFrog2060/WinterlabResources/refs/heads/main/logos/WinterlabHome.svg',
  },
  {
    id: 'filamenty',
    name: 'Filamenty',
    url: 'https://sparklyfrog2060.github.io/Filamenty/',
    logo: '',
  },
  // Aby dodać kolejny kafelek, po prostu odkomentuj lub dopisz nowy wpis, np.:
  // {
  //   id: 'router',
  //   name: 'Router',
  //   url: 'https://router.winterlab.pl',
  //   logo: 'https://raw.githubusercontent.com/SparklyFrog2060/WinterlabResources/refs/heads/main/logos/Ikona.svg',
  // },
];

const WINTERLAB_HEADER_LOGO =
  'https://raw.githubusercontent.com/SparklyFrog2060/WinterlabResources/refs/heads/main/logos/Winterlab.svg';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col selection:bg-slate-200 selection:text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Górny pasek - Duże logo Winterlab */}
      <header className="w-full border-b border-[#eaeaea] bg-white/90 backdrop-blur-md py-5 px-6 sm:px-12 flex items-center justify-center sticky top-0 z-20">
        <a
          href="https://winterlab.pl"
          className="inline-flex items-center justify-center transition-transform hover:scale-102 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-xl"
          title="Winterlab"
        >
          <img
            src={WINTERLAB_HEADER_LOGO}
            alt="Winterlab"
            className="h-12 sm:h-16 md:h-20 w-auto object-contain filter contrast-125 select-none"
            referrerPolicy="no-referrer"
          />
        </a>
      </header>

      {/* Główna sekcja z kafelkami */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-5xl w-full">
          {TILES.map((tile, index) => (
            <motion.a
              key={tile.id}
              href={tile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative bg-white border border-[#eaeaea] hover:border-slate-300 rounded-2xl p-3 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)] transition-all cursor-pointer flex items-center justify-center w-72 sm:w-80 aspect-4/3 overflow-hidden"
              title={tile.name}
            >
              {/* Logo wypełniające niemal cały kafelek lub tekst, jeśli nie ma grafiki */}
              <div className="w-full h-full flex items-center justify-center p-2">
                {tile.logo ? (
                  <img
                    src={tile.logo}
                    alt={tile.name}
                    className="w-full h-full object-contain filter contrast-125 select-none transition-transform duration-300 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl font-black tracking-tight text-slate-800 select-none">
                    {tile.name}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </main>
    </div>
  );
}
