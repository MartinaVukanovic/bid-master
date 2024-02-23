<template>
  <div class="auction-alert-container">
    <div style="width: 80vw;">
      <v-alert
      v-model="alert"
      border="start"
      variant="tonal"
      closable
      close-label="Close Alert"
      :color="color"
      :title="title"
      style="width: 80vw;"
    >
    {{ message }}
    </v-alert>
    </div>
  </div>
</template>

<script>
import Pusher from 'pusher-js';
import { getSeller, storeNotification } from '../services/requests'

export default {
  props: {
    title: String
  },
  data() {
    return {
      alert: false,
      title: '',
    };
  },
  mounted() {
    this.setupPusher();
  },
  methods: {
    setupPusher() {
      const seller = getSeller();
      const pusher = new Pusher('fd5242af8244c6e67dcc', {
        cluster: 'eu',
        encrypted: true,
      });

      const channel = pusher.subscribe('auctions');

      channel.bind('auctionStarted', data => {
        if (data.creator === seller) {
          this.alert = true;
          this.color = '#334075';
          this.message = `Auction for ${data.item} has just started!`;

          storeNotification(this.message);
        }
      });

      channel.bind('auctionFinished', data => {
        if (data.winner === seller) {
          this.color = '#ceb500'
          this.alert = true;
          this.title = 'Congratulations! 🥳'
          this.message = `You have won auction for ${data.item}!`;
          storeNotification(`${this.title} ${this.message}`);
        } else if (seller) {
          this.color = '#620E28'
          this.alert = true;
          this.message = `Auction for ${data.item} is now finished.`;

          storeNotification(this.message);
        }
      });
    }
  }
};
</script>

<style>
.auction-alert-container { 
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 2;
  display: flex;
  justify-content: center;
  margin-bottom: -40px;
}
</style>

