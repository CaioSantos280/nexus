import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";

// Store e Componentes
import { useWorkoutStore } from "./store/useWorkoutStore";
import BottomBar from "./components/dashboard/BottomBar";

// Páginas
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import More from "./pages/More";
import Auth from "./pages/Auth";

export default function App() {
  // --- ESTADO DE AUTENTICAÇÃO ---
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // --- ESTADO DO DASHBOARD ---
  const activeTab = useWorkoutStore((state) => state.activeTab);
  const setActiveTab = useWorkoutStore((state) => state.setActiveTab);
  const isTraining = useWorkoutStore((state) => state.isTraining);

  // Lógica para esconder/mostrar a barra no scroll
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // 1. Gerenciar Sessão do Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // 2. Controle do Scroll para a BottomBar
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // Enquanto verifica se o usuário está logado, evita piscar a tela de login
  if (loading) return null; 

  // --- SE NÃO TIVER SESSÃO, EXIBE APENAS A TELA DE LOGIN ---
  if (!session) {
    return <Auth />;
  }

  // --- SE ESTIVER LOGADO, EXIBE O APP COMPLETO ---
  return (
    <div className="relative min-h-screen bg-[#050505]">
      <AnimatePresence mode="wait">
        {activeTab === 'home' && <Home key="home" />}
        {activeTab === 'stats' && <Stats key="stats" />}
        {activeTab === 'profile' && <Profile key="profile" />}
        {activeTab === 'more' && <More key="more" />}
      </AnimatePresence>

      {/* Barra animada que foge do scroll */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : 150 }} 
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 w-full z-50 pointer-events-none" 
      >
        <div className="pointer-events-auto"> 
          <BottomBar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isTraining={isTraining} 
          />
        </div>
      </motion.div>
    </div>
  );
}