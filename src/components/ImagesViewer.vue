<template>
 <div class="image-main-container">
  <div v-if="isLoading" style="background-color: white; padding: 100px;">
    <div class="loader"></div>
  </div>
    <v-carousel
      v-else
      cycle
      height="300"
      hide-delimiter-background
      hide-delimiters
      show-arrows="hover"
      progress="#620E28"
      interval="4000"
    >
      <v-carousel-item v-for="(image, index) in images" :key="index">
        <img
        :src="`data:image/png;base64,${image}`"
        height="400px" width="400px"
        />
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

  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #620E28; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
</style>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      imageLoaded: false,
      image: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  methods: {
    onImageLoad() {
      this.imageLoaded = true;
    }
  }
};
</script>
