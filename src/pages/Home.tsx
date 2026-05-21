import MainLayout from "../layouts/MainLayout";
import Topbar from "../components/dashboard/Topbar";
import TodayWorkout from "../components/dashboard/TodayWorkout";
import ActiveWorkout from "../components/workout/ActiveWorkout";
import WorkoutList from "../components/workout/WorkoutList";
import WeeklyProgressCard from "../components/ui/WeeklyProgressCard"; 
import { useWorkoutStore } from "../store/useWorkoutStore"; 
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const isTraining = useWorkoutStore((state) => state.isTraining);
  const setIsTraining = useWorkoutStore((state) => state.setIsTraining);
  

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
            className="space-y-8 pb-32" 
          >
            {/* Apenas chamamos o componente aqui */}
            <WeeklyProgressCard />

            <WorkoutList onSelect={(name) => {
                  console.log("Iniciando:", name);
                  setIsTraining(true); 
            }}/>

            <TodayWorkout onStart={() => setIsTraining(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      
    </MainLayout>
  );
}