<template>
<div class="feature-main-container">
  <div class="feature-container" style="margin-top: 5vh">
    <div>
      <img src="../assets/live-auctions.svg" class="feature-img">
    </div>
    <div class="feature-text">
      Introducing our dynamic <b>Live Auction</b>  feature,
      where the excitement unfolds in real-time. Join bidders
      from around the globe in a thrilling experience as you witness
      and participate in live auctions, featuring a diverse array of unique items.
    </div>
  </div>
</div>
<div class="feature-main-container" style="margin-top: -2vh">
  <div class="feature-container reverse">
    <div class="feature-text">
      Explore the rich narrative of bidding on our platform with the <b>Bid History</b>  feature. Uncover the journey of each auction, tracing the rise and fall of bids, and gaining insights into the competitive spirit of fellow bidders. Delve into detailed bid histories, showcasing the strategic moves that led to successful outcomes.
    </div>
     <div>
      <img src="../assets/bid-history.svg" class="feature-img">
    </div>
  </div>
</div>
<div class="feature-main-container">
  <div class="feature-container" style="margin: -2vh 0 5vh 0">
    <div>
      <img src="../assets/auction-history.svg" class="feature-img">
    </div>
    <div class="feature-text">
      Explore our <b>Auction History</b>  feature to take a look back at previous auctions and bids. It's like a time machine for auctions, allowing you to see what items were up for grabs and how the bidding unfolded. Revisit the excitement, track winning bids, and gain insights into the history of our platform's vibrant auctions.
    </div>
  </div>
</div>
</template>

<style>
body {
  font-family: 'Poppins';
}

.feature-main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  gap: 5vw;
}

.feature-text {
  font-size: larger;
  font-weight: 500;
  color: #620E28;
}

.feature-img {
  width: 260px;
}

@media only screen and (max-width: 1200px) {
  .feature-img {
    width: 220px;
  }

  .feature-container {
    flex-direction: column;
    margin-top: 6vh !important;
  }

.feature-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  gap: 5vw;
  }

  .reverse {
    flex-direction: column-reverse !important;
  }
}


@media only screen and (min-width: 1200px) {
  .feature-container {
    width: 70vw;
  }
}

</style>

<script>
export default {
  name: 'Test',
  data (){
    return {
      artists: [
       {name: 'sellers', number: 500},
       {name: 'buyers', number: 200},
       {name: 'live auctions', number: 10},
       {name: 'past auctions', number: 2900}
      ]
    }
  }
}
</script>
