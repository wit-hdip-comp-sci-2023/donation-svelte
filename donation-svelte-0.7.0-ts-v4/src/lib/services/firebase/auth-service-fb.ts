import { loggedInUser } from "$lib/stores";
import type { AuthService } from "../types/donation-services";
import type { User } from "../types/donation-stores";
import { userStore } from "./user-store";

export const authServiceFb: AuthService = {
  async login(email: string, password: string): Promise<boolean> {
    const user = (await userStore.findBy(email)) as User;
    if (!user || user.password !== password) {
      return false;
    }
    loggedInUser.set({
      email: email,
      token: "",
      _id: user._id!
    });
    localStorage.donation = JSON.stringify({ email: email, _id: user._id });
    return true;
  },

  async logout(): Promise<void> {
    loggedInUser.set({
      email: "",
      token: "",
      _id: ""
    });
    localStorage.removeItem("donation");
  },

  async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    await userStore.add(userDetails);
    return true;
  },

  onLoad() {
    const donationCredentials = localStorage.donation;
    if (donationCredentials) {
      const savedUser = JSON.parse(donationCredentials);
      loggedInUser.set({
        email: savedUser.email,
        token: savedUser.token,
        _id: savedUser._id
      });
    }
  }
};
