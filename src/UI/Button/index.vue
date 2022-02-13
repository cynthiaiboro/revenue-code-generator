<template>
  <button
    class="rounded transition-all focus:outline-none grid place-items-center"
    :class="[
      background.includes('bg-') ? background : `bg-${background}`,
      width,
      opacity ? opacity : null,
      p ? p : 'py-3 px-4  md:p-3 ',
      color.includes('text-') ? color : `text-${color}`,
      border ? border : null,
      borderColor ? borderColor : null,
      fontSize ? fontSize : 'text-base',
      shadow && !disabled ? 'box-shadow' : null,
      radius.includes('rounded-') ? radius : `rounded-${radius}`,
      loading && 'pointer-events-none cursor-not-allowed opacity-70',
    ]"
    @click.stop="handleClick"
    :disabled="disabled"
    :style="{ background: background }"
    :type="type"
  >
    <transition name="slideUp" mode="out-in">
      <div class="loader" v-if="loading">Loading...</div>

      <p
        v-else
        :class="[
          fontSize ? fontSize : 'text-base',
          fontWeight ? fontWeight : 'font-semibold',
        ]"
      >
        {{ text }}
      </p>
    </transition>
  </button>
</template>
<script>
export default {
  props: {
    background: {
      type: String,
      default: "bg-primary",
    },
    width: {
      type: String,
      default: "w-auto",
      required: false,
    },
    text: {
      type: String,
      default: "Submit",
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    opacity: String,
    p: String,
    type: String,
    color: {
      type: String,
      default: "text-white",
    },
    disabled: Boolean,
    border: String,
    borderColor: String,
    font: String,
    shadow: Boolean,
    radius: {
      type: String,
      default: "rounded",
    },
    fontSize: String,
    fontWeight: String,
  },

  data() {
    return {
      // loading: false,
    };
  },
  computed: {
    disableButton() {
      if (this.disabled || this.loading) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>
<style scoped>
@import "../../assets/styles/animation.css";

.box-shadow {
  box-shadow: -6px 12px 20px rgba(194, 22, 63, 0.26);
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  overflow: hidden;
}
.loader {
  overflow: hidden;
  margin: auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 3px solid rgba(255, 255, 255, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
  border-left: 3px solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
