import { useState, useEffect } from "react";
import { Flame } from "lucide-react";

export default function Topbar() {
  const [time, setTime] = useState(new Date());

  // Efeito para atualizar o relógio a cada minuto
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <header className="flex items-center justify-between pt-4 px-2">
      <div className="flex items-center gap-3">
        {/* Foto do Usuário com Glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#ff7a00] blur-md opacity-20 rounded-full" />
          <img 
            src="https://github.com/seu-usuario.png" // Troque pelo seu link ou GitHub
            alt="User"
            className="h-12 w-12 rounded-2xl border-2 border-white/10 object-cover relative z-10"
          />
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#ff7a00] border-2 border-black rounded-full" />
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 leading-none">
            Welcome Back
          </p>
          <h1 className="text-2xl font-[900] italic text-white tracking-tighter">
            CAIO<span className="text-[#ff7a00]">.</span>
          </h1>
        </div>
      </div>

      {/* Relógio e Streak */}
      <div className="flex items-center gap-3">
        <div className="text-right mr-2">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{formattedTime}</p>
          <p className="text-[10px] font-bold text-[#ff7a00]">LIVE</p>
        </div>
        
        <button className="h-12 w-12 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-[#ff7a00] shadow-inner">
          <Flame size={24} fill="currentColor" className="animate-pulse" />
        </button>
      </div>
    </header>
  );
}