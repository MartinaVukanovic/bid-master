<template>
  <div class="menu-main-container">
    <v-menu transition="scroll-x-reverse-transition">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="text">
          <img src="../assets/menu.svg" alt="">
        </v-btn>
      </template>
      <v-list>
        <v-list-item link>
          <div class="menu-item-container">
            <router-link to="/">Home</router-link>
          </div>
        </v-list-item>
        <v-list-item link v-if="showAuctionsLink">
          <div class="menu-item-container">
            <router-link to="/auctions">Auctions</router-link>
          </div>
        </v-list-item>
        <v-list-item link v-if="showCreateAuctionsLink">
          <div class="menu-item-container">
            <router-link to="/create-item">Create auction item</router-link>
          </div>
        </v-list-item>
        <v-list-item link>
          <div class="menu-item-container" @click="signOut">
            <router-link to="/login">Sign out</router-link>
            <img src="../assets/logout.png" height="20px">
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style lang="scss" scoped>
  .menu-main-container {
    display: flex;
    justify-content: end;
    margin: 30px 4vw -50px 0px;
  }

  .v-list-item {
    padding: 0px 6vw !important;
    min-width: 220px;
  }

  .menu-item-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    a {
      color: black;
      text-decoration: none;
      font-weight: 500;
    }
  }

  @media only screen and (max-width: 1200px) {
    .menu-main-container {
      margin: 30px 4vw -36px 0px;

      img {
        width: 85%;
      }
  }
}
</style>

<script>
export default {
  computed: {
    showAuctionsLink() {
      return this.$route.path === '/create-item' || this.$route.path.includes('/auction/');
    },
    showCreateAuctionsLink() {
      return this.$route.path === '/auctions' || this.$route.path.includes('/auction/');
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem("userToken");
      this.$router.push('/login');
    },
  },
}
</script>
