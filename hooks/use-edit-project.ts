import { create } from "zustand";

interface ModalStore {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void,
    onClose: () => void;
}

export const useEditProjectModal = create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: (id) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));
