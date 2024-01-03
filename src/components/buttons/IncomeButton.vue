<template>
  <button
    onclick="my_modal_2.showModal()"
    class="btn btn-sm btn-block btn-ghost justify-center bg-accent text-accent-content my-2"
  >
    {{ $t("income") }}
  </button>
  <!-- Open the modal using ID.showModal() method -->

  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <p class="py-4">{{ $t("click_outside_to_close") }}</p>
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
