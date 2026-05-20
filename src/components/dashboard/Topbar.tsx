import { Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        {/* Avatar com Gradiente de Border */}
        <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-[#ff7a00] to-yellow-400 shadow-lg shadow-orange-500/20">
          <div className="h-14 w-14 rounded-full bg-zinc-900 border-2 border-black overflow-hidden bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Caio')] bg-cover" />
        </div>
        
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 leading-none">
            Welcome back
          </p>
          <h1 className="mt-1 text-3xl font-[950] tracking-tight leading-none">
            Caio <span className="text-[#ff7a00]">.</span>
          </h1>
        </div>
      </div>

      <motion.button 
        whileTap={{ scale: 0.9 }}
        className="relative h-12 w-12 flex items-center justify-center rounded-2xl bg-[#121214] border border-white/5"
      >
        <div className="absolute top-0 right-0 h-2 w-2 bg-[#ff7a00] rounded-full border-2 border-black z-10" />
        <Flame className="text-[#ff7a00] fill-[#ff7a00]/10" size={24} />
      </motion.button>
    </header>
  );
}