import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import { setupStore } from "@/stores";
// 引入全局权限校验
import "@/access/index";
// markdown 编辑器的样式
import "bytemd/dist/index.css";

const app = createApp(App);

app.use(router);
setupStore(app);
app.use(ArcoVue);
app.mount("#app");
