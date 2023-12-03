<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Store } from "tauri-plugin-store-api";

import MainHeader from "../components/MainHeader.vue";

const value = ref();
onMounted(async () => {
  const store = new Store(".settings.dat");

  await store.set("some-key", { value: 5 });

  const val = await store.get("some-key");
  value.value = val;

  await store.save();
});
// this manually saves the store, otherwise the store is only saved when your app is closed
</script>

<template>
  <MainHeader />
</template>
