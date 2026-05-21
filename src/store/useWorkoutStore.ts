import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface UserProfile {
  firstName: string;
  weight: string;
  height: string;
  level: number;
  xp: number;
}

interface WorkoutState {
  activeTab: string; 
  setActiveTab: (tab: string) => void;
  isTraining: boolean;
  user: UserProfile | null;
  weeklyProgress: { day: string; completed: boolean }[];
  setIsTraining: (val: boolean) => void;
  fetchUserData: () => Promise<void>;
  // --- NOVA FUNÇÃO NA INTERFACE ---
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  // -------------------------------
  logout: () => Promise<void>;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  activeTab: 'home', 
  setActiveTab: (tab) => set({ activeTab: tab }),

  isTraining: false,
  user: null,
  weeklyProgress: [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: false },
    { day: "T", completed: false },
    { day: "F", completed: false },
    { day: "S", completed: false },
    { day: "S", completed: false },
  ],
  setIsTraining: (val) => set({ isTraining: val }),

  fetchUserData: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      set({
        user: {
          firstName: user.user_metadata.first_name || "Recruta",
          weight: user.user_metadata.weight || "0",
          height: user.user_metadata.height || "0",
          level: user.user_metadata.level || 1,
          xp: user.user_metadata.xp || 0,
        }
      });
    }
  },

  // --- IMPLEMENTAÇÃO DA NOVA FUNÇÃO ---
  updateProfile: async (updates) => {
    // 1. Atualiza no Supabase Auth (metadados)
    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: updates.firstName,
        weight: updates.weight,
        height: updates.height,
      }
    });

    if (error) {
      console.error("Erro ao atualizar perfil:", error.message);
      return;
    }

    // 2. Atualiza o estado local para o app refletir a mudança na hora
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, ...updates }
      });
    }
  },
  // ------------------------------------

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, activeTab: 'home' });
  }
}));