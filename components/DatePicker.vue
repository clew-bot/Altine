<style scoped>
.picker:deep() .dp__pointer{
    background-color: #2F2F32!important;
    color: white;
    border: 0px solid #2F2F32!important;
    border-bottom: solid 4px var(--signUpInputBorder) !important; 
    border-right: solid 3px var(--signUpInputBorder) !important;
    height: 45px;
    border-radius: 10px !important;
}
.dp__select {
    color: white !important;
}
</style>
<template>
    <div
    class="picker">
        <Datepicker 
        name="birthday"
        dark
        :enable-time-picker="false"
        :clearable="false"
        no-today
        required
        :placeholder="'Select Date'"
        calendar-cell-class-name="dp-custom-cell"
        :max-date="maxDate"
        v-model="date" />
    </div>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// const date = ref(new Date(1995, 8, 8));
const date = ref();
const emit = defineEmits(["birthdayDate"])
watch(date, () => {
    emit('birthdayDate', format(date.value))
})  
const maxDate = ref(new Date(2022, (new Date()).getMonth(), (new Date()).getDate()));
const format = () => {
            const day = date.value.getDate();
            const month = date.value.getMonth() + 1;
            const year = date.value.getFullYear();

            return `${month}/${day}/${year}`;
}


</script>

