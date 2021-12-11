<template >
  <section class="main-section">
    <div v-if="foods.length > 0" data-testid="food-list">
      <food-item
        v-for="(food, index) in foods"
        :key="food.id"
        :index="index"
        :data="food"
      ></food-item>
    </div>
    <div v-else data-testid="no-foods">
      {{ tips || `暂未查询到餐品数据` }}
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import foodsService from "../../services/foods";
import FoodItem from "../biz/foodItem.vue";
export default Vue.extend({
  components: {
    FoodItem,
  },
  data() {
    return {
      foods: [],
      tips: "",
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
  },
});
</script>

<style scoped>
section {
  padding: 0 2rem;
}
.main-section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem 1rem;
}
</style>