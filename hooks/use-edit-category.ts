import { Category } from "@/types";
import { create } from "zustand";

interface ModalStore {
    category?: Category;
    isOpen: boolean;
    onOpen: (category: Category) => void,
    onClose: () => void;
}

export const useEditCategoryModal = create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: (category) => set({ isOpen: true, category }),
    onClose: () => set({ isOpen: false, category: undefined }),
}));
