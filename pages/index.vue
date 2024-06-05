<style>
.newFont {
    font-family: 'Unbounded', cursive !important;
}
</style>
<template>
  <div class="flex flex-col justify-center items-center mt-10">
<h2 class="text-yellow-200 bg-red-900   p-10  rounded text-center text-5xl font-bold newFont">
ASM

</h2>

<div class="font-bold text-slate-100 italic text-xl">
Another Social Media
</div>

<div>
  </div>
  </div>
</template>

<script setup>

import Test from "@/components/Test.vue";
import TestTwo from "@/components/TestTwo.vue";

const show1 = ref(false);

const toggleSquare = (e) => {
  e.target.classList.toggle('square');
};

setTimeout(() => {
  show1.value = true;
}, 3000);
</script>

