import { defineStore } from "pinia";
import { ref } from "vue";
import { Store } from "tauri-plugin-store-api";

export const useIncomeStore = defineStore("income", () => {
  const income: any = ref([]);
  const date = new Date();
  const amount = ref(0);
  const category = ref("");

  const pushIncome = async () => {
    income.value.push({
      date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
      amount: amount.value,
      category: category.value,
    });
  };

  const addIncome = async () => {
    // Get the store instance
    const store = await new Store(".budget.dat");

    // Retrieve existing income data
    const existingIncome: any = (await store.get("income")) || [];

    // Update income data
    income.value = [...existingIncome, ...income.value];

    // Call pushIncome function
    await pushIncome();

    // Save updated income data
    await store.set("income", income.value);
    await store.save();

    // Reset the input fields
    amount.value = 0;
    category.value = "";
  };

  return { income, date, amount, category, pushIncome, addIncome };
});
