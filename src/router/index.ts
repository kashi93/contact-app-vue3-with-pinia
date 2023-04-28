import { createRouter, createWebHistory } from 'vue-router'
import Contacts from '@/pages/contacts/Contacts.vue';
import FormContact from '@/pages/contacts/FormContact.vue'
import { useContactStore } from '@/stores/contact';
import Authenticate from "@/middleware/Authenticate"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Contacts,
      meta:{
        Authenticate
      }
    },
    {
      path: '/new-contact',
      name: 'new-contact',
      component: FormContact,
      meta:{
        Authenticate
      }
    },
    {
      path: '/edit-contact/:id',
      name: 'edit-contact',
      component: FormContact,
      beforeEnter(to) {
        const contactStore = useContactStore();
        const { id } = to.params

        if(id == null) return false;

        return contactStore.edit(id);
      },
      meta:{
        Authenticate
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/login/Login.vue'),
      meta:{
        Authenticate
      }
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/register/Register.vue'),
      meta:{
        Authenticate
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const guards: {} | any = to.meta;
  for (const i in guards) {
    if (Object.prototype.hasOwnProperty.call(guards, i)) {
      const g = guards[i];
      if (typeof g == "function") {
        await g(
          to,
          from,
          next,
        );
      }
    }
  }
  next();
})

export default router
