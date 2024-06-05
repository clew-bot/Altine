<style scoped>
.list-group-item:deep() .v-field {
  border-radius: 3px !important;
  text-transform: none;
}
</style>

<template>
  <div
    class="normal-case border-2 p-2 rounded bg-neutral-300 text-slate-800 relative pb-7"
  >
    <div class="ml-7 text-base">Poll</div>
    <IconComponent
      class="pl-2 rotate-90 w-fit ml-2 absolute top-0 left-1"
      :props="{ name: 'mdi-poll', color: '#262626', size: '1rem' }"
    />
    <IconComponent
      class="pl-2 rotate-90 w-fit ml-2 absolute top-0 right-1"
      @click="handleClosePoll"
      :props="{ name: 'mdi-close-circle', color: '#262626', size: '1rem' }"
    />
    <p class="text-base absolute bottom-0 left-9">Add another option</p>
    <IconComponent
      class="pl-2 rotate-90 w-fit ml-2 absolute bottom-0 left-1"
      :props="{ name: 'mdi-plus-circle', color: '#262626', size: '1rem' }"
      @click="handleAddPoll"
    />

    <draggable v-model="items" item-key="id">
      <template #item="{ element }">
        <div class="list-group-item">
          <!-- {{ element }} -->
          <!-- <PollInput :value="element.value" :icon="element.icon" :label="element.label"/> -->
          <v-text-field
            density="compact"
            variant="solo"
            bg-color="#262626"
            single-line=""
            hide-details
            :label="element.label"
            class="p-1 rounded-none placeholder:text-sm"
            v-model="element.value"
          >
            <template v-slot:append-inner>
              <v-icon size="1rem" class="handle cursor-pointer pt-2">{{
                element.icon
              }}</v-icon>
              <v-icon
                size="1rem"
                @click="handleClose(element.id)"
                class="cursor-pointer pt-2"
                >mdi-close</v-icon
              >
            </template>
          </v-text-field>
        </div>
      </template>
    </draggable>
  </div>
  <!-- <button @click="check">check</button> -->
</template>

<script setup>
import { usePostStore } from "~~/store/postStore";
import draggable from "vuedraggable";
const postStore = usePostStore();

const handleClosePoll = () => {
  postStore.pollOpen = false;
}

const items = ref([
  {
    id: 1,
    label: "Enter an Option...",
    icon: "mdi-dots-grid",
    value: "",
    votes: 0,
  },
  {
    id: 2,
    label: "Enter an Option...",
    icon: "mdi-dots-grid",
    value: "",
    votes: 0,
  },
  {
    id: 3,
    label: "Enter an Option...",
    icon: "mdi-dots-grid",
    value: "",
    votes: 0,
  },
]);
const watchItems = watch(items.value, (newVal, oldVal) => {
  if (
    postStore.pollOpen &&
    Object.values(newVal).some((item) => item.value === "")
  ) {
    postStore.pollOk = false;
    return;
  } else {
    postStore.pollOk = true;
  }
});

const watcherSubmit = watchEffect(async () => {
  if (postStore.pollOpen) {
    postStore.pollOk = false;
  }
  if (postStore.submitPoll) {
    if (postStore.pollOpen) {
      postStore.poll = items.value;
    } else {
      postStore.poll = null;
      return;
    }
  }
});

const handleClose = (event) => {
  for (let i = 0; i < items.value.length; i++) {
    if (items.value[i].id === event) {
      items.value.splice(i, 1);
    }
  }
};

const handleAddPoll = () => {
  items.value.push({
    icon: "mdi-dots-grid",
    id: items.value.length + 1,
    label: "Enter an Option...",
    value: "",
  });
};

</script>
