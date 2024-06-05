<style scoped></style>
<template>
  <NuxtLayout name="dash">
    <template #header>Post</template>
    <template #rightSide><LayoutRightBarSuggested /></template>
    <v-card class="bg-zinc-900 shadow-lg rounded-none mb-[5rem]">
      <div class="absolute right-2 top-2 flex flex-col items-end">
        <div>{{ simplifiedTime(thePost.createdAt) }} ago</div>
        <div>
          {{ regularDate(thePost.createdAt) }}
        </div>
        <div>Views: {{ thePost.views }}</div>
      </div>
      <v-card-title class="text-neutral-100 font-bold flex gap-2">
        <StatusUserAvatar :props="thePost.author.profilePicture" />{{
          thePost.author.username
        }}
      </v-card-title>
      <!-- {{ thePost }} -->
      <v-card-text class="text-neutral-100">
        {{ thePost.content }}

        <div v-if="thePost.photos.length > 0">
          <v-img
            v-for="(photo, i) in thePost.photos"
            :key="i"
            :src="photo.media"
            class="my-3"
            max-width="500"
            max-height="500"
            contain
            
          >
          </v-img>
        </div>
        <div>
          <div v-if="thePost.videos.length > 0">
            <video
              v-for="(video, i) in thePost.videos"
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
        <div v-if="thePost.poll !== null" class="pt-10">
          <StatusPollView :poll="thePost.poll" />
        </div>
      </v-card-text>
    </v-card>
  </NuxtLayout>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePostStore } from "~~/store/postStore";
import { useUserStore } from "~~/store/userStore";
const store = useUserStore();
const postStore = usePostStore();
const router = useRouter();
const handleName = router.currentRoute.value.params.id;

const thePost = await postStore.getSinglePost(handleName);
onMounted(async () => {
  await postStore.addView(handleName);
  //Make request to get post associated with id
});

definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
