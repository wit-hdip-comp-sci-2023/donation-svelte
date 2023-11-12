// @ts-nocheck
import axios from "axios";
import { goto } from "$app/navigation";
import { user } from "../stores";

export const donationService = {
  baseUrl: "http://localhost:4000",

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token
        });
        localStorage.donation = JSON.stringify({ email: email, token: response.data.token });
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async logout() {
    user.set({
      email: "",
      token: ""
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("donation");
  },

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  },

  reload() {
    const donationCredentials = localStorage.donation;
    if (donationCredentials) {
      const savedUser = JSON.parse(donationCredentials);
      user.set({
        email: savedUser.email,
        token: savedUser.token
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
    }
  }
};
