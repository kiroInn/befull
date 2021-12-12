<template>
  <div class="food">
    <img v-if="index % 2 === 0" src="../../assets/food01.png" alt="" />
    <img v-if="index % 2 === 1" src="../../assets/food02.png" alt="" />
    <div class="info">
      <div class="name">{{ data.name }}</div>
      <div class="price">{{ data.price }}元</div>
      <div class="buy" v-on:click="payment(data.id)">支付购买</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    id: Number,
    index: Number,
    data: Object,
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    payment(foodId) {
      this.$emit('payment', foodId);
    },
  },
});
</script>

<style scoped>
.food {
  justify-content: center;
  display: flex;
  margin: 1rem auto;
  max-width: 100rem;
  background-color: #ccc;
  padding: 1rem;
}
.info {
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info .name {
  color: #000;
  font-size: 1rem;
  font-weight: 600;
}
.name span {
  font-size: 1rem;
  color: #000;
}
.info .score {
  color: gray;
  font-weight: 600;
}
.info .price {
  color: #f85635;
  font-weight: 600;
}
.info .buy {
  color: white;
  background-color: #f85635;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}
.food img {
  width: 8rem;
  height: 8rem;
}
</style>
