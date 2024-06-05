<style lang="scss" scoped>

</style>
<template>
    <div class="text-center cursor-pointer">
        <div
          color="primary"
          v-bind="props"
          class="font-semibold text-left text-lg p-2 hover:text-green-400 transition-all"
          @click="pinPost"
        >
          Pin
      </div>
  </div>
</template>

<script setup>
import { usePostStore } from '~~/store/postStore';
const store = usePostStore();
const props = defineProps(['id']);
const dialog = ref(false);

const pinPost = async () => {
  const hello = await store.pinPost(props.id);
  dialog.value = false;
  //refresh page
};


</script>


