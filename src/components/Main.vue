<script setup lang="ts">
import { defineProps } from "vue";
import Navbar from "@/components/Navbar.vue"
import Aside from "@/components/Aside.vue"

const body = document.body;
body.className = "hold-transition sidebar-mini";


defineProps({
    header: {
        type:String,
        default: null
    },
    item: {
        type:String,
        default: null
    },
    itemActive: {
        type:String,
        default: null
    }
})
</script>

<template>
    <div class="wrapper">
        <!-- Navbar -->
        <Navbar />
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <Aside />

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6" v-if="header">
                            <h1 class="m-0">{{ header }}</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6" v-if="item || itemActive">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">{{ item }}</a></li>
                                <li class="breadcrumb-item active">{{ itemActive }}</li>
                            </ol>
                        </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <div class="content">
                <div class="container-fluid">
                    <slot />
                    <!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        <!-- Control Sidebar -->
        <!-- <aside class="control-sidebar control-sidebar-dark">
            Control sidebar content goes here
            <div class="p-3">
                <h5>Title</h5>
                <p>Sidebar content</p>
            </div>
        </aside> -->
        <!-- /.control-sidebar -->

        <!-- Main Footer -->
        <footer class="main-footer">
            <!-- To the right -->
            <div class="float-right d-none d-sm-inline">
              
            </div>
            <!-- Default to the left -->
            <strong>Copyright &copy; 2023-2023.</strong> All rights
            reserved.
        </footer>
    </div>
</template>
