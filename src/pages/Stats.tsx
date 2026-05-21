import { useEffect, useState} from "react";
import MainLayout from "../layouts/MainLayout";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { Flame, TrendingUp, Calendar, Activity } from "lucide-react";

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return value;
}

// ─── SVG Progress Ring ────────────────────────────────────────────────────────
function ProgressRing({ pct }: { pct: number }) {
  const r = 72;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => {
      setOffset(circ - (pct / 100) * circ);
    }, 200);
    return () => clearTimeout(t);
  }, [pct, circ]);

  const displayPct = useCountUp(pct, 1400, 200);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
      <svg width="180" height="180" className="absolute inset-0 -rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6400" />
            <stop offset="100%" stopColor="#ffaa55" />
          </linearGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* track */}
        <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
        {/* tick marks */}
        {Array.from({ length: 28 }).map((_, i) => {
          const angle = (i / 28) * 2 * Math.PI - Math.PI / 2;
          const inner = 84;
          const outer = 90;
          return (
            <line
              key={i}
              x1={90 + inner * Math.cos(angle)}
              y1={90 + inner * Math.sin(angle)}
              x2={90 + outer * Math.cos(angle)}
              y2={90 + outer * Math.sin(angle)}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1.5"
            />
          );
        })}
        {/* progress */}
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
        {/* glow copy */}
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="#ff6400"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          opacity="0.25"
          filter="url(#ringGlow)"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="flex flex-col items-center z-10">
        <span className="text-[46px] font-black italic text-white leading-none tracking-tighter">
          {displayPct}
        </span>
        <span className="text-[10px] font-mono text-[#ff6400] uppercase tracking-[0.25em] mt-1">
          % done
        </span>
      </div>
    </div>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────
function WeeklyChart({ days }: { days: { day: string; completed: boolean }[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 400); return () => clearTimeout(t); }, []);

  const heights = [55, 80, 35, 95, 60, 72, 45];

  return (
    <div className="flex items-end justify-between gap-2 h-36 px-1">
      {days.map((item, i) => {
        const h = item.completed ? heights[i] : 12;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="relative w-full flex flex-col items-center justify-end" style={{ height: "120px" }}>
              {/* value tooltip */}
              {item.completed && (
                <div
                  className="absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  style={{ fontSize: 9, fontFamily: "monospace", color: "#fff", fontWeight: 700, letterSpacing: "0.05em" }}
                >
                  {h}%
                </div>
              )}
              {/* bar bg */}
              <div className="w-full rounded-sm absolute bottom-0" style={{ height: "100%", background: "rgba(255,255,255,0.025)" }} />
              {/* bar fill */}
              <div
                className="w-full rounded-sm absolute bottom-0"
                style={{
                  height: mounted ? `${h}%` : "0%",
                  transition: `height 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms`,
                  background: item.completed
                    ? "linear-gradient(to top, #ff6400, #ffaa55)"
                    : "rgba(255,100,0,0.08)",
                }}
              />
              {/* cap line */}
              {item.completed && (
                <div
                  className="absolute w-full"
                  style={{
                    bottom: mounted ? `${h}%` : "0%",
                    height: 2,
                    background: "#ffcc99",
                    opacity: 0.7,
                    borderRadius: 1,
                    transition: `bottom 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms`,
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: item.completed ? "#ff6400" : "rgba(255,255,255,0.18)",
                fontWeight: item.completed ? 700 : 400,
              }}
            >
              {item.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────
function StatPill({ icon: Icon, label, value, color = "#ff6400", delay = 0 }: {
  icon: React.ElementType;
  label: string;
  value: number;
  color?: string;
  delay?: number;
}) {
  const animated = useCountUp(value, 1000, delay);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);

  return (
    <div
      className="flex flex-col gap-3 p-5 rounded-2xl border relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.05)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}33, transparent)` }} />
      <div className="flex items-center justify-between">
        <Icon size={16} style={{ color }} />
        <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
          {label}
        </span>
      </div>
      <span className="text-4xl font-black italic text-white leading-none tracking-tighter">
        {animated}
      </span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Stats() {
  const weeklyProgress = useWorkoutStore((s) => s.weeklyProgress);
  const completedCount = weeklyProgress.filter((d) => d.completed).length;
  const pct = Math.round((completedCount / 7) * 100);

  const [headerVisible, setHeaderVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeaderVisible(true), 50); return () => clearTimeout(t); }, []);

  return (
    <MainLayout>
      {/* Ambient background orb */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: -120,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,100,0,0.07) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div className="flex flex-col gap-8 pb-24 relative z-10">

        {/* ── Header ── */}
        <header
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(-8px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase", color: "#ff6400", marginBottom: 6 }}>
                Performance Insights
              </p>
              <h1
                className="text-white uppercase italic leading-none"
                style={{ fontSize: 56, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9 }}
              >
                Stats
              </h1>
            </div>
            <div
              className="flex items-center gap-2 mt-2"
              style={{
                background: "rgba(255,100,0,0.08)",
                border: "1px solid rgba(255,100,0,0.2)",
                padding: "6px 14px",
                borderRadius: 999,
              }}
            >
              <Flame size={13} color="#ff6400" />
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 11, fontFamily: "monospace", letterSpacing: "0.05em" }}>
                {completedCount} DAY STREAK
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-5 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
              Week Overview
            </span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
        </header>

        {/* ── Hero — Progress Ring + Label ── */}
        <div
          className="flex items-center gap-8 p-6 rounded-3xl relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Decorative grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <ProgressRing pct={pct} />
          <div className="flex flex-col gap-3 flex-1">
            <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              Weekly Efficiency
            </p>
            <h2 className="text-white font-black italic leading-tight" style={{ fontSize: 28, letterSpacing: "-0.02em" }}>
              {completedCount} of 7<br />days complete
            </h2>
            <div className="flex gap-1 mt-1">
              {weeklyProgress.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-full"
                  style={{
                    background: d.completed ? "#ff6400" : "rgba(255,255,255,0.07)",
                    boxShadow: d.completed ? "0 0 6px rgba(255,100,0,0.5)" : "none",
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,100,0,0.6)", marginTop: 2 }}>
              {7 - completedCount} remaining
            </p>
          </div>
        </div>

        {/* ── Quick Stats Grid ── */}
        <div className="grid grid-cols-2 gap-3">
          <StatPill icon={Activity} label="Workouts" value={completedCount} color="#ff6400" delay={100} />
          <StatPill icon={TrendingUp} label="Goal %" value={pct} color="#3b82f6" delay={200} />
          <StatPill icon={Calendar} label="Remaining" value={7 - completedCount} color="#8b5cf6" delay={300} />
          <StatPill icon={Flame} label="Streak" value={completedCount} color="#f59e0b" delay={400} />
        </div>

        {/* ── Activity Graph ── */}
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Top accent */}
          <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(255,100,0,0.4), transparent)" }} />

          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 4 }}>
                  Activity Volume
                </p>
                <h3 className="text-white font-black italic uppercase" style={{ fontSize: 18, letterSpacing: "-0.02em" }}>
                  This Week
                </h3>
              </div>
              <div
                style={{
                  background: "rgba(255,100,0,0.1)",
                  border: "1px solid rgba(255,100,0,0.2)",
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: "#ff6400",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                }}
              >
                {completedCount}/7 DONE
              </div>
            </div>

            <WeeklyChart days={weeklyProgress} />
          </div>
        </div>

        {/* ── Recent Logs ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
            <p style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
              Recent Logs
            </p>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          <div className="flex flex-col gap-2">
            {weeklyProgress
              .filter((d) => d.completed)
              .slice()
              .reverse()
              .map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-2xl relative overflow-hidden"
                  style={{
                    padding: "14px 18px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    opacity: 0,
                    animation: `fadeSlideUp 0.4s ease ${500 + i * 80}ms forwards`,
                  }}
                >
                  {/* Progress bar accent on left */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                    style={{ background: "linear-gradient(to bottom, #ff6400, transparent)" }}
                  />
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: "rgba(255,100,0,0.1)",
                        border: "1px solid rgba(255,100,0,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Flame size={12} color="#ff6400" />
                    </div>
                    <div>
                      <p className="text-white font-bold uppercase" style={{ fontSize: 11, letterSpacing: "0.05em" }}>
                        Full Body Session
                      </p>
                      <p style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginTop: 2 }}>
                        Completed · {item.day}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,100,0,0.08)",
                      border: "1px solid rgba(255,100,0,0.15)",
                      borderRadius: 6,
                      padding: "3px 8px",
                      fontSize: 9,
                      fontFamily: "monospace",
                      color: "#ff6400",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Done
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Global keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </MainLayout>
  );
}