import { motion, AnimatePresence } from "framer-motion";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#050505] text-zinc-100 selection:bg-[#ff7a00]/30 font-sans">
      {/* Background dinâmico para profundidade OLED */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[140%] h-[40%] rounded-full bg-[#ff7a00]/10 blur-[100px]" />
      </div>

      {/* Container de Scroll */}
      <main className="relative z-10 h-full overflow-y-auto overflow-x-hidden px-6 pb-40 pt-12 scroll-smooth">
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