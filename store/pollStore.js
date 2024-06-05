import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "./userStore";
const userStore = useUserStore();

export const usePollStore = defineStore("poll", {
  state: () => ({ notifications: [] }),
  getters: {
  },
  actions: {
      castVote: async (payload) => {
        // Payload should be an object with the following properties:
        // pollId: String
        // option: String   
        // authorId: String
        const response = await $fetch("/api/dashboard/castVote", {
          method: "POST",
          body: payload,
        });
        return response;
      }
  },
});
