'use client';
import { AuthUser } from '@/types/AuthUser';
import { User } from 'firebase/auth';
import { create } from 'zustand';
import { subscribeWithSelector, devtools, persist, createJSONStorage } from 'zustand/middleware';

type Reducer = (authUser: AuthUser | null) => void;

export type AuthUserState = {
  authUser: AuthUser | null;
  isLogin: () => boolean;
  reducer: Reducer;
};

export const useAuthUserStore = create(
  devtools(
    persist(
      subscribeWithSelector<AuthUserState>((set, get) => ({
        authUser: null,
        isLogin: () => !!get().authUser,
        reducer: (authUser) => set({ authUser }),
      })),
      {
        name: 'authUser',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
