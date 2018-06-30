import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import routes from "./routes";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes // short for `routes: routes`
});

const app = new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
