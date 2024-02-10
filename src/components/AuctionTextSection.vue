<template>
  <div class="auction-text-section-container">
    <p class="information-title"> {{ information.title }} </p>
    <p :class="{ 'importantNumber': information.importantNumber }"> {{ information.text }} </p>
  </div>
</template>

<style>
.auction-text-section-container {
  color: #5E0D26;
}

.importantNumber {
  font-size: xx-large;
  font-weight: 300;
}

.information-title {
  font-size: x-large;
  font-weight: 600;
}
</style>

<script>
export default {
  props: {
    information: Object,
  },
};
</script>