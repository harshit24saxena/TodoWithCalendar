import { create } from "zustand";

export const useStore = create((set) => ({
    list: [
        { title: "Understanding React Server Components", description: "..." },
        { title: "The Power of Tailwind CSS", description: "..." },
        { title: "Mastering TypeScript", description: "..." },
        { title: "Building Accessible Web Apps", description: "..." },
        { title: "Next.js App Router Guide", description: "..." },
    ],
    addList: (title: string, data: string) => set((state: any) => ({ list: [...state.list, { title, data }] })),
    removeList: (title: string, data: string) => set((state: any) => ({ list: state.list.filter((item: any) => item.title !== title || item.date !== data) })),
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle }),
}))