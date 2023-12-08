<template>
  <button
    onclick="my_modal_2.showModal()"
    class="btn btn-sm btn-block btn-ghost justify-center bg-accent text-accent-content my-2"
  >
    Income
  </button>
  <!-- Open the modal using ID.showModal() method -->

  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click outside to close</p>
      <AddIncome />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import AddIncome from "../forms/AddIncome.vue";
</script>
