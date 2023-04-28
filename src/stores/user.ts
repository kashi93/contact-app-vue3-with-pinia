import { defineStore } from "pinia";

export interface User {
    name: string,
    email: string,
    password: string
}

export const useUserStore = defineStore("user", {
    state: (() => ({
        users: [] as User[],
    })),
    actions: {
        store(data: User) {
            this.users.push(data);
         }
    }

});