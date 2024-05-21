import axios from "axios";

const client = axios.create({
  headers: {
    common: {
      Accept: "application/json;version=v1_web",
      "Content-Type": "application/json",
    },
  },
});

client.interceptors.request.use((config) => {
  if (config.method === "get") {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "user_token"
    )}`;
  }
  return config;
});

export default client;
