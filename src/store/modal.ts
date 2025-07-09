import { create } from "zustand";

type ModalState = {
  openModals: Record<string, boolean>;
  openModal: (modalKey: string) => void;
  closeModal: (modalKey: string) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  openModals: {},
  openModal: (modalKey) =>
    set((state) => ({ openModals: { ...state.openModals, [modalKey]: true } })),
  closeModal: (modalKey) =>
    set((state) => ({
      openModals: { ...state.openModals, [modalKey]: false },
    })),
}));
