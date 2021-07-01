import axios from "axios";

const KEY = "AIzaSyCUcLjM9ETmc6kWFzE_vC1NdpcaNRtkZS0";

export default axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
  params: {
    maxResults: 40,
    key: KEY,
  },
});

export const initGoogleAuth = async () => {
  await new Promise((res, rej) => {
    window.gapi.load("client:auth2", { callback: res, onerror: rej });
  });

  await window.gapi.client.init({
    clientId:
      "320808104510-qjdjiooodidc8jm1i000oteqc7h63029.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/books",
  });

  return window.gapi.auth2.getAuthInstance();
};
