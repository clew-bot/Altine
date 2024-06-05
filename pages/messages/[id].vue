<style scoped>

</style>
<template>
  <NuxtLayout name="dash">
    <template #header>Messages</template>
    <template #rightSide><LayoutRightBarSuggested/></template>
    <div>
      <!-- <MessagesMessageUsers :props="props"/> -->
      <MessagesPrivateMessages @messageSent="messageHasBeenSent" :props="response" :key=refresh />
    </div>
</NuxtLayout>

</template>

<script setup>
import { useMessageStore } from '~~/store/MessageStore';
const messageStore = useMessageStore();
const refresh = ref(0);

const route = useRoute();
const userHandle = route.params.id;


let response = await messageStore.getPrivateMessages(userHandle);

const messageHasBeenSent = async (message) => {
  response = await messageStore.getPrivateMessages(userHandle);
  refresh.value = refresh.value + 1;
}

definePageMeta({
layout: false,
middleware: ["auth"],
});
</script>

