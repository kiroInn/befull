<template>
  <header>
    <router-link :to="{ path: '/order-food' }">订餐列表</router-link>
    <router-link :to="{ path: '/order-evaluate' }">订单评价</router-link>

    <a>要吃饱</a>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {};
  },
  created() {},
});
</script>

<style scoped>
header {
  padding: 0.8rem 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-size: contain;
}
header a {
  font-size: 16px;
  color: black;
}
</style>
