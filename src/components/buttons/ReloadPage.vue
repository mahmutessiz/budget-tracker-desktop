<template>
  <div
    class="tooltip tooltip-right flex items-center justify-center gap-1"
    :data-tip="t('reload')"
  >
    <button class="btn btn-ghost justify-center" @click="reloadPage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="hover:rotate-90 transition-all duration-300"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M2 12A10 10 0 1 0 12 2A10 10 0 0 0 2 12m13.6 1.72A4 4 0 0 0 16 12a4 4 0 0 0-4-4v2L8.88 7L12 4v2a6 6 0 0 1 6 6a5.9 5.9 0 0 1-.93 3.19M6 12a5.9 5.9 0 0 1 .93-3.19l1.47 1.47A4 4 0 0 0 8 12a4 4 0 0 0 4 4v-2l3 3l-3 3v-2a6 6 0 0 1-6-6"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const reloadPage = () => {
  window.location.reload();
};
</script>
