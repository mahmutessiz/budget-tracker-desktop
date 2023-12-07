<script setup lang="ts">
import { onMounted, ref, computed, Ref } from "vue";
import { Store } from "tauri-plugin-store-api";

import WrapperAll from "../components/WrapperAll.vue";

interface Data {
  value?: number;
  value2?: number[];
  value3?: { name: string; age: number }[];
}

const keys: string[] = ["some-key", "income"];
const values: Ref<Record<string, Data | undefined>> = ref({});
const comp = computed(() => {
  return values.value;
});

onMounted(async () => {
  const store = new Store(".settings.dat");

  await store.set("some-key", { value: 5 });
  await store.set("income", {
    value: [500, 250, 300, 25],
    value2: [50, 20, 30, 21],
    value3: [
      { name: "John", age: 30 },
      { name: "Mary", age: 25 },
    ],
  });

  for (let key of keys) {
    const val = await store.get(key);
    if (val !== null) {
      values.value[key] = val;
    }
  }

  console.log(values.value);

  await store.save();
  // this manually saves the store, otherwise the store is only saved when your app is closed
});
</script>

<template>
  <!--  {{ comp.income?.value2 }} -->

  <WrapperAll />
</template>
