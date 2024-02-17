<template>
<div class="auction-main-container" @click="goToAuctionDetail">
  <div class="auction-container" :class="{ 'done': this.done }" >
    <div class="auction-name">
      <h4>{{ artist.name }}</h4>
    </div>
    <img :src="artist.mainImage" style="height: 200px;">
    <div class="auction-description">
      {{ artist.shortDescription }}
    </div>
    <div>
      <div class="highest-bid-text">
        <span v-if="this.upcoming || (!this.sold && this.done) || this.activeWithoutBids">Starting bid</span>
        <span v-if="this.sold">Sold for</span>
        <span v-if="this.active && !this.activeWithoutBids">Current highest bid</span>
      </div>
      <div class="highest-bid-number">
        <span v-if="this.upcoming || (!this.sold && this.done) || this.activeWithoutBids">${{ artist.startingBid }}</span>
        <span v-if="!this.activeWithoutBids && (this.sold || this.active)">${{ this.currentHighestBid }}</span>
      </div>
    </div>
  </div>
  <div class="bid-buttom" :class="{
    'startsAt': this.upcoming,
    'sold': this.sold,
    'unsold': (this.done && !this.sold)
    }">
    <span v-if="this.upcoming">{{ this.startTime }}</span>
    <span v-if="this.active">bid</span>
    <span v-if="this.sold">sold</span>
    <img v-if="this.sold" src="../assets/sold.svg">
  </div>
</div>
</template>

<script>
import { isAfter, format, isBefore } from 'date-fns';
import { isEmpty } from 'lodash';

export default {
  props: {
    artist: Object,
  },
  beforeCreate() {
    const { startTime, endTime, bidHistory } = this.artist;

    this.active = isBefore(startTime, new Date()) && isBefore(new Date(), endTime);
    this.upcoming = isAfter(startTime, new Date());
    this.done = isAfter(new Date(), endTime);
    this.sold = this.done && !(isEmpty(bidHistory));

    this.activeWithoutBids = this.active && isEmpty(bidHistory);

    if (!(isEmpty(bidHistory))) {
      this.currentHighestBid = bidHistory[0].amount;
    }

    this.startTime = format(startTime, "PPP");
  },
  methods: {
    goToAuctionDetail() {
      this.$router.push({ name: 'auction', params: { id: this.artist.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
  .auction-main-container {
    display: flex;
    align-content: center;
    flex-direction: column;
    align-items: center;
    text-wrap: wrap;
  }

  .auction-container {
    border: 2px solid #C7AAB3;
    color: #5E0D26;
    border-radius: 6px;
    padding: 2vh 20px 4vh 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 420px;
  }

  .done  {
    opacity: 60%;
  }

  .auction-container:hover {
    border: 2px solid #833a51;
  }

  .highest-bid-text {
    margin-top: 12px;
    font-size: large;
    font-weight: 600;
    text-align: center;
  }

  .highest-bid-number {
    font-size: xx-large;
    font-weight: 700;
    text-align: center;
  }

  .auction-name {
    font-size: large;
    font-weight: 800;
    text-align: center;
  }

  .auction-description {
    color: #5E0D26;
    text-align: start;
    font-size: small;
  }

  .bid-buttom {
    background-color: #5E0D26;
    color: white;
    text-align: center;
    padding: 4px 36px;
    border-radius: 6px;
    margin-top: -18px;
    font-size: large;
    font-weight: 600;
  }

  .startsAt {
    background-color: #EA6C56;
  }

  .sold {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    color: #FDFFA8;
    background-color: #233239;
    z-index: 2;
  }

  .unsold {
    display: none;
  }
</style>