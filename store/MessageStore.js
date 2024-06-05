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
    getMyMessages: async () => {
      const response = await $fetch("/api/messages/my-messages", {
        method: "GET",
      });
      return response;
    },
    getPrivateMessages: async (payload) => {
      const response = await $fetch("/api/messages/private-messages", {
        method: "POST",
        body: payload,
      });
      return response;
    },
  },
});
