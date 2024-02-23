<template>
<Menu />
<AuctionAlert/>
<div style="background-color: white; position: fixed; z-index: 2;">
  <v-alert
  class=""
    density="compact"
    v-model="alert"
    border="start"
    variant="tonal"
    closable
    close-label="Close Alert"
    color="error"
    title="Unsuccessful auction creation."
  >
  Unfortunately, we encountered an issue with your auction item. Please don't hesitate to reach out to our support team for assistance, or you can try again.
  </v-alert>
</div>
<div class="item-form-container">
  <h1 class="main-create-item-text">Create new item for auction!</h1>
  <p class="low-opacity item-description-text">
    Create a compelling auction listing with detailed information about your business assets.
    Showcase your items to potential buyers and provide key details such as descriptions, images,
    and starting bid prices.
  </p>
  <v-form class="form-input-container">
      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            label="Name"
            variant="outlined"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
            <v-textarea
              v-model="shortDescription"
              counter label="Short description"
              variant="outlined"
              rows="3"
              :rules="[rules.required, rules.shortDescriptionMax]"
            ></v-textarea>
        </v-col>
      </v-row>
       <v-row>
        <v-col>
            <v-textarea
              v-model="detailedDescription"
              counter label="Detailed description"
              variant="outlined"
              rows="6"
              :rules="[rules.required]"
            ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-file-input
            v-model="images"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            append-inner-icon="mdi-camera"
            prepend-icon=""
            label="Select images"
            variant="outlined"
            multiple
          ></v-file-input>
        </v-col>
      </v-row>
            <v-row>
        <v-col>
          <v-text-field
            v-model="startingPrice"
            label="Starting price"
            variant="outlined"
            :rules="[rules.required, rules.startingPrice]"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="minimalBiddingStep"
            label="Minimal bid amount"
            variant="outlined"
            :rules="[rules.minBid]"
            type="number"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="calendar-container">
        <p class="low-opacity date-description">
        Choose both the starting and ending date for the auction to set the timeframe for bidding.
        </p>
        <VueDatePicker
          v-model="date"
          :auto-position="true"
          range
          autoApply
          :min-date="minDate"
        />
      </v-row>
      <v-alert v-model="successAlert" type="success" closable style="opacity: 88%; margin-bottom: -30px; margin-top: 30px;">
        Auction successfully created!
      </v-alert>
      <div class="create-button" @click="createAuction">
        Create
      </div>
  </v-form>
</div>
</template>

<script>
import { createAuction } from '../services/requests'
import { ref } from 'vue';

export default {
    data () {
      return {
        date: ref(null),
        minDate: new Date(),
        name: '',
        shortDescription: '',
        detailedDescription: '',
        startingPrice: '',
        images: [],
        minimalBiddingStep: '',
        loading: false,
        successAlert: false,
        alert: false,
        rules: {
          required: value => !!value || 'This field is required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          shortDescriptionMax: v => v.length <= 100 || 'Max 100 characters',
          minBid: v => v > 0 || !v || 'Min bid amount cannot be lower then 1',
          startingPrice: v => v > 0 || 'Starting price cannot be lower then 1'
        },
      }
    },
    methods: {
      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      async createAuction() {
        try {
          const response = await createAuction(this);

          if (response.success) {
            this.alert = false;
            this.successAlert = true;
            await this.delay(4000);
            this.$router.push('/auctions');
          } else {
            this.alert = true;
          }
          
        } catch (error) {
          this.alert = true;
          console.error('Error placing bid:', error);
        }
      }
    }
  }
  
</script>

<style>
body {
  font-family: 'Poppins';
}

.main-create-item-text {
  font-family: "Libre Baskerville", serif;
  font-weight: 900;
  font-style: normal;
  text-align: center;
  margin: 30px 0 20px 0px;
  padding: 0px 22px;
  color: #620E28;
}

.low-opacity {
  opacity: 60%;
}

.item-description-text  {
  width: 50vw;
  text-align: center;
  margin-bottom: 40px;
}

.main-container {
  display: flex;
}

.item-form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
}

.create-button {
  cursor: pointer;
  align-self: center;
  color: white;
  background-color: #620E28;
  width: 200px;
  text-align: center;
  padding: 8px 20px;
  border-radius: 6px;
  margin: 50px 0px 80px;
  font-size: large;
  font-weight: 500;
}

.form-input-container {
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dp__input {
  height: 56px;
  border: 1px solid #b4b4b4 !important;
  font-family: Poppins !important;
}

.calendar-container {
  align-self: center;
  width: 75vw;
}

.date-description {
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
}

@media only screen and (max-width: 1200px) {
  .form-input-container {
    height: 100%;
    width: 75vw;
    gap: 0px;
  }

  .item-description-text  {
    width: 85vw;
  }
}

@media only screen and (min-width: 1201px) {
  .calendar-container {
    width: 40vw;
  }
}

.v-picker-title {
  text-transform: none !important;
  font-size: large !important;
  letter-spacing: 0 !important;
  font-weight: 500 !important;
}
</style>