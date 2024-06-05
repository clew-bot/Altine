<style scoped>
@import url("@/assets/css/vuetifyOverrides.css");

</style>
<template>
    <Poll v-if="store.pollOpen"/>

    <div class="relative">
        <div class="text-container">
            <v-container fluid>
                 <v-textarea
                v-model="userPost"
                variant="filled"
                label="Compose new post..."
                auto-grow
                rows="2"
                color="white"
                class="bg-zinc-700"
                hide-details="true"
                ></v-textarea>
            </v-container>
        </div>
    </div>
</template>

<script setup>
import { usePostStore } from '~~/store/postStore';
const store = usePostStore();
const userPost = ref("");

const emit = defineEmits(["updatePost"]);
const props = defineProps(['reset']);

const checkReset = computed(() =>  props.reset )

watch(checkReset, (newVal) => {
    if (newVal) {
    userPost.value = "";
    }
})

store.$patch({post: userPost.value})
watch(userPost ,(newVal) => {
    if(!checkReset.value) {
    store.$patch({post: userPost.value})
    }
})

</script>

