<style scoped></style>
<template>
  <div class=" absolute top-4 ml-2 p-3 sm:p-1 flex flex-col overflow-visible">
    <div class="text-sm sm:text-base font-semibold">
      {{props.props.description}}
    </div>
    <div class="w-1/2">
    <ComposePostPreviewFiles
    v-if="store.$state.profilePicturePreview['preview'].length > 0 || coverPhoto.length > 0"
    :source="store.$state.profilePicturePreview['preview']"
    @deletePicture="deletePicture"
  />
</div>
    <div class="pb-4 font-bold">{{props.props.changeDescription}}</div>
    <v-file-input v-if="props.props.value === 'Profile Picture'"
    :showSize="1024"
    @input="handleProfilePicture"
    accept="image/*"
    :label="props.props.value"
  ></v-file-input>
  <v-file-input v-if="props.props.value === 'Cover Photo'"
    :showSize="1024"
    @input="handleCoverPhoto"
    accept="image/*"
    :label="props.props.value"
  ></v-file-input>
  </div>
</template>

<script setup>
import { useEditStore } from '~~/store/EditStore';
const store = useEditStore();
const props = defineProps(['props']);
const profilePicture = ref([]);
const coverPhoto = ref([]);

const handleProfilePicture = (e) => {
    resetProfileVals();
    const [file] = e.target.files;
    profilePicture.value.push(URL.createObjectURL(file));
    store.$state.profilePicturePreview.file.push(file);
    store.$state.profilePicturePreview['preview'] = profilePicture.value;
};

const deletePicture = (index) => {
    store.$state.profilePicturePreview = {
        file: [],
        preview: [],
    };

}

const handleCoverPhoto = (e) => {
    resetCoverVals();
    const [file] = e.target.files;
    coverPhoto.value.push(URL.createObjectURL(file));
    store.$state.coverPicturePreview.file.push(file);
    store.$state.coverPicturePreview['preview'] = coverPhoto.value;

    // coverPhoto.value.push(URL.createObjectURL(file));
    // store.$state.coverPicturePreview = coverPhoto.value;
}

const resetProfileVals = () => {
    profilePicture.value = [];
    return store.$state.profilePicturePreview = {
        file: [],
        preview: [],
    };
}

const resetCoverVals = () => {
    coverPhoto.value = [];
    return store.$state.coverPicturePreview = {
        file: [],
        preview: [],
    };
}



</script>
