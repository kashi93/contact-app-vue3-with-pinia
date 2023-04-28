<template>
    <Main header="Contacts" item="Contact" item-active="List">
        <div class="card mb-5">
            <div class="card-header">
                <h3 class="card-title">Contacts</h3>
            </div>

            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Job title & company</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="storeContact.contacts.length > 0">
                            <tr v-for="contact in storeContact.contacts" :key="contact.id">
                                <td>{{ contact.first_name }} {{ contact.last_name }}</td>
                                <td>{{ contact.email }}</td>
                                <td>
                                    {{ contact.phone }}
                                </td>
                                <td>{{ contact.job_title }} {{ contact.company }}</td>
                                <td class="text-center">
                                    <RouterLink :to="`/edit-contact/${contact.id}`">
                                        <i class="fas fa-edit text-warning"></i>
                                    </RouterLink>
                                    <a class="ml-1" href="javascript:void(0)" @click.prevent="del(contact.id)">
                                        <i class="fas fa-trash text-danger"></i>
                                    </a>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td class="text-center" colspan="5">No data found</td>
                            </tr>
                        </template>

                    </tbody>
                </table>
            </div>

            <!-- <div class="card-footer clearfix">
                <ul class="pagination pagination-sm m-0 float-right">
                    <li class="page-item"><a class="page-link" href="#">«</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">»</a></li>
                </ul>
            </div> -->
        </div>
    </Main>
</template>

<script setup lang="ts">
import Main from '@/components/Main.vue';
import { useContactStore } from '@/stores/contact'
import { RouterLink } from 'vue-router';

const storeContact = useContactStore();

const del = (id:any)=>{
    storeContact.destroy(id);
}

</script>

<style scoped></style>
