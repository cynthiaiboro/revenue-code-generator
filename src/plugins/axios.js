import axios from "axios";
import store from "../store";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error) {
      store.dispatch("notification/showAlert", {
        display: true,
        type: "error",
        title: "An error occured",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
