import { create } from 'zustand';

interface Set {
  id: number;
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutState {
  isTraining: boolean;
  activeTab: string;
  restTime: number;
  sets: Set[];
  // Ações
  setIsTraining: (state: boolean) => void;
  setActiveTab: (tab: string) => void;
  setRestTime: (time: number | ((prev: number) => number)) => void;
  toggleSet: (id: number) => void;
  updateSet: (id: number, field: 'reps' | 'weight', value: number) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  isTraining: false,
  activeTab: 'home',
  restTime: 0,
  sets: [
    { id: 1, reps: 10, weight: 80, completed: false },
    { id: 2, reps: 10, weight: 80, completed: false },
    { id: 3, reps: 10, weight: 85, completed: false },
  ],

  setIsTraining: (state) => set({ isTraining: state }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setRestTime: (time) => set((state) => ({ 
    restTime: typeof time === 'function' ? time(state.restTime) : time 
  })),

  toggleSet: (id) => set((state) => ({
    sets: state.sets.map((s) => {
      if (s.id === id) {
        const isNowCompleted = !s.completed;
        return { ...s, completed: isNowCompleted };
      }
      return s;
    })
  })),

  updateSet: (id, field, value) => set((state) => ({
    sets: state.sets.map((s) => s.id === id ? { ...s, [field]: value } : s)
  })),
}));