import { create } from 'zustand';

interface EditInfosModalStore {
    isOpen: boolean;
    selectedField: string | null;
    onOpen: (field: string) => void;
    onClose: () => void;
}

const useEditInfosModal = create<EditInfosModalStore>((set) => ({
    isOpen: false,
    selectedField: null,
    onOpen: (field: string) => set({ isOpen: true, selectedField: field }),
    onClose: () => set({ isOpen: false, selectedField: null }),
}));

export default useEditInfosModal;
