<template>
  <div class="container-body p-3 md:p-6">
    <MobileNav class="md:hidden" />
    <div class="main">
      <Navbar class="sticky top-0 z-50"/>
      <div class=" bg-white rounded mt-6 body-content h-full">
        <div class="container h-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "./Navbar.vue";
import MobileNav from "./MobileNav.vue";
export default {
  components: {
    Navbar,
    MobileNav,
  },
};
</script>
<style scoped>
.container-body {
  max-height: 100vh;
  overflow: hidden;
  width: 100%;
  background-color: #F7F8F7;
}

.main {
  min-height: 100vh;
}
.body-content {
  min-height: calc(100vh - 10rem);
  overflow-y: auto;
}
.body-content::-webkit-scrollbar {
  width: 5px !important;
}
.body-content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #d3d3d3;
  border-radius: 10px;
}
.body-content::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .main {
    display: grid;
    grid-template-rows: 4.5rem 1fr 2rem;
  }
  .bottom-nav {
    background-color: white;
  }
  .body-content::-webkit-scrollbar {
    width: 0 !important;
  }
  .body-content::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d3d3d3;
    border-radius: 10px;
  }
  .body-content::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 10px;
  }
}
</style>
