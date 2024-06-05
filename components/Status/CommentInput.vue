<style scoped>
.comment-container:deep() .v-field__outline {
  display: none !important;
  
}

.comment-container:deep() .v-field--variant-filled, .v-field__overlay  {
  background-color: inherit !important;
  border-bottom: solid .2px var(--dashBorder);
  border-radius: 0px !important;
  
  
}

.comment-container:deep() .v-field--variant-filled, .v-field__overlay  {
  background-color: inherit !important;
  border-bottom: none;
  border-radius: 0px !important;
  

}

.comment-container:deep() .v-field__overlay {
  background-color: inherit !important;
  border-radius: 0px !important;
 
}

.comment-container:deep() .v-field__overlay {
  /* border: solid 2px red !important; */
  background: #2b312b !important;
  border-radius: 0px !important;
 
}

.comment-container:deep() .v-label {
  text-transform: none !important;
  border-radius: 0px !important;

}

.comment-container:deep() .v-container {
  padding: 0px !important;

  /* width: 80% !important; */
}
</style>
<template>
    <div class="flex items-end justify-center border-t-[.2px] border-t-[var(--dashBorder)] ">
        <div class="px-2 mb-0">
          <StatusUserAvatar :props="userStore.$state.profilePicture"/>
        </div>
        <div class="comment-container grow">
            <v-container fluid>
                <v-textarea
                v-model="theText"
                elevation="0"
                variant="solo"
                label=""
                bg-color="#565661"
                auto-grow
                color="white"
                placeholder="Comment.."
                rows="1"
                hide-details="true"
                @keydown.enter.prevent="sendComment"
                ></v-textarea>
            </v-container>
        </div>
        <div
        class="pb-5 px-4 "
        >
            <v-icon
           
            @click="sendComment"
            color="#67e8f9"
            class="-rotate-[30deg] cursor-pointer hover:text-[#22d3ee]">mdi-send</v-icon>
        </div>
<!-- <button @click="clickMe">CLick</button> -->
    </div>
</template>

<script setup>
import { usePostStore } from '@/store/postStore'
import { useUserStore } from '@/store/userStore'
const userStore = useUserStore()
const store = usePostStore();
const { props } = defineProps(['props'])
const emit = defineEmits(['checkCommented'])
const theText = ref('');

const profilePic = ref(userStore.$state.profilePicture)


const sendComment = async () => {
  theText.value = theText.value.trim();
  const data = {
    comment: theText.value,
    postRefId: props.id
  }
  const newComment = await store.postComment(data);
  emit('checkCommented', props.id, props.key, newComment.createdComment);

  theText.value = '';
}


</script>