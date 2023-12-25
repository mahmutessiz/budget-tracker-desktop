import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Store } from "tauri-plugin-store-api";

export const useExpenseStore = defineStore("expense", () => {
  const expense: any = ref([]);
  const expenseData = computed(() => {
    return expense.value;
  });
  const store = new Store(".budget.dat");

  async function getExpense() {
    // Always fetch the expense data from the store
    expense.value = await store.get("expense");
  }

  return { expenseData, getExpense };
});
