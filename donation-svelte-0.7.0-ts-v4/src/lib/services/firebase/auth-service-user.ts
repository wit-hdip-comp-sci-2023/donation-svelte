import { loggedInUser } from "$lib/stores";
import type { AuthService, User } from "../types/donation-types";
import { dataStores } from "../dataStores";

export const authServiceUser: AuthService = {
  async login(email: string, password: string): Promise<boolean> {
    const user = (await dataStores.userStore.findBy(email)) as User;
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
    await dataStores.userStore.add(userDetails);
    return true;
  }
};
