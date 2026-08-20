import { useState } from 'react';
import { X, Copy, Check, QrCode, ExternalLink, Globe, Smartphone, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SystemInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SystemInfoModal({ isOpen, onClose }: SystemInfoModalProps) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const qrImageUrl =
    'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https%3A%2F%2Fhome.winterlab.pl&color=0f172a&bgcolor=ffffff&margin=1';

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="bg-white border border-[#eaeaea] rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.12)] relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#eaeaea]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fcfcfc] border border-[#eaeaea] flex items-center justify-center text-slate-800">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1a1a1a]">Brama Mobilna // QR Gateway</h3>
                <p className="text-xs text-[#888888] font-light">Zeskanuj aparatem w telefonie lub tablecie</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* QR Container */}
          <div className="flex flex-col items-center justify-center my-6">
            <div className="p-4 bg-white border border-[#eaeaea] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col items-center">
              <img
                src={qrImageUrl}
                alt="QR Code do Home Assistant"
                className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#888888] tech-mono font-medium">
                <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                <span>home.winterlab.pl</span>
              </div>
            </div>
          </div>

          {/* Direct Endpoints List */}
          <div className="flex flex-col gap-2 bg-[#fcfcfc] border border-[#eaeaea] rounded-xl p-3.5 text-xs">
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col">
                <span className="font-semibold text-[#1a1a1a]">Home Assistant (Główny):</span>
                <span className="tech-mono text-[11px] text-[#888888]">https://home.winterlab.pl</span>
              </div>
              <button
                onClick={() => copyText('https://home.winterlab.pl', 'home')}
                className="p-1.5 rounded-md hover:bg-white border border-transparent hover:border-[#eaeaea] text-slate-600 transition-all"
                title="Kopiuj URL"
              >
                {copiedUrl === 'home' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>

            <div className="h-px bg-[#eaeaea]" />

            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col">
                <span className="font-semibold text-[#1a1a1a]">Strona Główna Winterlab:</span>
                <span className="tech-mono text-[11px] text-[#888888]">https://winterlab.pl</span>
              </div>
              <button
                onClick={() => copyText('https://winterlab.pl', 'portal')}
                className="p-1.5 rounded-md hover:bg-white border border-transparent hover:border-[#eaeaea] text-slate-600 transition-all"
                title="Kopiuj URL"
              >
                {copiedUrl === 'portal' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-6 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#1a1a1a] hover:bg-black text-white font-semibold text-xs tech-mono uppercase tracking-[0.14em] shadow-xs transition-colors"
            >
              Zamknij okno
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
