import { Home, BarChart2, User, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface BottomBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isTraining: boolean;
}

export default function BottomBar({ activeTab, setActiveTab, isTraining }: BottomBarProps) {
  // Se estiver treinando, esconde a barra para foco total
  if (isTraining) return null;

  return (
    <div className="w-full max-w-[400px] mx-auto px-6 pb-8 pt-4">
      <nav className="flex items-center justify-center gap-1 rounded-[22px] border border-white/10 bg-zinc-900/80 p-2 backdrop-blur-xl shadow-2xl">
        
        <TabItem 
          icon={<Home size={22} />} 
          active={activeTab === "home"} 
          label="Home" 
          onClick={() => setActiveTab("home")} 
        />
        
        <TabItem 
          icon={<BarChart2 size={22} />} 
          active={activeTab === "stats"} 
          label="Stats" 
          onClick={() => setActiveTab("stats")} 
        />
        
        {/* Botão Central de Adicionar - Reduzido para h-12 para harmonizar */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="mx-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff7a00] text-black shadow-lg shadow-[#ff7a00]/20 transition-shadow hover:shadow-[#ff7a00]/40"
        >
          <Plus size={24} strokeWidth={3} />
        </motion.button>

        <TabItem 
          icon={<User size={22} />} 
          active={activeTab === "profile"} 
          label="Profile" 
          onClick={() => setActiveTab("profile")} 
        />
        
        <TabItem 
          icon={<Plus size={22} className="rotate-45" />} 
          active={activeTab === "more"} 
          label="More" 
          onClick={() => setActiveTab("more")} 
        />

      </nav>
    </div>
  );
}

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
      className={`relative flex flex-1 flex-col items-center gap-1 px-1 py-2 transition-all duration-300 ${
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

      <span className="text-[9px] font-black uppercase tracking-tighter leading-none">
        {label}
      </span>

      {active && (
        <motion.div 
          layoutId="activeTabDot"
          className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#ff7a00]" 
        />
      )}
    </motion.button>
  );
}