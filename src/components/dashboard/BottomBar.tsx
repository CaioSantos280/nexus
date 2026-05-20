import { Home, BarChart2, User, Plus } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  activeTab: string;
  isTraining: boolean;
};

export default function BottomBar({ activeTab, isTraining }: Props) {
  // Se estiver treinando, a gente esconde a barra para foco total
  if (isTraining) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4">
      <nav className="mx-auto flex max-w-md items-center justify-between rounded-[32px] border border-white/10 bg-zinc-900/80 p-2 backdrop-blur-xl shadow-2xl">
        
        <TabItem icon={<Home size={24} />} active={activeTab === "home"} label="Home" />
        <TabItem icon={<BarChart2 size={24} />} active={activeTab === "stats"} label="Stats" />
        
        {/* Botão de Adicionar central mais chamativo */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff7a00] text-black shadow-[0_8px_20px_-4px_rgba(255,122,0,0.5)]"
        >
          <Plus size={28} strokeWidth={3} />
        </motion.button>

        <TabItem icon={<User size={24} />} active={activeTab === "profile"} label="Profile" />
        <TabItem icon={<Plus size={24} className="rotate-45" />} active={activeTab === "more"} label="More" />

      </nav>
    </div>
  );
}

function TabItem({ icon, active, label }: { icon: React.ReactNode; active: boolean; label: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={`relative flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
        active ? "text-[#ff7a00]" : "text-zinc-500"
      }`}
    >
      {icon}
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#ff7a00]" 
        />
      )}
      <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
    </motion.button>
  );
}