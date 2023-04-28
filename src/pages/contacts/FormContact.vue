<template>
    <Main header="Contacts" item="Contact" item-active="Active">
        <div class="row">
            <div class="col-8 mx-auto">
                <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">{{ contactStore.contact == null ?"New":"Edit" }} Contact</h3>
                    </div>
                    <form @submit.prevent="submitForm">
                        <div class="card-body">
                            <div class="text-center mb-4">
                                <img class="profile-user-img img-fluid img-circle"
                                    src="@/assets/admin-lte/dist/img/user4-128x128.jpg" alt="User profile picture">
                            </div>
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text" :class="`form-control ${error.first_name != null ?'is-invalid':''}`" v-model="first_name">
                                <span class="text-danger m-1" v-if="error.first_name != null">{{ error.first_name[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" :class="`form-control ${error.last_name != null ?'is-invalid':''}`" v-model="last_name">
                                <span class="text-danger m-1" v-if="error.last_name != null">{{ error.last_name[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label>Company</label>
                                <input type="text" :class="`form-control ${error.company != null ?'is-invalid':''}`"  v-model="company">
                                <span class="text-danger m-1" v-if="error.company != null">{{ error.company[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label>Job Title</label>
                                <input type="text" :class="`form-control ${error.job_title != null ?'is-invalid':''}`"  v-model="job_title">
                                <span class="text-danger m-1" v-if="error.job_title != null">{{ error.job_title[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" :class="`form-control ${error.email != null ?'is-invalid':''}`" v-model="email">
                                <span class="text-danger m-1" v-if="error.email != null">{{ error.email[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" :class="`form-control ${error.phone != null ?'is-invalid':''}`" v-model="phone">
                                <span class="text-danger m-1" v-if="error.phone != null">{{ error.phone[0] }}</span>
                            </div>
                            <div class="form-group">
                                <label>Remark</label>
                                <textarea :class="`form-control ${error.remark != null ?'is-invalid':''}`" v-model="remark"></textarea>
                                <span class="text-danger m-1" v-if="error.remark != null">{{ error.remark[0] }}</span>
                            </div>
                        </div>

                        <div class="card-footer">
                            <div class="float-right">
                                <button type="submit" class="btn btn-primary">{{ contactStore.contact == null ?"Save":"Update" }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </Main>
</template>

<script setup lang="ts">
import {ref,onBeforeUnmount,onBeforeMount } from 'vue';
import type { Ref } from 'vue'
import Main from '@/components/Main.vue';
import {useContactStore} from "@/stores/contact"
import {useRouter} from "vue-router";
import { v4 as uuidv4 } from 'uuid';

const id:Ref<any> = ref(null);
const first_name = ref("");
const last_name = ref("");
const company = ref("");
const job_title = ref("");
const email = ref("");
const phone = ref("");
const remark = ref("");
const error:Ref<{ [key: string]: string[] }> = ref({});
const contactStore = useContactStore();
const router = useRouter();

const submitForm = () => {
    error.value = validation();

    if (Object.getOwnPropertyNames(error.value).length > 0) {
        return;
    }

    const data = {
        id:id.value,
        first_name:first_name.value,
        last_name:last_name.value,
        company:company.value,
        job_title:job_title.value,
        email:email.value,
        phone:phone.value,
        remark:remark.value
    };

    if(id.value == null){
        contactStore.store({...data,id:uuidv4()});
        
    }else{
        contactStore.update(data);
    }

    router.push({path:"/"})
}

const validation = (): { [key: string]: string[] } => {
    let err: { [key: string]: string[] } = {};

    if (first_name.value.trim().length < 1) {
        err = setErr(err, "first_name", "This field is required")
    }

    if (last_name.value.trim().length < 1) {
        err = setErr(err, "last_name", "This field is required")
    }

    if (company.value.trim().length < 1) {
        err = setErr(err, "company", "This field is required")
    }

    if (job_title.value.trim().length < 1) {
        err = setErr(err, "job_title", "This field is required")
    }

    if (email.value.trim().length < 1) {
        err = setErr(err, "email", "This field is required")
    }

    if (phone.value.trim().length < 1) {
        err = setErr(err, "phone", "This field is required")
    }

    if (remark.value.trim().length < 1) {
        err = setErr(err, "remark", "This field is required")
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

onBeforeUnmount(()=>{
    contactStore.$resetContact();
})

onBeforeMount(()=>{
    if(contactStore.contact != null){
        id.value = contactStore.contact.id
        first_name.value = contactStore.contact.first_name
        last_name.value = contactStore.contact.last_name
        company.value = contactStore.contact.company
        job_title.value = contactStore.contact.job_title
        email.value = contactStore.contact.email
        phone.value = contactStore.contact.phone
        remark.value = contactStore.contact.remark
    }
    
})
</script>

<style scoped></style>