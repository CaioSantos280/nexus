import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import { useWorkoutStore } from "./store/useWorkoutStore";
import { AnimatePresence, motion } from "framer-motion";
import BottomBar from "./components/dashboard/BottomBar";
import Profile from "./pages/Profile";
import More from "./pages/More";

export default function App() {
  const activeTab = useWorkoutStore((state) => state.activeTab);
  const setActiveTab = useWorkoutStore((state) => state.setActiveTab);
  const isTraining = useWorkoutStore((state) => state.isTraining);

  // Lógica para esconder/mostrar a barra no scroll
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Se scrollar pra baixo, esconde
        setIsVisible(false);
      } else {
        // Se scrollar pra cima, mostra
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

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
        animate={{ y: isVisible ? 0 : 150 }} // 150px pra baixo pra sumir total
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 w-full z-50 pointer-events-none" 
      >
        <div className="pointer-events-auto"> {/* Devolve o clique apenas para a barra */}
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