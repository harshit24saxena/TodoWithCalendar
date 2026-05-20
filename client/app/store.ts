import { create } from "zustand";

interface StoreState {
    list: {id: string; title: string; startTime: string; endTime: string, colorId: number }[];
    addList: (id: string, title: string, startTime: string, endTime: string, colorId: number) => void;
    removeList: (id: string) => void;
    addFormToggle: boolean;
    setAddFormToggle: (toggle: boolean) => void;
    navToggle: boolean;
    setNavToggle: (toggle: boolean) => void;
    User: string;
    setUser: (user: string) => void;
}

export const useStore = create<StoreState>((set) => ({

    list: [],
    addList: (id, title, startTime, endTime, colorId) => set((state) => ({ list: [...state.list, { id, title, startTime, endTime, colorId }] })),
    removeList: (id) => set((state) => ({ list: state.list.filter((item) => item.id !== id) })),
    addFormToggle: false,
    setAddFormToggle: (toggle) => set({ addFormToggle: toggle }),
    navToggle: false,
    setNavToggle: (toggle) => set({ navToggle: toggle }),
    User: "",
    setUser: (user) => set({ User: user }),

}))
