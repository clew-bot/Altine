<style scoped></style>
<template>
  <div class=" absolute top-4 ml-2 p-3 sm:p-1 flex flex-col">
    <div class="text-sm sm:text-base font-semibold">
      {{props.props.description}}
    </div>
    <div class="pt-32 pb-4 font-bold">{{props.props.changeDescription}}</div>
    <v-text-field
    :maxlength="props.props.maxLength"
    oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;" max="10"
      :name="props.props.name"
      density="compact"
      bg-color="#4b5563"
      variant="solo"
      limit="10"
      :prepend-inner-icon="props.props.icon"
      :label="props.props.placeholder || props.props.rules"
      type="email"
      :rules="props.props.rules"
      v-model="editInput"
      @input="updateInput"
    ></v-text-field>
  </div>
</template>

<script setup>
import { useEditStore } from '~~/store/EditStore';
const store = useEditStore();
const props = defineProps(['props']);
let editInput = ref(store.$state[props.props.name]);

const updateInput = () => {
  store.$state[props.props.name] = editInput.value;
};

watch(() => {
  editInput.length
})



</script>
