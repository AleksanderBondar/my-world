import { create } from 'zustand';
import { User } from '../../types/UserTypes';

export interface UsersState {
    user: User | null;
    setUser: (user: User) => void;
    users: Record<string, User> | null;
    setUsers: (users: Record<string, User>) => void;
}

export const useUsersStore = create<UsersState>(set => ({
    users: null,
    setUsers: (users: Record<string, User>) => set({ users }),
    user: null,
    setUser: (user: User) => set({ user }),
}));
