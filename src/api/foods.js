import axios from 'axios';

export default {
  queryFoods() {
    return axios.get('/api/food-proposals');
  },
  addCart(foodId) {
    return axios.post('/api/cart', { foodId });
  },
};
