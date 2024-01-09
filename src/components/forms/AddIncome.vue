<template>
  <form @submit.prevent="addIncome" class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <label for="amount" class="text-sm font-semibold text-gray-700"
        >{{ $t("amount") }}:</label
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
        >{{ $t("category") }}:</label
      >
      <input
        id="category"
        v-model="category"
        type="text"
        required
        class="input input-bordered input-secondary w-full"
      />
    </div>
    <button type="submit" class="btn btn-accent">{{ $t("add_funds") }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAddIncome } from "../../utils/addIncome.ts";

// Refs to store the income amount and category inputs
const amount = ref();
const category = ref("");
// Ref to store the array of income entries
const income: any = ref([]);

const addIncome = async () => {
  category.value =
    category.value.charAt(0).toUpperCase() + category.value.slice(1);
  await useAddIncome(income, amount, category);
};
</script>
