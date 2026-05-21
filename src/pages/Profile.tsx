import MainLayout from "../layouts/MainLayout";
import { useWorkoutStore } from "../store/useWorkoutStore"; 
import {
  Bell,
  LogOut,
  ChevronRight,
  Camera,
  Medal,
  UserPen,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EditProfileModal from "../components/modals/EditProfileModal";

export default function Profile() {
  const user = useWorkoutStore((state) => state.user);
  const weeklyProgress = useWorkoutStore((state) => state.weeklyProgress);
  const logout = useWorkoutStore((state) => state.logout);
  
  // Controle do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const completedDays = weeklyProgress?.filter(d => d.completed).length || 0;
  const currentStreak = completedDays > 0 ? completedDays + 12 : 0;

  return (
    <MainLayout>
      <div className="relative flex flex-col gap-0 pb-40 overflow-hidden px-4">

        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,100,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,100,0,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Background glow behind avatar */}
        <div
          className="pointer-events-none absolute left-1/2 -top-20 z-0 w-72 h-72 -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(255,100,0,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-7 px-0">

          {/* ── TOP BAR ── */}
          <div className="flex items-center justify-between pt-5">
            <span
              className="uppercase text-white/20 tracking-[0.32em] font-mono text-[9px]"
            >
              Nexus Protocol
            </span>
            <div className="relative flex items-center justify-center w-9 h-9 rounded-[10px] bg-white/[0.04] border border-white/[0.07]">
              <Bell size={16} className="text-white/40" />
              <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full bg-[#ff6400] border-[1.5px] border-[#080808]" />
            </div>
          </div>

          {/* ── HERO / AVATAR ── */}
          <div className="flex flex-col items-center">
            <div className="relative w-[110px] h-[110px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-[5px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #ff6400 0%, rgba(255,100,0,0.15) 50%, #ff6400 100%)",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px))",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #fff calc(100% - 1.5px))",
                }}
              />
              <div className="w-[110px] h-[110px] rounded-full bg-[#1a1a1a] border-2 border-[#111] flex items-center justify-center overflow-hidden">
                <span
                  className="text-[#ff6400] tracking-[2px] font-bebas text-[42px]"
                >
                  {user?.firstName?.substring(0, 2).toUpperCase() || "CS"}
                </span>
              </div>
              <button className="absolute bottom-[2px] right-[2px] w-[30px] h-[30px] rounded-full bg-[#ff6400] border-[2.5px] border-[#080808] flex items-center justify-center active:scale-90 transition-transform">
                <Camera size={13} strokeWidth={3} className="text-black" />
              </button>
            </div>

            <h2 className="mt-4 text-white tracking-[3px] uppercase font-bebas text-[48px] leading-none text-center">
              {user?.firstName || "Recruta"}
            </h2>
            <p className="mt-1 text-[#ff6400] uppercase tracking-[0.32em] font-mono text-[9px]">
              Elite Athlete
            </p>

            {/* Level progress bar */}
            <div className="mt-4 flex items-center gap-3 rounded-[8px] border border-[#ff6400]/30 bg-[#ff6400]/10 px-4 py-[6px]">
              <span className="text-[#ff6400] font-bebas text-[22px]">
                {user?.level || 1}
              </span>
              <div className="w-px h-[22px] bg-[#ff6400]/25" />
              <div className="flex flex-col gap-1">
                <span className="uppercase tracking-[0.2em] text-white/35 font-mono text-[8px]">
                  XP Progress
                </span>
                <div className="w-32 h-1 rounded-sm bg-white/[0.08] overflow-hidden">
                  <div 
                    className="h-full rounded-sm bg-[#ff6400]" 
                    style={{ width: `${user?.xp || 0}%` }}
                  />
                </div>
              </div>
              <span className="text-[#ff6400]/60 tracking-[0.1em] font-mono text-[9px]">
                {user?.xp || 0}%
              </span>
            </div>
          </div>

          {/* ── STATS GRID ── */}
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
              {[
                { unit: "KG", value: user?.weight || "0", label: "Weight" },
                { unit: "CM", value: user?.height || "0", label: "Height" },
                { unit: "YRS", value: "24", label: "Age" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col items-center rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-2 py-[14px] overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ff6400] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[#ff6400]/60 tracking-[0.1em] uppercase mb-[6px] font-mono text-[8px]">
                    {s.unit}
                  </span>
                  <span className="text-white tracking-[1px] font-bebas text-[28px] leading-none">
                    {s.value}
                  </span>
                  <span className="mt-[3px] uppercase tracking-[0.25em] text-white/20 font-mono text-[8px]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Performance + Streak Card */}
            <div className="flex items-center gap-4 rounded-[14px] border border-white/[0.05] bg-white/[0.02] px-[18px] py-4">
              <div className="flex-1">
                <span className="block uppercase tracking-[0.28em] text-white/25 mb-2 font-mono text-[8px]">
                  Performance
                </span>
                <div className="flex flex-col gap-[6px]">
                  {[
                    { name: "Strength", val: 88 },
                    { name: "Speed", val: 75 },
                    { name: "Recovery", val: 62 },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center gap-[10px]">
                      <span className="w-[60px] flex-shrink-0 uppercase tracking-[0.12em] text-white/45 font-bold text-[10px]">
                        {p.name}
                      </span>
                      <div className="flex-1 h-[3px] rounded-sm bg-white/[0.07] overflow-hidden">
                        <div
                          className="h-full rounded-sm bg-[#ff6400]"
                          style={{ width: `${p.val}%` }}
                        />
                      </div>
                      <span className="w-[26px] text-right text-white/50 flex-shrink-0 font-bebas text-[14px]">
                        {p.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day Streak Dinâmico */}
              <div className="flex-shrink-0 flex flex-col items-center rounded-[12px] border border-[#ff6400]/20 bg-[#ff6400]/[0.08] px-[14px] py-[10px]">
                <span className="text-[#ff6400] font-bebas text-[34px] leading-none">
                  {currentStreak}
                </span>
                <span className="mt-[2px] text-center uppercase tracking-[0.2em] text-[#ff6400]/60 leading-tight font-mono text-[7px] white-space-pre">
                  DAY{"\n"}STREAK
                </span>
              </div>
            </div>
          </div>

          {/* ── MENU SECTIONS ── */}
<div className="flex flex-col gap-6">
  <ProfileSection label="Account">
    <ProfileMenuItem 
      icon={UserPen} 
      label="Edit Profile" 
      sub="Name, weight, height" 
      onClick={() => setIsModalOpen(true)} // ADICIONE ISSO AQUI
    />
    <ProfileMenuItem icon={Medal} label="Achievements" sub="Badges & milestones" badge="12" />
    <ProfileMenuItem icon={Bell} label="Notifications" sub="Alerts, reminders" />
  </ProfileSection>

  <ProfileSection label="Privacy & App">
    <ProfileMenuItem icon={ShieldCheck} label="Privacy Policy" sub="Data & permissions" />
    <ProfileMenuItem
      icon={LogOut}
      label="Logout"
      sub="Sign out of account"
      danger
      hideArrow
      onClick={logout}
    />
  </ProfileSection>
</div>

{/* ── ADICIONE O MODAL AQUI ── */}
<AnimatePresence>
  {isModalOpen && (
    <EditProfileModal onClose={() => setIsModalOpen(false)} />
  )}
</AnimatePresence>

          {/* Footer */}
          <div className="flex flex-col items-center gap-[6px] mt-6">
            <div className="w-10 h-px bg-[#ff6400]/25" />
            <p className="uppercase tracking-[0.3em] text-white/10 font-mono text-[8px]">
              Nexus Protocol v1.0.4 • 2026
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

// Sub-componente de Seção
function ProfileSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-[10px] pl-[2px]">
        <span className="uppercase tracking-[0.3em] text-white/20 font-mono text-[9px]">
          {label}
        </span>
        <div className="flex-1 h-px bg-white/[0.05]" />
      </div>
      <div className="flex flex-col gap-[6px]">{children}</div>
    </div>
  );
}

// Sub-componente de Item do Menu
function ProfileMenuItem({
  icon: Icon,
  label,
  sub,
  badge,
  danger = false,
  hideArrow = false,
  onClick
}: any) {
  const accent = danger ? "#e05050" : "#ff6400";
  const accentBg = danger ? "rgba(224,80,80,0.08)" : "rgba(255,100,0,0.08)";
  const accentBorder = danger ? "rgba(224,80,80,0.15)" : "rgba(255,100,0,0.15)";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center justify-between rounded-[14px] border border-white/[0.055] bg-white/[0.025] px-4 py-[14px] transition-colors hover:bg-white/[0.05]"
    >
      <div className="flex items-center gap-[14px]">
        <div
          className="w-[38px] h-[38px] flex-shrink-0 flex items-center justify-center rounded-[10px]"
          style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
        >
          <Icon size={18} style={{ color: accent }} />
        </div>
        <div className="text-left">
          <p
            className="uppercase tracking-[0.06em] leading-none font-extrabold text-[15px]"
            style={{ color: danger ? "#e05050" : "#fff" }}
          >
            {label}
          </p>
          {sub && (
            <p className="mt-[3px] uppercase tracking-[0.15em] text-white/25 font-mono text-[9px]">
              {sub}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-[10px]">
        {badge && (
          <span className="rounded-[6px] bg-[#ff6400] px-2 py-[3px] text-black font-mono text-[10px] font-bold">
            {badge}
          </span>
        )}
        {!hideArrow && <ChevronRight size={16} className="text-white/15" />}
      </div>
    </motion.button>
  );
}