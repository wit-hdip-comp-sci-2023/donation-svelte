import { loggedInUser } from "$lib/stores";
import type { AuthService } from "../types/donation-services";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "./connect";
import { goto } from "$app/navigation";

export const authServiceFbAuth: AuthService = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = result.user;
      loggedInUser.set({
        email: user.email!,
        token: user.refreshToken,
        _id: user.uid
      });
    } catch (error) {
      return false;
    }
    return true;
  },

  async logout(): Promise<void> {
    try {
      await signOut(firebaseAuth);
      loggedInUser.set({
        email: "",
        token: "",
        _id: ""
      });
    } catch (error) {
      console.log("error logging out");
    }
  },

  async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = result.user;
      loggedInUser.set({
        email: user.email!,
        token: user.refreshToken,
        _id: user.uid
      });
    } catch (error) {
      return false;
    }
    return true;
  },

  onLoad(): void {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        loggedInUser.set({
          email: user.email!,
          token: user.refreshToken,
          _id: user.uid
        });
      } else {
        goto("/");
      }
    });
  }
};
