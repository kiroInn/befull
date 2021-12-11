import axios from 'axios';

export default {
    queryFoods() {
        return axios.get('/api/foods');
    },
};
