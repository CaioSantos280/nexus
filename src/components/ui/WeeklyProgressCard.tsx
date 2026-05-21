import { useWorkoutStore } from "../../store/useWorkoutStore";
import Card from "./Card";

export default function WeeklyProgressCard() {
  const weeklyProgress = useWorkoutStore((s) => s.weeklyProgress);
  const completedCount = weeklyProgress.filter((d) => d.completed).length;
  const pct = Math.round((completedCount / 7) * 100);

  let streak = 0;
  const todayIndex = weeklyProgress.findIndex((d) => (d as any).today);
  const end = todayIndex > 0 ? todayIndex : weeklyProgress.length;
  for (let i = end - 1; i >= 0; i--) {
    if (weeklyProgress[i].completed) streak++;
    else break;
  }

  return (
    <Card className="relative overflow-hidden rounded-[2px] border border-white/[0.06] bg-black/60 p-5 font-[Syne,sans-serif]">
      {/* stripe */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff6400] to-transparent" />
      {/* glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#ff6400]/20 blur-[40px]" />

      {/* header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-full border border-[#ff6400]/20 bg-[#ff6400]/10 px-2.5 py-1">
          <div className="h-[5px] w-[5px] animate-pulse rounded-full bg-[#ff6400]" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#ff8040]">
            Weekly Progress
          </span>
        </div>
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] border border-[#ff6400]/18 bg-[#ff6400]/10 text-lg">
          🏆
        </div>
      </div>

      {/* número */}
      <div className="relative z-10 mt-4 flex items-baseline gap-1">
        <span className="text-[68px] font-extrabold leading-none tracking-[-3px] text-white">
          {completedCount}
        </span>
        <span className="mb-1 text-2xl font-bold text-white/20">/7</span>
      </div>
      <p className="relative z-10 font-mono text-[11px] text-white/30">
      <br />
      </p>

      {/* divider */}
      <div className="relative z-10 my-4 h-px bg-white/5" />

      {/* dias */}
      <div className="relative z-10 grid grid-cols-7 gap-1">
        {weeklyProgress.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-[34px] w-[34px] items-center justify-center rounded-[10px] font-bold transition-all ${
                item.completed
                  ? "bg-[#ff6400] text-[13px] text-white shadow-[0_2px_8px_rgba(255,100,0,0.35)]"
                  : "border border-white/6 bg-white/[0.04] text-[9px] text-white/20"
              }`}
            >
              {item.completed ? "✓" : item.day}
            </div>
            <span className="font-mono text-[8px] uppercase text-white/22">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      {/* barra */}
      <div className="relative z-10 mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/28">
            Weekly load
          </span>
          <span className="font-mono text-[11px] font-medium text-[#ff8040]">
            {pct}%
          </span>
        </div>
        <div className="h-[5px] overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ff6400] to-[#ffaa55] transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* streak */}
      <div className="relative z-10 mt-3 flex items-center gap-1.5 font-mono text-[11px] text-white/28">
        🔥 <span>Streak —</span>
        <span className="font-medium text-[#ff8040]">
          {streak} {streak === 1 ? "day" : "days"}
        </span>
      </div>
    </Card>
  );
}