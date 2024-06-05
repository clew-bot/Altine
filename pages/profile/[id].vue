<style scoped></style>
<template>
  <NuxtLayout name="dash">
    <template #header>{{ handleName }}'s Profile</template>
    <template #rightSide><LayoutRightBarSuggested /></template>
    <div v-if="dto">
      <ProfileHeader :props="dto.coverPicture" />
      <ProfileComponent :props="dto" />
      <ProfilePostsAndFriends :key="refresher" :username="name" :pinnedPost="pinnedPost" v-model="userPosts" :friends="friends"/>
    </div>
    <div v-else class="flex justify-center items-center h-screen">
      <v-progress-circular
        :width="4"
        color="yellow"
        indeterminate
      ></v-progress-circular>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePostStore } from '~~/store/postStore';
import { useUserStore } from "~~/store/userStore";
const store = useUserStore();
const postStore = usePostStore();
const dto = ref(null);
const router = useRouter();
const handleName = router.currentRoute.value.params.id;
const userStore = useUserStore();
const { refresh } = storeToRefs(postStore);
const name = ref('');
const refresher = ref(0)
const userPosts = ref(null);
const pinnedPost = ref(null);
const friends = ref(null);


watch(refresh, async (val) => {
  const newPosts = await userStore.getProfileInfo(handleName);
  dto.value = newPosts;
  refresher.value++
})
onMounted(async () => {
  const data = await store.getProfileInfoForUser(handleName);
  pinnedPost.value = data.pinnedPost;
  userPosts.value = data.posts;
  name.value = data.username;
    friends.value = data.friends;
  dto.value = data;
});
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
