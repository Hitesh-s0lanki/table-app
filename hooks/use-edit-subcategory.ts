import { Category } from "@/types";
import { create } from "zustand";

interface ModalStore {
    subcategory?: Category;
    isOpen: boolean;
    onOpen: (subcategory: Category) => void,
    onClose: () => void;
}

export const useEditSubCategoryModal = create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: (subcategory) => set({ isOpen: true, subcategory }),
    onClose: () => set({ isOpen: false, subcategory: undefined }),
}));
