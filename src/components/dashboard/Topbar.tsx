import { useState, useEffect } from "react";
import { Flame } from "lucide-react";

export default function Topbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-[#ff7a00] blur-xl opacity-40 rounded-full" />

          <img
            src="/avatar.png"
            alt="User"
            className="relative z-10 h-12 w-12 rounded-2xl border border-white/10 object-cover"
          />

          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-black bg-[#ff7a00]" />
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Welcome Back
          </p>

          <h1 className="text-2xl font-black italic tracking-tight text-white">
            User<span className="text-[#ff7a00]"></span>
          </h1>
        </div>
      </div>

      

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {formattedTime}
          </p>

          <p className="text-[10px] font-bold text-[#ff7a00]">
            LIVE
          </p>
        </div>

        <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-zinc-900/60 text-[#ff7a00] shadow-inner transition-all hover:scale-105">
          <Flame
            size={24}
            fill="currentColor"
            className="animate-pulse"
          />
        </button>
      </div>
    </header>
  );
}