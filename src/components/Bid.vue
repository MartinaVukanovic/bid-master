<template>
  <div class="bid">
    <v-text-field
      label="Bid Amount"
      model-value=""
      variant="outlined"
      :rules="[rules.minBid]"
      type="number"
    ></v-text-field>
    <div class="bid-button">
      bid
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bidRule: Number,
  },
  data () {
    return {
      rules: {
        minBid: v => v >= (this.bidRule || 1) || !v || `Bid amount must be at least $${this.bidRule || 1}.`,
      },
    }
  },
};
</script>

<style lang="scss" scoped>
.bid {
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
    width: 80vw;
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