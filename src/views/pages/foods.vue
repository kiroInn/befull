<template>
  <section class="main-section">
    <div
      data-testid="operation-result"
      class="operation-result"
      v-if="opResult"
    >
      {{ opResult }}
    </div>
    <div v-if="foods.length > 0" data-testid="food-list">
      <food-item
        v-for="(food, index) in foods"
        :key="food.id"
        :index="index"
        :data="food"
        v-on:addCart="handleAddCart"
      ></food-item>
    </div>
    <div v-else data-testid="no-foods">
      {{ tips || `暂未查询到餐品数据` }}
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import foodsService, { ADD_CART_STATUS } from '../../services/foods';
import FoodItem from '../biz/foodItem.vue';
export default Vue.extend({
  components: {
    FoodItem,
  },
  data() {
    return {
      foods: [],
      tips: '',
      opResult: '',
    };
  },
  computed: {},
  created() {
    this.queryFoods();
  },
  methods: {
    async queryFoods() {
      try {
        const foods = await foodsService.getFoods();
        this.foods = foods;
      } catch (err) {
        this.tips = `好像出错了，请稍后再试`;
      }
    },
    async handleAddCart(foodId) {
      const result = await foodsService.addCart(foodId);
      if (result === ADD_CART_STATUS.success) {
        this.opResult = '操作成功';
      }
      if (result === ADD_CART_STATUS.invalid) {
        this.opResult = '操作失败，当前餐品失效';
      }
      if (result === ADD_CART_STATUS.unavailable) {
        this.opResult = '操作失败，请重试';
      }
      setTimeout(() => {
        this.opResult = '';
      }, 3000);
    },
  },
});
</script>

<style scoped>
section {
  padding: 0 2rem;
}
.operation-result {
  color: white;
  background-color: #f85635;
  text-align: center;
  border-radius: 4px;
  padding: 1rem 0;
}
.main-section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem 1rem;
}
</style>
