<style scoped>
.tabber:deep() .v-tabs--fixed-tabs .v-slide-group__content > *:first-child {
  -webkit-margin-start: 0px !important;
  margin-inline-start: 0px !important;
  max-width: none !important;
  width: 50% !important;
}

.tabber:deep() .v-tabs--fixed-tabs .v-slide-group__content > *:last-child {
  margin-inline-end: 0px !important;
  -webkit-margin-end: 0px !important;
  max-width: none !important;
  width: 50% !important;
}

.tabber:deep() .v-slide-group__content {
  justify-content: space-between !important;
}

.tabber:deep() .v-slide-group__content,
.v-slide-group__container {
  border-radius: 0px !important;
}

.v-card {
  border-radius: 0px !important;
}
</style>
<template>
  <v-card elevation="0" class="mt-6 tabber min-w-screen">
    <v-tabs v-model="currentItem" grow color="#ffedd5" bg-color="#27272a">
      <v-tab v-for="item in items" :key="item" :value="'tab-' + item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-window direction="horizontal" v-model="currentItem">
      <v-window-item v-for="item in items" :key="item" :value="'tab-' + item">
        <v-card flat>
          <div v-if="currentItem === `tab-${username}'s Posts`">
            <div v-if="passProps.length > 0">
              <ProfileYourPostsTab v-model="passProps" :pinnedPost="pinnedPost"/>
            </div>
            <div v-else-if="passProps.length === 0 && pinnedPost">
              <StatusPinnedPost :pinnedPost="pinnedPost" />
          </div>
            <div v-else class="text-center p-4">
             No Posts
            </div>
          </div>
          <div v-else>
            <ProfileYourFriendsTab :friends="props.friends"/>
          </div>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
  <div class="h-[50rem]"></div>
</template>

<script setup>
const props = defineProps(["modelValue", "username", "pinnedPost", "friends"]);
const passProps = ref(props.modelValue);
const username = ref(props.username);
const currentItem = ref("tab-Web");
const items = ref([`${username.value}'s Posts`, `${username.value}'s friends`]);
const components = ref(["Your Posts", "Your Friends"]);

</script>
