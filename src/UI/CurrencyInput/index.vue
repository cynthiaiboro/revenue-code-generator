<template>
  <div class="relative">
    <div class="relative inline-block" :class="[width]">
      <div class="relative">
        <input
          class="outline-none transition-all input-regular placeholder-borderGrey"
          :class="[
            p,
            width,
            disabled ? 'disabled' : null,
            displayValue ? 'add-symbol' : null,
            displayPlaceholder || (displayValue && !error)
              ? 'input-active'
              : error
              ? 'error-border'
              : null,
          ]"
          v-model="displayValue"
          @blur="displayInput"
          @focus="handleFocus"
          @focusout="displayPlaceholder = false"
          :required="required"
          :disabled="disabled"
          :id="id"
          :placeholder="placeholder"
          @keypress="isNumber($event)"
          @keyup="isInputActive = true"
          pattern=" [0-9]*"
          inputmode="numeric"
        />
        <p
          v-if="displayValue || displayPlaceholder"
          class="symbol z-10"
          :class="[error ? 'text-orange' : 'text-grey']"
        >
          {{ symbol }}
        </p>
      </div>
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
    value: {
      type: Number,
      default: 0,
      required: true,
    },
    symbol: {
      type: String,
      default: "₦",
      required: false,
    },
    id: {
      type: String,
      default: "",
      required: false,
    },
    width: {
      type: String,
      default: "w-auto",
      required: false,
    },
    p: {
      type: String,
      default: "py-2",
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
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
  },
  data() {
    return {
      isInputActive: false,
      error: false,
      displayPlaceholder: false,
    };
  },
  computed: {
    showPlaceholder() {
      if (this.displayPlaceholder || this.value) {
        return true;
      } else {
        return false;
      }
    },
    displayValue: {
      get() {
        if (this.isInputActive && this.value !== 0) {
          return this.value
            .toFixed()
            .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        }
      },
      set(modifiedValue) {
        let newValue = parseFloat(modifiedValue.replace(/[^\d.]/g, ""));
        if (isNaN(newValue)) {
          newValue = 0;
        }
        if (newValue !== 0) {
          this.$emit("input", newValue);
        } else {
          this.$emit("input", 0);
        }
      },
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
    },
    handleFocus() {
      this.displayPlaceholder = true;
      this.error = false;
      // this.isInputActive = true;
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
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
    },
  },
};
</script>

<style scoped>
@import "~@/assets/styles/animation.css";
input {
  padding: 15px 10px;
  color: #706d78 !important;
  border-radius: 8px;
  font-size: 18px;
  position: relative;
  z-index: 2;
  -webkit-appearance: none;
  transition: all 0.3s linear;
}
.input-regular {
  border: 1px solid #fcfbff !important;
  background-color: #fcfbff !important;
}
.input-active {
  border: 1px solid #d5ccff !important;
  background-color: transparent !important;
  padding-left: 2rem;
}
.add-symbol {
  padding-left: 2rem;
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
  color: #9d9d9d;
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
/* input[type="text"] {
    font-size: 16px;
  } */
.placeholder {
  display: flex;
  height: 100%;
  align-items: center;
  z-index: 1;
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

.error-text {
  top: 2.5rem;
}
.disabled {
  border-bottom: 1px solid #f2edfd;
}
.symbol {
  position: absolute;
  bottom: 1.1rem;
  left: 1rem;
  /* z-index: 10; */
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .error-text {
    top: 2.5rem;
  }

  input {
    font-size: 16px;
  }
  /* .eye-wrapper {
    top: 15%;
  } */
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
