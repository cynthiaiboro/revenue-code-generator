<template>
  <div>
    <div class="text-center mt-6 md:mt-0">
      <p class="text-lg">Assessment Details</p>
      <p class="mt-4">
        Generate the revenue code of any item for assessment of a tax payer
      </p>
    </div>
    <div class="flex justify-center">
      <div
        class="md:flex justify-between w-2/3 border-dashed border-2 border-blue mt-8 rounded-lg p-4 bg-lightBlue-2"
      >
        <div>
          <p class="mb-1 text-grey">Line Item (Revenue Source)</p>
          <p class="bg-lightBlue-1 py-2 px-4 rounded-full text-blue">
            MOTOR VEHICLE ADVANCES (REPAYMENTS)
          </p>
        </div>
        <div class="md:text-right mt-4 md:mt-0">
          <p class="mb-1 text-grey">Revenue Code</p>
          <p class="bg-lightBlue-1 py-2 px-4 rounded-full text-blue">
            008267457787
          </p>
        </div>
      </div>
    </div>
    <div class="md:grid grid-cols-2 gap-4 mt-8">
      <Select
        class="mt-10"
        :options="subAccountClass"
        selectLabel="Assesment Type"
        label="name"
        :reduce="(item) => item.code"
        placeholder="Select assessment type"
        v-model="code.subAccountClassId"
        errorText="Sub account class is required"
        :validation="rules.subAccountClass"
        @valid="valid.subAccountClass = $event"
      />
      <Select
        class="mt-10"
        :options="subAccountClass"
        selectLabel="Frequency"
        label="name"
        :reduce="(item) => item.code"
        placeholder="Select frequency"
        v-model="code.subAccountClassId"
        errorText="Sub account class is required"
        :validation="rules.subAccountClass"
        @valid="valid.subAccountClass = $event"
      />
      <Select
        class="mt-10"
        :options="subAccountClass"
        selectLabel="MDA"
        label="name"
        :reduce="(item) => item.code"
        placeholder="Select MDA"
        v-model="code.subAccountClassId"
        errorText="Sub account class is required"
        :validation="rules.subAccountClass"
        @valid="valid.subAccountClass = $event"
      />
      <Select
        class="mt-10"
        :options="subAccountClass"
        selectLabel="MDA"
        label="name"
        :reduce="(item) => item.code"
        placeholder="Select MDA"
        v-model="code.subAccountClassId"
        errorText="Sub account class is required"
        :validation="rules.subAccountClass"
        @valid="valid.subAccountClass = $event"
      />
    </div>
    <div class="flex justify-center mb-12">
      <Button text="Submit" p="md:px-20 py-6" class="mt-16" width="w-1/2" />
    </div>
    <div class="md:grid grid-cols-4 gap-4 mt-8 border-solid border-2 border-blue mt-8 rounded-lg p-4">
      <div class="text-center mt-2">
        <h4>| Organization Code |</h4>
        <p v-for="i in 3" :key="i" class="text-sm">022000800100</p>
      </div>
      <div class="text-center mt-2">
        <h4>| Revenue source |</h4>
        <p v-for="i in 3" :key="i" class="text-sm">Transportation surrel</p>
      </div>
      <div class="text-center mt-2">
        <h4>| Revenue Code |</h4>
        <p v-for="i in 3" :key="i" class="text-sm">032605200100</p>
      </div>
      <div class="text-center mt-2">
        <h4>| Organization Name |</h4>
        <p v-for="i in 2" :key="i" class="text-sm">
          Imo State Geographic Information (IGIS)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
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
    lineItem: [],
    accountType: [],
    subAccountType: [],
    accountClass: [],
    subAccountClass: [],
    code: {
      lineItemId: "",
      accountTypeId: "",
      subAccountTypeId: "",
      accountClassId: "",
      subAccountClassId: "",
    },
    generatedCode: "",
    loading: false,
    valid: {
      lineItem: false,
      accountType: false,
      subAccountType: false,
      accountClass: false,
      subAccountClass: false,
    },
  }),
  computed: {
    rules() {
      return {
        lineItem: this.code.lineItemId.length > 0,
        accountType: this.code.accountTypeId.length > 0,
        subAccountType: this.code.subAccountTypeId.length > 0,
        accountClass: this.code.accountClassId.length > 0,
        subAccountClass: this.code.subAccountClassId.length > 0,
      };
    },
    disableButton() {
      return Object.values(this.rules).includes(false);
    },
  },
  mounted() {
    this.getLineItem();
  },
  methods: {
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
          this.$emit("continue", true);
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
