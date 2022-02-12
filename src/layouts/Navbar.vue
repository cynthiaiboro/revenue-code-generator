<template>
  <div
    class="rounded bg-white hidden md:flex justify-between items-center pl-6 pr-8"
  >
    <div class="flex items-center">
      <img src="@/assets/images/logo.svg" alt="logo" />
      <span class="text-primary font-bold pl-4">Revenue Management System</span>
    </div>
    <div class="flex items-center h-20">
      <nav class="tabs h-full">
        <button
          class="tabs__item h-full"
          :class="currentTab == 'home' ? 'tabs__item_active' : ''"
          @click="handleClick('home')"
        >
          Generate Revenue Code
        </button>
        <button
          class="tabs__item h-full"
          :class="currentTab == 'generate' ? 'tabs__item_active' : ''"
          @click="handleClick('generate')"
        >
          View Assesment codes
        </button>

        <div class="tabs__active-line"></div>
      </nav>
    </div>
    <div class="md:flex items-center">
      <div class="bg-lightGreen p-3 rounded-lg">
        <img
          src="@/assets/icons/settings.svg"
          alt="profile_pic"
          class="h-5 w-5"
        />
      </div>
      <div class="bg-lightGrey p-3 rounded-lg ml-4">
        <img
          src="@/assets/images/avatar.svg"
          alt="profile_pic"
          class="h-5 w-5"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data: () => ({
    currentTab: "home",
  }),
  methods: {
    handleClick(newTab) {
      this.currentTab = this.newTab;
      if (newTab === "home") {
        if (this.$route.path !== "/") this.$router.push("/");
      } else {
         if (this.$route.path !== "/generate") this.$router.push("/generate");
      }
    },
  },
};
</script>
