import { Task } from "@/types";
import { create } from "zustand";

interface ModalStore {
    task?: Task;
    isOpen: boolean;
    onOpen: (task: Task) => void,
    onClose: () => void;
}

export const useEditTaskModal = create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: (task) => set({ isOpen: true, task }),
    onClose: () => set({ isOpen: false, task: undefined }),
}));
