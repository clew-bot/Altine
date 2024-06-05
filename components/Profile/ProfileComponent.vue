<style scoped>

.newFont {
    font-family: 'Unbounded', cursive !important;
}

</style>
<template>
    <div>
    <div class="relative">
        <div class="">
        <v-avatar
        class="h-[130px] w-[130px] border-2 absolute transition-all
        left-3 -top-12 rounded-full z-9 bg-black hover:h-[200px] hover:w-[200px]"
            color="primary"
            size="128"
            >
            <img 
            class=" transition-all h-[130px] w-[130px] border-2 absolute object-cover hover:h-[200px] hover:w-[200px]"
        :src="props.profilePicture" alt=""></v-avatar>

        </div>
        <div v-if="props._id === userId" class="absolute top-5 right-6">
            <EditProfileModal/>
            
        </div>
        <div v-else>
       
            <div class="absolute top-5 right-5">
                <ProfileAddFriendButton :props="{id: props._id, username: props.username}"/>
            </div>
            <div class="absolute top-16 right-5">
                <ProfileMessageButton :props="props._id"/>
            </div>
        </div>
    </div>
    <div class="pt-24 -mb-6 pb-5 bg-zinc-700">
        <div class="px-5">
            <div class="font-bold text-4xl text-slate-50
            newFont cursor-default">
                {{props.username}}
            </div>
            <div class="newFont pt-1">
                @{{props.handleName}}
            </div>
            <div class="flex text-sm font-semibold pt-4">
                <IconComponent class="pr-2" :props="{name: 'mdi-calendar-text', size: 'x-small'}"/><span class="font-base text-yellow-400">Joined {{regularDate(props.createdAt)}}</span>
            </div>
            <div class="flex text-sm font-semibold pt-1">
                <IconComponent class="pr-2" :props="{name: 'mdi-map-marker', size: 'x-small'}"/><span>{{props.location}}</span>
            </div>
            <div class="flex text-sm font-semibold pt-1">
                <IconComponent class="pr-2" :props="{name: 'mdi-cake-variant', size: 'x-small'}"/><span>{{props?.birthday}}</span>
            </div>
            <div class="pt-5 text-xl">{{props.bio || 'If it ain\'t broke don\'t fix it'}}</div>
        </div>
    </div>
</div>
</template>

<script setup>
import { regularDate } from '@/utils/timeConvert'
import { useUserStore } from '~~/store/userStore';
const userStore = useUserStore();
const { props } = defineProps(['props'])
const userId = ref(userStore.$state.userId);
</script>

