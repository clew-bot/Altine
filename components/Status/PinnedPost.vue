<style scoped>
.newFont {
  font-family: "Unbounded", cursive !important;
}
</style>
<template>
  <div class="border-4 border-indigo-900">
    <div class="absolute right-2 top-7 text-xs z-10">
      {{ createdAtLog(pinnedPost.createdAt) }}
    </div>
    <IconComponent
      title="Pinned Post"
      class="absolute right-1 top-1 z-10 rotate-12 cursor-default"
      :props="{ name: 'mdi-pin', size: '20', color: '#f8fafc' }"
    />
    <div class="flex bg-indigo-900">
      <div class="pt-3 pl-3">
        <v-avatar size="55" class="border-2">
          <img :src="pinnedPost.author.profilePicture" alt="avatar" />
        </v-avatar>
      </div>
      <div class="flex flex-col">
        <v-card-title class="newFont font-bold">
          <NuxtLink :to="`/profile/${pinnedPost.author.handleName}`">
            {{ pinnedPost.author.username }}
          </NuxtLink>
        </v-card-title>
        <v-card-text>
          {{ pinnedPost.content }}
        </v-card-text>
      </div>
    </div>
    <StatusAllMediaPost v-model="pinnedPost.media" />
    <div v-if="pinnedPost.poll !== null">
    <StatusPollView  class="bg-indigo-900 pb-8" :poll="pinnedPost.poll" />
    </div>
  </div>
</template>

<script setup>
const { pinnedPost } = defineProps(["pinnedPost"]);
</script>
