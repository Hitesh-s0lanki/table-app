import { create } from "zustand";

interface ModalStore {
    id?: string;
    roleName?: string;
    isOpen: boolean;
    onOpen: (id: string, roleName: string) => void,
    onClose: () => void;
}

export const useChangeRoleModal = create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: (id, roleName: string) => set({ isOpen: true, id, roleName }),
    onClose: () => set({ isOpen: false, id: undefined, roleName: undefined }),
}));