import { Play, Clock, ChevronRight, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

const exercises = [
  { name: "Bench Press", sets: "4 x 10", color: "from-blue-500" },
  { name: "Incline Dumbbell", sets: "3 x 12", color: "from-[#ff7a00]" },
  { name: "Cable Fly", sets: "3 x 15", color: "from-purple-500" },
];

export default function TodayWorkout() {
  return (
    <section className="mt-10">
      <div className="mb-6 flex items-end justify-between px-1">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ff7a00]">Next Up</span>
          <h2 className="text-4xl font-[950] tracking-tighter italic">Push Day</h2>
          <div className="mt-1 flex items-center gap-2 text-zinc-500 text-xs font-bold">
            <Clock size={12} /> 45 - 60 min • <Dumbbell size={12} /> 3 Exercises
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-2xl bg-[#ff7a00] px-6 py-4 font-black text-black shadow-[0_10px_20px_-5px_rgba(255,122,0,0.4)]"
        >
          START <Play size={18} fill="currentColor" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={exercise.name}
            className="group relative flex items-center justify-between rounded-[32px] bg-[#121214] p-5 border border-white/[0.03] active:bg-zinc-800 transition-colors"
          >
            {/* Indicador Lateral Colorido */}
            <div className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full bg-gradient-to-b ${exercise.color} to-transparent opacity-50`} />

            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 text-zinc-400 group-hover:text-[#ff7a00] transition-colors">
                <Dumbbell size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight text-zinc-100">
                  {exercise.name}
                </h3>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  {exercise.sets} <span className="ml-2 text-zinc-700">• 90s rest</span>
                </p>
              </div>
            </div>

            <button className="h-10 w-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500">
              <ChevronRight size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}