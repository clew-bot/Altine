import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "./userStore";
const userStore = useUserStore();

export const useMessageStore = defineStore("message", {
  state: () => ({ notifications: [] }),
  getters: {
    // theData: (state) => state.name,
  },
  actions: {
    sendMessage: async (payload) => {
        const response = await $fetch("/api/messages/send-message", {
            method: "POST",
            body: payload,
        });
        return response;
        },
  },
});
