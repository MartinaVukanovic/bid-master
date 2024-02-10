<template>
  <div class="filter" :class="{ 'active': filter.active }" @click="toggleFilter">
    {{ filter.name }}
  </div>
</template>

<style>
.filter {
  cursor: pointer;
  display: flex;
  align-items: center; 
  border: 2px solid #5E0D26;
  color: #5E0D26;
  font-weight: 500;
  border-radius: 5px;
  padding: 2px 26px;
}

.active {
  background-color: #EA6C56;
  color: #FDFEEB;
  border: none;
  font-weight: 600;
}
</style>

<script>
export default {
  props: {
    filter: Object,
  },
   methods: {
    toggleFilter() {
      this.$emit('toggle-filter', this.filter);
    }
  }
};
</script>