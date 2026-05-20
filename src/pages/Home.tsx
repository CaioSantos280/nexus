import MainLayout from "../layouts/MainLayout";
import Topbar from "../components/dashboard/Topbar";
import TodayWorkout from "../components/dashboard/TodayWorkout";
import ActiveWorkout from "../components/workout/ActiveWorkout";
import BottomBar from "../components/dashboard/BottomBar";
import { useWorkoutStore } from "../store/useWorkoutStore"; 
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Activity } from "lucide-react"; 
// IMPORT QUE FALTA ABAIXO:
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
          >
            {/* Agora o Card vai funcionar */}
            <Card className="mt-8 bg-gradient-to-br from-[#ff7a00] to-[#ff9533] border-none">
               <div className="flex justify-between items-start">
                  <div>
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/60 bg-black/5 px-3 py-1 rounded-full">
                      <Activity size={12} /> Weekly Progress
                    </span>
                    <h2 className="text-8xl font-black italic tracking-tighter text-black mt-4 leading-none">5/7</h2>
                  </div>
                  <Trophy className="text-black" size={32} />
               </div>
            </Card>

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