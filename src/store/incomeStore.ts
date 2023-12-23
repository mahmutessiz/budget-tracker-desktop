import { defineStore } from "pinia";
import { ref } from "vue";
import { Store } from "tauri-plugin-store-api";

export const useIncomeStore = defineStore("income", () => {
  const income: any = ref([]);

  const store = new Store(".budget.dat");

  async function getIncome() {
    if (!income.value.length) {
      income.value = await store.get("income");
      /*  return income.value; */
    }
  }

  return { income, getIncome };
});
