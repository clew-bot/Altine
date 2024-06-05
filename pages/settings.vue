<style scoped></style>
<template>
  <NuxtLayout name="dash">
    <template #header>Settings</template>
    <template #rightSide><LayoutRightBarSuggested /></template>

    <v-card flat class="p-2 bg-slate-600">
            <v-switch
              v-model="ex11"
              label="Private Profile"
              color="success"
              value="success"
              hide-details
            ></v-switch>
  </v-card>
    <!-- <div v-else="loading" class="flex justify-center items-center h-screen relative">
        <v-progress-circular
        class="absolute top-48"
          :width="4"
          color="white"
          indeterminate
        ></v-progress-circular>
      </div> -->
    
  </NuxtLayout>
</template>

<script setup>
import { useNotifStore } from "~~/store/NotifStore";
import { useUserStore } from "~~/store/userStore";
const userStore = useUserStore();
const notifStore = useNotifStore();

const ex11 = ref(['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red-darken-3', 'indigo-darken-3', 'orange-darken-3']);

// const refresh = async (data) => {
//   // console.log("in refresh", data.allNotifications.notifications);
//   // allNotifs.value = data.allNotifications.notifications;
//   // console.log("allNotifs", allNotifs.value);
//   refresher.value++;
// };




definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
