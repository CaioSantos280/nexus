import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Topbar from "../components/dashboard/Topbar";
import TodayWorkout from "../components/dashboard/TodayWorkout";
import ActiveWorkout from "../components/workout/ActiveWorkout";
import BottomBar from "../components/dashboard/BottomBar";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Dumbbell, Trophy, ChevronRight, Activity } from "lucide-react";

export default function Home() {
  const [isTraining, setIsTraining] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <MainLayout>
      <Topbar />

      <AnimatePresence mode="wait">
        {isTraining ? (
          <motion.div
            key="active"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Botão para voltar e testar a UI */}
            <button 
              onClick={() => setIsTraining(false)}
              className="mb-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              ← Cancel Workout
            </button>
            <ActiveWorkout />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Progress Section */}
            <section className="mt-8 relative group active:scale-[0.98] transition-transform duration-200">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff7a00] to-[#ff4d00] rounded-[40px] blur opacity-20" />
              <div className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#ff7a00] to-[#ff9533] p-8 shadow-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/60 bg-black/5 w-fit px-3 py-1 rounded-full border border-black/10">
                      <Activity size={12} /> Weekly Progress
                    </span>
                    <div className="mt-4 flex items-baseline gap-2">
                      <h2 className="text-8xl font-[900] tracking-tighter leading-none text-black italic">5</h2>
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-black/40 leading-none">/ 7</span>
                        <span className="text-[10px] font-bold text-black/60 uppercase">Done</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center shadow-lg border border-white/10">
                    <Trophy className="text-[#ff7a00]" size={28} />
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-4 bg-black/10 backdrop-blur-md rounded-3xl p-5 border border-white/10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#ff7a00] bg-black flex items-center justify-center text-[10px] font-bold text-white uppercase italic">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-black/80">Almost there!</p>
                    <div className="w-full h-1.5 bg-black/10 rounded-full mt-1 overflow-hidden">
                      <div className="w-[71%] h-full bg-black rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Vitals Section */}
            <div className="mt-10 flex items-center justify-between px-2">
              <h3 className="text-xl font-black tracking-tight text-white">Your Vitals</h3>
              <button className="p-2 bg-zinc-900 rounded-full text-[#ff7a00] active:bg-zinc-800 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <section className="mt-4 -mx-6 flex gap-4 overflow-x-auto px-6 pb-6 scrollbar-none snap-x snap-mandatory">
              <QuickStat 
                icon={<Flame className="text-orange-500" fill="currentColor" size={24} />} 
                label="Streak" 
                value="7 Days" 
                sub="Personal Best"
              />
              <QuickStat 
                icon={<Dumbbell className="text-blue-400" size={24} />} 
                label="Volume" 
                value="14.2k" 
                sub="Kg lifted"
              />
              <QuickStat 
                icon={<Activity className="text-emerald-400" size={24} />} 
                label="BPM" 
                value="142" 
                sub="Avg. Heart"
              />
            </section>

            <TodayWorkout onStart={() => setIsTraining(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BottomBar controlada pela Home para evitar erros de Prop */}
      <BottomBar 
  activeTab={activeTab} 
  setActiveTab={setActiveTab} // Adicione isso aqui
  isTraining={isTraining} 
/>
    </MainLayout>
  );
}

function QuickStat({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <motion.div 
      whileTap={{ scale: 0.95 }}
      className="min-w-[160px] snap-center rounded-[32px] bg-[#121214] p-6 border border-white/[0.03] shadow-xl transition-all hover:bg-zinc-900/50"
    >
      <div className="w-12 h-12 rounded-2xl bg-zinc-900/50 flex items-center justify-center border border-white/[0.05] shadow-inner">
        {icon}
      </div>
      <div className="mt-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
        <h4 className="text-2xl font-black mt-1 tracking-tight text-white">{value}</h4>
        <p className="text-[10px] font-medium text-zinc-600 mt-1">{sub}</p>
      </div>
    </motion.div>
  );
}