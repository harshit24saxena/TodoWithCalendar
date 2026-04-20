import { create } from "zustand";

interface StoreState {
    list: {id: string; title: string; data: string; startTime: string; endTime: string, colorId: string }[];
    addList: (id: string, title: string, data: string, startTime: string, endTime: string, colorId: string) => void;
    removeList: (id: string, title: string, data: string, startTime: string, endTime: string) => void;
    addFormToggle: boolean;
    setAddFormToggle: (toggle: boolean) => void;
    navToggle: boolean;
    setNavToggle: (toggle: boolean) => void;
    User: string;
    setUser: (user: string) => void;
}

export const useStore = create<StoreState>((set) => ({

    list: [],
    addList: (id: string, title: string, startTime: string, endTime: string, colorId: string) => set((state: any) => ({ list: [...state.list, { id, title, startTime, endTime, colorId }] })),
    removeList: (id: string, title: string, startTime: string, endTime: string) => set((state: any) => ({ list: state.list.filter((item: any) => item.id !== id) })),
    addFormToggle: false,
    setAddFormToggle: (toggle: boolean) => set({ addFormToggle: toggle }),
    navToggle: false,
    setNavToggle: (toggle: boolean) => set({ navToggle: toggle }),
    User: "",
    setUser: (user: string) => set({ User: user }),

}))
