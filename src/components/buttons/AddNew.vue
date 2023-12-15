<template>
  <div class="">
    <div class="dropdown">
      <div
        class="tooltip tooltip-right flex items-center justify-center gap-1"
        data-tip="Add new"
      >
        <div tabindex="0" role="button" class="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 11h-4v4h-2v-4H9V9h4V5h2v4h4m1-7H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M4 6H2v14a2 2 0 0 0 2 2h14v-2H4z"
            />
          </svg>
          <svg
            width="12px"
            height="12px"
            class="h-2 w-2 fill-current opacity-60 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path
              d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
            ></path>
          </svg>
        </div>
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
      >
        <li>
          <ExpenseButton />
        </li>
        <li>
          <IncomeButton />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExpenseButton from "./ExpenseButton.vue";
import IncomeButton from "./IncomeButton.vue";
</script>
