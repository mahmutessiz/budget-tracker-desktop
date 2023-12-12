import { Store } from "tauri-plugin-store-api";
import { Ref } from "vue";
/**
 * Push a new expense entry into the expense array
 */
async function pushexpense(
  expense: Ref<any>,
  amount: Ref<number>,
  category: Ref<string>
) {
  // Get the current date
  const date = new Date();

  expense.value.unshift({
    date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
    amount: amount.value,
    category: category.value,
  });
}

// Initialize the store
const store = new Store(".budget.dat");

/**
 * Add a new expense entry to the store and reset the input fields
 */
const UseAddExpense = async (
  expense: Ref<any>,
  amount: Ref<number>,
  category: Ref<string>
) => {
  // Retrieve the current expense array from the store or initialize it if not present
  if (await store.get("expense")) {
    expense.value = await store.get("expense");
  } else {
    expense.value = [];
  }

  // Add the new expense entry to the array
  await pushexpense(expense, amount, category);

  // Save the updated expense array to the store
  await store.set("expense", expense.value);
  await store.save();

  // Reset input fields
  amount.value = 0;
  category.value = "";
};

export { UseAddExpense };
