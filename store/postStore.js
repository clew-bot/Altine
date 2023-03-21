import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
const userStore = useUserStore();

export const usePostStore = defineStore("post", {
  state: () => ({
    post: "",
    posts: [],
    images: [],
    pageCount: 0,
    refresh: 0,
    postsFull: false,
    pollOpen: false,
    poll: {},
    submitPoll: false,
    pollOk: true,
  }),
  getters: {
    thePost: (state) => state.post,
    compRefresh: (state) => state.refresh,
  },
  actions: {
    composePost: async (payload) => {
      //Needs refactor
      if(usePostStore().pollOpen) {
        setTimeout(async () => {

          const data = {
            post: usePostStore()?.post,
            postImages: payload?.images,
            postVideos: payload?.videos,
            postMedia: payload?.media,
            poll: usePostStore()?.poll,
          };
          const response = await $fetch("/api/dashboard/compose", {
            method: "POST",
            body: data,
          });
          usePostStore().images = [];
          usePostStore().posts.unshift(response.populatedPost);
          usePostStore().post = "";
          usePostStore().poll = {};
          return response;
        }, 100);
      } else {
      const data = {
        post: usePostStore()?.post,
        postImages: payload?.images,
        postVideos: payload?.videos,
        postMedia: payload?.media,
        poll: usePostStore()?.poll,
      };
      const response = await $fetch("/api/dashboard/compose", {
        method: "POST",
        body: data,
      });
      usePostStore().images = [];
      usePostStore().post = "";
      usePostStore().poll = {};


      usePostStore().posts.unshift(response.populatedPost);
      return response;
    }
    },
    postComment: async (payload) => {
      const response = await $fetch("/api/dashboard/post-comment", {
        method: "POST",
        body: payload,
      });
      return response;
    },
    addReaction: async (payload) => {
      const response = await $fetch("/api/dashboard/add-reaction", {
        method: "POST",
        body: payload,
      });
      return response;
    },
    check: async (payload) => {
      // console.log(usePostStore().post);
    },
    getPosts: async (payload) => {
      const response = await $fetch("/api/dashboard/get-posts", {
        method: "POST",
        body: usePostStore().pageCount,
      });
      //  dont duplicate posts
      if( usePostStore().pageCount === 0) {
        usePostStore().posts = response;
        return response;
      } else {
        usePostStore().posts.push(...response);
        return response;
      }
 
    },
    pinPost: async (payload) => {
      const response = await $fetch("/api/dashboard/pin-post", {
        method: "POST",
        body: payload,
      });
      return response;
    },
    getCommentsForPost: async (payload) => {
      const response = await $fetch("/api/dashboard/get-comments-for-post", {
        method: "POST",
        body: payload,
      });
      return response;
    },
    deletePost: async (payload) => {
      const response = await $fetch("/api/dashboard/delete", {
        method: "POST",
        body: payload,
      });
      const findIndex = usePostStore().posts.findIndex(
        (post) => post._id === payload
      );
      usePostStore().posts.splice(findIndex, 1);
      const findIndex2 = useUserStore().posts.findIndex(
          (post) => post._id === payload
        );
        useUserStore().posts.splice(findIndex2, 1);

      return response;
    },

    openPoll: () => {
      usePostStore().pollOpen = !usePostStore().pollOpen
    },

    getRefresh: (state) => {
      usePostStore().refresh++;
    },
  },
});
