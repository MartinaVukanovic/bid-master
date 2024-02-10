<template>
  <div class="bid-history-main-container">
    <h2 class="bid-history-title">Bid History</h2>
      <div v-for="bid in bidHistory" :key="bid.userName" class="bid-history-container">
        <p style="margin-left: 20px;">
          {{ bid.name }}
        </p>
        <div class="bid-amount">
          <p>
            ${{ bid.bidAmount }}
          </p>
          <p class="bidDifference">
            + ${{ bid.bidDifference }}
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    bidRules: Object,
    bidHistory: {
      type: Array,
      required: true
    }
  },
};
</script>

<style lang="scss" scoped>
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