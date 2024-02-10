<template>
    <p>{{ message }}</p>

<div class="header-main-container"> 
    <div class="header-links-container">
       <div @click="scrollToFeatures">
        Features
      </div>
      <div @click="scrollToStatistics()">
        Statistics
      </div>
    </div>
    <div class="header-links-container">
      <router-link to="/login" class="login-text">Log in</router-link>
      <div class="sign-up-button">
        <router-link to="/register" class="register-text">Sign up</router-link>
      </div>
    </div>
  </div>
<div>
  <div class="home-header-container">
    <div class="home-header-text">
      <h1 style="font-size: 36px">Your auction playground awaits... <br> Start bidding, start winning!</h1>
    </div>
    <div>
      <img src="../assets/home.svg" class="home-header-img">
    </div>
  </div>
  <Statistic id="statistics"/>
  <div class="description-text-container">
    <div class="description-text">
      The ultimate destination where bidding meets brilliance.
      Immerse yourself in a world of exclusive auctions, where every
      click is a step towards seizing extraordinary deals and turning your desires into reality.
    </div>
  </div>
  <div id="features">
    <Features />
  </div>
  <div class="footer-container">
    <p>martina@gmail.com</p>
    <p>matko@gmail.com</p>
    <p>mijo@gmail.com</p>
  </div>
</div>
</template>


<style>
body {
  font-family: 'Poppins';
}

.home-header-container {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #334075;
  height: 100%;
  padding: 20px 0px 40px 0px;
}

.home-header-img {
  max-height: 400px;
}

.home-header-text {
  display: flex;
  align-items: center;
  font-family: "Libre Baskerville", serif;
  font-weight: 900;
  font-style: normal;
  max-width: 40vw;
  text-align: center;
}

.description-text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #EA6C56;
  padding: 5vh 10vw;
}

.description-text {
  font-weight: 600;
  color: #620E28;
  text-align: center;
  font-size: x-large;
}

.footer-container {
  color: #f3f3eb;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #620E28;
  padding: 40px 0px;
  gap: 4px;
  flex-direction: column;
}

.header-main-container {
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #334075;
  height: 100%;
  padding-top: 6vh;
  font-size: large;
}

.header-links-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4vw;
}

.login-text {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.sign-up-button {
  background-color: #EA6C56;
  padding: 6px 32px;
  border-radius: 50px;
  font-weight: 500;
}

.register-text {
  color: #620E28;
  text-decoration: none;
}

@media only screen and (min-width: 1200px) {
  .description-text  {
    width: 70vw;
  }
}

@media only screen and (max-width: 1200px) {
  .home-header-img {
    display: none;
  }
  .home-header-text {
    max-width: 100vw;
  }

  .home-header-container {
    height: 42vh;
    margin-top: -2px;
  }
}

</style>

<script>
export default {
  data() {
    return {
      ref: null
    };
  },
  methods: {
    scrollToFeatures() {
      const container = document.getElementById("features");
      container.scrollIntoView({ behavior: 'smooth' });
    },
    async created() {
    try {
      this.message = await fetchMessage()
    }
    catch(error){
      this.message = 'server error :('
    }
    },
    scrollToStatistics() {
      const container = document.getElementById("statistics");
      container.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>
