import Vue from 'vue';
import VueRouter from 'vue-router';
import { orderFood } from './order-food';

Vue.use(VueRouter);

export const routes = [{ path: '/', redirect: 'order-food' }, ...orderFood];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
