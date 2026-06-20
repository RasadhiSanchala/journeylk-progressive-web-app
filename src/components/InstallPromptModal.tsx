"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPromptModal() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("journeylk_install_prompt_dismissed");

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      if (dismissed === "true") {
        return;
      }

      setInstallPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      localStorage.setItem("journeylk_install_prompt_dismissed", "true");
    }

    setVisible(false);
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem("journeylk_install_prompt_dismissed", "true");
    setVisible(false);
  };

  if (!visible || !installPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 px-4 pb-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
              Install App
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Install JourneyLK?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add JourneyLK to your phone for a faster app-like travel guide
              experience.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close install popup"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleDismiss}
            className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 font-black text-slate-700"
          >
            Not now
          </button>

          <button
            type="button"
            onClick={handleInstall}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-700 px-4 font-black text-white shadow-lg shadow-blue-700/25"
          >
            <Download size={18} />
            Install
          </button>
        </div>
      </div>
    </div>
  );
}