import axios from 'axios';

export default {
  evaluate(oid, data) {
    return axios.post(`/api/order-food/orders/${oid}/evaluation`, data);
  },
  queryOrders() {
    return axios.get('/api/order-proposals');
  },
  payment(oid) {
    return axios.post(`/api/order-food/orders/${oid}/payment`)
  },
};
