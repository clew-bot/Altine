<style scoped>
.newFont {
    font-family: 'Unbounded', cursive !important;
}
</style>
<template>
    <div>
        <v-card 
     
        @click="() => $router.push(`/messages/${theUsers.users[0].handleName}`)"
        class="border-t-[.2px] border-[var(--dashBorder)] rounded-none hover:bg-slate-600"
        v-for="theUsers in props.getMyConversations.conversations" :key="theUsers">
           <div class="absolute text-xs right-2 top-1">Sent  {{createdAtLog(theUsers.updatedAt)}}</div>
            <div class="flex items-start text-stone-100 mb-1 cursor-default overflow-hidden p-2 max-w-[34rem]">
                <NuxtLink :to="`profile/${theUsers.users[0].handleName}`">
                <v-avatar   class="mr-2 border-2">
                <img :src="theUsers.users[0].profilePicture" alt="avatar"
              >
            </v-avatar>
            </NuxtLink>
              <div class="cursor-pointer newFont font-lighter text-yellow-400 overflow-hidden text-ellipsis">{{theUsers.users[0].username}}:</div> 
              <div class="max-w-[40%] lg:max-w-[80%] overflow-clip whitespace-nowrap text-ellipsis">&nbsp;{{theUsers.latestMessage}}</div>
            </div>
        </v-card>
    </div>
</template>

<script setup>

const {props} = defineProps(['props'])
</script>

