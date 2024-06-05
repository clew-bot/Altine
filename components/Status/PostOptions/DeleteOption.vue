<style lang="scss" scoped>

</style>
<template>
    <div class="text-center cursor-pointer">
    <v-dialog
      v-model="dialog"
    >
      <template v-slot:activator="{ props }">
        <div
          color="primary"
          v-bind="props"
          class="font-semibold text-left text-lg p-2 hover:text-red-400 transition-all"
          @click="dialog = true"
        >
          Delete
      </div>
      </template>
<div class="flex justify-center">
      <v-card class="max-w-[25rem] bg-neutral-600 p-2">
        <v-card-text class="text-center text-lg">
          <div class="font-semibold">Are you sure you want to delete this?</div>

          <span class="font-bold text-red-300">This action cannot be undone!</span>
          <div class="p-2 pt-6 flex justify-evenly gap-4">
            <v-btn @click="trashPost" class="w-1/2" color="green">Yes</v-btn>
            <v-btn @click="dialog = false" class="w-1/2" color="red">No</v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" block @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { usePostStore } from '~~/store/postStore';
const store = usePostStore();
const props = defineProps(['id']);
const dialog = ref(false);

const trashPost = async () => {
  const hello = await store.deletePost(props.id);
  // store.getRefresh();
  dialog.value = false;
  //refresh page
};


</script>


