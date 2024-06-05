<template>
  <div>
    <div v-if="props.source" class="relative flex gap-1 justify-start overflow-auto pb-1 bg-neutral-700">

      <v-icon v-for="pic in props.source" :key="pic" @click="deletePicture(i)" color="black" class="absolute border-2 z-10 top-0 bg-red"
          >mdi-close</v-icon
        >
        <img 
        v-for="(src) in props.source"
        :key="src"
        class="myvideo w-2/4 sm:max-w-[500px] relative flex "  :src="src" alt="" />
    </div>
    <div v-if="props.videoSrc" class="relative flex justify-start overflow-auto bg-neutral-700">
      <v-icon @click="deletePicture(i)" color="black" class="absolute border-2 z-10 top-0 bg-red"
          >mdi-close</v-icon
        >
        <video 
        v-for="vidSrc in props.videoSrc"
        :key="vidSrc"
        muted
        autoplay 
        controls 
        class="myvideo w-2/4 sm:max-w-[225px] relative flex " 
        >
  
          <source :src="vidSrc" type="video/mp4" id="video_here" />
          Your browser does not support HTML5 video.
        </video>

    </div>
  </div>
</template>

<script setup>
const props = defineProps(['source', 'videoSrc']);
const emit = defineEmits(['deletePicture']);

const deletePicture = (i) => {
  emit('deletePicture', i);
};

</script>

<style lang="scss" scoped></style>
