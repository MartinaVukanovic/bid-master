import VueJwtDecode from "vue-jwt-decode";
import { createRouter, createWebHistory } from "vue-router";
import { isBefore } from "date-fns";
import {
  Home,
  Login,
  Register,
  Auctions,
  AuctionDetails,
  CreateAuctionItem,
  NotFound,
} from "./pages";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/auctions",
    component: Auctions,
  },
  {
    path: "/auction/:id",
    name: "auction",
    component: AuctionDetails,
    props: true,
  },
  {
    path: "/create-item",
    component: CreateAuctionItem,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") next();

  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    const userTokenDetails = VueJwtDecode.decode(userToken);

    const isUserTokenExpired = isBefore(
      new Date(userTokenDetails.expiresAt),
      new Date()
    );

    if (isUserTokenExpired && to.path !== "/login" && to.path !== "/register") {
      next("/login");
    } else {
      next();
    }
  } else {
    if (to.path !== "/login" && to.path !== "/register") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
