<template>
  <div
    class="card  transition-all "
    ss="[p, background.includes('bg-') ? background : `bg-${background}`]"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    p: {
      type: String,
      default: "p-4",
    },
    background: {
      type: String,
      default: "bg-white",
    },
  },
};
</script>
<style scoped>
.card {
  border-radius: 20px;
}
</style>
