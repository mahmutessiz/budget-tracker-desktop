import { Store } from "tauri-plugin-store-api";
import { Ref } from "vue";

interface ExpenseEntry {
  date: string;
  amount: number | null;
  category: string;
}

/**
 * Push a new expense entry into the expense array.
 * @param expense - Reference to the expense array.
 * @param amount - Reference to the amount input field.
 * @param category - Reference to the category input field.
 */
async function pushExpense(
  expense: Ref<ExpenseEntry[]>,
  amount: Ref<number | null>,
  category: Ref<string>
): Promise<void> {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  expense.value.unshift({
    date: formattedDate,
    amount: amount.value,
    category: category.value,
  });
}

// Initialize the store
const store = new Store(".budget.dat");

/**
 * Add a new expense entry to the store and reset the input fields.
 * @param expense - Reference to the expense array.
 * @param amount - Reference to the amount input field.
 * @param category - Reference to the category input field.
 */
const useAddExpense = async (
  expense: Ref<ExpenseEntry[]>,
  amount: Ref<number | null>,
  category: Ref<string>
): Promise<void> => {
  // Retrieve the current expense array from the store or initialize it if not present
  expense.value = (await store.get("expense")) || [];

  // Add the new expense entry to the array
  await pushExpense(expense, amount, category);

  // Save the updated expense array to the store
  await store.set("expense", expense.value);
  await store.save();

  // Reset input fields
  amount.value = null;
  category.value = "";
};

export { useAddExpense };
