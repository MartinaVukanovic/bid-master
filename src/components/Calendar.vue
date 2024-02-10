<template>
  <VueDatePicker
    v-model="date"
    :auto-position="true"
    range
    autoApply
    :min-date="minDate"
    :enable-time-picker="false" 
  />
</template>

<style>
.v-picker-title {
  text-transform: none !important;
  font-size: large !important;
  letter-spacing: 0 !important;
  font-weight: 500 !important;
}
</style>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const date = ref(null);
    const minDate = new Date();

    return { date, minDate };
  },
};
</script>
