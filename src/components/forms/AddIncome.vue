<template>
  <form @submit.prevent="addIncome" class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <label for="amount" class="text-sm font-semibold text-gray-700"
        >Amount:</label
      >
      <input
        id="amount"
        v-model="amount"
        type="number"
        required
        class="input input-bordered input-primary w-full"
      />
    </div>
    <div class="flex items-center gap-2">
      <label for="category" class="text-sm font-semibold text-gray-700"
        >Category:</label
      >
      <input
        id="category"
        v-model="category"
        type="text"
        required
        class="input input-bordered input-secondary w-full"
      />
    </div>
    <button type="submit" class="btn btn-primary">Add Income</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Store } from "tauri-plugin-store-api";

const date = new Date();

const amount = ref(0);
const category = ref("");
const income: any = ref([]);
async function pushIncome() {
  income.value.push({
    date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
    amount: amount.value,
    category: category.value,
  });
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
