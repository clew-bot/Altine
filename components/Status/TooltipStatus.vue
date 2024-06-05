<style scoped>

.newAnim {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1);
}

@keyframes rotate45 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.start1 {
  animation: rotate45 1s cubic-bezier(0, 0, 0.2, 1);
}

</style>
<template>
  <div>
    <div
  
      class="bg-zinc-900 h-[3rem] w-[12rem] rounded-lg shadow-lg flex justify-evenly items-center"
    >
      <v-icon 
      :class="{ newAnim: anim1}"
      @click="(addReaction('happy'), anim1 = true)"
      color="#fde047" size="large" class="cursor-pointer"
        >mdi-emoticon-happy</v-icon
      >
      <v-icon 
      :class="{ newAnim: anim2 }"
      @click="(addReaction('laugh'), anim2 = true)"
      class="cursor-pointer" color="#0891b2" size="large">
        mdi-emoticon-excited
      </v-icon>
      <v-icon 
      :class="{ newAnim: anim3 }"
      @click="(addReaction('wink'), anim3 = true)"
      class="cursor-pointer" color="#f9a8d4" size="large">
        mdi-emoticon-wink
      </v-icon>
      <v-icon 
      :class="{ newAnim: anim4 }"
      @click="(addReaction('angry'), anim4 = true)"
      class="cursor-pointer" color="#ef4444" size="large">
        mdi-emoticon-angry
      </v-icon>
    </div>
  </div>
</template>

<script setup>
const hoverIconAnimation = ref({});
const anim1 = ref(false);
const anim2 = ref(false);
const anim3 = ref(false);
const anim4 = ref(false);
const props = defineProps(["id", "index"]);
const emit = defineEmits(["addReaction"]);
const trigger1 = ref(false);

onMounted(() => {
  setTimeout(() => {
    trigger1.value = true;
  }, 1000);
});

const addReaction = (reaction) => {
  const dto = {
    statusId: props.id,
    theReaction: reaction,
    index: props.index,
  };
  setTimeout(() => {
    emit("addReaction", dto);
  }, 300);

};




</script>