import orderApi from '../api/order';
import _ from 'lodash';
export const EVALUATE_STATUS = {
  success: 'success',
  invalid: 'invalid',
  unavailable: 'unavailable',
};
export const PAYMENT_STATUS = {
  success: 'success',
  invalid: 'invalid',
  unavailable: 'unavailable',
};
export default {
  async evaluate(oid, data) {
    let result;
    try {
      const response = await orderApi.evaluate(oid, data);
      if (_.get(response, 'error.code') === 2001) {
        result = EVALUATE_STATUS.invalid;
      } else if (_.get(response, 'error.code') === 1002) {
        result = EVALUATE_STATUS.unavailable;
      } else {
        result = EVALUATE_STATUS.success;
      }
    } catch (err) {
      result = EVALUATE_STATUS.unavailable;
    }
    return result;
  },
  async getOrders() {
    const response = await orderApi.queryOrders();
    const result = _.map(response.data, item => ({
      ...item,
      score: Number(item.score).toFixed(2),
    }));
    return result;
  },
  async payment(oid) {
    let result = '';
    try {
      const response = await orderApi.payment(oid);
      if (_.get(response, 'error.code') === 1001) {
        result = PAYMENT_STATUS.invalid;
      } else if (_.get(response, 'error.code') === 1002) {
        result = PAYMENT_STATUS.unavailable;
      } else {
        result = PAYMENT_STATUS.success;
      }
    } catch (err) {
      result = PAYMENT_STATUS.unavailable;
    }
    return result;
  },
};
