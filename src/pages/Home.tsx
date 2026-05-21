import MainLayout from "../layouts/MainLayout";
import Topbar from "../components/dashboard/Topbar";
import TodayWorkout from "../components/dashboard/TodayWorkout";
import ActiveWorkout from "../components/workout/ActiveWorkout";
import WorkoutList from "../components/workout/WorkoutList"; // Corrigido o 't' no final
import BottomBar from "../components/dashboard/BottomBar";
import { useWorkoutStore } from "../store/useWorkoutStore"; 
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Activity } from "lucide-react"; 
import Card from "../components/ui/Card"; 

export default function Home() {
  const isTraining = useWorkoutStore((state) => state.isTraining);
  const setIsTraining = useWorkoutStore((state) => state.setIsTraining);
  const activeTab = useWorkoutStore((state) => state.activeTab);
  const setActiveTab = useWorkoutStore((state) => state.setActiveTab);

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
            className="space-y-8" // Adicionei um espaçamento entre os cards
          >
            {/* Na sua Home.tsx, no Card laranja */}
<Card className="mt-8 bg-gradient-to-br from-[#ff7a00] to-[#ff9533] border-none rounded-[20px] p-6">
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <div className="space-y-1 pl-2"> {/* pl-2 empurra o conteúdo levemente para a direita */}
        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-black/60 bg-black/10 px-3 py-1 rounded-full w-fit">
          <Activity size={12} strokeWidth={3} /> Weekly Progress
        </span>
        
        {/* Diminuí o texto e ajustei o leading */}
        <h2 className="text-6xl font-[1000] italic tracking-tighter text-black leading-none pt-4">
          5<span className="opacity-20">/</span>7
        </h2>
      </div>

      <div className="bg-black p-3 rounded-[2px] shadow-2xl">
        <Trophy className="text-[#ff7a00]" size={24} />
      </div>
    </div>

    <p className="text-[10px] font-black uppercase tracking-widest text-black/80 pl-2 mt-2">
      ⚡ 2 more days to hit your goal!
    </p>
  </div>
</Card>

            {/* WorkoutList agora funciona pois o import está correto */}
            <WorkoutList onSelect={(name) => {
                  console.log("Iniciando:", name);
                  setIsTraining(true); 
            }}/>

            <TodayWorkout onStart={() => setIsTraining(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isTraining={isTraining} 
      />
    </MainLayout>
  );
}