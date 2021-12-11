import foodsApi from '../api/foods';
import _ from 'lodash';

export default {
  async getFoods() {
    const response = await foodsApi.queryFoods();
    const result = _.map(response.data, item => ({
      ...item,
      score: Number(item.score).toFixed(2),
    }));
    return result;
  },
};
