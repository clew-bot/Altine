<style scoped>
.no-scroll::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.no-scroll {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
</style>
<template>
  <div
    class="relative hidden md:block w-1/2 xl:w-2/3 border-1 z-10 border-l-[.2px] border-l-[var(--dashBorder)]"
  >
    <div class="sticky top-0 h-screen overflow-auto no-scroll">
      <v-card class="p-1 overflow-hidden border-2 rounded m-3 pb-2">
        <v-card-title class="italic pb-0">Suggested People</v-card-title>
        <v-card-text class="italic">You may know</v-card-text>
        <!-- Loop over the Suggestions -->
        <div
          v-for="user in theSuggestions"
          :key="user._id"
          class="flex justify-between items-center p-1 px-4 pb-1"
        >
          <div class="flex items-center">
            <StatusUserAvatar :props="user.profilePicture" :size="40" />
            <div class="semi-bold pl-1 font-bold">{{ user.username }}</div>
          </div>
          <NuxtLink
            :to="`/profile/${user.handleName}`"
            class="flex items-center"
          >
            <v-btn class="rounded-lg p-2 bg-slate-700 text-xs font-semibold"
              >View</v-btn
            >
          </NuxtLink>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";
const store = useUserStore();

const theSuggestions = ref();

const theSuggestedPeople = await store.getSuggestedPeople();
theSuggestions.value = theSuggestedPeople;

// Make request to get suggested people from the server
</script>
