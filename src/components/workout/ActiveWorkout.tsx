import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, X, ChevronRight, ChevronLeft } from "lucide-react";

// 1. Tipagem para manter o projeto pro
interface Set {
  id: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export default function ActiveWorkout() {
  // 2. Estado local para os exercícios (depois levaremos isso para o Zustand)
  const [sets, setSets] = useState<Set[]>([
    { id: 1, reps: 10, weight: 80, completed: false },
    { id: 2, reps: 10, weight: 80, completed: false },
    { id: 3, reps: 10, weight: 85, completed: false },
  ]);

  const [restTime, setRestTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && restTime > 0) {
      interval = setInterval(() => setRestTime((t) => t - 1), 1000);
    } else if (restTime === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, restTime]);

  // 3. Função para dar Check e iniciar descanso
  const toggleSet = (id: number) => {
    setSets((prev) =>
      prev.map((set) => {
        if (set.id === id) {
          const newState = !set.completed;
          if (newState) {
            setRestTime(90); // Start timer only if checking as done
            setIsActive(true);
          }
          return { ...set, completed: newState };
        }
        return set;
      })
    );
  };

  // 4. Função para atualizar peso/reps em tempo real
  const updateSetValue = (id: number, field: "reps" | "weight", value: number) => {
    setSets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 active:scale-90 transition-transform">
          <X size={20} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff7a00]">Workout in Progress</p>
          <h2 className="text-xl font-bold italic uppercase tracking-tight text-white">Push Day</h2>
        </div>
        <div className="h-10 w-10 bg-[#ff7a00]/10 rounded-full flex items-center justify-center">
          <div className="h-2 w-2 bg-[#ff7a00] rounded-full animate-ping" />
        </div>
      </div>

      {/* Rest Timer Overlay */}
      <AnimatePresence>
        {restTime > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#ff7a00] p-5 rounded-[28px] flex items-center justify-between shadow-[0_20px_40px_-10px_rgba(255,122,0,0.3)]">
              <div className="flex items-center gap-4">
                <div className="bg-black/20 p-3 rounded-2xl">
                  <Clock size={24} className="text-black animate-[spin_3s_linear_infinite]" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase leading-none text-black/60">Resting Time</p>
                  <p className="text-3xl font-[950] tabular-nums text-black leading-none mt-1">
                    {Math.floor(restTime / 60)}:{(restTime % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setRestTime(0)} 
                className="bg-black text-[#ff7a00] px-5 py-3 rounded-2xl font-black text-xs active:scale-95 transition-transform"
              >
                SKIP
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exercise Selector */}
      <div className="flex items-center justify-between bg-zinc-900/40 p-2 rounded-[32px] border border-white/[0.03] backdrop-blur-md">
        <button className="p-4 text-zinc-600 hover:text-white transition-colors active:scale-75"><ChevronLeft /></button>
        <div className="text-center">
          <h3 className="font-[950] italic text-xl uppercase tracking-tighter text-white">Bench Press</h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Exercise 1 of 6</p>
        </div>
        <button className="p-4 text-zinc-600 hover:text-white transition-colors active:scale-75"><ChevronRight /></button>
      </div>

      {/* Sets List */}
      <div className="space-y-4">
        <div className="grid grid-cols-4 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
          <span>Set</span>
          <span>Kg</span>
          <span>Reps</span>
          <span className="text-right">Check</span>
        </div>

        {sets.map((set, index) => (
          <motion.div 
            key={set.id}
            layout
            className={`grid grid-cols-4 items-center p-4 rounded-[28px] border transition-all duration-500 ${
              set.completed 
              ? "bg-[#ff7a00]/10 border-[#ff7a00]/30 shadow-inner" 
              : "bg-zinc-900/20 border-white/[0.05]"
            }`}
          >
            <span className={`text-xl font-[950] pl-4 italic ${set.completed ? "text-[#ff7a00]" : "text-zinc-700"}`}>
              {index + 1}
            </span>
            
            <input 
              type="number" 
              value={set.weight}
              onChange={(e) => updateSetValue(set.id, "weight", Number(e.target.value))}
              className={`bg-transparent text-xl font-black w-16 focus:outline-none transition-colors ${set.completed ? "text-white/40" : "text-white"}`}
            />

            <input 
              type="number" 
              value={set.reps}
              onChange={(e) => updateSetValue(set.id, "reps", Number(e.target.value))}
              className={`bg-transparent text-xl font-black w-16 focus:outline-none transition-colors ${set.completed ? "text-white/40" : "text-white"}`}
            />

            <div className="flex justify-end pr-2">
              <button 
                onClick={() => toggleSet(set.id)}
                className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  set.completed 
                  ? "bg-[#ff7a00] text-black shadow-[0_0_20px_rgba(255,122,0,0.4)] rotate-[360deg]" 
                  : "bg-zinc-800 text-zinc-500 border border-white/5"
                }`}
              >
                <Check size={24} strokeWidth={4} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="pt-4">
        <button className="w-full py-6 rounded-[32px] bg-white text-black font-[950] text-lg shadow-xl active:scale-95 transition-all uppercase italic tracking-tight">
          Finish Exercise
        </button>
      </div>
    </div>
  );
}