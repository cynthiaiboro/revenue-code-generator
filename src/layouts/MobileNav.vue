<template>
  <div>
    <div v-if="showNav" class="overlay z-20"></div>
    <div class="flex justify-between items-center px-6 py-4 bg-white header">
      <div class="">
        <div class="flex items-center">
          <img src="@/assets/images/logo.svg" alt="logo" />
          <span class="text-primary font-bold pl-4"
            >Revenue Management System</span
          >
        </div>
      </div>
      <div class="bg-lightGreen p-3 rounded-lg mr-2">
        <img
          src="@/assets/icons/settings.svg"
          alt="profile_pic"
          class="h-5 w-5"
        />
      </div>
      <svg
        @click.stop="showNav = !showNav"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        fill="none"
      >
        <path
          d="M0 1.83h24M0 9.83h24M0 17.83h24"
          stroke="#7E7694"
          stroke-width="3"
        />
      </svg>
    </div>
    <transition name="slide">
      <div
        v-if="showNav"
        v-click-outside="handleOptionsOutside"
        class="z-50 sidebar-menu inset-y-0 left-0 w-2/3 bg-white overflow-y-auto sm:hidden"
      >
        <div class="relative w-full">
          <div class="mt-24 mx-auto flex justify-center">
            <div class="bg-lightGrey p-3 rounded-lg ml-4">
              <img
                src="@/assets/images/avatar.svg"
                alt="profile_pic"
                class="h-5 w-5"
              />
            </div>
          </div>

          <div class="absolute left-0 pt-3 sm:hidden">
            <div class="grid h-full">
              <div>
                <div class="sidebar-content mt-8">
                  <div @click.stop="showNav = !showNav">
                    <router-link class="flex nav-item items-center mt-6" to="/">
                      <p class="text-grey font-semibold">
                        Generate Revenue Code
                      </p>
                    </router-link>
                  </div>
                  <div @click.stop="showNav = !showNav">
                    <router-link
                      class="flex items-center pl-12 mt-6 nav-item"
                      to="/generate"
                    >
                      <p class="text-grey font-semibold">
                        View Assesment codes
                      </p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  components: {
    // Button,
  },
  data: () => ({
    showNav: false,
    openPopover: false,
  }),
  computed: {
    logo() {
      return `${process.env.VUE_APP_BASE_URL}/media/image/${this.merchant.merchant.logoId}`;
    },
  },
  watch: {
    showNav(value) {
      if (value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
  methods: {
    handleOptionsOutside() {
      this.showNav = false;
    },
    setTab() {
      this.setCurrentTab("business");
    },
  },
};
</script>
<style scoped>
svg {
  fill: #acacba;
}
.header {
  background-color: #fff;
  box-shadow: 0px 2px 4px #d9dcf2;
}
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f7f8f7;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 0.4s ease-in 0s;
}
.sidebar-menu {
  position: absolute;
  z-index: 200;
  opacity: none;
  height: 100%;
  box-shadow: 0px 6.65584px 39.9351px rgba(158, 255, 94, 0.2);
}
.nav-item {
  padding: 0.8rem 2rem 0.8rem 3rem;
}
.sidebar-content a.router-link-exact-active {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #1C6806;
}
.sidebar-content a.router-link-exact-active p {
  color: #fff;
  font-weight: bold;
}
.sidebar-content a.router-link-exact-active svg {
  fill: #000000;
}

.sidebar {
  overflow: auto;
}

.sidebar::-webkit-scrollbar {
  width: 5px !important;
}
.sidebar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #d3d3d3;
  border-radius: 10px;
}
.sidebar::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 10px;
}
</style>
