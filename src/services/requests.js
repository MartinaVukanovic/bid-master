import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import { isEmpty, map } from "lodash";
import FormData from "form-data";

const environment = "process.env.NODE_ENV";
const baseServerUrl = "http://localhost:8080";

export function getSeller() {
  const userToken = localStorage.getItem("userToken");
  const { sub } = VueJwtDecode.decode(userToken);

  return sub;
}

export function formatDate(date) {
  return new Date(date[0], date[1] - 1, date[2], date[3], date[4]); //date[5] on created?
}

function formatAuctions(auctions) {
  return map(auctions, (item) => {
    return {
      id: item.id,
      name: item.title,
      shortDescription: item.asset.shortDescription,
      longDescription: item.asset.detailedDescription,
      startingBid: item.config.startingPrice,
      currentHighestBid: item.currentHighestBid,
      startTime: formatDate(item.config.startTime),
      endTime: formatDate(item.config.endTime),
      bidRule: item.config.minimalBiddingStep,
      bidHistory: item.bidHistory,
      seller: item.owner.companyName,
      mainImage: `data:image/png;base64,${item.asset.images[0]}`,
    };
  });
}

export async function getAuctions() {
  const response = await axios.get(`${baseServerUrl}/api/auctions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });

  console.log(response.data);
  console.log(formatAuctions(response.data));
  if (!isEmpty(response.data)) return formatAuctions(response.data);

  return undefined;

  /* if (true) {
    return auctions;
  } */
}

export async function getAuction(id) {
  /* if (environment === "development") {
    return auctions.find((item) => item.id === Number(id));
  } */

  const response = await axios.get(`${baseServerUrl}/api/auctions/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });

  return response.data;
}

export async function createAuction(payload) {
  const { images } = payload; // Dodajte 'images' u payload

  const data = new FormData();

  const auction = {
    title: payload.name,
    asset: {
      title: payload.name,
      shortDescription: payload.shortDescription,
      detailedDescription: payload.detailedDescription,
    },
    config: {
      startingPrice: payload.startingPrice,
      minimalBiddingStep: payload.minimalBiddingStep,
      startTime: new Date("2024-02-15"),
      endTime: new Date("2025-02-15"),
    },
  };

  const json = JSON.stringify(auction);
  console.log(JSON.stringify(auction));

  const blob = new Blob([json], {
    type: 'application/json'
  });

  data.append('auction', blob);

  images.forEach((image) => {
    data.append("imageFile", image);
  });

  for (let pair of data.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const response = await axios.post(
      `${baseServerUrl}/api/auctions`, data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    console.log(response);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function bid(id, amount) {
  try {
    const response = await axios.post(
      `${baseServerUrl}/api/auctions/${id}/bid`,
      {
        amount,
      }
    );

    const { accessToken } = response.data;

    return accessToken;
  } catch (error) {
    return undefined;
  }
}

export async function login(companyName, password) {
  if (environment === "development") {
    return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQkMgTWFudWZhY3R1cmluZyIsImlhdCI6MTcwODAyNTM0MywiZXhwIjoxNzA4MTExNzQzfQ.tyE6RCHJ10KXLGQe2N8RDQ2FJUbXSAWv1Camiamzxmk";
  }

  try {
    const response = await axios.post(
      `${baseServerUrl}/api/auth/authenticate`,
      {
        companyName,
        password,
      }
    );

    const { accessToken } = response.data;

    return accessToken;
  } catch (error) {
    return undefined;
  }
}

export async function register(
  companyId,
  companyName,
  dateOfEstablishment,
  password
) {
  if (environment === "development") {
    return {
      success: true,
    };
  }

  try {
    const response = await axios.post(`${baseServerUrl}/api/auth/register`, {
      companyId,
      companyName,
      dateOfEstablishment,
      password,
    });

    if (response.status === 201) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
}
