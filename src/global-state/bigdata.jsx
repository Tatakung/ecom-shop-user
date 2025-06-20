// global-state/bigdata.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listApi } from "../api/categoryApi";
const useMyStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      category: [],
      actionCategory: async () => {
        try {
          const res = await listApi();
          set({
            category: res.data,
          });
        } catch (error) {
          console.log(error);
        }
      },
      actionUser: (user) => set({ user }),
      actionLogout: () =>
        set({
          user: null,
          token: null,
        }),
      actionToken: (token) => set({ token }),
    }),
    {
      name: "ecom-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMyStore;
