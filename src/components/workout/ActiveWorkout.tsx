import { useEffect } from "react";
import { useWorkoutStore, type WorkoutSet } from "../../store/useWorkoutStore"; // Adicionado 'type' para o import
import { Check, Clock } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import Card from "../ui/Card";

export default function ActiveWorkout() {
  // Use seletores individuais para evitar erros de renderização
  const sets = useWorkoutStore((state) => state.sets) || [];
  const toggleSet = useWorkoutStore((state) => state.toggleSet);
  const updateSet = useWorkoutStore((state) => state.updateSet);
  const restTime = useWorkoutStore((state) => state.restTime);
  const setRestTime = useWorkoutStore((state) => state.setRestTime);

  // Timer de descanso corrigido para Browser (Window)
  useEffect(() => {
    let interval: number; // Mude de NodeJS.Timeout para number para evitar erro no Vite/Browser
    if (restTime > 0) {
      interval = window.setInterval(() => {
        setRestTime((t: number) => (t > 0 ? t - 1 : 0));
      }, 1000);
    }
    return () => window.clearInterval(interval);
  }, [restTime, setRestTime]);

  const handleCheck = (id: string) => {
    const currentSet = sets.find((s: WorkoutSet) => s.id === id);
    toggleSet(id);
    
    if (currentSet && !currentSet.completed) { 
      setRestTime(90); 
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-[900] italic uppercase tracking-tighter text-white">
          Bench Press
        </h2>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-zinc-900 px-3 py-1 rounded-full border border-white/5">
            <Clock size={14} className="text-[#ff7a00]" />
            <span className="text-[10px] font-bold text-white">12:45</span>
          </div>
        </div>
      </div>
      
      {/* Timer de Descanso */}
      <AnimatePresence>
        {restTime > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0, scale: 0.9 }} 
            animate={{ height: "auto", opacity: 1, scale: 1 }} 
            exit={{ height: 0, opacity: 0, scale: 0.9 }}
            className="overflow-hidden"
          >
            <Card className="bg-[#ff7a00] border-none shadow-[0_20px_40px_-15px_rgba(255,122,0,0.3)] mb-4">
              <div className="flex justify-between items-center text-black">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Rest Time</p>
                  <span className="font-[900] text-4xl tabular-nums leading-none">{restTime}s</span>
                </div>
                <button 
                  onClick={() => setRestTime(0)} 
                  className="bg-black text-white text-[10px] font-black px-6 py-3 rounded-2xl active:scale-95 transition-transform"
                >
                  SKIP REST
                </button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listagem de Sets */}
      <div className="space-y-3">
        <div className="grid grid-cols-4 px-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          <span>Set</span>
          <span>Kg</span>
          <span>Reps</span>
          <span className="text-right">Done</span>
        </div>

        {sets.map((set: WorkoutSet, index: number) => (
          <Card 
            key={set.id} 
            className={`transition-all duration-300 ${
              set.completed 
              ? "bg-[#ff7a00]/10 border-[#ff7a00]/30 shadow-none" 
              : "bg-zinc-900/20 border-white/5"
            }`}
          >
            <div className="grid grid-cols-4 items-center">
              <span className={`text-xl font-black italic ${set.completed ? "text-[#ff7a00]" : "text-zinc-600"}`}>
                {index + 1}
              </span>
              
              <input 
                type="number" 
                value={set.weight} 
                onChange={(e) => updateSet(set.id, 'weight', Number(e.target.value))}
                className="bg-transparent font-black text-xl w-16 outline-none text-white focus:text-[#ff7a00] transition-colors"
              />
              
              <input 
                type="number" 
                value={set.reps} 
                onChange={(e) => updateSet(set.id, 'reps', Number(e.target.value))}
                className="bg-transparent font-black text-xl w-16 outline-none text-white focus:text-[#ff7a00] transition-colors"
              />
              
              <div className="flex justify-end">
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleCheck(set.id)}
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${
                    set.completed 
                    ? "bg-[#ff7a00] text-black shadow-[0_0_20px_rgba(255,122,0,0.4)]" 
                    : "bg-zinc-800 text-zinc-500 border border-white/5"
                  }`}
                >
                  <Check size={24} strokeWidth={4} />
                </motion.button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <button className="w-full py-6 rounded-[32px] bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors">
        Finish Exercise
      </button>
    </div>
  );
}