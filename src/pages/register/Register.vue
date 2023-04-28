<template>
    <div class="register-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <RouterLink to="/" class="h1">
                    <b>Contacts</b>
                </RouterLink>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Register a new membership</p>
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Name" v-model="name">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <span class="text-danger m-1" v-if="error.name != null">{{ error.name[0] }}</span>
                    </div>
                    <div class=" mb-3">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Email" v-model="email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <span class="text-danger m-1" v-if="error.email != null">{{ error.email[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <div class="input-group">
                            <input type="password" class="form-control" placeholder="Password" v-model="password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <span class="text-danger m-1" v-if="error.password != null">{{ error.password[0] }}</span>
                    </div>
                    <div class=" mb-3">
                        <div class="input-group">
                            <input type="password" class="form-control" placeholder="Retype password"
                                v-model="confirmPassword">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <span class="text-danger m-1" v-if="error.confirmPassword != null">{{ error.confirmPassword[0] }}</span>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                        </div>

                    </div>
                </form>

                <div class="text-center mt-3">
                    <RouterLink to="/login">
                        I already have a membership
                    </RouterLink>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import type { Ref } from 'vue'
import { RouterLink,useRouter } from 'vue-router';
import {useUserStore} from "@/stores/user";
const body = document.body;
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error: Ref<{ [key: string]: string[] }> = ref({});
const userStore = useUserStore();
const router = useRouter()

body.className = "hold-transition register-page"

const submitForm = () => {
    error.value = validation();

    if (Object.getOwnPropertyNames(error.value).length > 0) {
        return;
    }

    userStore.store({
        name:name.value,
        email:email.value,
        password:password.value,
    })

    router.push({path:"/login"})
}

const validation = (): { [key: string]: string[] } => {
    let err: { [key: string]: string[] } = {};

    if (name.value.trim().length < 1) {
        err = setErr(err, "name", "This field is required")
    }

    if (email.value.trim().length < 1) {
        err = setErr(err, "email", "This field is required")
    }
    
    if(userStore.users.filter(u=>u.email == email.value).length >0){
        err = setErr(err, "email", "Value has already been taken.")
    }

    if (password.value.trim().length < 1) {
        err = setErr(err, "password", "This field is required")
    }

    if (confirmPassword.value.trim().length < 1) {
        err = setErr(err, "confirmPassword", "This field is required")
    }

    if(password.value != confirmPassword.value){
        err = setErr(err, "confirmPassword", "The confirmation password does not match.")
    }

    return err;

}

const setErr = (curr: { [key: string]: string[] }, name: string, e: string): { [key: string]: string[] } => {
    if (!(name in curr)) {
        curr[name] = [e];
    } else {
        curr[name].push(e);
    }

    return curr;
}

onBeforeUnmount(() => {
    body.className = ""
})
</script>

<style lang="scss" scoped>
:global(.register-page) {
    height: 100vh !important;
}
</style>