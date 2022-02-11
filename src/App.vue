<template>
  <div id="app">
    <component :is="layout">
      <div class="h-full">
        <AlertBox />
        <Toast />
        <transition name="slideX" mode="out-in">
          <router-view />
        </transition>
      </div>
    </component>
  </div>
</template>
<script>
const default_layout = "default";
import { AlertBox, Toast } from "@/UI/Notification";

export default {
  components: {
    AlertBox,
    Toast,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>
<style>
@import "./assets/main.css";
/* @import "./assets/css/fonts.css"; */
#app {
  font-family: "BasisGrotes", Helvetica;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

p {
  font-size: 16px;
}
@media only screen and (max-width: 600px) {
  p {
    font-size: 14px;
  }
}
</style>
