
<style scoped></style>
<template>
<div 
v-for="editTabs in editValues[0]"
    :key="editTabs"
class="flex justify-start">
    <div 
    class="flex flex-col w-1/6 sm:w-2/6">
        <div
        >
            <EditField
            @mouseenter="showEditField(editTabs.value)"
            :props="editTabs"
            :class="{'bg-slate-500' : editTabs.show}" />
        </div>
    </div>
    <div v-if="editTabs.show"
    class="h-fit">
          <Transition>
            <EditFieldDescription :props="editTabs" />
          </Transition>
        </div>
  </div>
</template>

<script setup>
const rules = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 3) || "Min 3 characters",
];

const showEditField = (label) => {
  reset();
  nextTick(() => {
    switch (label) {
      case "Name":
        editValues.value[0].name.show = true;
        break;
      case "Handle":
        editValues.value[0].handle.show = true;
        break;
      case "Location":
        editValues.value[0].location.show = true;
        break;
      case "Birthday":
        editValues.value[0].birthday.show = true;
        break;
      case "Bio":
        editValues.value[0].bio.show = true;
        break;
    }
  });
};

const editValues = ref([
  {
    name: {
      value: "Name",
      name: "name",
      icon: "mdi-account",
      show: true,
      description:
        "This is the name displayed on your posts, comments, and profile.",
      changeDescription: "Update your name here.",
      placeholder: "Mark Twain",
      maxLength: 15,
    },
    handle: {
      value: "Handle",
      icon: "mdi-at",
      name: "handle",
      show: false,
      description: "This is the handle people use to tag or reach you at.",
      changeDescription: "Update your handle here.Limited to 15 characters.",
      placeholder: "MarkTwain69",
      maxLength: 12,
    },
    location: {
      value: "Location",
      icon: "mdi-map-marker",
      name: "location",
      show: false,
      description: "This is the location people can see you at on your profile",
      changeDescription: "Update your Location here.",
      placeholder: "San Fransisco, CA",
      maxLength: 30,
    },
    birthday: {
      value: "Birthday",
      icon: "mdi-calendar",
      name: "birthday",
      show: false,
      description: "This is the birthday people can see you at on your profile",
      changeDescription: "Change your Birthday here.",
      placeholder: "August 8, 1995",
      maxLength: 20,
    },
    bio: {
      value: "Bio",
      icon: "mdi-fountain-pen-tip",
      name: "bio",
      show: false,
      description:
        "This is the bio people can see you at on your profile. It can be anything you want.",
      changeDescription: "Update your bio here.",
      maxLength: 100,
    },
  },
]);

const reset = () => {
  editValues.value[0].name.show = false;
  editValues.value[0].handle.show = false;
  editValues.value[0].location.show = false;
  editValues.value[0].birthday.show = false;
  editValues.value[0].bio.show = false;
};
</script>