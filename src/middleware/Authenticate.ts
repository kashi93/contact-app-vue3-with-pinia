import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/stores/auth"; 

const Authenticate = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    const auth = authStore.getUser();

    if(to.path != "/login" && to.path != "/register"){
        if(!auth) next({path:"/login"});
    }else{
        if(auth) next({path:"/"});
    }
    
}

export default Authenticate 