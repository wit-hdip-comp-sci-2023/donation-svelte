import { ref, set, child, remove, Database, type DatabaseReference } from "firebase/database";
import { find, findOne, add, findBy, edit } from "./firebase-utils.js";
import type { Store, User } from "../donation-types.js";

export const userStore: Store = {
  ref: <DatabaseReference>{},

  setDatabase(database: Database) {
    this.ref = ref(database, "users");
  },

  async find(): Promise<User[]> {
    const users = (await find(this.ref)) as User[];
    return users;
  },

  async findOne(id: string): Promise<User> {
    const user = (await findOne(this.ref, id)) as User;
    return user;
  },

  async add(obj: User): Promise<User> {
    const user = (await add(this.ref, obj)) as User;
    return user;
  },

  async findBy(email: string): Promise<User | null> {
    const users = (await findBy(this.ref, "email", email)) as User[];
    return users.length ? users[0] : null;
  },

  async deleteOne(id: string): Promise<void> {
    await remove(child(this.ref, id));
  },

  async delete(): Promise<void> {
    await set(this.ref, {});
  },

  async edit(user: unknown): Promise<void> {
    await edit(this.ref, user);
  }
};
