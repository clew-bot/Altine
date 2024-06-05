<style scoped></style>
<template>
  <NuxtLayout name="dash">
    <template #header>Bookmarks</template>
    <template #rightSide><LayoutRightBarSuggested /></template>
    <div v-if="bookmarks[0].bookmarks.length > 0" class="grid grid-flow-row m-4 mb-20">
      <!-- v-for="bookmark in bookmarks[0].bookmarks"
        :key="bookmark"
      >
      {{ bookmark.author.profilePicture }} -->
      <div
        class="m-1 p-1 rounded bg-slate-500 relative"
        v-for="bookmark in bookmarks[0]?.bookmarks"
        :key="bookmark"
      >
      <!-- {{ bookmark.author.profilePicture }} -->
        <NuxtLink :to="`/post/${bookmark._id}`">
          <div class="right-2 font-light text-xs absolute">
            {{ simplifiedTime(bookmark.createdAt) }} ago
          </div>
        </NuxtLink>
        <div class="flex gap-2">
          <StatusUserAvatar :props="bookmark.author.profilePicture" />
          <div>
          <div class=" text-lg font-semibold text-slate-100">{{ bookmark.author.username }}</div>
          <div class="text-md">   {{ bookmark.content }}</div>
        </div>
        </div>

     
        <div v-if="bookmark.media.length > 0">
          <div v-if="bookmark.photos.length > 0">
            <v-img
              v-for="(photo, i) in bookmark.photos"
              :key="i"
              :src="photo.media"
              max-width="500"
              max-height="500"
            >
            </v-img>
          </div>
          <div v-if="bookmark.videos.length > 0">
            <video
              v-for="(video, i) in bookmark.videos"
              :key="i"
              controls
              :class="video.height > 700 ? 'w-2/4 sm:w-1/2' : `w-full`"
              class=""
            >
              <source :src="video.media" type="video/mp4" id="video_here" />
              Your browser does not support HTML5 video.
            </video>

          </div>
        </div>

        <!-- <div v-if="typeof bookmark.poll !== 'undefined'" class="py-3 -mx-5">
            <StatusPollView :poll="bookmark.poll" />
        </div> -->
   

      </div>
    </div>
    <div v-else class="text-center pt-5">
        <div class="text-2xl font-semibold text-slate-100">No Bookmarks</div>
        <div class="font-semibold text-lg text-slate-100">When you bookmark a post, it will show up here.</div>
      </div>
    <div>

    </div>
  </NuxtLayout>
</template>

<script setup>
import { usePostStore } from "~~/store/postStore";
const postStore = usePostStore();

const bookmarks = ref([]);
try {
bookmarks.value = await postStore.getBookmarks();
} catch (error) {
console.log(error);
}

definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
