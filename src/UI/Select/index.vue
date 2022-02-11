<template>
  <div>
    <div
      class="relative cursor-pointer select-container"
      :class="[width, disabled && 'pointer-events-none']"
      tabindex="0"
      @blur="handleOptions"
    >
      <!-- <div class="absolute eye-wrapper z-5">
        <div class="eye-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
          >
            <path
              d="M8.00033 0C4.66699 0 1.82033 2.07333 0.666992 5C1.82033 7.92667 4.66699 10 8.00033 10C11.3337 10 14.1803 7.92667 15.3337 5C14.1803 2.07333 11.3337 0 8.00033 0ZM8.00033 8.33333C6.16033 8.33333 4.66699 6.84 4.66699 5C4.66699 3.16 6.16033 1.66667 8.00033 1.66667C9.84033 1.66667 11.3337 3.16 11.3337 5C11.3337 6.84 9.84033 8.33333 8.00033 8.33333ZM8.00033 3C6.89366 3 6.00033 3.89333 6.00033 5C6.00033 6.10667 6.89366 7 8.00033 7C9.10699 7 10.0003 6.10667 10.0003 5C10.0003 3.89333 9.10699 3 8.00033 3Z"
              fill="#1F1452"
            />
          </svg>
        </div>
      </div> -->
      <!-- <transition name="slideUp">
        <p v-if="value && type !== 'filter'" class="text-xs select-label">
          {{ placeholder }}
        </p>
      </transition> -->
      <div
        class="input input-regular"
        :class="[
          p,
          value ? 'input-active' : 'input-error',
          disabled && 'disabled',
        ]"
        @click.stop="handleShowOptions"
        ref="line"
      >
        <p class="placeholder">
          {{ text }}
        </p>
        <div class="eye-wrapper">
          <svg
            v-if="!disabled"
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="4"
            viewBox="0 0 6 4"
            fill="none"
            :class="{ rotate: showOptions }"
          >
            <path
              d="M0.807026 1.80667L2.53369 3.53333C2.79369 3.79333 3.21369 3.79333 3.47369 3.53333L5.20036 1.80667C5.62036 1.38667 5.32036 0.666668 4.72703 0.666668H1.27369C0.68036 0.666668 0.387026 1.38667 0.807026 1.80667Z"
              fill="#1E1452"
            />
          </svg>
        </div>
      </div>
      <!-- <svg
        v-if="!disabled"
        width="11"
        height="7"
        fill="none"
        class="transition-all"
        :class="{ rotate: showOptions }"
      >
        <path d="M.842 1l4.5 4.5 4.5-4.5" stroke="#000" />
      </svg> -->

      <!-- <transition name="fade"> -->
      <div
        class="options w-full bg-white p-1.5"
        v-show="showOptions"
        v-click-outside="handleOptions"
        ref="options"
      >
        <div class="options-body scrollbar p-2">
          <div id="arrow" data-popper-arrow></div>
          <div
            class="w-full"
            v-for="option in selectOptions"
            :key="option"
            @click.stop="chooseOption(option)"
          >
            <div class="flex items-center py-1 justify-between cursor-pointer">
              <p>{{ option }}</p>
              <img
                v-show="text === option"
                src="https://res.cloudinary.com/zillaafrica/image/upload/v1630797354/customer/Group_642_kmimow.svg"
                alt=""
                class="eligibile-icon w-4"
              />
            </div>

            <Hr class="my-0" />
          </div>
        </div>
      </div>
      <!-- <div class="error-text">
      <transition name="fade">
        <p class="text-brandRed text-xs mt-1" v-if="error">
          {{ errorText }}
        </p>
      </transition>
    </div> -->
      <!-- </transition> -->
    </div>
  </div>
</template>
<script>
  import { createPopper } from "@popperjs/core/lib/popper-lite.js";
  import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
  // import { detectOverflow } from "@popperjs/core"
  import flip from "@popperjs/core/lib/modifiers/flip.js";
  import Hr from "@/UI/Hr";
  export default {
    components: {
      Hr,
    },
    props: {
      width: {
        type: String,
        default: "w-auto",
        required: false,
      },
      label: {
        type: String,
        default: "",
        required: false,
      },
      p: {
        type: String,
        default: "py-2",
      },
      type: {
        type: String,
        default: "",
        required: false,
      },
      reduce: {
        type: Function,
      },
      options: {
        type: Array,
        default: () => [],
      },
      placeholder: {
        type: String,
        default: "Select",
        required: false,
      },
      value: {
        type: String,
        default: "",
        required: false,
      },
      validation: {
        type: Boolean,
        default: true,
        required: false,
      },
      errorText: {
        type: String,
        default: "error",
        required: false,
      },
      disabled: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: () => ({
      showOptions: false,
      isObject: false,
      //  text: "Select",
      error: false,
    }),
    computed: {
      selectOptions() {
        //   if it is a type of object
        if (typeof this.options[0] === "object" && this.options !== null) {
          this.isObject = true;
          // if the label prop was passed
          if (this.label) {
            return this.options.map((item) => item[this.label]);
          } else {
            return this.options.map((item) => item.label);
          }
        } else {
          return this.options;
          // this.isObject = false;
        }
      },
      text() {
        if (this.placeholder || this.value) {
          if (this.value) {
            // check if it is an object else return the value
            // loop through the array to fimd the label and return the label or prop based label
            if (typeof this.options[0] === "object" && this.options !== null) {
              const index = this.options.findIndex(
                // using the reduce function passed as prop to locate the nested value
                (option) => this.reduce(option) === this.value
              );
              return this.selectOptions[index];
            } else {
              return this.value;
            }
          } else {
            return this.placeholder || "Select";
          }
        }
      },
    },
    // watch: {
    //   text(value) {
    //     console.log(value, "select", this.value);
    //   },
    // },
    mounted() {
      // console.log(this.options, "options");
      // console.log("select", this.value);
      // this.handlePreValue();
      this.handlePositionChange();
    },
    methods: {
      // displayInput() {
      //   if (!this.validation) {
      //     // console.log("input", this.validation);
      //     this.error = true;
      //     this.$emit("valid", false);
      //   } else {
      //     this.error = false;
      //     this.$emit("valid", true);
      //   }
      // },
      chooseOption(value) {
        // console.log("component", value);
        // this.text = value;
        this.showOptions = false;
        if (typeof this.options[0] === "object" && this.options !== null) {
          if (this.reduce) {
            //   get index of the selected value
            const index = this.selectOptions.indexOf(value);
            // use the index to locate the object in the options array
            this.$emit("input", this.reduce(this.options[index]));
          }
        } else {
          this.$emit("input", value);
        }
      },
      clickTarget(e) {
        if (e.target.className.includes("select-container")) {
          this.showOptions = false;
        }
      },
      handleOptions() {
        this.showOptions = false;
        if (!this.validation) {
          // console.log("input", this.validation);
          this.error = true;
          this.$emit("valid", false);
        } else {
          this.error = false;
          this.$emit("valid", true);
        }
      },
      // handleFocus() {
      //   if (!this.validation) {
      //     // console.log("input", this.validation);
      //     this.error = true;
      //     this.$emit("valid", false);
      //   } else {
      //     this.error = false;
      //     this.$emit("valid", true);
      //   }
      // },
      handlePositionChange() {
        const line = this.$refs.line;
        const options = this.$refs.options;
        createPopper(line, options, {
          placement: "bottom",
          // modifiers: [flip],
          options: {
            offset: [0],
          },
        });
      },
      // handlePreValue() {
      //   // to set v-model for the component
      //   if (this.placeholder || this.value) {
      //     if (this.value) {
      //       // check if it is an object else return the value
      //       // loop through the array to fimd the label and return the label or prop based label
      //       if (typeof this.options[0] === "object" && this.options !== null) {
      //         const index = this.options.findIndex(
      //           // using the reduce function passed as prop to locate the nested value
      //           (option) => this.reduce(option) === this.value
      //         );
      //         this.text = this.selectOptions[index];
      //       } else {
      //         this.text = this.value;
      //       }
      //     } else {
      //       this.text = this.placeholder;
      //     }
      //   }
      // },
      handleShowOptions() {
        // createPopper.update();
        const line = this.$refs.line;
        const options = this.$refs.options;

        const instance = createPopper(line, options);
        const modal = document.querySelector(".modal-content");
        instance.setOptions({
          placement: "bottom",
          modifiers: [flip, preventOverflow],
          // padding: 8,
          offset: [0, 20],
          // strategy: "fixed",
        });
        // console.log(instance);
        this.showOptions = !this.showOptions;
        this.$nextTick(() => {
          instance.update();
        });
      },
    },
  };
</script>
<style scoped>
  @import "~@/assets/styles/animation.css";
  .input {
    /* border: 1px solid hsl(251, 100%, 90%); */
    padding: 14px 10px;
    color: #706d78 !important;
    border-radius: 8px;
    font-size: 18px;
    background-color: transparent;
    position: relative;
    z-index: 2;
    height: 3.2rem;
    -webkit-appearance: none;
    transition: all 0.3s linear;
  }
  .input-regular {
    /* border: 1px solid #fcfbff !important; */
    background-color: #fcfbff !important;
  }
  .input-active {
    border: 1px solid #d5ccff !important;
    background-color: transparent !important;
  }
  .error-border {
    border: 1px solid #ffd5cc !important;
    background: #fff7f5 !important;
    color: #fc3c11 !important;
  }
  .placeholder {
    color: #9d9d9d;
  }
  .eye-wrapper {
    display: grid;
    place-items: center;
    top: 1px;
    right: 1px;
    cursor: pointer;
    position: absolute;
    z-index: 10;
    background: #f7f5ff;
    padding: 1.2rem;
    height: calc(100% - 2px);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    /* border-radius: 0px 8px 8px 0px; */
  }
  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  #arrow {
    visibility: hidden;
  }
  .select-label {
    position: absolute;
    left: 0;
    top: -1rem;
  }
  #arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }
  /* .placeholder {
    color: #9d9d9d;
  } */

  .line {
    /* height: 2rem; */
    border-bottom: 1px solid black;
  }
  .options {
    box-shadow: 0px 6.65584px 39.9351px rgba(128, 70, 251, 0.2);
    border-radius: 10px;
    z-index: 20;
    min-width: 15rem;

    /* top: 0.3rem; */
    /* position: absolute; */
    /* margin-top: 0.3rem; */
    /* left: 0 !important; */
    /* top: 0; */
  }
  .options-body {
    max-height: 18rem;
    overflow-y: auto;
  }
  .disabled {
    border-bottom: 1px solid #f2edfd;
  }
  .display {
    display: none;
  }
  /* .options::-webkit-scrollbar {
    width: 5px !important;
  }
  .options::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d3d3d3;
    border-radius: 10px;
  }
  .options::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 10px;
  } */
  .rotate {
    transform: rotate(180deg);
  }
</style>
