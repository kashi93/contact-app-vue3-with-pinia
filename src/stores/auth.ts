import { defineStore } from "pinia";
import { useUserStore } from "./user"
import type { User } from "./user"



export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null as User | null
    }),
    actions: {
        login(data: { [key: string]: any }): boolean {
            const userStore = useUserStore();
            const user = userStore.users.find(u => u.email == data.email && u.password == data.password);

            if (data.email.trim().length < 1 || data.password.trim().length < 1 || user == null) {
                return false;
            }

            this.user = user;
            
            return true;
        },
        getUser(){
            return this.user;
        },
        logout(){ 
            this.user = null;
        }
    }
});