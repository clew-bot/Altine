<style scoped></style>
<template>

    <div class="text-center text-5xl font-bold pt-10">
      <h1 class="">The <span class="text-green-500">Nuxt</span> Big Thing</h1>
      <div class="text-3xl scroll-pt-10">
        <p class="p-10">Tailwind</p>
        <div class="flex justify-center items-center">
          <div class="w-1/2">
            <ClientOnly>
            <v-select
              label="Select"
              :items="cols"
              item-value="class"
              item-title="class"
              variant="solo"
              v-model="select"
              return-object
              single-line
            >
            </v-select>
            <v-select
              label="Select"
              :items="rows"
              item-value="class"
              item-title="class"
              variant="solo"
              v-model="selectTwo"
              return-object
              single-line
            >
            </v-select>
          </ClientOnly>
            <v-checkbox v-model="checked" label="Checkbox"></v-checkbox>
          </div>
        </div>
        <p class="pt-64 pb-10">Vuetify</p>
        <div class="flex justify-center items-center">
        <div class="w-2/3">
        <div
          class="transition-all grid justify-start items-center grid-cols-3 grid-rows-1 gap-4"
          :class="`${select.class}`"
        >
          <v-card
            :class="`${selectTwo.class}`"
            class="mx-auto transition-all bg-red-900 border-4"
            max-width="344"
            v-for="one in 12"
            :key="one"
          >
            <v-card-item>
              <div>
                <div class="text-overline mb-1">
                  {{ one }}
                </div>
                <div class="text-h6 mb-1">#{{ one }}</div>
                <div class="text-caption">
                  Javascript is really cool and fun. Pair it with Typescript.
                </div>
              </div>
            </v-card-item>

            <v-card-actions>
              <v-btn variant="outlined"> Hello World </v-btn>
            </v-card-actions>
          </v-card>

        </div>
      </div>
    </div>
        <p class="p-10">MDI Icons</p>
      </div>
      <i>mdi-chevron</i>
    </div> 
    <button @click="checkValue">on</button>
 
</template>

<script setup>
import { ref, reactive } from "vue";
definePageMeta({
  pageTransition: false,
  layoutTransition: false
})
const checked = ref(false);
const select = ref({ class: "Select a Class" });
const selectTwo = ref({ class: "Select a Class" });
const cols = ref([
  { class: "grid-cols-3" },
  { class: "grid-cols-4" },
  { class: "grid-cols-5" },
  { class: "grid-cols-6" },
]);
const rows = ref([
  { class: "bg-blue-800" },
  { class: "hover:animate-bounce" },
  { class: "rounded-2xl" },
  { class: "m-10" },
]);

</script>
