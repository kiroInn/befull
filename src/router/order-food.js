import Orders from '../views/pages/orders';
import OrderEvaluate from '../views/pages/orderEvaluate';

export const orderFood = [
  { path: '/order-food', component: Orders, children: [] },
  { path: '/order-evaluate', component: OrderEvaluate },
];
