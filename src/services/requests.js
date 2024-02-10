// Import Axios
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import auctions from "../mockData/auctions";

const environment = process.env.NODE_ENV;

export function getSeller() {
  const userToken = localStorage.getItem("userToken");
  const { seller } = VueJwtDecode.decode(userToken);

  return seller;
}

export function getAuctions() {
  if (environment === "development") {
    return auctions;
  }

  axios
    .get("/auctions")
    .then((response) => {})
    .catch((error) => {});
}

export function getAuction(id) {
  if (environment === "development") {
    return auctions.find((item) => item.id === Number(id));
  }

  axios
    .get("/auctions")
    .then((response) => {})
    .catch((error) => {});
}
