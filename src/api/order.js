import axios from 'axios';

export default {
    evaluate(oid, data) {
        return axios.post(`/api/evaluation?${oid}`, data);
        // return axios.get(`/api/order-food/orders/${oid}/evaluation`);
    },
};
