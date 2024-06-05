<style scoped>
@import url("@/assets/css/animations.css");
</style>
<template>
  <!-- {{ pinnedPost }} -->
  <StatusPinnedPost v-if="pinnedPost" :pinnedPost="pinnedPost" />
  <TransitionGroup name="list">
    <div
      v-for="(status, i) in props.modelValue"
      :key="status._id"
      class="cont flex justify-center"
    >
      <v-card
        elevation="0"
        color="#18181b"
        class="border-t-[.2px] rounded-none border-t-[var(--dashBorder)] bg-zinc-700 w-full"
      >
        <v-card-title>
          <div class="flex justify-items-start pt-3">
            <NuxtLink :to="`/profile/${status.author.handleName}`">
              <StatusUserAvatar :props="status.author.profilePicture" />
            </NuxtLink>
            <div class="absolute left-16 top-4 ml-2 w-fit">
              <NuxtLink :to="`/profile/${status.author.handleName}`">
                <div
                  class="text-lg font-semibold text-white hover:text-blue-300 cursor-pointer"
                >
                  {{ status.author.username }}
                </div>
              </NuxtLink>
              <div class="text-xs text-gray-400 cursor-pointer">
                @{{ status.author.handleName }}
              </div>
            </div>
            <NuxtLink :to="`/post/${status._id}`">
              <div
                class="text-slate-300 absolute top-5 right-6 text-xs cursor-pointer"
              >
                {{ regularDate(status.createdAt) }}
              </div>

              <div
                class="text-slate-500 absolute top-9 right-6 text-xs cursor-pointer"
              >
                {{ createdAtLog(status.createdAt) }}
              </div>
            </NuxtLink>
          </div>
        </v-card-title>
        <div class="flex flex-col gap-5">
          <v-card-text class="px-4 text-base text-white p-0 font-semibold">
            {{ status.content }}
          </v-card-text>
          <StatusPollView v-if="status.poll" :poll="status?.poll" />

          <div v-if="status.media">
            <StatusAllMediaPost v-model="status.media" />
          </div>
          <div class="flex justify-between">
            <div class="px-4 flex pt-10">
              <Transition>
                <div v-if="utilityObj[status._id]?.toolTip" class="relative">
                  <StatusTooltipStatus
                    :id="status._id"
                    :index="i"
                    @add-reaction="addReaction"
                    @mouseenter="openTooltip(status._id)"
                    @mouseleave="closeTooltip(status._id)"
                    class="absolute -top-14 -left-3r"
                  />
                </div>
              </Transition>
              <!-- {{checkStatusForMe(status.reactions)}} -->
              <v-icon
                @mouseleave="closeTooltip(status._id)"
                @mouseenter="openTooltip(status._id)"
                :style="{
                  color:
                    dynamicColor[i] ||
                    checkStatusForMe(status.reactions) ||
                    '#f5f5f4',
                }"
                size="default"
                class="cursor-pointer"
                >mdi-heart</v-icon
              >
              <IconComponent
                @click="openComments(i, status._id)"
                class="ml-3"
                :props="{
                  name: 'mdi-comment-text',
                  color: '#f5f5f4',
                  size: 'default',
                }"
              />
            </div>
            <div class="flex pt-10">
              <!-- {{ status }} -->
              <IconComponent
                @click="bookmarkPost(status._id, i)"
                :class="
                  bookmarks.includes(status._id) ? 'bg-green' : 'bg-orange'
                "
                class="rounded"
                :props="{ name: 'mdi-bookmark-box', color: '#fff' }"
                title="Bookmark this post"
              />

              <ClientOnly>
                <StatusPostMenu
                  :id="status._id"
                  :userId="userId"
                  :statusId="status.author._id"
                />
              </ClientOnly>
            </div>
          </div>
          <div class="flex px-4 pb-4">
            <span class="font-bold">{{ status.reactions.length }}&nbsp;</span>
            {{ status.reactions.length === 1 ? "Reaction" : "Reactions" }}
            •&nbsp;
            <span
              @click="openComments(i, status._id)"
              class="cursor-pointer font-bold"
              >{{ utilityObj[status._id]?.count || 0 }}&nbsp;</span
            >
            <span class="cursor-pointer" @click="openComments(i, status._id)"
              >Comments</span
            >
          </div>
        </div>
        <div v-if="i === Object.keys(props.modelValue).length - 1"></div>
        <div v-if="utilityObj[status._id]?.open">
          <StatusCommentInput
            @check-commented="checkCommented"
            :props="{
              id: status._id,
              key: i,
              profilePicture: status.author.profilePicture,
            }"
          />
          <div v-if="utilityObj[status._id]?.allComments">
            <StatusCommentPost
              v-model="utilityObj[status._id].allComments"
              :key="utilityObj[status._id].allComments"
              v-on:need-more-comments="getVal"
              :props="{ id: status._id }"
            />
          </div>
        </div>
      </v-card>
      <!-- <button @click="checkVal(status._id)">check</button> -->
    </div>
  </TransitionGroup>
</template>

<script setup>
import { createdAtLog, regularDate } from "@/utils/timeConvert";
import { usePostStore } from "@/store/postStore";
import { useUserStore } from "~~/store/userStore";
const userStore = useUserStore();
const store = usePostStore();
const props = defineProps(["modelValue", "pinnedPost"]);
const showMoreCommentLabel = ref(false);
let utilityObj = ref({});
let timeout;
const userId = ref(userStore.$state.userId);
const dynamicColor = ref({});

const bookmarks = ref(userStore.bookmarks);

//Bookmarks is the actual array of bookmarked posts in the model
//didClickBookmark is the array of booleans that will be used to change the color of the bookmark icon
const didClickBookmark = ref(Array(props.modelValue.length).fill(false));

const bookmarkPost = (id, index) => {
  const i = bookmarks.value.indexOf(id);
  if (i === -1) {
    // bookmarks.value.push(id)
  
     store.bookmarkPost(id)
    didClickBookmark.value[index] = true;
  } else {
    // store.bookmarkPost(id)
    store.unBookmarkPost(id);
    bookmarks.value.splice(i, 1);
    didClickBookmark.value[index] = false;
  }
};

const checkMatching = (id) => {
  if (utilityObj.value[id]) {
    return true;
  } else {
    return false;
  }
};

const checkStatusForMe = (reaction) => {
  for (let i = 0; i < reaction.length; i++) {
    if (reaction[i].from === userId.value) {
      switch (reaction[i].reactionType) {
        case "happy":
          return "#fde047";
        case "wink":
          return "#f9a8d4";
        case "angry":
          return "#ef4444";
        case "laugh":
          return "#0891b2";
        default:
          return "#F5F5F4";
      }
    } else {
      return "#F5F5F4";
    }
  }
};

// console.log(checkMatching(userId))
// console.log('myid', userId)
// console.log('utilityObj', utilityObj.value)

onMounted(() => {
  props.modelValue.forEach((status) => {
    utilityObj.value[status._id] = {
      showMoreCommentLabel: false,
      allComments: [],
      open: false,
      count: status.comments.length,
      toolTip: false,
    };
  });
});

const openTooltip = (id) => {
  if (utilityObj.value[id] === undefined) {
    utilityObj.value[id] = {
      showMoreCommentLabel: false,
      allComments: [],
      open: false,
      count: 0,
      toolTip: false,
    };
  }
  Object.keys(utilityObj.value).forEach((key) => {
    utilityObj.value[key].toolTip = false;
  });
  utilityObj.value[id].toolTip = true;
  clearTimeout(timeout);
};
const closeTooltip = (id) => {
  timeout = setTimeout(() => {
    utilityObj.value[id].toolTip = false;
  }, 1000);
};

const checkCommented = async (id, key, createdComment) => {
  const getComments = await store.getCommentsForPost(id);
  utilityObj.value[id].allComments = getComments;
  utilityObj.value[id].count = getComments.length;
};

const openComments = async (i, id) => {
  if (utilityObj.value[id] === undefined) {
    utilityObj.value[id] = {
      showMoreCommentLabel: false,
      allComments: [],
      open: true,
      count: 0,
      toolTip: false,
    };
  } else if (utilityObj.value[id].open === true) {
    utilityObj.value[id].open = false;
  } else {
    utilityObj.value[id].open = true;
  }
  const getComments = await store.getCommentsForPost(id);
  utilityObj.value[id].allComments = getComments;
};
const getVal = (arg) => {
  showMoreCommentLabel.value = arg;
};

const addReaction = async (reaction) => {
  Object.keys(utilityObj.value).forEach((key) => {
    utilityObj.value[key].toolTip = false;
  });

  if (reaction.theReaction === "happy") {
    dynamicColor.value[reaction.index] = "#fde047";
  } else if (reaction.theReaction === "wink") {
    dynamicColor.value[reaction.index] = "#f9a8d4";
  } else if (reaction.theReaction === "angry") {
    dynamicColor.value[reaction.index] = "#ef4444";
  } else if (reaction.theReaction === "laugh") {
    dynamicColor.value[reaction.index] = "#0891b2";
  } else {
    dynamicColor.value[reaction.index] = "black";
  }

  const postReaction = await store.addReaction(reaction);
};
</script>
