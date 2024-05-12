import { create } from "zustand";

export type ModalType = "LOGIN" | "REGISTER" | "PASSWORD"

interface ModalStore {
    isOpen: boolean;
    type: ModalType | null;
    onOpen: (type: ModalType) => void,
    onClose: () => void;
}

export const useAuthModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({ isOpen: true, type }),
    onClose: () => set({ isOpen: false, type: null }),
}));
