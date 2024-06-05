<template>
  <v-card ref="cardContainer">
    <div class="flex items-center gap-2">
      <NuxtLink to="/messages">
        <IconComponent :props="{ name: 'mdi-arrow-left' }" />
      </NuxtLink>
      <div class="text-2xl text-white font-light">{{ username }}</div>
    </div>
    <div v-for="message in props" :key="message">
      <div class="flex p-2 items-start gap-2" :class="setUserCss(message)">
        <NuxtLink :to="`/profile/${message.owner.handleName}`">
          <v-avatar>
            <img :src="message.owner.profilePicture" alt="avatar" />
          </v-avatar>
        </NuxtLink>
        <div
          class="talk-bubble tri-right left-top"
          :class="setUserCssChat(message)"
        >
          <div class="talktext font-bold z-10 text-black">
            <p>{{ message.content }}</p>
            <span class="text-sm font-extralight">{{
              createdAtLog(message.createdAt)
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </v-card>
  <div class="flex pl-3 justify-center md:pb-2 pb-20 items-center flex-">
    <v-textarea
      v-model="message"
      placeholder="Send a message..."
      rows="1"
      color="#fff"
      class="bg-slate-500"
      hide-details="true"
      variant="outlined"
    ></v-textarea>
    <v-btn
      :disabled="disabled"
      @click="sendMessage"
      flat
      class="bg-slate-400 m-4 jus text-black"
      >Send 📨</v-btn
    >
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";
import { useMessageStore } from "@/store/MessageStore";
const userStore = useUserStore();
const { props } = defineProps(["props"]);
const route = useRoute();
const username = route.params.id;
const userMessage = ref("");
const cardContainer = ref(null); // cr
const disabled = ref(false);
const message = ref("");
const messageStore = useMessageStore();
const emit = defineEmits(["messageSent"]);

const router = useRouter();
const id = router.currentRoute.value.params.id;
const sendMessage = async () => {
  if (message.value === "") {
    return;
  }
  disabled.value = true;
  const dto = {
    to: id,
    message: message.value,
  };
  await messageStore.sendMessage(dto);
  emit("messageSent", message.value);
  disabled.value = false;
};

const setUserCss = (message) => {
  if (message.owner._id === userStore.$state.userId) {
    return "justify-start flex-row-reverse ";
  } else {
    return "";
  }
};

const setUserCssChat = (message) => {
  if (message.owner._id === userStore.$state.userId) {
    return "tri-right border right-top";
  } else {
    return "";
  }
};
</script>

<style scoped>
.talk-bubble {
  /* margin: 40px; */
  display: inline-block;
  position: relative;
  padding: 11px;
  height: auto;
  background-color: #f2f3f3;
  margin-left: 10px;
  border-radius: 20px;
}
.tri-right.left-top:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  right: auto;
  top: 0px;
  bottom: auto;
  border: 22px solid;
  border-color: #f2f3f3 transparent transparent transparent;
}

.tri-right.border.right-top:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -40px;
  top: -10px;
  bottom: auto;
  border-color: #f2f3f3 transparent transparent transparent;
}
.tri-right.right-top:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -14px;
  top: -1px;

  bottom: auto;
  border: 20px solid;
  border-color: #f2f3f3 transparent transparent transparent;
}
</style>
