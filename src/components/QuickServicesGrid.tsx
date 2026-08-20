import { useState, type ElementType, type MouseEvent, type FormEvent } from 'react';
import { 
  Home, 
  Radio, 
  ShieldCheck, 
  Server, 
  HardDrive, 
  Tv, 
  Activity, 
  Router, 
  ExternalLink, 
  Search, 
  Plus, 
  Copy, 
  Check, 
  Globe,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { LabService } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface QuickServicesGridProps {
  services: LabService[];
  onAddService: (newService: LabService) => void;
  onDeleteService: (id: string) => void;
}

const ICON_MAP: Record<string, ElementType> = {
  Home,
  Radio,
  ShieldCheck,
  Server,
  HardDrive,
  Tv,
  Activity,
  Router,
  Globe,
};

export function QuickServicesGrid({ services, onAddService, onDeleteService }: QuickServicesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);

  // New service form state
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<'smart-home' | 'infrastructure' | 'media' | 'monitoring' | 'storage'>('infrastructure');

  const categories = [
    { id: 'all', label: 'Wszystkie węzły' },
    { id: 'smart-home', label: 'Smart Home' },
    { id: 'infrastructure', label: 'Infrastruktura' },
    { id: 'storage', label: 'Storage & Backup' },
    { id: 'media', label: 'Multimedia' },
    { id: 'monitoring', label: 'Monitoring' },
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, url: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleCreateService = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrl.trim()) return;

    let formattedUrl = newUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const created: LabService = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      description: newDesc.trim() || 'Własny serwis lokalny Winterlab.',
      category: newCat,
      url: formattedUrl,
      iconName: newCat === 'smart-home' ? 'Home' : newCat === 'media' ? 'Tv' : newCat === 'storage' ? 'HardDrive' : 'Server',
      status: 'online',
      customizable: true,
    };

    onAddService(created);
    setNewName('');
    setNewUrl('');
    setNewDesc('');
    setIsAddingModalOpen(false);
  };

  return (
    <div className="w-full pt-4 pb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] tracking-tight flex items-center gap-2.5">
            <span>Usługi & Węzły Sieciowe</span>
            <span className="tech-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-[#f0f0f0] text-[#666666] font-semibold">
              {filteredServices.length} NODES
            </span>
          </h3>
          <p className="text-xs text-[#888888] mt-1 font-light">
            Dostęp do pozostałych maszyn, kontenerów i usług w klastrze Winterlab.
          </p>
        </div>

        {/* Right buttons / Search & Add */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Szukaj usługi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#eaeaea] rounded-xl text-[#1a1a1a] placeholder:text-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-all shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsAddingModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#1a1a1a] text-xs font-medium border border-[#eaeaea] transition-all shadow-[0_2px_6px_rgba(0,0,0,0.02)] shrink-0"
            title="Dodaj własny link do panelu"
          >
            <Plus className="w-3.5 h-3.5 text-slate-500" />
            <span className="tech-mono text-[10px] uppercase">Dodaj</span>
          </button>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#1a1a1a] text-white shadow-xs tech-mono text-[10px] uppercase tracking-wider'
                : 'bg-white border border-[#eaeaea] text-[#888888] hover:bg-slate-50 hover:text-[#1a1a1a] tech-mono text-[10px] uppercase'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      {filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#eaeaea] bg-white/60 p-8 text-center">
          <p className="text-xs font-medium text-[#888888]">Nie znaleziono żadnej usługi spełniającej kryteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-2 text-xs font-semibold text-[#1a1a1a] hover:underline"
          >
            Zresetuj filtry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Globe;
            const isHomeAssistant = service.id === 'home-assistant';

            return (
              <motion.a
                key={service.id}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.02 }}
                className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-[18px] bg-white border transition-all text-left group hover:shadow-[0_10px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 ${
                  isHomeAssistant
                    ? 'border-slate-300 ring-1 ring-slate-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
                    : 'border-[#eaeaea] hover:border-slate-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
                }`}
              >
                <div>
                  {/* Top row of card */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
                        isHomeAssistant
                          ? 'bg-slate-100 border-slate-200 text-black'
                          : 'bg-[#fcfcfc] border-[#eaeaea] text-slate-700 group-hover:bg-slate-100 group-hover:text-black group-hover:border-slate-300'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Copy link button */}
                      <button
                        type="button"
                        onClick={(e) => handleCopy(service.id, service.url, e)}
                        className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                        title="Skopiuj adres URL"
                      >
                        {copiedId === service.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* External icon */}
                      <div className="p-1.5 text-slate-300 group-hover:text-slate-700 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>

                      {/* Delete button if custom */}
                      {service.customizable && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDeleteService(service.id);
                          }}
                          className="p-1 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors ml-0.5"
                          title="Usuń ten węzeł"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h4 className="text-sm font-semibold text-[#1a1a1a] group-hover:text-black transition-colors flex items-center gap-1.5">
                    <span>{service.name}</span>
                    {isHomeAssistant && (
                      <span className="tech-mono text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        MAIN
                      </span>
                    )}
                  </h4>

                  <p className="text-xs text-[#888888] line-clamp-2 mt-1 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Bottom URL chip */}
                <div className="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-[10px] text-[#888888] tech-mono">
                  <span className="truncate max-w-[150px] text-[#888888] group-hover:text-[#1a1a1a]">
                    {service.url.replace('https://', '').replace('http://', '')}
                  </span>
                  <span className="flex items-center gap-1 text-[9px] text-emerald-600 uppercase font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    online
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      )}

      {/* Add Custom Service Modal */}
      <AnimatePresence>
        {isAddingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white border border-[#eaeaea] rounded-[20px] p-6 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#eaeaea] mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#1a1a1a]">Dodaj węzeł do Winterlab</h3>
                  <p className="text-[10px] tech-mono text-[#888888] uppercase tracking-wider">NODE CONFIGURATION</p>
                </div>
                <button
                  onClick={() => setIsAddingModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateService} className="flex flex-col gap-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-[#1a1a1a] mb-1">Nazwa serwisu *</label>
                  <input
                    type="text"
                    required
                    placeholder="np. Portainer, Nginx Proxy..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#eaeaea] rounded-xl text-[#1a1a1a] bg-[#fcfcfc] focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1a1a1a] mb-1">Adres URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="np. https://portainer.winterlab.pl:9443"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-[#eaeaea] rounded-xl text-[#1a1a1a] bg-[#fcfcfc] focus:outline-none focus:ring-1 focus:ring-slate-400 tech-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1a1a1a] mb-1">Kategoria</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#eaeaea] rounded-xl text-[#1a1a1a] bg-[#fcfcfc] focus:outline-none focus:ring-1 focus:ring-slate-400"
                  >
                    <option value="smart-home">Smart Home</option>
                    <option value="infrastructure">Infrastruktura</option>
                    <option value="storage">Storage & Backup</option>
                    <option value="media">Multimedia</option>
                    <option value="monitoring">Monitoring</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1a1a1a] mb-1">Opis (opcjonalny)</label>
                  <input
                    type="text"
                    placeholder="Krótki opis funkcji węzła..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-[#eaeaea] rounded-xl text-[#1a1a1a] bg-[#fcfcfc] focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#eaeaea] mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#eaeaea] text-[#666666] hover:bg-slate-100 font-medium text-xs"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#1a1a1a] hover:bg-black text-white font-medium text-xs tech-mono uppercase tracking-wider shadow-xs"
                  >
                    Zapisz węzeł
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
