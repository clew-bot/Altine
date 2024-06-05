<style scoped>
@import url("@/assets/css/animations.css");
.newFont {
    font-family: 'Unbounded', cursive !important;
}
</style>
<template>
  <v-card elevation="0">
    <TransitionGroup name="notif">
      <v-list
        v-for="notification in modelValue"
        :key="notification"
        class=" bg-zinc-700 hover:bg-zinc-800 border-b-[var(--dashBorder)] border-[.2px] transition-all duration-150"
      >
      <!-- {{ notification.type }} -->
        <v-card-title
        class=" pb-0">
          <div class="flex justify-items-start">
            <NuxtLink :to="`/profile/${notification.from?.handleName}`">
              <StatusUserAvatar
                class="mt-1"
                :props="notification?.from?.profilePicture"
                :size="35"
              />
            </NuxtLink>
            <div class="ml-3 w-full">
              <div
              v-if="notification.type !== 'friendRequestReceived'"
              class="text-slate-500 absolute top-0 right-1 text-xs cursor-default"
            >
              <IconComponent
              @click="deleteNotification(notification.from._id,notification._id)"
                :props="{
                  name: 'mdi-close-thick',
                  size: 'small',
                  color: 'red',
                }"
              />
            </div>
              <div 
              :class="{ 
              'text-green-500 animate-pulse hover:text-green-400': notification.type === 'friendRequestAccepted',
              'text-red-400 hover:animate-pulse': notification.type === 'friendRequestDenied',
              'text-blue-400 hover:animate-pulse': notification.type === 'friendRequestSent',
              'text-sky-500 uppercase animate-pulse animate-bounce': notification.type === 'friendRequestReceived',}"

              class="newFont text-sm font-light  cursor-default w-fit">
                {{ notification.title }}
              </div>
              <div
                class="newFont text-xs font-light text-stone-100 mb-1 cursor-default overflow-hidden w-[80%] sm:w-[85%] lg:w-[88%] whitespace-nowrap text-ellipsis inline-block"
              >
                {{ notification.content }}
   
              </div>

          
            </div>

            <div
              class="text-slate-300 absolute top-4 right-6 text-xs cursor-default"
            ></div>
            <div
              class="text-slate-200 absolute top-4 right-6 text-xs cursor-default"
            >
              {{ simplifiedTime(notification.createdAt) }}
            </div>
            <div
              class="text-slate-300 absolute bottom-4 right-6 text-xs cursor-default"
            ></div>
            <div v-if="notification.type === 'friendRequestReceived'">
              <v-btn
                class="text-slate-100 absolute bottom-2 right-10 text-xs cursor-pointer rounded p-1 hover:shadow-lg z-10 transition-all
                bg-green-900"
                icon="mdi-check-bold"
                size="xx-small"
                elevation="1"
                @click="
                  acceptFriendRequest(notification.from._id, notification._id)
                "
              >

            </v-btn>
              <v-btn
                @click="
                  denyFriendRequest(notification.from._id, notification._id)
                "
                icon="mdi-close-thick"
                size="xx-small"
                elevation="1"
                class="text-slate-100 absolute bottom-2 right-2 text-xs cursor-pointer rounded p-1 bg-red-900 hover:shadow-lg z-10 transition-all"
              >

          </v-btn>

              <!-- <IconComponent
              v-if="!clicked"
              @click="acceptFriendRequest(notification.from._id, notification._id)"
              :props="{name: 'mdi-check-bold', size: 'large', color: 'green'}" /> -->
            </div>
       
            <!-- <div>
            <div
              class="text-slate-500 absolute bottom-2 right-4 text-xs cursor-default"
            >
              <IconComponent
              @click="deleteNotification(notification._id)"
              :props="{name: 'mdi-check-bold', size: 'large', color: 'green'}" />
            </div>
          </div> -->
          </div>
        </v-card-title>
      </v-list>
    </TransitionGroup>
  </v-card>
</template>
<script setup>
import { useNotifStore } from "~~/store/NotifStore";
const { modelValue, props } = defineProps(["modelValue", "props"]);
const emit = defineEmits(["accepted"]);
const clicked = ref(false);

const notifStore = useNotifStore();

const acceptFriendRequest = async (fromId, notifId) => {
  clicked.value = true;
  const dto = {
    fromId,
    notifId,
  };
  const newNotifs = await notifStore.acceptFriendRequest(dto);

  emit("accepted", newNotifs);
};

const denyFriendRequest = async (fromId, notifId) => {
  clicked.value = true;
  const dto = {
    fromId,
    notifId,
  };
  const denyNotif = await notifStore.declineFriendRequest(dto);
  emit("accepted", denyNotif);
};

const deleteNotification = async (fromId, notifId) => {
  const dto = {
    fromId,
    notifId,
  };
  const deleteNotif = await notifStore.deleteNotif(dto);
};
</script>
