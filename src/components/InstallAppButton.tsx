"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [message, setMessage] = useState("Install JourneyLK for a native app-like travel guide experience.");

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      setMessage("JourneyLK is already running as an installed app.");
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setMessage("JourneyLK is ready to install on this device.");
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
      setMessage("JourneyLK was installed successfully.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstallClick() {
    if (!installPrompt) {
      setMessage("Use the browser menu and choose Install app if the install prompt is not shown yet.");
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setMessage("JourneyLK installation started.");
    } else {
      setMessage("Installation was dismissed. You can try again later from this page.");
    }

    setInstallPrompt(null);
  }

  return (
    <section className="mx-5 mt-5 rounded-3xl bg-slate-950 p-5 text-white shadow-xl shadow-slate-900/20">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
          {isInstalled ? <CheckCircle2 size={27} className="text-emerald-300" /> : <Smartphone size={27} />}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black">Install JourneyLK</h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">{message}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleInstallClick}
        disabled={isInstalled}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Download size={19} />
        {isInstalled ? "Already Installed" : installPrompt ? "Install App" : "Check Install Option"}
      </button>
    </section>
  );
}
