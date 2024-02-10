import { registerPlugins } from "@/plugins";
import { createApp } from "vue";
import App from "./App.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import VueCountdown from "@chenfengyuan/vue-countdown";
import router from "./router.js";

const app = createApp(App);

registerPlugins(app);

app.component("VueDatePicker", VueDatePicker);
app.component(VueCountdown.name, VueCountdown);

app.use(router);

app.mount("#app");
