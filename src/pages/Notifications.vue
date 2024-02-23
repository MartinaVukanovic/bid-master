<template>
  <Menu />
  <AuctionAlert/>
  <div class="title-container">
    <div class="devider"></div>
    <div class="title"> <h2>Notifications</h2></div>
    <div class="devider"></div>
  </div>
  <div class="notification-main-container" v-if="!isLoading">
    <div v-for="notification in notifications" :key="notification.id" >
      <div :class="{ 'auctionWon': auctionWon(notification.message) }">
        <div style="opacity: 60%;">
        {{ formatDate(notification.cratedAt) }}
      </div>
      <div class="notification">
        {{ notification.message }}
      </div>    
      </div>
    </div>
  </div>
</template>

<script>
import { getNotifications, toLocal } from "../services/requests";
import { format } from "date-fns";
import _ from 'lodash';

export default {
  data () {
    return {
      isLoading: true,
      notifications: [],
    }
  },
  created() {
    this.fetchNotifications();
  },
  methods: {
    auctionWon(message) {
      return !!(_.includes(message, 'won'));
    },
    formatDate(date) {
      return format(toLocal(date), 'dd.MM.yyyy HH:mm');
    },
    async fetchNotifications() {
      try {
        this.notifications = await getNotifications();
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .auctionWon {
    background-color: #ffd70099;
    border: 4px solid gold;
    border-radius: 10px;
    padding: 14px;

    .notification {
      border: none;
      font-weight: 500;
    }
  }

  .devider  {
    width: 24vw;
  }
  .notification-main-container {
    color: #5E0D26;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;
  }
  .notification {
    font-size: large;
    max-width: 900px;
    width: 80vw;
    border-bottom: 1px solid #5e0d2739;
  }
</style>
