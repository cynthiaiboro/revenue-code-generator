<template>
  <transition name="fade">
    <div class="fixed modal-container" v-show="display" @click="clickTarget">
      <transition :name="currentAnimation">
        <div class="modal-body bg-white p-6 mt-6" v-if="display">
          <div class="flex justify-end">
            <img
              class="h-3 w-3 cursor-pointer"
              src="https://res.cloudinary.com/zillaafrica/image/upload/v1623525601/customer/Union_yx6ulk.svg"
              alt="cancel"
              @click="closeDisplay"
            />
          </div>
          <div class="completed mt-8">
            <img
              class="h-32 w-32 mx-auto"
              src="https://res.cloudinary.com/zillaafrica/image/upload/q_auto/v1624100575/customer/Group_707_1_tpsp0o.svg"
              alt="success"
              v-if="type === 'success'"
            />
            <img
              class="h-28 w-28 mx-auto"
              src="https://res.cloudinary.com/zillaafrica/image/upload/q_auto/v1629045373/Group_12919_be2tin.svg"
              alt="success"
              v-if="type === 'error'"
            />
            <h3
              class="
                text-lg
                md:text-xl
                font-semibold
                mt-8
                text-black text-center
              "
            >
              {{ title }}
            </h3>
            <h3
              class="
                text-md
                md:text-lg
                mb-6
                mt-4
                text-black text-center
                font-semibold
              "
            >
              {{ description }}
            </h3>
            <Button
              class="mt-12 mb-3"
              :text="buttonText ? buttonText : 'Okay'"
              @click="closeDisplay"
              width="w-full"
              shadow
            />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  import Button from "@/UI/Button";

  export default {
    components: {
      Button,
    },
    data: () => ({
      matchWidth: "slideUp",
    }),
    computed: {
      currentAnimation() {
        if (window.matchMedia("(max-width: 1024px)").matches) {
          return "slideUp";
        } else {
          return "fade";
        }
      },
      ...mapState("notification", {
        type: (state) => state.modal.type,
        description: (state) => state.modal.description,
        display: (state) => state.modal.display,
        title: (state) => state.modal.title,
        buttonText: (state) => state?.modal.buttontext,
        callback: (state) => state.modal.callback,
      }),
    },
    methods: {
      ...mapActions("notification", ["showAlert"]),
      closeDisplay() {
        if (this.callback) {
          this.callback();
        }
        this.showAlert({
          description: "",
          display: false,
          type: "",
          title: "",
          callback: null,
        });

        // this.$emit("close");
      },
      clickTarget(e) {
        if (e.target.className.includes("modal-container")) {
          this.closeDisplay();
        }
      },
    },
  };
</script>
<style scoped>
  @import "~@/assets/styles/animation.css";
  .modal-container {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    /* background-color: rgba(235, 227, 255, 0.8); */
    background-color: rgba(95, 94, 95, 0.8);
    z-index: 22;
  }
  .modal-body {
    position: fixed;
    bottom: 10px;
    /* border-top-left-radius: 20px;
    border-top-right-radius: 20px; */
    border-radius: 20px;
    max-height: 80vh;
    overflow-y: auto;
    width: 95%;
    left: 2.5%;
    right: 2.5%;
  }

  @media (min-width: 1024px) {
    .modal-container {
      display: grid;
      place-items: center;
    }

    .modal-body {
      position: initial;
      width: 30%;
      max-width: 28rem;
      border-radius: 20px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s cubic-bezier(0.45, 0.25, 0.6, 0.95);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translate(0%, -10px);
    opacity: 0;
  }
  .slideUp-enter-active,
  .slideUp-leave-active {
    transition: all 0.4s ease-out;
    transform: translateX(0);
  }
  .slideUp-enter,
  .slideUp-leave-to {
    opacity: 0;

    transform: translateY(90%);
  }
</style>
