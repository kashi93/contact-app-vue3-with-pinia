<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">   
            <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)" @click.prevent="logout"> 
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const logout = ()=>{
    authStore.logout()
    router.replace({path:"/login"})
}

</script>