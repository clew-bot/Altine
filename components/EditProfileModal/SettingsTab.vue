<template>
    <div>
<v-btn
@click="logout"
color="red">
𝐋𝐨𝐠𝐨𝐮𝐭
</v-btn>
    </div>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";
const store = useUserStore();
const logout = async () => {
    const loggingOut = await store.logout();
    navigateTo('/login')
    }
</script>

<style lang="scss" scoped>

</style>