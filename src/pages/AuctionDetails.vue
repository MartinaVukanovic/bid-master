<template>
  <Menu />
  <div class="auction-title-text" v-if="!isLoading">
    <h1>{{ this.auction.title }}</h1>
    <p class="seller"> <span style="color: #5E0D26; font-size: large;"> by: </span> {{ this.auction.owner.companyName }}</p>
  </div>
  <div class="main">
    <div class="auction-details-main-container">
    <ImagesViewer :images="this.images" />
    <div class="auction-details-container">
      <AuctionTextSection v-for="(information, x) in informations" :key="x" :information="information" />
    </div>
    </div>
    <div class="auction-details-container bid-history">
      <BidHistory :bidHistory="bidHistoryData" />
      <div :class="{ 'disabled': this.done || this.upcoming }" >
        <Bid :bidRule="this.minBidAmount" :auctionId="this.id" />
      </div>
    </div>
  </div>
  <div>
    <AuctionDates :auctionDates="auctionDateData" />
  </div>
</template>

<script>
import { isAfter } from 'date-fns';
import { getAuction, formatDate } from "../services/requests";

export default {
  props: ['id'],
  data() {
    return {
      isLoading: true,
      informations: [],
    }
  },
  created() {
    this.getAuction();
  },
  methods: {
    async getAuction() {
      try {
        this.auction = await getAuction(this.id);
        this.isLoading = false;

        console.log(this.auction);
        this.images = this.auction.asset.images;

        const endTime = formatDate(this.auction.config.endTime);
        const startTime = formatDate(this.auction.config.startTime);

        this.auctionDateData = {
          "startTime": startTime,
          "endTime": endTime,
        };

        this.done = isAfter(new Date(), endTime);
        this.upcoming = isAfter(startTime, new Date());
        
        this.minBidAmount = this.auction.config.minimalBiddingStep;
        this.bidHistoryData = this.auction.bidHistory;
        
        this.informations.push({
        "title": "Description",
        "text": this.auction.asset.detailedDescription,
        }, {
        "title": "Bid Rules",
        "text": `Bid must be at least $${this.auction.config.minimalBiddingStep}.`
        }, {
        "title": "Current highest bid",
        "text": `$${this.auction.currentHighestBid}`,
        "importantNumber": true,
        },
        {
        "title": "Starting bid",
        "text": `$${this.auction.config.startingPrice}`,
        "importantNumber": true,
    });
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    },
  },
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