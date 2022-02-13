<template>
  <div>
    <p class="font-bold input-label">{{ selectLabel }}</p>
    <div
      class="relative cursor-pointer select-container"
      :class="[width, disabled && 'pointer-events-none']"
      tabindex="0"
      @blur="handleOptions"
    >
      <div
        class="input input-regular"
        :class="[
          p,
          value ? 'input-regular' : 'input-error',
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
            width="8"
            height="6"
            viewBox="0 0 12 8"
            fill="none"
            :class="{ rotate: showOptions }"
          >
            <path
              d="M2.1207 1.29L6.0007 5.17L9.8807 1.29C10.2707 0.899998 10.9007 0.899998 11.2907 1.29C11.6807 1.68 11.6807 2.31 11.2907 2.7L6.7007 7.29C6.3107 7.68 5.6807 7.68 5.2907 7.29L0.700703 2.7C0.310703 2.31 0.310703 1.68 0.700703 1.29C1.0907 0.909998 1.7307 0.899998 2.1207 1.29Z"
              fill="#323232"
            />
          </svg>
        </div>
      </div>

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
      <div class="error-text">
        <transition name="fade">
          <p class="text-brandRed text-xs mt-1" v-if="error">
            {{ errorText }}
          </p>
        </transition>
      </div>
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
    selectLabel: {
      type: String,
      default: "Label",
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

  mounted() {
    this.handlePositionChange();
  },
  methods: {
    chooseOption(value) {
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
  border: 1px solid #fcfbff !important;
  background-color: #f7f8f7 !important;
}
.input-active {
  border: 1px solid #f7f8f7 !important;
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
  padding: 1rem;
  height: calc(100% - 2px);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
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

.line {
  border-bottom: 1px solid black;
}
.options {
  box-shadow: 0px 6.65584px 39.9351px rgba(96, 235, 91, 0.2);
  border-radius: 10px;
  z-index: 20;
  min-width: 15rem;
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
.rotate {
  transform: rotate(180deg);
}
</style>
