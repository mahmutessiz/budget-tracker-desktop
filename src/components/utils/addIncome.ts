import { Store } from "tauri-plugin-store-api";
import { Ref } from "vue";

// Define the structure for income entries
interface IncomeEntry {
  date: string;
  amount: number;
  category: string;
}

/**
 * Push a new income entry into the income array at the beginning.
 *
 * @param income - A Vue ref object containing the array of income entries
 * @param amount - A Vue ref object containing the amount of the new income entry
 * @param category - A Vue ref object containing the category of the new income entry
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
async function pushIncome(
  income: Ref<IncomeEntry[]>,
  amount: Ref<number>,
  category: Ref<string>
): Promise<void> {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  income.value.unshift({
    date: formattedDate,
    amount: amount.value,
    category: category.value,
  });
}
// Initialize the store only once and reuse it
const store = new Store(".budget.dat");

/**
 * Add a new income entry to the store and reset the input fields.
 */
const useAddIncome = async (
  income: Ref<IncomeEntry[]>,
  amount: Ref<number>,
  category: Ref<string>
): Promise<void> => {
  // Retrieve the current income array from the store or initialize it if not present
  income.value = (await store.get("income")) || [];

  // Add the new income entry to the array
  await pushIncome(income, amount, category);

  // Save the updated income array to the store
  await store.set("income", income.value);
  await store.save();

  // Reset input fields
  amount.value = 0;
  category.value = "";
};

export { useAddIncome };
