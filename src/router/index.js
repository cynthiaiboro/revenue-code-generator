import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Generate from "../views/Generate";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: "default" },
  },
  {
    path: "/generate",
    name: "Generate",
    component: Generate,
    meta: { layout: "default" },
  },
  {
    path: "*",
    redirect: "/",
    name: "Not Found",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
