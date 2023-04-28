import { defineStore } from "pinia";

export interface Contact {
    id: any
    first_name: string,
    last_name: string,
    company: string,
    job_title: string,
    email: string,
    phone: string,
    remark: string
}


export const useContactStore = defineStore("contact", {
    state: () => ({
        contacts: [] as Contact[],
        contact: null as Contact | null
    }),
    actions: {
        store(data: Contact) {
            this.contacts.push(data)
        },
        edit(id: any) {
            const contact = this.contacts.filter(c => c.id == id);

            if (contact.length < 1) {
                return false;
            }

            this.contact = contact[0];
            return true
        },
        update(data:Contact){
            const i = this.contacts.findIndex(c=>c.id == data.id);

            if(i != -1){
                this.contacts[i].first_name = data.first_name
                this.contacts[i].last_name = data.last_name
                this.contacts[i].company = data.company
                this.contacts[i].job_title = data.job_title
                this.contacts[i].email = data.email
                this.contacts[i].phone = data.phone
                this.contacts[i].remark = data.remark
            }
        },
        destroy(id:any){
            const i = this.contacts.findIndex(c=>c.id == id); 

            if(i != -1){
                this.contacts.splice(i,1);
            }
        },
        $resetContact(){
            this.contact = null;
        }
    }
});