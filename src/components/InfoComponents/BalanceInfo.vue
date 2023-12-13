<template>
  <div class="stats bg-accent text-accent-content">
    <div class="stat text-accent-content">
      <div class="stat-title text-accent-content">Current balance</div>
      <div class="stat-value text-accent-content">
        ${{
          isNaN(totalIncome - totalExpense)
            ? 0
            : (totalIncome - totalExpense).toLocaleString()
        }}
      </div>
      <div class="stat-actions">
        <button class="btn btn-sm btn-neutral text-neutral-content">
          Add funds
        </button>
      </div>
    </div>

    <div class="stat text-accent-content">
      <div class="stat-title text-accent-content">Total Income</div>
      <div class="stat-value">
        ${{ totalIncome ? totalIncome.toLocaleString() : 0 }}
      </div>
      <div class="stat-actions text-accent-content">
        <span class="btn btn-sm opacity-0"></span>
        <span class="btn btn-sm opacity-0"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Store } from "tauri-plugin-store-api";

// Ref to hold the income data
const income = ref();
const totalIncome = ref();
// Ref to hold the expense data
const expense = ref();
const totalExpense = ref();

onMounted(async () => {
  // Initialize the store on component mount
  const store = new Store(".budget.dat");

  // If the income is not already set, retrieve it from the store
  if (!income.value) {
    income.value = await store.get("income");
  }

  // Subscribe to store changes and update the income accordingly
  store.onChange(async () => {
    income.value = await store.get("income");

    totalIncome.value = income.value.reduce((sum: number, item: any) => {
      // Check if the amount value exists and is a number
      if (item.amount && !isNaN(item.amount)) {
        return sum + parseFloat(item.amount);
      } else {
        // If the amount value does not exist or is not a number, just return the current sum
        return sum;
      }
    }, 0);
  });

  totalIncome.value = income.value.reduce((sum: number, item: any) => {
    // Check if the amount value exists and is a number
    if (item.amount && !isNaN(item.amount)) {
      return sum + parseFloat(item.amount);
    } else {
      // If the amount value does not exist or is not a number, just return the current sum
      return sum;
    }
  }, 0);

  //0000000000000000000000000000

  // If the expense is not already set, retrieve it from the store
  if (!expense.value) {
    expense.value = await store.get("expense");
  }

  // Subscribe to store changes and update the expense accordingly
  store.onChange(async () => {
    expense.value = await store.get("expense");

    totalExpense.value = expense.value.reduce((sum: number, item: any) => {
      // Check if the amount value exists and is a number
      if (item.amount && !isNaN(item.amount)) {
        return sum + parseFloat(item.amount);
      } else {
        // If the amount value does not exist or is not a number, just return the current sum
        return sum;
      }
    }, 0);
  });

  totalExpense.value = expense.value.reduce((sum: number, item: any) => {
    // Check if the amount value exists and is a number
    if (item.amount && !isNaN(item.amount)) {
      return sum + parseFloat(item.amount);
    } else {
      // If the amount value does not exist or is not a number, just return the current sum
      return sum;
    }
  }, 0);
});
</script>
