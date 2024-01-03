<template>
  <button
    onclick="my_modal_1.showModal()"
    class="btn btn-sm btn-block btn-ghost justify-center bg-primary text-primary-content my-2"
  >
    {{ $t("expense") }}
  </button>

  <dialog id="my_modal_1" class="modal">
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
import AddExpense from "../forms/AddExpense.vue";
</script>
