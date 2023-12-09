import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./styles.css";

const pinia = createPinia();
import App from "./App.vue";

createApp(App).use(router).use(pinia).mount("#app");
