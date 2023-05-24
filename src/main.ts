import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./style.css";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import router from "./router";
const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(createPinia().use(piniaPersist));
app.mount("#app");