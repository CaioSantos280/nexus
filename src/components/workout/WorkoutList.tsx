import { Dumbbell, Zap, Target, Flame } from "lucide-react";
import Card from "../ui/Card";
import { motion } from "framer-motion";

const WORKOUT_LIST = [
  { id: 1, name: "Push Day", category: "Chest, Tris & Shoulders", exercises: 6, color: "from-blue-500", icon: <Target className="text-blue-500" /> },
  { id: 2, name: "Pull Day", category: "Back & Bis", exercises: 5, color: "from-emerald-500", icon: <Zap className="text-emerald-500" /> },
  { id: 3, name: "Leg Day", category: "Quads & Glutes", exercises: 7, color: "from-purple-500", icon: <Flame className="text-purple-500" /> },
  { id: 4, name: "Full Body", category: "Total Body Hit", exercises: 8, color: "from-orange-500", icon: <Dumbbell className="text-orange-500" /> },
];

export default function WorkoutList({ onSelect }: { onSelect: (name: string) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-black italic uppercase tracking-tighter text-zinc-400 px-2">
        Select Routine
      </h3>
      
      {WORKOUT_LIST.map((workout) => (
        <motion.div
          key={workout.id}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(workout.name)}
        >
          <Card className="p-5 bg-zinc-900/40 border-white/5 hover:bg-zinc-800/60 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`h-14 w-14 rounded-2xl bg-zinc-950 flex items-center justify-center border border-white/5 group-hover:border-[#ff7a00]/30 transition-colors`}>
                  {workout.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-white">{workout.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    {workout.category} • {workout.exercises} Exercises
                  </p>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-zinc-950 flex items-center justify-center text-zinc-600 group-hover:text-[#ff7a00] transition-colors">
                 <Dumbbell size={16} />
              </div>
            </div>
            
            {/* Barra de progresso fake pra dar um charme visual */}
            <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${workout.color} to-transparent w-1/3 opacity-50`} />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}