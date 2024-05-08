import { SubCategory } from "@/types";
import { create } from "zustand";

interface ModalStore {
    subcategory?: SubCategory;
    isOpen: boolean;
    onOpen: (subcategory: SubCategory) => void,
    onClose: () => void;
}

export const useEditSubCategoryModal = create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: (subcategory) => set({ isOpen: true, subcategory }),
    onClose: () => set({ isOpen: false, subcategory: undefined }),
}));
