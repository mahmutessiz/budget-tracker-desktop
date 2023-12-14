<template>
  <div class="stats bg-primary text-primary-content">
    <div class="stat">
      <div class="stat-title text-primary-content">Total spending</div>
      <div class="stat-value text-primary-content">
        ${{ totalExpense ? totalExpense.toLocaleString() : 0 }}
      </div>
      <div class="stat-actions">
        <button
          class="btn btn-sm btn-neutral text-neutral-content"
          onclick="my_modal_4.showModal()"
        >
          Add Transaction
        </button>
      </div>
    </div>
  </div>
  <dialog id="my_modal_4" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click outside to close</p>
      <AddExpense />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Store } from "tauri-plugin-store-api";
import AddExpense from "../forms/AddExpense.vue";

// Ref to hold the expense data
const expense = ref();
const totalExpense = ref();

onMounted(async () => {
  // Initialize the store on component mount
  const store = new Store(".budget.dat");

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
