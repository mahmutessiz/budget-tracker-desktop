<template>
  <form @submit.prevent="addIncome">
    <label>
      Amount:
      <input v-model="amount" type="number" required />
    </label>
    <label>
      Category:
      <input v-model="category" type="text" required />
    </label>
    <button type="submit">Add Income</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Store } from "tauri-plugin-store-api";

const amount = ref(0);
const category = ref("");
const income: any = ref([]);
async function pushIncome() {
  income.value.push({ amount: amount.value, category: category.value });
}
const addIncome = async () => {
  const store = await new Store(".budget.dat");

  if (await store.get("income")) {
    income.value = await store.get("income");
  } else {
    income.value = [];
  }

  await pushIncome();
  await store.set("income", income.value);
  await store.save();
  amount.value = 0;
  category.value = "";
};
</script>
