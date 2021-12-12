<template>
  <section data-testid="main-section" class="main-section">
    <div
      data-testid="operation-result"
      class="operation-result"
      v-if="opResult"
    >
      {{ opResult }}
    </div>
    <div>订单-{{ oid }}</div>
    <div>港式滑蛋饭</div>
    <div>
      <div>对商家想说：</div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="merchant.content"
      ></textarea>
    </div>
    <div>
      <div>对配送员想说：</div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="delivery.content"
      ></textarea>
    </div>
    <button v-on:click="evaluate">提交</button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";
import orderService, { EVALUATE_STATUS } from "../../services/order";

export default Vue.extend({
  data() {
    return {
      oid: 888999001,
      merchant: {
        content: "",
      },
      delivery: {
        content: "",
      },
      opResult: "",
    };
  },
  computed: {},
  created() {},
  methods: {
    async evaluate(data) {
      const result = await orderService.evaluate(this.oid, {
        merchant: {
          content: this.merchant.content || _.get(data, "merchant.content"),
        },
        delivery: {
          content: this.delivery.content || _.get(data, "delivery.content"),
        },
      });
      if (result === EVALUATE_STATUS.success) {
        this.opResult = "评价成功";
      }
      if (result === EVALUATE_STATUS.invalid) {
        this.opResult = "订单不存在";
      }
      if (result === EVALUATE_STATUS.unavailable) {
        this.opResult = "评价已提交，请稍后查看评价结果。";

        this.retry();
      }
    },
    retry() {
      const data = JSON.parse(localStorage.getItem("evaluate"));
      setTimeout(() => {
        this.evaluate(data);
      }, 10000);
    },
    storageEvaluate() {
      localStorage.setItem(
        "evaluate",
        JSON.stringify({
          merchant: {
            content: this.merchant.content,
          },
          delivery: {
            content: this.delivery.content,
          },
        })
      );
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
  margin-bottom: 1rem;
}
.main-section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
}
textarea {
  width: 100%;
}
button {
  margin-top: 1rem;
}
</style>
