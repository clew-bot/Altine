<style scoped>
.newFont {
  font-family: "Unbounded", cursive !important;
}

.ok:deep() .v-label {
  opacity: 1 !important;
  font-size: 0.8rem !important;
  color: rgb(0, 0, 0);
  font-weight: 600;
}
</style>
<template>
  <div :class="theRoute === '/dashboard' ? 'bg-none' : 'bg-none'">
    <v-card class="mx-6 bg-zinc-500 border-t-4 border-t-slate-100">
      <v-radio-group>
        <p class="newFont text-xl font-bold p-2 text-black">{{ poll.title }}</p>
        <div class="ok">
          <div v-if="!openResults">
            <v-radio
            :disabled="poll.votedBy?.includes(userId) || disabled"
              v-for="option in poll.options"
              :key="option"
              :label="option.value"
              :value="option"
              @click="changeOption(option)"
              class="text-slate-50 z-10 text-xs opacity-100"
            ></v-radio>
          </div>
          <div
            v-else
          >
          <!-- <h2>Results</h2> -->
          <v-radio
            :disabled="true"
              
              v-for="option in poll.options"
              :key="option"
              :label="`${option.value} - ${option.votes} vote(s)`"
              :value="option"
              @click="changeOption(option)"
              class="text-slate-50 z-10 text-xs opacity-100"
            ></v-radio>
          
            <!-- <ul>
              <li v-for="(option, index) in poll.options" :key="index">
                {{ option.value }}
                {{ option.text }} - {{ option.votes }} vote(s)
              </li>
            </ul> -->
          </div>
        </div>
      </v-radio-group>

      <div class="flex justify-center items-center">
        <v-btn
          :disabled="poll.votedBy?.includes(userId) || disabled"
          class="m-2 normal-case grow"
          elevation="0"
          @click="handleVote(poll)"
          >Vote</v-btn
        >
        <v-btn
          color="#f9fafb"
          prepend-icon="mdi-poll"
          class="m-2 normal-case grow font-bold text-slate-600"
          elevation="0"
          @click="toggleResults"
        >
          Results</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { usePollStore } from "~~/store/pollStore";
import { useUserStore } from "~~/store/userStore";
const userStore = useUserStore();
const store = usePollStore();
const { poll } = defineProps(["poll"]);
const selectedOption = ref(null);
const openResults = ref(false);
const userId = ref(userStore.$state.userId);
const disabled = ref(false);
// When a user clicks on an option save the option
// and the user id to the database

// check url 
// if url is /polls/:id
// change background of the card to slate-100
 const router = useRouter();

const theRoute = router.currentRoute.value.path;
const toggleResults = () => {
  openResults.value = !openResults.value;
};

const changeOption = (option) => {
  selectedOption.value = option;

};

const handleVote = async (option) => {
  selectedOption.value.pollId = option._id;
  const newPolls = await store.castVote(selectedOption.value);
  selectedOption.value.votes = selectedOption.value.votes + 1;
  disabled.value = true;
 
};

const getResults = async () => {};

// console.log("props", poll)
</script>
