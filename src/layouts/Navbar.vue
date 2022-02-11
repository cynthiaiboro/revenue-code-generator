<template>
  <div
    class="rounded bg-white md:flex justify-between items-center py-4 pl-6 pr-8"
  >
    <div class="flex items-center">
      <img src="@/assets/images/logo.svg" alt="logo" />
      <span class="text-primary font-bold pl-4">Revenue Management System</span>
    </div>
    <div class="flex items-center">
      <img src="@/assets/images/logo.svg" alt="error icon" />
      <span class="text-primary font-bold pl-4">Revenue Management System</span>
    </div>
    <div class="md:flex items-center">
      <div class="bg-lightGreen p-3 rounded-lg">
        <img src="@/assets/icons/settings.svg" alt="profile_pic" class="h-5 w-5"/>
      </div>
      <div class="bg-lightGrey p-3 rounded-lg ml-4">
        <img src="@/assets/images/avatar.svg" alt="profile_pic" class="h-5 w-5"/>
      </div>
    </div>
  </div>
</template>
<script>
// import Button from "@/UI/Button";
export default {
  components: {
    // Button,
  },
  data: () => ({
    openPopover: false,
  }),
};
</script>
