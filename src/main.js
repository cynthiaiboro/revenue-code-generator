import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import store from "./store";
import Bare from "@/layouts/bare.vue";
import Default from "@/layouts/default.vue";

// Layout components
Vue.component("bare-layout", Bare);
Vue.component("default-layout", Default);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
