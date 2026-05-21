import { motion, AnimatePresence } from "framer-motion";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    // Removi o "fixed" e o "overflow-hidden"
    // Adicionei "min-h-screen" para o fundo sempre cobrir a tela toda
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#ff7a00]/30 font-sans overflow-x-hidden">
      
      {/* Background dinâmico fica fixo atrás de tudo */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[140%] h-[40%] rounded-full bg-[#ff7a00]/10 blur-[100px]" />
      </div>

      {/* Main agora é um container relativo que cresce com o conteúdo */}
      <main className="relative z-10 w-full px-6 pt-12 pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}