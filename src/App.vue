<template>
  <div id="app">
     <headers>
    </headers>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import headers from './views/ui/header.vue'
export default Vue.extend({
  components:{
    headers
  },
  data() {
    return {};
  },
  created() {},
});
</script>

<style scoped>
main {
  padding: 0 2rem;
  background-size: cover;
  background-attachment: fixed;
  min-height: calc(100vh - 80px);
}
</style>