<template>
  <div class="bid-history-main-container">
    <h2 class="bid-history-title">Bid History</h2>
    <div class="bid-history-scroll-container">
      <TransitionGroup name="list" tag="div">
        <div v-for="bid in local" :key="bid.bidder" class="bid-history-container">
          <p style="margin-left: 20px;">
            {{ bid.bidder }}
          </p>
          <div class="bid-amount">
            <p>
              ${{ bid.amount }}
            </p>
            <p class="bidDifference">
              + ${{ bid.bidDifference }}
            </p>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import Pusher from 'pusher-js';

export default {
  props: ['bidHistory'],
  data() { 
    return {
      local: this.bidHistory
    };
  },
  mounted() {
    if (this.bidHistory) {
      const pusher = new Pusher('fd5242af8244c6e67dcc', {
        cluster: 'eu',
        encrypted: true, 
      });

      const channel = pusher.subscribe('bids');

      channel.bind('bidCreated', data => {
        this.local.push(data);
      });

      console.log(this.local);
    }
  }
}
</script>

<style>
.bid-history-scroll-container {
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden; 
}

.list-move,
.list-enter-active {
  transition: all 0.8s ease-in;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(240px);
}

.list-leave-active {
  position: absolute;
}

.bid-history-main-container {
  color: #5E0D26;
}

.bid-history-title {
  text-align: center;
}

.bid-history-container {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #D7C2C9;
  font-size: large;
  font-weight: 500;
  margin: 12px 0px;
}

.bid-amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  margin-right: 20px;
}

.bidDifference {
  font-size: medium;
  font-weight: 400;
  color: #E06752;
}

@media only screen and (max-width: 1200px) {
  .bid-history-main-container {
    width: 82vw;
  }
}
</style>