<template>
  <form class="flex items-center">
    <label for="language-selector"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 256 256"
        alt="Global language switcher icon"
      >
        <path
          fill="currentColor"
          d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20m83.13 96h-31.57a155.5 155.5 0 0 0-19.51-65.63A84.23 84.23 0 0 1 211.13 116m-110.62 24h55c-2.25 26.69-12 51.46-27.49 69.85c-15.56-18.39-25.26-43.16-27.51-69.85m0-24c2.25-26.69 11.95-51.46 27.49-69.85c15.54 18.39 25.24 43.16 27.49 69.85ZM96 50.37A155.5 155.5 0 0 0 76.44 116H44.87A84.23 84.23 0 0 1 96 50.37M44.87 140h31.57A155.5 155.5 0 0 0 96 205.63A84.23 84.23 0 0 1 44.87 140m115.18 65.63A155.5 155.5 0 0 0 179.56 140h31.57a84.23 84.23 0 0 1-51.08 65.63"
        />
      </svg>
    </label>

    <select
      name="language-selector"
      title="language-selector"
      @change="updateLanguage()"
      v-model="$i18n.locale"
      class="bg-base-300 text-sm"
    >
      <option
        v-for="(locale, i) in locales"
        :key="`locale-${i}`"
        :value="locale"
      >
        {{ locale.toUpperCase() }}
      </option>
    </select>
  </form>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Store } from "tauri-plugin-store-api";

const store = new Store(".budget.dat");

const { locale }: any = useI18n();

const locales = ["tr", "en"];

const updateLanguage = async () => {
  await store.set("locale", locale.value);
};

onMounted(async () => {
  if (await store.get("locale")) {
    locale.value = await store.get("locale");
  } else {
    await store.set("locale", locale.value);
  }
});
</script>
