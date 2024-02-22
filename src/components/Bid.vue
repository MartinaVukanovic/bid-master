<template>
  <v-alert v-model="successAlert" type="success" closable style="opacity: 88%;">
    Bid successfully placed!
  </v-alert>
  <v-alert v-model="errorAlert" type="error" closable style="opacity: 88%;">
    {{ errorMessage }}.
  </v-alert>
  <div class="bid">
    <v-text-field
      v-model="bid"
      label="Bid Amount"
      variant="outlined"
      :rules="[rules.minBid]"
      type="number"
    ></v-text-field>
    <div class="bid-button" @click="placeBid">
      bid
    </div>
  </div>
</template>

<script>
import { bid } from '../services/requests';

export default {
  props: {
    auctionId: Number,
    bidRule: Number,
  },
  data () {
    return {
      bid: '',
      successAlert: false,
      errorAlert: false,
      errorMessage: '',
      rules: {
        minBid: v => v >= (this.bidRule || 1) || !v || `Bid amount must be at least $${this.bidRule || 1}.`,
      },
    }
  },
  methods: {
    async placeBid() {
      try {
        if (this.bid >= (this.bidRule || 1)) {

          const response =  await bid(this.auctionId, this.bid);
          
          if (response.success) {
            this.errorAlert = false;
            this.successAlert = true;
          } else {
            this.successAlert = false;
            this.errorAlert = true;
            this.errorMessage = response.message;
          }
          
        }
      } catch (error) {
        console.error('Error placing bid:', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bid {
  margin-top: 30px;
  display: flex;
  gap: 20px;
}

.bid-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #620E28;
  color: white;
  font-weight: 600;
  padding: 6px 24px;
  border-radius: 6px;
  height: 56px;
}

@media only screen and (max-width: 1201px) {
  .bid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;

    .bid-button {
      height: 42px;
      padding: 4px 32px;
      width: 100px;
    }
  }

  .v-input--horizontal {
    width: 80vw;
  }
}
</style>