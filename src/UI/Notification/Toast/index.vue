<template>
  <transition name="show">
    <div
      class="toast-container rounded-lg"
      v-if="display"
      :class="{ success: icon === 'success', error: icon === 'error' }"
    >
      <div class="toast">
        <img
          class="w-6 h-6 mr-2"
          v-show="icon === 'success'"
          src="~@/assets/icons/toastSuccess.svg"
          alt="success icon"
        />
        <img
          v-show="icon === 'warning'"
          class="w-6 h-6 mr-2"
          src="~@/assets/icons/warning.svg"
          alt=""
        />
        <img
          v-show="icon === 'error'"
          class="w-6 h-6 mr-2"
          src="~@/assets/icons/errorIcon.svg"
          alt=""
        />
        <!-- <img
          v-show="icon == 'error'"
          src="@/assets/images/error.svg"
          alt="error icon"
        /> -->
        <!-- <img
          v-show="icon == 'info'"
          src="@/assets/images/info.svg"
          alt="info icon"
        /> -->
        <p class="text-xs md:text-sm text-center">{{ description }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
  import { mapState, mapActions } from "vuex";

  export default {
    name: "Toast",
    computed: {
      ...mapState("notification", {
        icon: (state) => state.toast.icon,
        description: (state) => state.toast.description,
        display: (state) => state.toast.display,
      }),
    },

    methods: {
      ...mapActions("notification", ["showToast"]),
    },

    watch: {
      display(val) {
        if (val === true) {
          setTimeout(() => {
            this.showToast({
              description: "",
              display: false,
              type: "",
            });
          }, 3000);
        }
      },
    },
    // mounted() {
    //   console.log(this.display);
    // },
  };
</script>
<style scoped>
  .toast-container {
    position: fixed;
    right: 1rem;
    max-width: 25rem;
    /* transform: translate(-50%, -50%); */
    z-index: 110000;
    top: 6rem;
  }
  @media screen and (max-width: 600px) {
    .toast-container {
      width: 80%;
      top: 2rem;
    }
  }
  .toast-container svg {
    width: 1.5rem;
    height: 1rem;
  }

  .success {
    background: #eaf7ee;
    color: #2eb255;
  }

  .error {
    background: #ffdddd;
    color: #f4364c;
  }
  .toast-container .toast {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    /* color: #023a59;
  background-color: #e6ebee; */
    /* border-radius: 5px; */
    /* -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); */
  }

  .toast-container .toast p {
    /* font-family: Graphik; */
    /* font-size: 1.1rem; */
    margin-left: 0.3rem;
  }

  @media screen and (max-width: 600px) {
    .toast-container .toast {
      padding: 0.5rem;
    }
    .toast-container p {
      font-size: 0.9rem;
    }
  }

  .show-enter-active,
  .show-leave-active {
    transition: all 0.5s cubic-bezier(0.45, 0.25, 0.6, 0.95);
  }

  .show-enter,
  .show-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
</style>
