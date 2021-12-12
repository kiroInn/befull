import Foods from '../views/pages/foods';
import OrderEvaluate from '../views/pages/orderEvaluate';

export const orderFood = [
  { path: '/order-food', component: Foods, children: [] },
  { path: '/order-evaluate', component: OrderEvaluate },
];
