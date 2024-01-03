import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
// @ts-ignore
import i18n from "./locales/i18n.js";
import "./styles.css";

const pinia = createPinia();
import App from "./App.vue";

createApp(App).use(router).use(pinia).use(i18n).mount("#app");
