<style scoped></style>
<template>
  <NuxtLayout name="dash">
    <template #header>My Profile</template>
    <template #rightSide><LayoutRightBarSuggested /></template>
    <div v-if="dto">
      <ProfileHeader :props="dto.coverPicture" />
      <ProfileComponent :props="dto" />
      <ProfilePostsAndFriends :username="name" :pinnedPost="pinnedPost" v-model="profilePosts" :friends="friends"/>
    </div>
    <div v-else class="flex justify-center items-center h-screen">
      <v-progress-circular
        :width="4"
        color="white"
        indeterminate
      ></v-progress-circular>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";
const dto = ref(null);
const profilePosts = ref(null);
const userStore = useUserStore();
const name = ref("");
const pinnedPost = ref(null);
const friends = ref(null);

onMounted(async () => {
  const data = await userStore.getProfileInfo();
  name.value = data.username;
  pinnedPost.value = data.pinnedPost;
  profilePosts.value = userStore.$state.posts;
  friends.value = data.friends;
  dto.value = data;
  // Add friends to store
});

definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
