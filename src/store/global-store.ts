import { create } from "zustand";

type StoreState = {
  storeData: any | null;
  setStoreData: (data: any) => void;
  clearUserData: () => void;
};

export const useStoreData = create<StoreState>((set) => ({
  storeData: null,
  setStoreData: (data) => set({ storeData: data }),
  clearUserData: () => set({ storeData: null }),
}));
