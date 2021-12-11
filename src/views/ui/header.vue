<template >
  <header>
    <router-link :to="{ path: '/' }">要吃饱</router-link>
    <router-link :to="{ path: '/foods' }">订餐列表</router-link>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
  created() {},
});
</script>

<style  scoped>
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