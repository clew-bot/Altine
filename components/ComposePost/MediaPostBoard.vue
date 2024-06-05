<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}</style>
<template>
  <Transition>
  <v-progress-linear
     v-if="loading"
      v-model="progress"
      height="25"
      color="green"
    >
      <strong>{{ progress }}{{ typeof progress === 'number' ? '%' : '' }}</strong>
    </v-progress-linear>
  </Transition>
  <ComposePostPreviewFiles
    v-if="source.length > 0 || videoSrc.length > 0"
    :source="source"
    :videoSrc="videoSrc"
    @deletePicture="deletePicture"
  />
  {{errorValue}}
  <div class="flex items-center p-3 bg-zinc-600 pb-5 relative">
    <div class="imageUpload">
      <label for="file-input">
        <IconComponent
          class="mt-1"
          :props="{ name: 'mdi-image', color: 'var(--postIcon)' }"
        />
      </label>
      <input @input="checkFile" accept="image/*" id="file-input" class="hidden" type="file" />
    </div>
    <div class="imageUpload">
      <label for="videoInput">
        <IconComponent
          class="pl-2 mt-1"
          :props="{ name: 'mdi-video', color: 'var(--postIcon)' }"
        />
      </label>
      <input @input="checkFileVideo" 
      accept="video/*"
      id="videoInput" class="hidden" type="file" />
    </div>
    <IconComponent
      class="pl-2 rotate-90 ml-2"
      :props="{ name: 'mdi-poll', color: 'var(--postIcon)' }"
      @click="usePoll"
    />
    <IconComponent
      class="pl-1 mt-1 hover:-rotate-45 transition-all"
      :props="{ name: 'mdi-puzzle', color: 'var(--postIcon)' }"
    />
    <v-btn
      @click="compose"
      class="absolute right-6 top-3 normal-case rounded-lg font-semibold tracking-tight"
      color="#0284c7"
      :class="disable ? 'bg-gray-700 text-white' : ' '"
      :disabled="disable || disable2"
      :elevation="disable ? '0' : '5'"
      >{{ countDown }}</v-btn
    >
  </div>
</template>

<script setup>
import { usePostStore } from "~~/store/postStore";
const store = usePostStore();
const disable = computed(() => props.post);
const disable2 = ref(false);
const props = defineProps(["post"]);
const emit = defineEmits(["userPosted"]);
const photoData = ref([]);
const vidData = ref([]);
const allFiles = ref([]);
const uploadImageLoading = ref(false);
const loading = ref(false);
const errorValue = ref("");
let interval = ref(null);
let countDown = ref("Post");
let source = ref([]);
let videoSrc = ref([]);
let progress = ref(0);
let allMedia = ref([]);

const usePoll = () => {
  store.openPoll();
};

const compose = async () => {
  store.submitPost = true;
  disable2.value = true;
  if (store.pollOpen === true) {
    store.submitPoll = true;
  }
  if (allFiles.value.length > 0) {
    loading.value = true;
    const {imageData, videoData, media, emit, progress, error} = await useFile(allFiles.value)
    if(error) {
      resetVals();
      console.log('There was an error')
      errorValue.value = error;
    } else {
      photoData.value = imageData;
      vidData.value = videoData;
      uploadImageLoading.value = emit;
      allMedia.value = media;
      
    }
  } else {
    await store.composePost();
    store.submitPoll = false;
    store.pollOpen = false;
    store.pollOk = true;

    emit("userPosted", true);
    countDown.value = 5;
    interval = setInterval(() => {
      countDown.value--;
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      countDown.value = "Post";
      disable2.value = false;
    }, 5000);
  }
};

watch(uploadImageLoading, async (val) => {
  if (val) {
    const data = {
      images: photoData.value,
      videos: vidData.value,
      media: allMedia.value,
    };
    await store.composePost(data);
    store.submitPoll = false;
    store.pollOpen = false;
    store.pollOk = true;
    resetVals();
    progress.value = 100;
    emit("userPosted", true);
    countDown = ref(5);
    interval = setInterval(() => {
      countDown.value--;
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      countDown.value = "Post";
    }, 5000);
    uploadImageLoading.value = false;
  }
});

const resetVals = () => {
  source.value = [];
  loading.value = false
  allFiles.value = [];
  allMedia.value = [];
  progress.value = 0;
  videoSrc.value = [];
}

const deletePicture = (index) => {

  videoSrc.value.splice(index, 1);
  source.value.splice(index, 1);
  allFiles.value.splice(index, 1);
};


const checkFile = (e) => {
  const [file] = e.target.files;
  source.value.push(URL.createObjectURL(file));
  allFiles.value.push(file);
};

const checkFileVideo = (e) => {
  const [file] = e.target.files;
  if(file){
    allFiles.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      videoSrc.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
</script>
