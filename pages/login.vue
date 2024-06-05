<style scoped>
@import url("@/assets/css/vuetifyOverrides.css");
</style>

<template>
  <div class="pt-28 w-full flex flex-col md:flex-row">
    <div class="md:w-1/2 flex sm:justify-center items-center sm:ml-0">
      <div class="text-center">
        <p class="text-5xl p-2 text-yellow-400">Welcome to ASM</p>
        <p class="text-2xl p-2 text-yellow-200">Connect with others from the around the world in minutes.</p>
      </div>
    </div>
    <div class="log p-5 text-center md:w-1/2">
      <div class="flex justify-center flex-col items-center">
      <v-card class="bg-zinc-800 min-w-[80%] rounded-2xl drop-shadow-2xl">
      <v-form v-model="valid"
              @submit.prevent="handleLogin"
              id="login-form">
        <v-text-field
          name="username"
          autocomplete="off"
          aria-autocomplete="list"
          class="p-3 pb-1"
          v-model="username"
          :rules="nameRules"
          :label="userLabel"
          required
          :class="{ 'text-red-500': usernameError }"
        ></v-text-field>
        <v-text-field
          name="password"
          autocomplete="off"
          aria-autocomplete="list"
          class="px-3 py-1"
          v-model="password"
          :rules="passwordRules"
          :counter="10"
          :label="passLabel"
          type="password"
          append-inner-icon="mdi-lock"
          required
          :class="{ 'text-red-500': passwordError }"
        ></v-text-field>
        <div class="p-2 px-3 pb-4 button">
          <v-btn
            :loading="loading[1]"
            :disabled="!valid"
            color="primary"
            append-icon="mdi-login"
            form="login-form"
            type="submit"
            >Log In
          </v-btn>
        </div>
      </v-form>
    </v-card>
    <div class="pt-2">
      <span>Don't have an account? Let's  </span>
        <Modal/>
          
    </div>
  </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import { useUserStore } from "@/store/userStore";

const store = useUserStore();

const username = ref("");
const password = ref("");
const email = ref("");
const userLabel = ref("Username or Email");
const passLabel = ref("Password");


const usernameError = ref(false);
const passwordError = ref(false);

const nameRules = ref([
  (v) => !!v
]);

const passwordRules = ref([
  (v) => !!v || "Password is required",
  (v) =>
    (v && v.length >= 8) ||
    "Password must be equal or greater than 8 characters",
]);
const valid = ref(false);
const loading = ref([]);

const handleLogin = async (e) => {
  passwordError.value = false;
  usernameError.value = false;
  const { username, password } = Object.fromEntries(new FormData(e.target));
  const data = {
    username,
    password,
  };
  const {error, message} = await store.login(data);
  console.log(error)
  if (error) {
    if( message.includes("Password")) {
      passwordError.value = true;
      passLabel.value = message;
    } else {
      usernameError.value = true;
      userLabel.value = message;
    }
  } else {
    navigateTo("/dashboard");
  }

}
definePageMeta({

  middleware: ["redirect"],
});
</script>
