<template>
 <div class="image-main-container">

   <v-carousel
    cycle
    height="300"
    hide-delimiter-background
    hide-delimiters
    show-arrows="hover"
    progress="#620E28"
    interval="4000"
  >
    <v-carousel-item>
      <img src="../assets/item1.jpg" width="100%" height="100%">
    </v-carousel-item>
    <v-carousel-item>
      <img src="../assets/item1.jpg" width="100%" height="100%">
    </v-carousel-item>
    <v-carousel-item>
     <img src="../assets/item1.jpg" width="100%" height="100%">
    </v-carousel-item>
    <v-carousel-item>
     <img src="../assets/item1.jpg" width="100%" height="100%">
    </v-carousel-item>
    <v-carousel-item>
     <img src="../assets/item1.jpg" width="100%" height="100%">
    </v-carousel-item>
    </v-carousel>
   </div>
</template>

<style lang="scss" scoped>
  .image-main-container {
    background-color: #E7DBDF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
</style>

<script setup>
</script>