<style scoped></style>
<template>
     
                <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ attrs }">
        <v-btn
                elevation="1"
                class="font-semibold text-xs rounded normal-case"
                prepend-icon="mdi-message-text"
                color="#1d4ed8"
                v-bind="attrs"
                @click="dialog = true"

                >
                    Messsage
                </v-btn>
      </template>

      <v-card class="p-2">
        <v-card-title class="text-h5 grey lighten-2">
          New Message
        </v-card-title>
        <v-textarea
          auto-grow
          variant="outlined"
          rows="3"
          row-height="25"
          shaped
          v-model="message"
        ></v-textarea>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="sendMessage"
          >
            Send Message
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { useMessageStore } from '@/store/MessageStore';
const {props} = defineProps(['props']);
const dialog = ref(false);
const message = ref('');
const messageStore = useMessageStore();
const sendMessage = () => {
    const dto = {
        to: props,
        message: message.value
    }
    messageStore.sendMessage(dto);
    dialog.value = false;
}
</script>

