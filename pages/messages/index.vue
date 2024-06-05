<style scoped>

</style>
<template>
  <NuxtLayout name="dash">
    <template #header>Messages</template>
    <template #rightSide><LayoutRightBarSuggested/></template>
    <div v-if="!loading">
      <MessagesMessageUsers :props="data"/>
      <!-- {{ data.getMyConversations.conversations.length === 0 }} -->
    </div>
    <div v-else
    class="flex justify-center items-center h-screen relative">
      <v-progress-circular
        class="absolute top-48"
          :width="4"
          color="white"
          indeterminate
        ></v-progress-circular>
    </div>
    <div>
      <div v-if="data?.getMyConversations.conversations.length === 0" class="text-center">
        <div class="text-2xl font-semibold pt-5 text-slate-100">No Messages</div>
        <div class="text-lg font-semibold text-slate-100">Your messages will go here.</div>
      </div>
    </div>
</NuxtLayout>

</template>

<script setup>
import { useMessageStore } from '~~/store/MessageStore';
const messageStore = useMessageStore();
const loading = ref(true)
const data = ref(null)

onMounted(async () => {
  data.value = await messageStore.getMyMessages();
  const sorted = await data.value.getMyConversations.conversations.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  loading.value = false;
});




definePageMeta({
layout: false,
middleware: ["auth"],
});
</script>

