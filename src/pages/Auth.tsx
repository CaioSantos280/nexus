import { useState } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck
} from "lucide-react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: ""
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Limpa mensagens anteriores

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { first_name: formData.firstName },
          },
        });

        if (error) throw error;
        setMessage({ type: 'success', text: "Registro feito! Verifique seu e-mail." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "#050505", fontFamily: "Inter, sans-serif" }}
    >
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#ff6400]/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#ff6400]/5 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] z-10"
      >
        <div
          className="p-8 rounded-[32px] border border-white/5 shadow-2xl"
          style={{ background: "rgba(15, 15, 15, 0.8)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-[#ff6400] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,100,0,0.3)] mb-4">
              <ShieldCheck className="text-black" size={30} strokeWidth={2.5} />
            </div>
            <h1 className="text-white text-2xl font-black italic tracking-tighter uppercase">
              NEXUS <span className="text-[#ff6400]">OS</span>
            </h1>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative flex items-center mb-4"
                >
                  <div className="absolute left-4 z-10 pointer-events-none">
                    <User size={18} className="text-[#ff6400]" />
                  </div>
                  <input
                    required
                    placeholder="Seu nome"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-[#ff6400]/50 transition-all placeholder:text-white/20"
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative flex items-center">
              <div className="absolute left-4 z-10 pointer-events-none">
                <Mail size={18} className="text-[#ff6400]" />
              </div>
              <input
                type="email"
                required
                placeholder="E-mail de acesso"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-[#ff6400]/50 transition-all placeholder:text-white/20"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-4 z-10 pointer-events-none">
                <Lock size={18} className="text-[#ff6400]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Sua senha"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white text-sm outline-none focus:border-[#ff6400]/50 transition-all placeholder:text-white/20"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-white/20 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Mensagem de Feedback (Substitui o Alert) */}
            {message && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center text-[10px] font-bold uppercase tracking-wider ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}
              >
                {message.text}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
              style={{
                background: "#ff6400",
                color: "#000",
                boxShadow: "0 8px 25px rgba(255,100,0,0.2)",
              }}
            >
              {loading ? "Processando..." : isSignUp ? "Criar Identidade" : "Autenticar"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#ff6400] transition-colors"
            >
              {isSignUp ? "Já possui acesso? " : "Novo por aqui? "}
              <span className="text-[#ff6400] underline underline-offset-4">
                {isSignUp ? "Login" : "Registrar"}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}