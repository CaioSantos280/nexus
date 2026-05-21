import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Topbar from "../components/dashboard/Topbar";
import WorkoutList from "../components/workout/WorkoutList";
import WeeklyProgressCard from "../components/ui/WeeklyProgressCard"; 
import { useWorkoutStore } from "../store/useWorkoutStore"; 
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // --- SELETORES CORRIGIDOS ---
  const isTraining = useWorkoutStore((state) => state.isTraining);
  const setIsTraining = useWorkoutStore((state) => state.setIsTraining);
  const fetchUserData = useWorkoutStore((state) => state.fetchUserData);

  useEffect(() => {
    fetchUserData(); // Sincroniza dados do usuário ao carregar a Home
  }, [fetchUserData]);

  return (
    <MainLayout>
      <Topbar />
      
      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
          className="space-y-8 pb-32 px-4"
        >
          {/* Card de Progresso Semanal */}
          <WeeklyProgressCard />
          
          {/* Lista de Treinos - Ativa o modo treino ao clicar */}
          <WorkoutList onSelect={() => setIsTraining(true)} />
          
          {/* Exemplo de uso do isTraining (opcional) */}
          {isTraining && (
            <div className="text-[#ff6400] text-center font-mono text-[10px] animate-pulse">
              TREINO EM ANDAMENTO...
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}