<template>
  <div class="container p-4 md:p-10 h-full rounded">
    <div class="bg-white p-4 md:px-20 md:py-10 h-full rounded">
      <revenue-code-generator />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Input from "@/UI/Input";
import Button from "@/UI/Button";
import Select from "@/UI/Select";
import RevenueCodeGenerator from './RevenueCodeGenerator.vue';
export default {
  components: {
    Input,
    Button,
    Select,
    RevenueCodeGenerator
  },
  data: () => ({
    lineItem: [
    RevenueCodeGenerator],
    accountType: [],
    subAccountType: [],
    accountClass: [],
    subAccountClass: [],
    code: {},
    generatedCode: "",
    loading: false,
  }),
  mounted() {
    this.getLineItem();
    this.getAccountType();
    this.getSubAccountType();
    this.getAccountClass();
    this.getSubAccountClass();
  },
  methods: {
    getLineItem() {
      this.$axios
        .get("/line-item")
        .then((res) => {
          this.lineItem = res.data;
        })
        .catch(() => {});
    },
    getAccountType() {
      this.$axios
        .get("/account-type")
        .then((res) => {
          this.accountType = res.data;
        })
        .catch(() => {});
    },
    getSubAccountType() {
      this.$axios
        .get("/sub-account-type")
        .then((res) => {
          this.subAccountType = res.data;
        })
        .catch(() => {});
    },
    getAccountClass() {
      this.$axios
        .get("/account-class")
        .then((res) => {
          this.accountClass = res.data;
        })
        .catch(() => {});
    },
    getSubAccountClass() {
      this.$axios
        .get("/sub-account-class")
        .then((res) => {
          this.subAccountClass = res.data;
        })
        .catch(() => {});
    },
    generateCode() {
      this.loading = true;
      this.$axios
        .post("/revenue-code", this.code)
        .then((res) => {
          this.loading = false;
          this.generatedCode === res.data.code;
          console.log(res.data);
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.container {
  background-position: center center;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-image: url("~@/assets/images/wavy-bg.svg");
  height: 100%;
  width: 100%;
  margin: auto;
}
.generate-button {
  position: absolute;
  right: 0;
  bottom: 0.2rem;
}
</style>
