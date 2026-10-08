import React, { useState } from "react";
import { Download, Smartphone, X } from "lucide-react";
import { usePWAInstall } from "@/src/hooks/usePWAInstall";

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-900/30 border border-blue-400/30 transition-all cursor-pointer active:scale-95"
        title="Instalar App no Celular ou Computador"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Instalar App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-xl border border-blue-400/30 bg-slate-800/80 hover:bg-slate-700/80 px-2.5 py-1 text-xs font-medium text-slate-200 transition-colors"
          title="Como instalar no iPhone"
        >
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Instalar no iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-cyan-400" />
                  Instalar no iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                1. No Safari, toque no botão <strong>Compartilhar</strong> (ícone com quadrado e seta para cima).<br /><br />
                2. Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.<br /><br />
                3. Pronto! O app do Bernardo funcionará como um app nativo, inclusive sem internet.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Entendi!
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
