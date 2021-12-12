import foodsApi from '../api/foods';
import _ from 'lodash';

export const ADD_CART_STATUS = {
  success: 'success',
  invalid: 'invalid',
  unavailable: 'unavailable',
};

export default {
  async getFoods() {
    const response = await foodsApi.queryFoods();
    const result = _.map(response.data, item => ({
      ...item,
      score: Number(item.score).toFixed(2),
    }));
    return result;
  },
  async addCart(foodId) {
    let result = '';
    try {
      const response = await foodsApi.addCart(foodId);
      if (_.get(response, 'error.code') === 1001) {
        result = ADD_CART_STATUS.invalid;
      } else if (_.get(response, 'error.code') === 1002) {
        result = ADD_CART_STATUS.unavailable;
      } else {
        result = ADD_CART_STATUS.success;
      }
    } catch (err) {
      result = ADD_CART_STATUS.unavailable;
    }
    return result;
  },
};
