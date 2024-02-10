<template>
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
            v-model="email"
            label="Email"
            variant="outlined"
            :rules="[rules.required, rules.email]"
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
import validator from 'validator';

export default {
    data () {
      return {
        loading: false,
        show1: false,
        show2: true,
        password: '',
        email: '',
        rules: {
          required: value => !!value || 'This field is required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: v => validator.isEmail(v) || 'Invalid email address.',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
    methods: {
      login() {
        // request
        const response = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJzZWxsZXIiOiJNZWdhIE1hY2hpbmVyeSBFbnRlcnByaXNlcyIsImV4cGlyZXNBdCI6IjIwMjUtMDItMTAgMTI6MDAifQ.VnsGiRTYUl-MCG23GLYyUpO9I07NZx88_SnRBheLrV0";
        /* {
          "sub": "1234567890",
          "name": "John Doe",
          "iat": 1516239022,
          "seller": "Mega Machinery Enterprises",
          "expiresAt": "2025-02-10 12:00"
        } */

        localStorage.setItem("userToken", response);

        this.$router.push('/auctions');
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
}

</style>
