<style scoped>

</style>
<template>
  <div v-if="friends.length > 0">
    <div class="" v-for="friend in friends" :key="friend">
      <v-card class="border-2 m-2 flex items-start justify-start">
        <NuxtLink :to="'/profile/' + friend.handleName">
        <StatusUserAvatar :props="friend.profilePicture" />
        </NuxtLink>
        <div class="p-2">
            {{ friend.username }}
        </div>

      </v-card>

    </div>
  </div>
  <div v-else>
    <div class="bg-color='#27272a' text-center p-4">
      <div class="text-2xltext-slate-100">No Friends</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['friends'])
const friends = ref(props.friends)
</script>