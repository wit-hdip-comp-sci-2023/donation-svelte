import { ref, set, push, get, child, update, remove, query, orderByChild, equalTo } from "firebase/database";
import type { User } from "../donation-types.js";
import { database } from "./firebase.js";

const usersRef = ref(database, "users");

export const userStore = {
  async getAllUsers(): Promise<User[]> {
    const snapshot = await get(usersRef);
    const users = Array<User>();
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      users.push({ _id: childKey, ...childData });
    });
    return users;
  },

  async getUserById(id: string): Promise<User | null> {
    if (id) {
      const userRef = child(usersRef, id);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return { _id: id, ...snapshot.val() };
      }
    }
    return null;
  },

  async addUser(user: User): Promise<User> {
    const newUserRef = push(usersRef);
    await set(newUserRef, user);
    const newUser = (await get(newUserRef)).val();
    newUser._id = newUserRef.key;
    return newUser;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const emailQuery = query(usersRef, orderByChild("email"), equalTo(email));
    const snapshot = await get(emailQuery);
    const users = Array<User>();
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      users.push({ _id: childKey, ...childData });
    });
    // Check if the result array has any elements, if so - return result[0], otherwise return null
    return users.length ? users[0] : null;
  },

  async deleteUserById(id: string) {
    await remove(child(usersRef, id));
  },

  async deleteAllUsers() {
    await set(usersRef, {});
  },

  async editUser(user: User) {
    // Thanks to https://stackoverflow.com/questions/56298481/how-to-fix-object-null-prototype-title-product
    const fixedUser = JSON.parse(JSON.stringify(user));
    const userId = fixedUser._id;
    // Don't update the _id.
    delete fixedUser._id;

    // Update the user
    const userRef = child(usersRef, userId);

    await update(userRef, fixedUser);
  }
};
