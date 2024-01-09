<template>
  <form @submit.prevent="addexpense" class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <label for="amount" class="text-sm font-semibold text-gray-700"
        >{{ $t("amount") }}:</label
      ><br />
      <input
        id="amount"
        v-model="amount"
        type="number"
        step="0.01"
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
    <button type="submit" class="btn btn-primary">
      {{ $t("add_transaction") }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
/* import { Store } from "tauri-plugin-store-api"; */
import { useAddExpense } from "../../utils/addExpense.ts";

const amount = ref();
const category = ref("");
const expense: any = ref([]);

const addexpense = async () => {
  category.value =
    category.value.charAt(0).toUpperCase() + category.value.slice(1);
  await useAddExpense(expense, amount, category);
};
</script>
