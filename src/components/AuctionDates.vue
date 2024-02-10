<template>
<div class="countdown" v-if="isAuctionUpcoming">
  <vue-countdown :time="startTimeTracker" v-slot="{ days, hours, minutes, seconds }" >
      This auction starts in: {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds!
  </vue-countdown>
</div>
<div class="countdown" v-if="isAuctionActive">
  <vue-countdown :time="endTimeTracker" v-slot="{ days, hours, minutes, seconds }" >
      This auction ends in: {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds!
  </vue-countdown>
</div>
<div class="dates-main-container" :class="{ done: isAuctionDone, auctionActive: isAuctionActive }">
  <div class="startTime-container">
    <p class="auction-date-description">start time</p>
    <div class="date-container">
      {{ startTime }}
    </div>
  </div>
  <div>
    <p class="auction-date-description">end time</p>
    <div class="date-container">
      {{ endTime }}
    </div>
  </div>
</div>
</template>

<script>
import { format, isBefore, isAfter, differenceInMilliseconds } from 'date-fns';

export default {
  props: {
    auctionDates: Object
  },
  computed: {
    isAuctionActive () {
      if (this.auctionDates) {
        return isBefore(this.auctionDates.startTime, new Date()) && isAfter(this.auctionDates.endTime, new Date());
      } else {
        return 'N/A';
      }
    },
    isAuctionDone () {
      if (this.auctionDates) {
        return isBefore(this.auctionDates.startTime, new Date()) && isBefore(this.auctionDates.endTime, new Date());
      } else {
        return 'N/A';
      }
    },
    isAuctionUpcoming () {
      if (this.auctionDates && this.auctionDates.startTime) {
        return isAfter(this.auctionDates.startTime, new Date());
      } else {
        return 'N/A';
      }
    },
    startTimeTracker() {
      if (this.auctionDates && this.auctionDates.startTime) {
        return differenceInMilliseconds(this.auctionDates.startTime, new Date());
      } else {
        return 'N/A';
      }
    },
    endTimeTracker() {
      if (this.auctionDates) {
        return differenceInMilliseconds(this.auctionDates.endTime, new Date());
      } else {
        return 'N/A';
      }
    },
    startTime() {
      if (this.auctionDates && this.auctionDates.startTime) {
        return format(this.auctionDates.startTime, 'PPP HH:mm:ss');
      } else {
        return 'N/A';
      }
    },
    endTime() {
      if (this.auctionDates && this.auctionDates.endTime) {
        return format(this.auctionDates.endTime, 'PPP HH:mm:ss');
      } else {
        return 'N/A';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .dates-main-container {
    color: #620E28;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin: 10px 0px 50px 0px;
  } 

  .date-container {
    border: 2px solid #620E28;
    border-radius: 8px; 
    padding: 6px 32px;
    font-size: large;
    font-weight: 600;
  } 

  .auction-date-description {
    font-size: large;
    font-weight: 600;
    margin-bottom: 2px;
  } 

  .countdown {
    padding: 0px 20px;
    color: #620E28;
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: large;
  }

  .done {
    opacity: 60%;
    cursor: not-allowed;
  }

  .auctionActive  {
    .startTime-container {
      opacity: 60%;
      cursor: not-allowed;
    }
  }
</style>