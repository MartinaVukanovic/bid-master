<template>
  <div class="not-found-container">
    <div class="not-found-text">
      <h1>Sorry, page not found!</h1>
      <div class="go-home" @click="goToHomePage">Go to homepage</div>
    </div>
    <img src="../assets/404.svg" alt="">
  </div>
</template>

<script>
export default {
  methods: {
    goToHomePage() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #334075;
  color: #FAFBDC;

  img {
    max-height: 70vh;
  }
}
.not-found-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -40px;
}

.go-home {
  font-weight: 600;
  text-align: center;
  background-color: #EA6C56;
  border-radius: 20px;
  padding: 8px;
  width: 55%;
  margin-top: 12px;
  z-index: 2;
}

@media only screen and (max-width: 1200px) {
  .not-found-container {
    img {
      max-width: 100vw;
    }
  }
}
</style>