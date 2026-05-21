import { Home, BarChart2, User, Plus } from "lucide-react";
import { motion } from "framer-motion";

// Definindo as Props com a função de mudar de aba
interface BottomBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isTraining: boolean;
}

export default function BottomBar({ activeTab, setActiveTab, isTraining }: BottomBarProps) {
  // Se estiver treinando, a barra some para foco total na execução
  if (isTraining) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4">
      <nav className="mx-auto flex max-w-md items-center justify-between rounded-[20px] border border-white/10 bg-zinc-900/80 p-2 backdrop-blur-xl shadow-2xl">
        
        <TabItem 
          icon={<Home size={24} />} 
          active={activeTab === "home"} 
          label="Home" 
          onClick={() => setActiveTab("home")} 
        />
        
        <TabItem 
          icon={<BarChart2 size={24} />} 
          active={activeTab === "stats"} 
          label="Stats" 
          onClick={() => setActiveTab("stats")} 
        />
        
        {/* Botão Central de Adicionar */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff7a00] text-black shadow-[0_8px_20px_-4px_rgba(255,122,0,0.5)] transition-shadow hover:shadow-[#ff7a00]/40"
        >
          <Plus size={28} strokeWidth={3} />
        </motion.button>

        <TabItem 
          icon={<User size={24} />} 
          active={activeTab === "profile"} 
          label="Profile" 
          onClick={() => setActiveTab("profile")} 
        />
        
        <TabItem 
          icon={<Plus size={24} className="rotate-45" />} 
          active={activeTab === "more"} 
          label="More" 
          onClick={() => setActiveTab("more")} 
        />

      </nav>
    </div>
  );
}

// Sub-componente de Item da Tab corrigido com onClick
function TabItem({ 
  icon, 
  active, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  active: boolean; 
  label: string; 
  onClick: () => void 
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 px-4 py-2 transition-all duration-300 ${
        active ? "text-[#ff7a00]" : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      <div className="relative">
        {icon}
        {active && (
          <motion.div 
            layoutId="activeTabGlow"
            className="absolute inset-0 bg-[#ff7a00]/20 blur-md rounded-full" 
          />
        )}
      </div>

      {active && (
        <motion.div 
          layoutId="activeTabDot"
          className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#ff7a00]" 
        />
      )}
      
      <span className="text-[10px] font-black uppercase tracking-tighter leading-none">
        {label}
      </span>
    </motion.button>
  );
}