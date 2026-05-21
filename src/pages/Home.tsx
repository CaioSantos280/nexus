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
            <Card className="mt-8 overflow-hidden bg-gradient-to-br from-[#ff7a00] to-[#ff9533] border-none relative group">
  {/* Detalhe de luz de fundo */}
  <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/20 blur-[50px] rounded-full transition-transform group-hover:scale-150 duration-700" />
  
  <div className="flex justify-between items-start relative z-10">
    <div>
      <span className="flex items-center gap-2 text-[10px] font-[900] uppercase tracking-widest text-black/80 bg-black/10 px-3 py-1 rounded-full w-fit">
        <Activity size={12} strokeWidth={3} /> Weekly Progress
      </span>
      
      <div className="flex items-baseline gap-1 mt-4">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-8xl font-[1000] italic tracking-[calc(-0.05em)] text-black leading-none"
        >
          5<span className="text-black/30 font-black">/</span>7
        </motion.h2>
      </div>
      
      <p className="mt-4 text-[10px] font-black uppercase text-black/60 tracking-widest">
        2 more days to hit your goal!
      </p>
    </div>
    
    <div className="h-14 w-14 bg-black rounded-2xl flex items-center justify-center shadow-2xl">
      <Trophy className="text-[#ff7a00]" size={28} />
    </div>
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