<template>
  <Menu />
  <AuctionAlert/>
  <div class="title-container">
    <div class="devider"></div>
    <div class="title"> <h1>Auctions</h1></div>
    <div class="devider"></div>
  </div>
  <div class="filters">
      <div class="filter-main-container">
        <Filter v-for="(filter, x) in filters" :key="x" :filter="filter" @toggle-filter="toggleActiveFilter" />
      </div>
      <div style="min-width: 50vw"> 
        <v-text-field v-model="search" label="Search" variant="outlined" append-inner-icon="mdi-magnify"></v-text-field> 
        <div v-if="filteredArtists()?.length === 0" style="text-align: center;">
          No auctions found.
        </div>
      </div>
  </div>
  <div class="main-auctions-container"  v-if="!isLoading">
      <transition-group name="auctions" tag="div" class="auctions-container">
      <Auction
        v-for="(artist) in filteredArtists()"
        :key="artist"
        :artist="artist"
        /> 
      </transition-group>
  </div>
</template>

<script>
import { isAfter } from 'date-fns';
import { getAuctions, getSeller } from "../services/requests";

export default {
  data () {
    return {
      isLoading: true,
      search: '',
      selectedFilter: 'all',
      filters: [
       { name: 'all', active: true },
       { name: 'by you', active: false },
       { name: 'live', active: false },
       { name: 'past', active: false },
      ],
    }
  },
  created() {
    this.fetchAuctions();
    this.seller = getSeller();
  },
  methods: {
    async fetchAuctions() {
      try {
        this.artists = await getAuctions();
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    },
    toggleActiveFilter(clickedFilter) {
      clickedFilter.active = !clickedFilter.active;

      if (clickedFilter.name === 'all' && clickedFilter.active) {
        this.filters.forEach(filter => {
          if (filter !== clickedFilter) {
            filter.active = false;
          }
        });
        return;
      }

      if (clickedFilter.name === 'live' && clickedFilter.active) {
        this.filters.find(filter => filter.name === 'past').active = false;
        this.filters.find(filter => filter.name === 'all').active = false;
        return;
      }

      if (clickedFilter.name === 'past' && clickedFilter.active) {
        this.filters.find(filter => filter.name === 'live').active = false;
        this.filters.find(filter => filter.name === 'all').active = false;
        return;
      }
    },
    filteredArtists() {
      let filtered = this.artists;

      if (filtered) {
        filtered.forEach(artist => {
        const startTimeUTC = new Date(artist.startTime);
        const startTimeLocal = new Date(startTimeUTC.getTime() + startTimeUTC.getTimezoneOffset() * 60000 + 
        (- startTimeUTC.getTimezoneOffset() * 60000));
        artist.startTime = startTimeLocal;

        const endTimeUTC = new Date(artist.endTime);
        const endTimeLocal = new Date(endTimeUTC.getTime() + endTimeUTC.getTimezoneOffset() * 60000 + ((- startTimeUTC.getTimezoneOffset() * 60000)));
        artist.endTime = endTimeLocal;
        });
      }


      if (this.search.trim() !== '') {
        filtered = filtered.filter(artist =>
          artist.name.toLowerCase().includes(this.search.trim().toLowerCase())
        );
      }

      if (this.filters.find(filter => filter.name === 'past').active) {
        filtered = filtered.filter(artist => isAfter(new Date(), artist.endTime) === true);
      }

      if (this.filters.find(filter => filter.name === 'live').active) {
        filtered = filtered.filter((artist) => {
          return isAfter(new Date(), artist.startTime) && isAfter(artist.endTime, new Date())
        });
      }

      if (this.filters.find(filter => filter.name === 'by you').active) {
        filtered = filtered.filter((artist) => {
          return artist.seller === this.seller;
        });
      }

      return filtered;
    }
  },
}
</script>

<style>
.auctions-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

 .auctions-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.auctions-enter, .auctions-leave-to {
  opacity: 0;
  transform: translateY(20vh);
}

.auctions-enter-move {
  transition: all 0.5s ease;
}

body {
  font-family: 'Poppins';
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4vh 0px;
}

.title  {
  font-family: "Libre Baskerville", serif;
  font-size: x-large;
  color: #620E28;
  text-align: center;
}

.devider {
  width: 34vw;
  height: 2px;
  background-color: #620E28;
  margin: 4vh 2vw;
}

.main-auctions-container {
  display: flex;
  justify-content: center;
}

.auctions-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.filter-main-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 20px;
}

.filters {
  display: flex;
  justify-content: center;
  margin: 0px 7vw 20px 7vw;
  gap: 4vw;
}

@media only screen and (max-width: 1200px) {
  .filter-main-container {
    flex-wrap: wrap;
    gap: 12px;
  }

  .filters {
    flex-direction: column;
    gap: 0;
    margin: 0px 6vw 20px 6vw;
  }
}

</style>
