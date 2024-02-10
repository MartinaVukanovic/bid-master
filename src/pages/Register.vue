<template>
<div class="main-container">
<div class="block-container">
  <img src="../assets/login-img.svg" height="70%">
</div>
<div class="form-container">
  <h1 class="main-text">Welcome to Bid Master!</h1>
  <p class="small-text">Register your account.</p>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8">
          <v-text-field
            label="Username"
            model-value=""
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="8">
          <v-text-field
            label="Email"
            model-value=""
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
          Already have an account?
        </p>
        <router-link to="/login" class="bold-text"> Log in</router-link>.
      </div>
      <div class="start-button"  @click="register">
        Let's start!
      </div>
    </v-container>
  </v-form>
</div>
</div>
</template>


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

.small-text {
  padding-left: 12px;
  opacity: 60%;
  padding-bottom: 12px;
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
<script>
import validator from 'validator';

export default {
    data () {
      return {
        loading: false,
        show1: false,
        show2: true,
        password: '',
        rules: {
          required: value => !!value || 'This field is required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: v => validator.isEmail(v) || 'Invalid email address.',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
    methods: {
      register() {
        // request
        this.$router.push('/login');
      },
    },
    watch: {
      loading(val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 1000)
      },
    },
  }
</script>
