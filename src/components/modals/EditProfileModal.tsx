import { useState } from "react";
import { useEffect } from "react";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { X, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
  const user = useWorkoutStore((state) => state.user);
  const updateProfile = useWorkoutStore((state) => state.updateProfile);

  // Estado local para o formulário
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    weight: user?.weight || "",
    height: user?.height || "",
  });

  const handleSave = async () => {
    await updateProfile(formData);
    onClose(); // Fecha o modal após salvar
  };
  useEffect(() => {
  document.body.style.overflow = 'hidden'; // Trava a rolagem
  return () => {
    document.body.style.overflow = 'unset'; // Libera ao fechar
  };
}, []);

  return (
  <div className="fixed inset-0 z-[999] flex flex-col bg-[#050505]">
    {/* O z-[999] garante que ele fique na frente da BottomBar */}
    {/* Header fixo para o Modal não sumir ao rolar */}
    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#050505]">
      <h2 className="font-bebas text-3xl text-white tracking-widest">EDIT PROTOCOL</h2>
      <button onClick={onClose} className="text-white/40"><X size={28} /></button>
    </div>
    {/* Área de Scroll - aqui é onde a "página puxa para cima" */}
    <div className="flex-1 overflow-y-auto p-6 pb-40"> 
      <div className="flex flex-col gap-8">
        
        {/* Campo Nome */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] text-[#ff6400] uppercase tracking-widest">Operator Name</label>
          <input 
            type="text" 
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white font-bebas text-2xl focus:border-[#ff6400] outline-none"
          />
        </div>

        {/* Grid de Peso e Altura */}
        <div className="grid grid-cols-2 gap-4">
           <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-[#ff6400] uppercase tracking-widest">Weight (KG)</label>
            <input 
              type="number" 
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white font-bebas text-2xl outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-[#ff6400] uppercase tracking-widest">Height (CM)</label>
            <input 
              type="number" 
              value={formData.height}
              onChange={(e) => setFormData({...formData, height: e.target.value})}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white font-bebas text-2xl outline-none"
            />
          </div>
        </div>

        {/* Espaçador para garantir que o botão não fique embaixo do teclado/barra */}
        <div className="h-20" />
      </div>
    </div>

    {/* Botão de Salvar Fixo no Rodapé do Modal */}
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
      <button 
        onClick={handleSave}
        className="w-full bg-[#ff6400] text-black font-bebas text-2xl py-5 rounded-2xl shadow-[0_0_20px_rgba(255,100,0,0.3)] active:scale-95 transition-transform"
      >
        SAVE CHANGES
      </button>
    </div>
    
    
    {/* Overlay (Fundo escuro) */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
    />

    {/* Conteúdo do Modal */}
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      className="relative w-full bg-[#080808] rounded-t-[32px] p-8 pb-12 border-t border-white/10 shadow-2xl"
      style={{ maxHeight: '90vh', overflowY: 'auto' }} // Permite rolar dentro do modal se o teclado subir
    >
        <div className="flex items-center justify-between">
          <h2 className="font-bebas text-3xl text-white tracking-widest">EDIT PROTOCOL</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {/* Campo Nome */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-[#ff6400] uppercase tracking-widest">Operator Name</label>
            <input 
              type="text" 
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white font-bebas text-xl focus:border-[#ff6400] outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Campo Peso */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[#ff6400] uppercase tracking-widest">Weight (KG)</label>
              <input 
                type="number" 
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white font-bebas text-xl focus:border-[#ff6400] outline-none transition-all"
              />
            </div>

            {/* Campo Altura */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[#ff6400] uppercase tracking-widest">Height (CM)</label>
              <input 
                type="number" 
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white font-bebas text-xl focus:border-[#ff6400] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="mt-4 w-full bg-[#ff6400] text-black font-bebas text-2xl py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-[#ff8533]"
        >
          <Save size={20} /> UPDATE BIOMETRICS
        </button>
      </motion.div>
    </div>
  );
}