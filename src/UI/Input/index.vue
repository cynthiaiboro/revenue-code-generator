<template>
  <div class="relative">
    <div class="relative inline-block" :class="[width]">
      <div
        class="absolute z-5"
        :class="[
          displayPlaceholder || value || error
            ? 'eye-wrapper-focus'
            : 'eye-wrapper',
        ]"
        v-if="revealPassword"
      >
        <div class="eye-container" @click="revealText">
          <svg
            v-if="showEye"
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
          <svg
            v-else
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
      </div>
      <p class="font-bold input-label">{{ label }}</p>
      <input
        class="outline-none transition-all input-regular placeholder-borderGrey"
        :class="[
          p,
          width,
          disabled ? 'disabled' : null,
          displayPlaceholder || (value && !error)
            ? 'input-active'
            : error
            ? 'error-border'
            : null,
        ]"
        @keypress="isNumber($event)"
        @keyup="$emit('keyup', value)"
        @input="$emit('input', $event.target.value)"
        @blur="displayInput"
        @focus="handleFocus"
        @focusout="displayPlaceholder = false"
        @change="$emit('change')"
        :type="displayType"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :required="required"
        :autofocus="autofocus"
        :pattern="
          type === 'number'
            ? '[0-9]*'
            : type === 'tel'
            ? '^[+\d](?:.*\d)?$'
            : null
        "
        :inputmode="type === 'number' ? 'numeric' : 'text'"
      />
    </div>

    <div class="error-text">
      <transition name="fade">
        <p class="text-orange text-xs mt-1" v-if="error">
          {{ errorText }}
        </p>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "input",
      required: false,
    },
    name: {
      type: String,
      default: "",
      required: false,
    },
    p: {
      type: String,
      default: "p-3",
      required: false,
    },
    value: {
      type: String,
      default: "",
      required: true,
    },
    id: {
      type: String,
      default: "",
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    errorText: {
      type: String,
      default: "error",
      required: false,
    },
    label: {
      type: String,
      default: "Label",
      required: false,
    },
    validation: {
      type: Boolean,
      default: true,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    revealPassword: {
      type: Boolean,
      default: false,
      required: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
      required: false,
    },
    width: {
      type: String,
      default: "w-auto",
      required: false,
    },
    number: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      show: false,
      error: false,
      showEye: true,
      showEyeWrapper: false,
      eyeDropper: false,
      displayPlaceholder: false,
    };
  },
  watch: {},
  computed: {
    displayType() {
      return this.eyeDropper || this.type;
    },
  },
  methods: {
    displayInput() {
      if (!this.validation) {
        this.error = true;
        this.$emit("valid", false);
      } else {
        this.error = false;
        this.$emit("valid", true);
      }
      this.$emit("blur");
    },
    revealText() {
      if (!this.eyeDropper) {
        this.eyeDropper = "text";
      } else {
        this.eyeDropper = false;
      }
      this.showEye = !this.showEye;
    },
    handleFocus() {
      this.displayPlaceholder = true;
      this.error = false;
      this.$emit("focus");
    },
    isNumber(evt) {
      if (this.type === "number") {
        evt = evt ? evt : window.event;
        let charCode = evt.which ? evt.which : evt.keyCode;
        if (
          (charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            charCode !== 46) ||
          this.amount > 1000000
        ) {
          evt.preventDefault();
        } else {
          return true;
        }
      } else if (this.type === "tel") {
        evt = evt ? evt : window.event;
        let charCode = evt.which ? evt.which : evt.keyCode;
        if (
          (charCode != 43 &&
            charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            charCode !== 46) ||
          this.amount > 1000000
        ) {
          evt.preventDefault();
        } else {
          return true;
        }
      }
    },
  },
};
</script>
<style scoped>
@import "../../assets/styles/animation.css";
input {
  border: 1px solid #d5ccff;
  /* padding: 15px 10px; */
  color: #706d78 !important;
  border-radius: 8px;
  font-size: 18px;
  background-color: transparent;
  position: relative;
  z-index: 2;
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
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  color: #706d78 !important;
}
input::placeholder {
  color: #B6BAB5;
  font-size: 14px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.input-label {
  color: #152211;
}
.placeholder {
  display: flex;
  height: 100%;
  align-items: center;
  z-index: 1;
}
.eye-wrapper-focus {
  display: grid;
  place-items: center;
  right: 0.1rem;
  top: 0.1rem;
  cursor: pointer;
  z-index: 8;
  background: #f7f5ff;
  padding: 1rem;
  height: calc(100% - 0.2rem);
  border-radius: 0px 8px 8px 0px;
}
.eye-wrapper {
  display: grid;
  place-items: center;
  right: 0;
  top: 0;
  cursor: pointer;
  z-index: 8;
  background: #f7f5ff;
  padding: 1rem;
  height: 100%;
  border-radius: 0px 8px 8px 0px;
}

.eye-container {
  position: relative;
}
.line-stroke {
  position: absolute;
  height: 2rem;
  width: 0.15rem;
  background-color: #b5b5b5;
  top: -0.35rem;
  transform: rotate(-45deg);
  left: 50%;
}
.error-border {
  border: 1px solid #ffd5cc;
  background: #fff7f5;
  color: #fc3c11 !important;
}
.error-text {
  top: 2.5rem;
}
.disabled {
  border: 1px solid #f2edfd;
}
@media only screen and (max-width: 768px) {
  .error-text {
    top: 2.5rem;
  }

  input {
    font-size: 16px;
  }
}
.error-image {
  right: 0;
  top: 22%;
  z-index: 2;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.45, 0.25, 0.6, 0.95);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
