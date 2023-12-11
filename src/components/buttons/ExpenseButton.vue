<template>
  <button
    onclick="my_modal_1.showModal()"
    class="btn btn-sm btn-block btn-ghost justify-center bg-primary text-primary-content my-2"
  >
    Expense
  </button>

  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click outside to close</p>
      <AddExpense />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import AddExpense from "../forms/AddExpense.vue";
</script>
