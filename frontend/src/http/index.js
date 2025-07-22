import axios from "axios";

const API = axios.create({
  baseURL: "https://momo-pasal.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const APIAuthenticated = axios.create({
  baseURL: "https://momo-pasal.onrender.com/api",
  headers: {
    "content-Type": "application/json",
    Accept: "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  },
});

export { API, APIAuthenticated };
