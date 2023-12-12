// useIncome.js
import { Ref } from "vue";
import { ref, onMounted } from "vue";
import { Store } from "tauri-plugin-store-api";

export default function useIncome() {
  // Ref to hold the income data
  const income: Ref<any> = ref([]);
  const totalIncome: Ref<number> = ref(0);

  onMounted(async () => {
    // Initialize the store on component mount
    const store = new Store(".budget.dat");

    // If the income is not already set, retrieve it from the store
    if (!income.value.length) {
      income.value = await store.get("income");
    }

    // Subscribe to store changes and update the income accordingly
    store.onChange(async () => {
      income.value = await store.get("income");
    });

    // Calculate the total income
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

  return { income, totalIncome };
}

export { useIncome };
