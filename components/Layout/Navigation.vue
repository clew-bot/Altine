<template>
       <div class="hidden relative xl:w-1/3 sm:block border-r-[.2px] border-[var(--dashBorder)] bg-[#343438] w-1/6">
            <div class="sticky top-0 pt-8 overflow-auto">
                <ul class="text-lg lg:text-lg font-semibold flex flex-col justify-center xl:items-start items-center">
                    <li>  
                        <!-- <v-avatar 
                        class="ml-4"
                        color="blue">
                            <v-icon dark
                            
                            >
                                mdi-account-circle
                            </v-icon>
                            </v-avatar> -->
                    </li>
                    <NuxtLink to="/dashboard">
                        <li class="xl:p-5 sm:p-3 flex justify-center items-center">
                            <img :src="home" alt="" class="pl-1 icon-hover">
                            <p class="ml-5 hidden xl:block hover:border-b-2
                              hover:mb-[-2px]
                             hover:border-b-purple-500 ">Home</p></li>
                    </NuxtLink>
                    <NuxtLink to="/notifications">
                        <li class="xl:p-5 sm:p-3 flex justify-center items-center  cursor-pointer">
                            <v-badge offset-x="5" color="red" :content="(count || 0)" v-if="(count > 0)">
                                <img :src="bell" alt="" class="pl-1 icon-hover">
                            </v-badge>
                            <img v-else :src="bell" alt="" class="pl-0 xl:-mt-3 icon-hover">
                            <p class="ml-5 hidden xl:block xl:-mt-3  z-10
                              hover:border-b-2
                              hover:mb-[-2px]
                             hover:border-b-purple-700 ">Notifications</p></li>
                    </NuxtLink>
                    <NuxtLink to="/messages">
                        <li class="xl:p-4 sm:p-3 flex justify-center items-center">
                            <img :src="message" alt="" class="-mt-3 pl-1 icon-hover">
                            <p class="ml-5 hidden xl:block -mt-2
                            hover:border-b-2
                              hover:mb-[-2px]
                             hover:border-b-purple-700 ">Messages</p></li>
                    </NuxtLink>
                    <NuxtLink to="/bookmarks">
                    <li class="xl:p-4 sm:p-3 flex justify-center items-center"> <img
                        :src="bookmark" alt="" class="pl-1 icon-hover">
                        <p class="ml-5 hidden xl:block
                        hover:border-b-2
                              hover:mb-[-2px]
                             hover:border-b-purple-700 ">Bookmarks</p></li>
                    </NuxtLink>
                    <NuxtLink to="/profile">
                    <li class="xl:p-4 xl:pl-5 sm:p-3 flex justify-center items-center"> <img
                        :src="profile" alt="" class="pl-1 icon-hover">
                        <p class="ml-5 hidden xl:block xl:pl-2
                        hover:border-b-2
                              hover:mb-[-2px]
                             hover:border-b-purple-700 ">My Profile</p></li>
                    </NuxtLink>
                    <NuxtLink to="/settings">
                    <li class="xl:p-4 sm:p-3 flex justify-center items-center"> <img
                        :src="more" alt="" class="pl-1 icon-hover">
                        <p class="ml-5 hidden xl:block
                        hover:border-b-2
                              hover:mb-[-2px]
                             hover:border-b-purple-700 ">More</p></li>
    </NuxtLink>
                    <li  @click="logout" class="xl:p-4 sm:p-3 flex justify-center items-center cursor-pointer
                    transition-all"> <img
                        :src="logouts" alt="" class="pl-1 icon-hover">
                        <p class= "
                        ml-5 hidden xl:block
                        hover:border-b-2
                              hover:mb-[-2px]
                             hover:border-b-purple-700 ">Logout</p></li>
                        
                </ul>
            </div>
        </div>
            <div
           class="bg-[var(--backgroundColor)] text-white text-center p-4 border-t-[.2px] border-t-[var(--dashBorder)] w-full fixed bottom-0 z-10 sm:hidden"
           >
        <div class="flex justify-evenly items-center">
            <NuxtLink to="/dashboard">
                <IconComponent :props="{ name: 'mdi-home-variant', size: 'large'}"/>
           </NuxtLink>
           <NuxtLink to="/notifications">
                <IconComponent :props="{ name: 'mdi-bell', size: 'large'}"/>
            </NuxtLink>
            <NuxtLink to="/bookmarks">
           <IconComponent :props="{ name: 'mdi-bookmark', size: 'large'}"/>
           </NuxtLink>
           <NuxtLink to="/messages">
           <IconComponent :props="{ name: 'mdi-message-bulleted', size: 'large'}"/>
           </NuxtLink>
           <NuxtLink to="/profile">
           <v-avatar 
            class=""
            color="blue">
                <v-icon dark>
                    mdi-account-circle
                </v-icon>
            </v-avatar>
            </NuxtLink>
        </div>
      </div>
</template>

<script setup>
import heart from "@/assets//svg/heart.svg";
import home from "@/assets//svg/home.svg";
import message from "@/assets//svg/message.svg";
import bell from "@/assets//svg/bell.svg";
import bookmark from "@/assets//svg/bookmark.svg";
import profile from "@/assets//svg/profile.svg";
import more from "@/assets//svg/more.svg";

import plus from "@/assets//svg/plus.png";
import logouts from "@/assets/svg/logout.svg";


import { useUserStore } from "~~/store/userStore";
const store = useUserStore();
// const notificationNumber = ref(store.$state?.notificationCount)
const count = ref(store.$state?.notificationCount)
const notificationNumber = store.$subscribe((state) => {
    if(state.events.key === 'notificationCount') {
        count.value = state.events.newValue
    }
})


// watch(notificationNumber.value, (val) => {
//     console.log("Running")
//     count.value = val
// })



const logout = async () => {
    const loggingOut = await store.logout();
    navigateTo('/login')
    }
</script>

<style lang="scss" scoped>

</style>