<template>
  <Menu />
  <div class="auction-title-text">
    <h1>{{ this.name }}</h1>
    <p class="seller"> <span style="color: #5E0D26; font-size: large;"> by: </span> {{ this.seller }}</p>
  </div>
  <div class="main">
    <div class="auction-details-main-container">
    <ImagesViewer />
    <div class="auction-details-container">
      <AuctionTextSection v-for="(information, x) in informations" :key="x" :information="information" />
    </div>
    </div>
    <div class="auction-details-container bid-history">
      <BidHistory :bidHistory="bidHistoryData" />
      <div :class="{ 'disabled': this.done }" >
        <Bid :bidRule="bidRule" />
      </div>
    </div>
  </div>
  <div>
    <AuctionDates :auctionDates="auctionDateData" />
  </div>
</template>

<script>
import { isAfter } from 'date-fns';
import { getAuction } from "../services/requests";

export default {
  props: ['id'],
  data() {
    return {
      informations: [],
    }
  },
  mounted() {
    const auction = getAuction(this.id);

    const {
      name,
      seller,
      longDescription,
      bidRule,
      bidHistory,
      currentHighestBid,
      startingBid,
      startTime,
      endTime
    } = auction;

    this.name = name;
    this.seller = seller;
    this.minBidAmount = bidRule;
    this.currentHighestBid = currentHighestBid;
    this.startingBid = startingBid;

    this.auctionDateData = {
      "startTime": startTime,
      "endTime": endTime,
    };

    this.bidHistoryData = bidHistory;

    this.bidRule = bidRule;
    this.informations.push({
      "title": "Description",
      "text": longDescription,
      }, {
      "title": "Bid Rules",
      "text": `Bid must be at least $${this.minBidAmount}.`
      }, {
      "title": "Current highest bid",
      "text": `$${this.currentHighestBid}`,
      "importantNumber": true,
      },
      {
      "title": "Starting bid",
      "text": `$${this.startingBid}`,
      "importantNumber": true,
    });

    this.done = isAfter(new Date(), endTime);
  }
}
</script>

<style>
.main {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
}

.auction-title-text {
  font-family: "Libre Baskerville", serif;
  font-weight: 900;
  text-align: center;
  margin: 50px 0px 40px 0px;
  color: #5E0D26;
}

.seller {
  color: #EA6C56;
  font-size: x-large;
  margin-left: 22%;
}

.auction-details-main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
}

.auction-details-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0px;
  gap: 18px;
  width: 40vw;
}

.disabled {
  opacity: 60%;
  cursor: not-allowed;
  pointer-events: none;
}


@media only screen and (max-width: 1200px) {
  .auction-details-container  {
    width: 80vw;
  }

  .auction-details-main-container {
    flex-direction: column;
    align-items: center;
  }

  .main {
    flex-direction: column;
  }

  .bid-history {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
}

</style>