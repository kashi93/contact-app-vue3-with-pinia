<template>
    <div class="login-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <RouterLink to="/" class="h1">
                    <b>Contacts</b>
                </RouterLink>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Sign in to start your session</p>
                <form @submit.prevent="submitForm">
                    <div class="alert alert-danger alert-dismissible" v-if="err != ''">
                        <h5><i class="icon fas fa-ban"></i> Alert!</h5>
                        {{ err }}
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Email" v-model="email">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" placeholder="Password" v-model="password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                        </div>
                    </div>
                </form>
                <RouterLink to="/register">
                    <p class="mt-3 text-center">
                        Register a new membership
                    </p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth";

const email = ref("");
const password = ref("");
const err = ref("");
const authStore = useAuthStore();
const body = document.body;
const router = useRouter();

body.className = "hold-transition login-page"

onBeforeUnmount(() => {
    body.className = ""
})

const submitForm = () => {
    err.value = "";

    const attempt = authStore.login({
        email: email.value,
        password: password.value
    })

    if (!attempt) {
        err.value = "Invalid email or password";
        return;
    }

    router.replace({ path: "/" });
}
</script>

<style lang="scss" scoped>
:global(.login-page) {
    height: 100vh !important;
}
</style>