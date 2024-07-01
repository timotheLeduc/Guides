import { create } from 'zustand'

interface InfosModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useInfosModal = create<InfosModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useInfosModal;