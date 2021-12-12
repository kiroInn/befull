<template>
  <section class="main-section">
    <div
      data-testid="operation-result"
      class="operation-result"
      v-if="opResult"
    >
      {{ opResult }}
    </div>
    <div v-if="orders.length > 0" data-testid="order-list">
      <order-item
        v-for="(food, index) in orders"
        :key="food.id"
        :index="index"
        :data="food"
        v-on:payment="handlePayment"
      ></order-item>
    </div>
    <div v-else data-testid="no-orders">
      {{ tips || `暂未查询到订单数据` }}
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import orderService, { PAYMENT_STATUS } from '../../services/order';
import OrderItem from '../biz/orderItem.vue';
export default Vue.extend({
  components: {
    OrderItem,
  },
  data() {
    return {
      orders: [],
      tips: '',
      opResult: '',
    };
  },
  computed: {},
  created() {
    this.queryOrders();
  },
  methods: {
    async queryOrders() {
      try {
        const orders = await orderService.getOrders();
        this.orders = orders;
      } catch (err) {
        this.tips = `好像出错了，请稍后再试`;
      }
    },
    async handlePayment(oid) {
      const result = await orderService.payment(oid);
      if (result === PAYMENT_STATUS.success) {
        this.opResult = '操作成功';
      }
      if (result === PAYMENT_STATUS.invalid) {
        this.opResult = '操作失败，当前订单失效';
      }
      if (result === PAYMENT_STATUS.unavailable) {
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
