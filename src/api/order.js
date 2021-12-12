import axios from 'axios';

export default {
  evaluate(oid, data) {
    return axios.post(`/api/order-food/contracts/orders/${oid}/evaluation`, data);
  },
  queryOrders() {
    return axios.get('/api/order-food/proposals');
  },
  payment(oid) {
    return axios.post(`/api/order-food/contracts/orders/${oid}/payment`)
  },
};
