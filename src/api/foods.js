import axios from 'axios';

export default {
  queryOrders() {
    return axios.get('/api/food-proposals');
  },
  payment(oid) {
    return axios.post('/api/cart', { foodId: oid });
  },
};
