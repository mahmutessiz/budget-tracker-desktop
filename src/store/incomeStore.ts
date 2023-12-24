import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Store } from "tauri-plugin-store-api";

export const useIncomeStore = defineStore("income", () => {
  const incomes: any = ref([]);
  const income = computed(() => {
    return incomes.value;
  });
  const store = new Store(".budget.dat");

  async function getIncome() {
    // Always fetch the income data from the store
    incomes.value = await store.get("income");
  }

  return { income, getIncome };
});
