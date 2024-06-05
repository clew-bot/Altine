import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "./userStore";
const userStore = useUserStore();

export const useEditStore = defineStore("edit", {
  state: () => ({
    name: "",
    handle: "",
    location: "",
    bio: "",
    birthday: "",
    profilePicturePreview: {
      preview: "",
      file: [],
    },
    profilePicture: "",
    coverPicturePreview: {
      preview: "",
      file: [],
    },
    coverPicture: "",
  }),
  getters: {
    theData: (state) => state.name,
  },
  actions: {
    editDetails: async () => {
      if(useEditStore().profilePicturePreview.file.length > 0) {
        const { media } = await useFile(useEditStore().profilePicturePreview.file)
        if (media) {
          useEditStore().profilePicture = media[0].media;
        }
      }
      if(useEditStore().coverPicturePreview.file.length > 0) {
        const { media } = await useFile(useEditStore().coverPicturePreview.file)
        if (media) {
          useEditStore().coverPicture = media[0].media;
        }
      }

      const data = {
        username: useEditStore().name,
        handleName: useEditStore().handle,
        location: useEditStore().location,
        bio: useEditStore().bio,
        birthday: useEditStore().birthday,
        profilePicture: useEditStore().profilePicture,
        coverPicture: useEditStore().coverPicture,
      };

      const response = await $fetch("/api/profile/edit-profile", {
        method: "POST",
        body: data,
      });
      userStore.$state.profilePicture = response.user.profilePicture

      return response;
    },
  },
});
