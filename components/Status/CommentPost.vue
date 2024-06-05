<style scoped>
</style>

<template>
  <div v-if="!loading">
    <div
      v-for="(comment, i) in allComments"
      :key="comment.id"
      class="flex items-center border-t-[.2px] border-t-[var(--dashBorder)] pb-3 relative"
    >
    <!-- {{comment}} -->
      <div class="flex items-startrelative pt-3 pl-2 whitespace-normal">
        <NuxtLink :to="`/profile/${comment.author.handleName}`">
          <StatusUserAvatar
          class="mt-1"
          :props="comment.author.profilePicture"/>
          </NuxtLink>
        <div class="ml-2 z-10 w-full">
          <div>
            <div class="text-base font-bold text-stone-300 pr-8 pb-1 pt-0">
              <span
                class="cursor-pointer text-blue-400 hover:underline hover:text-blue-500"
                >
                <NuxtLink :to="`/profile/${comment.author.handleName}`">
                  {{ comment.author.username }}
                </NuxtLink></span
              >
              <span
                class="font-normal text-white hover:no-underline cursor-default"
                >&nbsp;{{ comment.content }}</span
              >
            </div>
            <div class="flex text-sm gap-2 font-semibold">
              <!-- <div class="text-red-300 hover:underline cursor-pointer">Report</div> -->
              <div class="text-sm text-gray-400 cursor-default">
                {{ createdAtLog(comment.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <IconComponent
        class="absolute right-4 top-3 cursor-pointer z-10"
        :props="{
          name: 'mdi-heart-outline',
          size: 'x-small',
          color: '#a3a3a3',
        }"
      />
      <div></div>
      <div v-if="i === comments.length - 1">
        <!-- <v-btn class="">See more comments</v-btn> -->
      </div>
    </div>
  </div>
  <div v-else>
    <v-progress-linear indeterminate color="cyan"></v-progress-linear>
  </div>
  <div
  v-if="modelValue.length > 5"
  class="flex p-3 font-bold border-t-[.2px] border-t-[var(--dashBorder)]">
    <IconComponent
      :class="{ '-rotate-90': !loadMore }"
      class="mr-2 transition-all roate"
      :props="{
        name: 'mdi-arrow-right-bottom-bold',
        size: 'default',
        color: 'green',
      }"
    />
    <span
      @click="loadMoreComments"
      class="hover:text-green-500 cursor-pointer transition-all"
    >
      {{helperLabel}}
    </span>
  </div>
</template>

<script setup>
const { modelValue } = defineProps([
  "props",
  "value",
  "modelValue",
]);
const loading = ref(true);
const comments = ref([]);
const emit = defineEmits(["needMoreComments"]);
const allComments = ref([]);
const loadMore = ref(false);
const globalSlice = ref(null)


const helperLabel = computed((val) => {
    if (modelValue.length > 0 && loadMore.value) {
        return "Load more comments 💬";
    } else {
        return "That's the end!";
    }
})

onMounted(async () => {
  const sliceValue = modelValue.length > 5 ? 5 : modelValue.length;
  globalSlice.value = sliceValue
  allComments.value = modelValue.slice(0, sliceValue);
  await nextTick();
  modelValue.length > 5 ? loadMore.value = true : loadMore.value = false
  loading.value = false;
});

const loadMoreComments = (val) => {
  allComments.value = modelValue.slice();
    loadMore.value = false;
};

</script>
