<template>
  <div>
    <div class="text-center mt-6 md:mt-0">
      <p class="text-lg">Revenue Code Generator</p>
      <p class="text-sm mt-4">
        Generate the revenue code of any item for assessment of a tax payer
      </p>
    </div>
    <div class="md:grid grid-cols-2 gap-4 mt-8">
      <Select
        class="mt-10"
        :options="lineItem"
        selectLabel="Line Item Name (Revenue Source)"
        label="name"
        :reduce="(item) => item.code"
        placeholder="Select line item"
        v-model="code.lineItemId"
      />
      <Select
        class="mt-10"
        :options="accountType"
        selectLabel="Account Type"
        label="name"
        :reduce="(item) => item.code"
        placeholder="Select account type"
        v-model="code.accountTypeId"
      />
      <Select
        class="mt-10"
        :options="subAccountType"
        selectLabel="Sub Account Type"
        label="name"
        :reduce="(item) => item.code"
        placeholder="Select sub account type"
        v-model="code.subAccountTypeId"
      />
      <Select
        class="mt-10"
        :options="accountClass"
        selectLabel="Account Class"
        label="name"
        :reduce="(item) => item.code"
        placeholder="Select account class"
        v-model="code.accountClassId"
      />
      <Select
        class="mt-10"
        :options="subAccountClass"
        selectLabel="Sub Account Class"
        label="name"
        :reduce="(item) => item.code"
        placeholder="Select sub account class"
        v-model="code.subAccountClassId"
      />
      <div>
        <div class="relative">
          <Input
            class="mt-10"
            placeholder="Generate and view here"
            label="Code Generator"
            width="w-full"
            v-model="generatedCode"
            disabled
          />
          <Button
            class="generate-button z-10"
            text="Generate Code"
            radius="rounded-lg"
            width="w-40"
            :loading="loading"
            @click="generateCode()"
          />
        </div>
        <p
          v-if="generatedCode == ''"
          style="color: #36b37e"
          class="flex items-center text-sm mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M15.3333 8L13.7067 6.14L13.9333 3.68L11.5267 3.13333L10.2667 1L8 1.97333L5.73333 1L4.47333 3.12667L2.06667 3.66667L2.29333 6.13333L0.666667 8L2.29333 9.86L2.06667 12.3267L4.47333 12.8733L5.73333 15L8 14.02L10.2667 14.9933L11.5267 12.8667L13.9333 12.32L13.7067 9.86L15.3333 8ZM6.25333 10.6733L4.66667 9.07333C4.40667 8.81333 4.40667 8.39333 4.66667 8.13333L4.71333 8.08667C4.97333 7.82667 5.4 7.82667 5.66 8.08667L6.73333 9.16667L10.1667 5.72667C10.4267 5.46667 10.8533 5.46667 11.1133 5.72667L11.16 5.77333C11.42 6.03333 11.42 6.45333 11.16 6.71333L7.21333 10.6733C6.94 10.9333 6.52 10.9333 6.25333 10.6733Z"
              fill="#36B37E"
            /></svg
          ><span class="ml-1">Revenue Code generated</span>
        </p>
      </div>
    </div>
    <div class="flex justify-center mb-12">
      <Button text="Continue" p="px-20 py-6" class="mt-16" width="w-1/2" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Input from "@/UI/Input";
import Button from "@/UI/Button";
import Select from "@/UI/Select";
import RevenueCodeGenerator from "./RevenueCodeGenerator.vue";
export default {
  components: {
    Input,
    Button,
    Select,
    RevenueCodeGenerator,
  },
  data: () => ({
    lineItem: [RevenueCodeGenerator],
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
.generate-button {
  position: absolute;
  right: 0;
  bottom: 0.2rem;
}
</style>
