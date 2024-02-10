<template>
<div class="statistics-main-container">
  <div class="statistic-container">
    <Data v-for="(artist, x) in artists" :key="x" :artist="artist" />
  </div>
</div>
</template>

<style>
body {
  font-family: 'Poppins';
}

.statistics-main-container {
  display: flex;
  justify-content: center;
}

.statistic-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
}
</style>

<script>
export default {
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
