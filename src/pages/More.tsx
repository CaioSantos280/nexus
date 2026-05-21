import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  BookOpen,
  Calculator,
  History,
  Zap,
  Settings,
  Star,
  Share2,
  MessageSquare,
  ChevronRight,
  Crown,
  Dumbbell,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configuração das ferramentas
const tools = [
  { id: "library", icon: BookOpen, label: "Library", sub: "Exercises" },
  { id: "calc", icon: Calculator, label: "1RM Calc", sub: "Strength" },
  { id: "history", icon: History, label: "History", sub: "Old Logs" },
  { id: "goals", icon: Zap, label: "Goals", sub: "Targets" },
];

const secondaryItems = [
  { icon: Settings, label: "App Settings", badge: null },
  { icon: Star, label: "Rate Nexus", badge: null },
  { icon: Share2, label: "Invite Friends", badge: "7 days free" },
  { icon: MessageSquare, label: "Support & Feedback", badge: null },
];

// Simulando dados que virão do seu banco de dados futuramente
const stats = [
  { num: "127", label: "Workouts" },
  { num: "38", label: "Exercises" },
  { num: "4", label: "Tools" },
];

export default function More() {
  // Estados para controle de UI
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Estados para a Calculadora 1RM
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");

  // Cálculo de 1RM (Fórmula de Epley)
  const calculate1RM = () => {
    const w = parseFloat(weight);
    const r = parseFloat(reps);
    if (w > 0 && r > 0) {
      return Math.round(w * (1 + r / 30));
    }
    return 0;
  };

  return (
    <MainLayout>
      {/* Background Decorativo */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,100,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,100,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="pointer-events-none fixed -top-32 -right-20 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,100,0,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-8 pb-40 pt-4 px-1">
        
        {/* Header */}
        <header className="border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#ff6400]"
            />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#ff6400]">
              System Terminal
            </span>
          </div>

          <h1
            className="text-white uppercase italic leading-none tracking-tight font-black"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "48px" }}
          >
            More <span className="text-white/15">Tools</span>
          </h1>

          <div className="flex items-center gap-5 mt-4">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-5">
                {i > 0 && <div className="w-px h-6 bg-white/8" />}
                <div className="flex flex-col">
                  <span 
                    className="text-[#ff6400] font-black text-2xl leading-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {s.num}
                  </span>
                  <span className="text-white/30 font-semibold text-[9px] uppercase tracking-widest mt-0.5">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Quick Access Grid */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-white/20 font-mono text-[10px] font-bold uppercase tracking-[0.35em]">
              Quick Access
            </p>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {tools.map((tool) => (
              <motion.button
                key={tool.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => tool.id === 'calc' && setActiveModal('calc')}
                className="relative overflow-hidden flex flex-col gap-7 p-5 rounded-[20px] text-left transition-all group bg-white/[0.02] border border-white/[0.06] hover:bg-[#ff6400]/10 hover:border-[#ff6400]/25"
              >
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,100,0,0.15),transparent_70%)]" />

                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#ff6400]/10 border border-[#ff6400]/15">
                  <tool.icon size={20} className="text-[#ff6400]" />
                </div>

                <div>
                  <p 
                    className="text-white uppercase italic leading-none font-black text-[20px]"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {tool.label}
                  </p>
                  <p className="text-white/25 font-mono text-[9px] uppercase tracking-widest mt-1">
                    {tool.sub}
                  </p>
                </div>

                <span className="absolute bottom-4 right-4 text-[#ff6400]/30 text-sm transition-all group-hover:text-[#ff6400] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* General Items */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-white/20 font-mono text-[10px] font-bold uppercase tracking-[0.35em]">
              General
            </p>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="flex flex-col gap-1.5">
            {secondaryItems.map((item, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-white/[0.08] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/[0.04]">
                    <item.icon size={16} className="text-white/40" />
                  </div>
                  <span 
                    className="text-white/65 uppercase italic font-bold text-[15px] tracking-tight"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </div>

                {item.badge ? (
                  <span className="text-[#ff6400] font-bold text-[9px] uppercase tracking-widest rounded-md px-2 py-0.5 bg-[#ff6400]/10 border border-[#ff6400]/20">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight size={14} className="text-white/15" />
                )}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Promo Card */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-[24px] p-7 cursor-pointer bg-[#ff6400]"
        >
          <div className="absolute top-[-60px] right-[60px] w-20 h-[200px] bg-white/10 rotate-[20deg] pointer-events-none" />

          <span className="inline-block text-[9px] font-bold uppercase tracking-[0.35em] rounded-md px-2.5 py-1 mb-3 text-black/50 bg-black/10">
            Limited Offer
          </span>

          <h2 
            className="text-black uppercase italic leading-none font-black text-[30px]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Nexus<br />Premium
          </h2>

          <p className="font-semibold uppercase text-[11px] mt-2 max-w-[160px] leading-relaxed text-black/60 tracking-wider">
            Unlock advanced analytics & custom workout plans
          </p>

          <button className="mt-5 flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-bold uppercase text-[12px] tracking-[0.2em] font-barlow">
            <Crown size={14} />
            Upgrade Now
          </button>

          <Dumbbell size={130} className="absolute -right-5 -bottom-5 -rotate-12 pointer-events-none text-black/10" />
        </motion.div>

        {/* MODAL CALCULADORA 1RM */}
        <AnimatePresence>
          {activeModal === 'calc' && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-[#0a0a0a] border border-[#ff6400]/30 rounded-[32px] p-8 shadow-2xl overflow-hidden"
              >
                {/* Efeito de brilho no modal */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6400]/10 blur-3xl rounded-full" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black italic text-[#ff6400] uppercase font-barlow tracking-tight">
                      1RM Calculator
                    </h2>
                    <button 
                      onClick={() => setActiveModal(null)}
                      className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1 mb-1.5 block">
                        Weight (kg)
                      </label>
                      <input 
                        type="number"
                        inputMode="decimal"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="0"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold text-xl focus:outline-none focus:border-[#ff6400]/50 transition-all shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1 mb-1.5 block">
                        Reps (max effort)
                      </label>
                      <input 
                        type="number"
                        inputMode="numeric"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        placeholder="0"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold text-xl focus:outline-none focus:border-[#ff6400]/50 transition-all shadow-inner"
                      />
                    </div>

                    <motion.div 
                      animate={calculate1RM() > 0 ? { scale: [1, 1.02, 1] } : {}}
                      className="bg-[#ff6400] rounded-[24px] p-7 text-center shadow-[0_20px_40px_rgba(255,100,0,0.2)] mt-4"
                    >
                      <p className="text-black/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        Estimated Max
                      </p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-black text-6xl font-black italic font-barlow leading-none">
                          {calculate1RM()}
                        </span>
                        <span className="text-black text-xl font-black italic font-barlow">
                          KG
                        </span>
                      </div>
                    </motion.div>

                    <p className="text-[9px] text-white/20 text-center uppercase font-bold tracking-widest mt-4">
                      Formula: Epley • 1RM = W × (1 + R / 30)
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </MainLayout>
  );
}