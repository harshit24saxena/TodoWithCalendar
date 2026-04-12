import { create } from "zustand";

export const useStore = create((set) => ({
    list: [
        { title: "Understanding React Server Components", date: "2026-05-06", startTime: "12:00", endTime: "23:59" },
        { title: "The Power of Tailwind CSS", date: "2026-05-06", startTime: "12:00", endTime: "23:59" },
        { title: "Mastering TypeScript", date: "2026-05-06", startTime: "12:00", endTime: "23:59" },
        { title: "Building Accessible Web Apps", date: "2026-05-06", startTime: "12:00", endTime: "23:59" },
        { title: "Next.js App Router Guide", date: "2026-05-06", startTime: "12:00", endTime: "23:59" },
    ],
    addList: (title: string, data: string, startTime: string, endTime: string) => set((state: any) => ({ list: [...state.list, { title, data, startTime, endTime }] })),
    removeList: (title: string, data: string, startTime: string, endTime: string) => set((state: any) => ({ list: state.list.filter((item: any) => item.title !== title || item.date !== data || item.startTime !== startTime || item.endTime !== endTime) })),
    addFormToggle: false,
    setAddFormToggle: (toggle: boolean) => set({ addFormToggle: toggle }),
    navToggle: false,
    setNavToggle: (toggle: boolean) => set({ navToggle: toggle }),
}))