<template>
  <div class="stats bg-accent text-accent-content">
    <div class="stat text-accent-content">
      <div class="stat-title text-accent-content">
        {{ $t("current_balance") }}
      </div>
      <div class="stat-value text-accent-content">
        ${{
          isNaN(totalIncome - totalExpense)
            ? 0
            : (totalIncome - totalExpense).toLocaleString()
        }}
      </div>
      <div class="stat-actions">
        <button
          class="btn btn-sm btn-neutral text-neutral-content"
          onclick="my_modal_3.showModal()"
        >
          {{ $t("add_funds") }}
        </button>
      </div>
    </div>

    <div class="stat text-accent-content">
      <div class="stat-title text-accent-content">
        {{ $t("total_balance") }}
      </div>
      <div class="stat-value">
        ${{ totalIncome ? totalIncome.toLocaleString() : 0 }}
      </div>
      <div class="stat-actions text-accent-content">
        <span class="btn btn-sm opacity-0"></span>
        <span class="btn btn-sm opacity-0"></span>
      </div>
    </div>
  </div>

  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <p class="py-4">{{ $t("click_outside_to_close") }}</p>
      <AddIncome />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>{{ $t("close") }}</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import AddIncome from "../forms/AddIncome.vue";

// Refs to hold the income and expense data along with their totals
const income = ref();
const totalIncome = ref(0);
const expense = ref();
const totalExpense = ref(0);

// Props received from the parent component
const props = defineProps({
  expenseData: Object,
  incomeData: Object,
});

// Watch for changes to props and update income & expenses accordingly
watchEffect(() => {
  // Assign expense and income data from props to local refs
  expense.value = props.expenseData;
  income.value = props.incomeData;

  // Calculate the total income by summing up the amount from each income item
  if (income.value) {
     totalIncome.value = income.value.reduce((sum: number, item: any) => {
    // Ensure the amount is a valid number before adding to sum
    if (item.amount && !isNaN(item.amount)) {
      return sum + parseFloat(item.amount);
    }
    // Continue with the current sum if the amount is not a valid number
    return sum;
  }, 0);
  }
 

  // Calculate the total expense by summing up the amount from each expense item
  if (expense.value) {
    totalExpense.value = expense.value.reduce((sum: number, item: any) => {
    // Ensure the amount is a valid number before adding to sum
    if (item.amount && !isNaN(item.amount)) {
      return sum + parseFloat(item.amount);
    }
    // Continue with the current sum if the amount is not a valid number
    return sum;
  }, 0);
  }
  
});
</script>
