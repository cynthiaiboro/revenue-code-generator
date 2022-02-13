<template>
  <div class="p-4 md:p-0 md:m-10">
    <div class="main-container p-4 md:p-10 h-full rounded">
      <div class="bg-white p-4 md:px-20 md:py-10 h-full rounded">
        <revenue-code-generator
          v-if="!showAssessmentDetails"
          @continue="disabled = false"
        />
        <assessment-details v-else />
        <div v-if="proceed" class="flex justify-center pb-12">
          <Button
            v-if="!showAssessmentDetails"
            text="Continue"
            p="py-6"
            class="mt-16"
            width="w-1/2"
            @click="showAssessmentDetails = true"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/UI/Input";
import Button from "@/UI/Button";
import Select from "@/UI/Select";
import RevenueCodeGenerator from "./RevenueCodeGenerator.vue";
import AssessmentDetails from "./AssessmentDetails.vue";

export default {
  components: {
    Input,
    Button,
    Select,
    RevenueCodeGenerator,
    AssessmentDetails,
  },
  data: () => ({
    proceed: true,
    showAssessmentDetails: false,
    disabled: true,
  }),
  methods: {
    getLineItem() {
      this.$axios
        .get("/line-item")
        .then((res) => {
          this.lineItem = res.data;
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.main-container {
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
