<template>
  <div class="overflow-x-auto max-h-96">
    <table class="table table-xs table-zebra" v-if="!expense">
      <caption class="text-primary-content font-bold text-lg">
        Expense
      </caption>
      <thead>
        <tr>
          <th></th>
          <th>location</th>
          <th>Last Login</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>

          <td>Canada</td>
          <td>12/16/2020</td>
          <td>Blue</td>
        </tr>
        <tr>
          <th>2</th>

          <td>United States</td>
          <td>12/5/2020</td>
          <td>Purple</td>
        </tr>
        <tr>
          <th>3</th>

          <td>China</td>
          <td>8/15/2020</td>
          <td>Red</td>
        </tr>
        <tr>
          <th>4</th>

          <td>Russia</td>
          <td>3/25/2021</td>
          <td>Crimson</td>
        </tr>
        <tr>
          <th>5</th>

          <td>Brazil</td>
          <td>5/22/2020</td>
          <td>Indigo</td>
        </tr>
        <tr>
          <th>6</th>

          <td>Venezuela</td>
          <td>12/8/2020</td>
          <td>Purple</td>
        </tr>
        <tr>
          <th>7</th>

          <td>Philippines</td>
          <td>2/17/2021</td>
          <td>Yellow</td>
        </tr>
        <tr>
          <th>8</th>

          <td>Indonesia</td>
          <td>5/23/2020</td>
          <td>Crimson</td>
        </tr>
        <tr>
          <th>9</th>

          <td>Philippines</td>
          <td>2/21/2021</td>
          <td>Maroon</td>
        </tr>
        <tr>
          <th>10</th>

          <td>Chad</td>
          <td>6/23/2020</td>
          <td>Green</td>
        </tr>
        <tr>
          <th>11</th>

          <td>Poland</td>
          <td>7/9/2020</td>
          <td>Indigo</td>
        </tr>
        <tr>
          <th>12</th>

          <td>Indonesia</td>
          <td>2/12/2021</td>
          <td>Maroon</td>
        </tr>
        <tr>
          <th>13</th>

          <td>Poland</td>
          <td>5/31/2020</td>
          <td>Purple</td>
        </tr>
        <tr>
          <th>14</th>
          <td>Portugal</td>
          <td>4/27/2021</td>
          <td>Aquamarine</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-xs table-zebra" v-if="expense">
      <caption
        class="w-full bg-primary text-primary-content font-bold text-lg rounded-sm"
      >
        {{
          $t("spendings")
        }}
      </caption>
      <thead>
        <tr>
          <th></th>
          <th>{{ $t("date") }}</th>
          <th>{{ $t("category") }}</th>
          <th>{{ $t("amount") }}</th>
          <th>
            <button type="button" onclick="my_modal_table_expense.showModal()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                >
                  <g stroke-dasharray="12" stroke-dashoffset="12">
                    <path d="M12 7V17">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.8s"
                        dur="0.2s"
                        values="12;0"
                      />
                    </path>
                    <path d="M7 12H17">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.6s"
                        dur="0.2s"
                        values="12;0"
                      />
                    </path>
                  </g>
                  <path
                    fill="currentColor"
                    fill-opacity="0"
                    stroke-dasharray="64"
                    stroke-dashoffset="64"
                    d="M4 12V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.5s"
                      values="64;0"
                    />
                    <animate
                      fill="freeze"
                      attributeName="fill-opacity"
                      begin="1s"
                      dur="0.15s"
                      values="0;0.3"
                    />
                  </path>
                </g>
              </svg>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in expense" :key="item">
          <th>{{ i + 1 }}</th>
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.amount }}</td>
          <td>
            <button @click="deleteRow(i)" title="Delete Row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialog id="my_modal_table_expense" class="modal">
    <div class="modal-box">
      <p class="py-4">{{ $t("click_outside_to_close") }}</p>
      <AddExpense />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { Store } from "tauri-plugin-store-api";

// Component imports
import AddExpense from "../forms/AddExpense.vue";

// Ref to hold the expense data
const expense = ref();

// Props passed from parent that contains the expense data
const expenseData = defineProps({
  expenseData: Object,
});

// Watch for changes in the expense data
watchEffect(() => {
  expense.value = expenseData.expenseData;
});

// initialize the store
const store = new Store(".budget.dat");

onMounted(async () => {
  // Fetch expense data from parent component
  expense.value = expenseData.expenseData;
});

// Function to delete a row
const deleteRow = async (index: number) => {
  expense.value.splice(index, 1);
  await store.set("expense", expense.value);
};
</script>
