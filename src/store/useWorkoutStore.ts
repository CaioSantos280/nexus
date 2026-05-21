import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface WorkoutSet {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
}

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
  setIsTraining: (val: boolean) => void;
  user: UserProfile | null;
  weeklyProgress: { day: string; completed: boolean }[];
  
  // --- ESTADOS DO TREINO ATIVO ---
  sets: WorkoutSet[];
  restTime: number;
  setRestTime: (time: number | ((t: number) => number)) => void;
  toggleSet: (id: string) => void;
  updateSet: (id: string, field: 'reps' | 'weight', value: number) => void;
  
  // --- FUNÇÕES DE DADOS ---
  fetchUserData: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isTraining: false,
  setIsTraining: (val) => set({ isTraining: val }),
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

  // --- LOGICA DE SETS ---
  sets: [
    { id: '1', reps: 12, weight: 20, completed: false },
    { id: '2', reps: 10, weight: 22, completed: false },
    { id: '3', reps: 8, weight: 24, completed: false },
  ],
  restTime: 0,

  setRestTime: (time) => 
    set((state) => ({ 
      restTime: typeof time === 'function' ? time(state.restTime) : time 
    })),

  toggleSet: (id) => set((state) => ({
    sets: state.sets.map(s => 
      s.id === id ? { ...s, completed: !s.completed } : s
    )
  })),

  updateSet: (id, field, value) => set((state) => ({
    sets: state.sets.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    )
  })),

  // --- SUPABASE ---
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

  updateProfile: async (updates) => {
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

    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...updates } });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, activeTab: 'home' });
  }
}));