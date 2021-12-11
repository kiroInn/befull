import Vue from 'vue';
import VueRouter from 'vue-router';
import Foods from '../views/pages/foods';

Vue.use(VueRouter);

export const routes = [
  { path: '/', redirect: '' },
  { path: '/foods', component: Foods },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
