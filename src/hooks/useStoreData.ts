import { useStoreData } from "@/store/global-store";

export function useTypedStoreData<T>() {
  const storeData = useStoreData((state) => state.storeData) as T | null;
  const setStoreData = useStoreData((state) => state.setStoreData);
  const clearUserData = useStoreData((state) => state.clearUserData);

  return {
    storeData,
    setStoreData,
    clearUserData,
  };
} 
