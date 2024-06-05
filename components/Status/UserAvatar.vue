<style scoped>
.badger:deep() .v-img__img--contain {
  object-fit: cover !important;
}
</style>
<template>
      <v-badge
              color="green"
              location="bottom right"
              offset-x="5"
              dot
              bordered
              class="badger"
            >
              <v-avatar 
              class="border-2" 
              :size="props.size ? props.size : '48'">
                <v-img
                  :src="props.props"
                  alt="John"
                  class="cursor-pointer object-cover"
                  >
                  </v-img>
                <span class="text-4xl"></span>
              </v-avatar>
            </v-badge>
</template>

<script setup>
const props = defineProps(['props', 'size'])

</script>

