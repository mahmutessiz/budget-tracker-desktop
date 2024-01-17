<template>
  <div class="">
    <div class="dropdown">
      <div
        class="tooltip tooltip-right flex items-center justify-center gap-1"
        :data-tip="t('theme')"
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
              d="M7.5 2c-1.79 1.15-3 3.18-3 5.5s1.21 4.35 3.03 5.5C4.46 13 2 10.54 2 7.5A5.5 5.5 0 0 1 7.5 2m11.57 1.5l1.43 1.43L4.93 20.5L3.5 19.07zm-6.18 2.43L11.41 5L9.97 6l.42-1.7L9 3.24l1.75-.12l.58-1.65L12 3.1l1.73.03l-1.35 1.13zm-3.3 3.61l-1.16-.73l-1.12.78l.34-1.32l-1.09-.83l1.36-.09l.45-1.29l.51 1.27l1.36.03l-1.05.87zM19 13.5a5.5 5.5 0 0 1-5.5 5.5c-1.22 0-2.35-.4-3.26-1.07l7.69-7.69c.67.91 1.07 2.04 1.07 3.26m-4.4 6.58l2.77-1.15l-.24 3.35zm4.33-2.7l1.15-2.77l2.2 2.54zm1.15-4.96l-1.14-2.78l3.34.24zM9.63 18.93l2.77 1.15l-2.53 2.19z"
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
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Default"
            value="default"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Retro"
            value="retro"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Cyberpunk"
            value="cyberpunk"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Valentine"
            value="valentine"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Cupcake"
            value="cupcake"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Wireframe"
            value="wireframe"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Luxury"
            value="luxury"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Dim"
            value="dim"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Sunset"
            value="sunset"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { Store } from "tauri-plugin-store-api";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const theme: Ref<any> = ref(""); // default theme

onMounted(async () => {
  const store = new Store(".budget.dat");
  // Check if the theme is stored
  const storedTheme = await store.get("theme");

  if (storedTheme !== null) {
    // If a theme is stored, update our theme ref with the stored value
    theme.value = storedTheme;
  } else {
    // If no theme is stored, set the default theme in the store
    await store.set("theme", theme.value);
  }

  const htmlElement = document.querySelector("html");
  if (htmlElement !== null) {
    htmlElement.dataset.theme = theme.value;
  }

  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach((radio) => {
    radio.addEventListener("change", async (event) => {
      const target = event.target as HTMLInputElement;
      if (target && target.checked) {
        // Update the theme value and store it
        theme.value = target.value;
        await store.set("theme", theme.value);
        const htmlElement = document.querySelector("html");
        if (htmlElement) {
          htmlElement.dataset.theme = theme.value;
        }
      }
    });
  });
});
</script>
