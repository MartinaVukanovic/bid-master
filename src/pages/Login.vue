<template>
<div :class="{ 'alert-login': this.alert }">
  <v-alert
    density="compact"
    v-model="alert"
    border="start"
    variant="tonal"
    closable
    close-label="Close Alert"
    color="error"
    title="Unsuccessful login"
  >
  Unfortunately, we encountered an issue with your login attempt. Please don't hesitate to reach out to our support team for assistance, or you can try again.
  </v-alert>
</div>
<div class="main-container">
<div class="block-container">
  <img src="../assets/login-img.svg" height="70%">
</div>
<div class="form-container">
  <h1 class="main-text">Log in to Bid Master!</h1>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8">
          <v-text-field
            v-model="companyName"
            label="Company name"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="8">
          <v-text-field
            v-model="password"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            variant="outlined"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="signup-text">
        <p class="low-opacity">
          Don't have an account?
        </p>
        <router-link to="/register" class="bold-text"> Sign up</router-link>.
      </div>
      <div class="start-button" @click="login">
        Let's start!
      </div>
    </v-container>
  </v-form>
</div>
</div>
</template>

<script>
import { login } from "../services/requests";

export default {
    data () {
      return {
        loading: false,
        show1: false,
        show2: true,
        alert: false,
        password: '',
        companyName: '',
        rules: {
          required: value => !!value || 'This field is required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
      }
    },
    methods: {
      async login() {
        if (this.companyName && this.password) {
          const accessToken = await login(this.companyName, this.password);

          if (accessToken) {
            localStorage.setItem("userToken", accessToken);
            this.$router.push('/auctions');
          } else {
            this.alert = true;
          }
        }
      },
    },
  }
</script>

<style>
body {
  font-family: 'Poppins';
}

.main-text {
  padding-left: 12px;
  font-family: "Libre Baskerville", serif;
  font-weight: 900;
  font-style: normal;
}

.signup-text {
  padding: 10px 0px;
  display: flex;
}

.low-opacity {
  opacity: 60%;
}

.bold-text {
  font-weight: 600;
  color: #334075;
  padding-left: 4px;
  text-decoration: none;
}

.main-container {
  display: flex;
}

.block-container {
  width: 50vw;
  height: 100vh;
  background-color: #334075;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px;
}

.start-button {
  color: white;
  background-color: #334075;
  width: 200px;
  text-align: center;
  padding: 8px 20px;
  border-radius: 6px;
  margin-top: 12px;
  font-size: large;
  font-weight: 500;
  cursor: pointer;
}

@media only screen and (max-width: 1200px) {
  .block-container {
    display: none;
  }

  .form-container {
    width: 100vw;
    padding: 10vw;
  }

  .alert-login {
    margin: 12vh 30px -22vh 30px;
  }
}

</style>
