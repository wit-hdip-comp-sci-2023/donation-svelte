import axios from "axios";
import { loggedInUser } from "$lib/stores";
import type { AuthService } from "../types/donation-services";

const baseUrl = "http://localhost:4000";

export const AuthServiceApi: AuthService = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${baseUrl}/api/users/authenticate`, { email, password });
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        loggedInUser.set({
          email: email,
          token: response.data.token,
          _id: response.data.id
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
    loggedInUser.set({
      email: "",
      token: "",
      _id: ""
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("donation");
  },

  async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      await axios.post(baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  },

  onLoad() {
    if (!axios.defaults.headers.common["Authorization"]) {
      const donationCredentials = localStorage.donation;
      if (donationCredentials) {
        const savedUser = JSON.parse(donationCredentials);
        loggedInUser.set({
          email: savedUser.email,
          token: savedUser.token,
          _id: savedUser._id
        });
        axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
      }
    }
  }
};
