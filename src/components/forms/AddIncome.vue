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

// Get the current date
const date = new Date();

// Refs to store the income amount and category inputs
const amount = ref(0);
const category = ref("");

// Ref to store the array of income entries
const income: any = ref([]);

/**
 * Push a new income entry into the income array
 */
async function pushIncome() {
  income.value.push({
    date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
    amount: amount.value,
    category: category.value,
  });
}

/**
 * Add a new income entry to the store and reset the input fields
 */
const addIncome = async () => {
  // Initialize the store
  const store = await new Store(".budget.dat");

  // Retrieve the current income array from the store or initialize it if not present
  if (await store.get("income")) {
    income.value = await store.get("income");
  } else {
    income.value = [];
  }

  // Add the new income entry to the array
  await pushIncome();

  // Save the updated income array to the store
  await store.set("income", income.value);
  await store.save();

  // Reset input fields
  amount.value = 0;
  category.value = "";
};
</script>
