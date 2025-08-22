import { UserState } from '@/types';
import { create } from 'zustand';

// Create the Zustand store
export const useUserStore = create<UserState>((set) => ({
  user: null, 

  addUser: (user) => set({ user }),

  removeUser: () => set({ user: null }),
}));