<template>
  <form class="flex items-center">
    <label for="language-selector"
      ><img src="../../assets/language.svg" alt="globe icon"
    /></label>

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
