<template>
  <div>
    <div v-if="showNav" class="overlay z-20"></div>
    <div class="flex justify-between items-center px-6 py-4 bg-white header">
      <div class="h-6 w-20 md:h-8 md:w-24">
        <img
          class="max-h-full max-w-full"
          src="https://res.cloudinary.com/zillaafrica/image/upload/v1623528889/customer/Zilla_Updated_1_rjqezm.svg"
          alt=""
        />
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="liveMode" class="relative md:mt-0 md:hidden">
          <span
            @mouseover="openPopover = true"
            @mouseleave="openPopover = false"
            class="text-success cursor-pointer text-center rounded-full border border-success successBg text-sm px-4 py-2 live"
          >
            Your store is live
          </span>
          <div v-if="openPopover" class="absolute z-10 w- -ml-8 mt-4">
            <Card class="popover-bottom">
              <p class="text-center text-xs">
                You are now live and can now collect Zilla payments from your
                customers
              </p>
            </Card>
          </div>
        </div>
        <div v-else class="relative md:mt-0 md:hidden">
          <span
            @mouseover="openPopover = true"
            @mouseleave="openPopover = false"
            class="text-brandRed mr-10 cursor-pointer text-center rounded-full border border-brandRed bg-lightRed text-sm px-4 py-2 live"
          >
            Your store is on sandbox
          </span>
          <div v-if="openPopover" class="absolute z-10 w- -ml-8 mt-4">
            <Card class="popover-bottom">
              <p class="text-center text-xs">
                This is a test environment that helps simulate transactions with
                your customers
              </p>
            </Card>
          </div>
        </div>
      </transition>
      <svg
        @click.stop="showNav = !showNav"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        fill="none"
      >
        <path
          d="M0 1.83h24M0 9.83h24M0 17.83h24"
          stroke="#7E7694"
          stroke-width="3"
        />
      </svg>
    </div>
    <transition name="slide">
      <div
        v-if="showNav"
        v-click-outside="handleOptionsOutside"
        class="z-50 sidebar-menu inset-y-0 left-0 w-2/3 bg-white overflow-y-auto sm:hidden"
      >
        <!-- <button
          class="block text-gray-600 hover:text-gray-800 absolute top-2 mt-5 right-0"
        >
          <svg width="29" height="30" fill="none" class="mr-4">
            <path
              d="M18.504 24.906l-.037-.366h6.817c1.364 0 2.042-1.653 1.081-2.617-1.495-1.501-2.329-2.604-2.799-3.911-.473-1.314-.587-2.86-.587-5.271 0-5.098-4.116-9.233-9.196-9.233s-9.196 4.135-9.196 9.233c0 2.6-.07 3.539-.416 4.692h0c-.427 1.433-1.309 2.82-2.971 4.49h0c-.96.964-.283 2.617 1.08 2.617h6.817l-.037.366v.025c0 2.618 2.113 4.741 4.722 4.741 2.61 0 4.723-2.123 4.723-4.74v-.013l-.001-.013zm-4.721 2.983a2.952 2.952 0 01-2.945-2.946l.04-.404h5.81l.04.405a2.952 2.952 0 01-2.945 2.945zm10.91-5.133H2.873c1.666-1.761 2.545-3.28 3.002-4.81.49-1.64.49-3.276.49-5.184v-.021c0-4.115 3.322-7.45 7.418-7.45 4.095 0 7.418 3.335 7.418 7.45v.02c0 1.91 0 3.545.49 5.184.457 1.532 1.336 3.05 3.003 4.811z"
              fill="#000"
              stroke="#8A74C0"
              stroke-width=".5"
            />
            <circle cx="22.304" cy="6.696" r="6.696" fill="#FF5722" />
          </svg>
        </button> -->

        <div class="relative w-full">
          <div class="mt-24 mx-auto flex justify-center">
            <img
              v-if="merchant.merchant.logoId"
              class="h-16 w-16 rounded-full"
              :src="logo"
            />

            <img
              v-else
              class="h-16 w-16 rounded-full"
              src="https://res.cloudinary.com/zillaafrica/image/upload/v1635580718/merchant/merchant-default-logo_nlrlpm.svg"
              alt=""
            />
          </div>

          <div class="absolute left-0 pt-3 sm:hidden">
            <div class="grid h-full">
              <div>
                <div class="sidebar-content mt-8">
                  <div v-if="!activatedStore" @click.stop="showNav = !showNav">
                    <router-link
                      class="flex nav-item items-center "
                      to="/activate-store"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="23"
                        fill="none"
                        class="mr-4"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M.45 1h21.1v21.1H.45V1zm1.1 1.1V21h18.9V2.1H1.55z"
                          stroke-width=".5"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.45 7h15.1v15.1H6.45V7zm1.1 1.1V21h12.9V8.1H7.55z"
                          stroke-width=".5"
                        />
                      </svg>
                      <p class="text-grey font-semibold ">Pending tasks</p>
                    </router-link>
                  </div>
                  <div @click.stop="showNav = !showNav">
                    <router-link
                      class="flex nav-item items-center mt-6 "
                      to="/"
                    >
                      <svg
                        class="mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="20"
                      >
                        <path
                          d="M19.731 6.693L10.356.111a.625.625 0 00-.712 0L.269 6.693A.625.625 0 000 7.206v12.169A.625.625 0 00.625 20h18.75a.625.625 0 00.625-.625V7.205a.625.625 0 00-.269-.512zM12.5 18.75h-5v-7.188h5v7.188zm6.25 0h-5v-7.813a.625.625 0 00-.625-.625h-6.25a.625.625 0 00-.625.625v7.813h-5V7.5L10 1.354 18.75 7.5v11.25z"
                          fill=""
                        />
                      </svg>
                      <p class="text-grey font-semibold ">Overview</p>
                    </router-link>
                  </div>
                  <div @click.stop="showNav = !showNav">
                    <router-link
                      class="flex items-center pl-12 mt-6 nav-item"
                      to="/order"
                    >
                      <svg
                        class="mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="22"
                        fill="none"
                      >
                        <g stroke-width=".2">
                          <path
                            d="M20.495 13.79V6.18c0-.024 0-.048-.024-.095v-.023c0-.024-.023-.047-.023-.07l-.024-.024c0-.024-.023-.024-.023-.047-.023-.024-.023-.024-.047-.024l-.023-.023h-.024l-9.395-4.839a.4.4 0 00-.329 0L1.188 5.874h-.024c-.023 0-.023.023-.023.023l-.024.024c-.023.023-.023.023-.023.047l-.024.023c0 .024-.023.047-.023.047v.024C1 6.109 1 6.132 1 6.179v9.654c0 .14.07.258.188.305l9.395 4.838c.024 0 .024 0 .047.024h.094c.024 0 .07 0 .094-.023h.024c.023 0 .023 0 .046-.024l3.57-1.832a4.06 4.06 0 003.406 1.832 4.065 4.065 0 004.064-4.063c.023-1.245-.54-2.35-1.433-3.1zM10.747 1.715l8.62 4.463-3.523 1.809L7.13 3.595l3.618-1.879zM6.356 3.995l8.714 4.392-4.322 2.231-.234-.117-8.386-4.322 4.228-2.184zm-4.65 2.748l8.69 4.463v8.878l-8.69-4.463V6.743zM11.1 20.084v-8.855l8.69-4.463v6.553a4.03 4.03 0 00-1.926-.47 4.065 4.065 0 00-4.063 4.064c0 .587.117 1.128.352 1.62L11.1 20.085zm6.764.188a3.332 3.332 0 01-2.771-1.456 3.163 3.163 0 01-.352-.611 3.358 3.358 0 015.026-4.04c.258.188.493.4.704.658.47.587.752 1.315.752 2.114.024 1.832-1.503 3.335-3.359 3.335z"
                          />
                          <path
                            d="M17.277 18.933a.335.335 0 01-.282-.141l-.939-1.339c-.118-.164-.07-.376.094-.493.164-.117.376-.07.493.094l.634.916 1.856-2.819c.117-.164.329-.211.493-.094.165.118.211.33.094.494l-2.16 3.264c-.071.047-.165.118-.283.118z"
                          />
                        </g>
                      </svg>
                      <p class="text-grey font-semibold ">Zilla Order</p>
                    </router-link>
                  </div>
                  <div @click.stop="showNav = !showNav">
                    <router-link
                      class="flex items-center nav-item pl-12 mt-6"
                      to="/settlements"
                    >
                      <svg
                        class="mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="20"
                        fill="none"
                      >
                        <g>
                          <path
                            d="M10 0a10 10 0 1010 10A10.011 10.011 0 0010 0zm0 18.857a8.857 8.857 0 110-17.713 8.857 8.857 0 010 17.713z"
                          />
                          <path
                            d="M13 7.503l-3.777 3.783L7 9.057a.572.572 0 10-.811.806l2.634 2.634a.571.571 0 00.806 0l4.183-4.183A.575.575 0 0013 7.503z"
                          />
                        </g>
                      </svg>
                      <p class="text-grey font-semibold">Settlements</p>
                    </router-link>
                  </div>
                  <div @click.stop="(showNav = !showNav), setTab()">
                    <router-link
                      class="flex items-center pl-12 mt-6 nav-item"
                      to="/settings"
                    >
                      <svg
                        class="mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="24"
                        fill="none"
                      >
                        <g stroke-width=".1">
                          <path
                            d="M4.114 11.642V1.668a.7.7 0 00-.18-.472A.59.59 0 003.5 1a.59.59 0 00-.434.196.7.7 0 00-.18.472v9.974a2.54 2.54 0 00-1.36.988A2.93 2.93 0 001 14.315c0 .61.185 1.203.526 1.686.341.484.82.831 1.36.988v3.343a.7.7 0 00.18.472A.59.59 0 003.5 21a.59.59 0 00.434-.196.7.7 0 00.18-.472v-3.29a2.54 2.54 0 001.36-.987A2.93 2.93 0 006 14.369a2.93 2.93 0 00-.526-1.686 2.54 2.54 0 00-1.36-.988v-.053zM3.5 15.779c-.264 0-.521-.085-.74-.245a1.426 1.426 0 01-.488-.654 1.564 1.564 0 01-.07-.839c.054-.28.183-.538.372-.738.188-.2.427-.336.687-.388.259-.051.526-.018.768.097.242.114.447.304.589.546.142.242.214.524.208.811a1.507 1.507 0 01-.4 1c-.247.263-.58.41-.926.41zM11.614 4.947v-3.28a.697.697 0 00-.18-.472A.59.59 0 0011 1a.59.59 0 00-.434.195.697.697 0 00-.18.472v3.28a2.54 2.54 0 00-1.36.985A2.917 2.917 0 008.5 7.613c0 .608.185 1.2.526 1.682s.82.828 1.36.985v10.053c0 .177.065.347.18.472A.59.59 0 0011 21a.59.59 0 00.434-.195.697.697 0 00.18-.472v-10a2.54 2.54 0 001.36-.985 2.917 2.917 0 00.526-1.681c0-.608-.185-1.2-.526-1.682A2.54 2.54 0 0011.614 5v-.053zM11 9.073c-.264 0-.521-.085-.74-.245a1.423 1.423 0 01-.488-.652 1.556 1.556 0 01-.07-.836 1.48 1.48 0 01.372-.737c.188-.2.427-.334.687-.386a1.23 1.23 0 01.768.096c.242.114.447.304.589.545.141.24.214.523.208.809a1.501 1.501 0 01-.4.996c-.247.263-.58.41-.926.41zM21 14.369a2.968 2.968 0 00-.545-1.697 2.524 2.524 0 00-1.374-.977V1.668a.704.704 0 00-.178-.472.58.58 0 00-.43-.196.58.58 0 00-.429.196.704.704 0 00-.178.472v9.974a2.515 2.515 0 00-1.346.988 2.952 2.952 0 00-.52 1.685c0 .61.183 1.203.52 1.686.338.484.81.831 1.346.988v3.343c0 .177.064.347.178.472a.58.58 0 00.43.196.58.58 0 00.429-.196.704.704 0 00.178-.472v-3.29a2.517 2.517 0 001.375-.975A2.96 2.96 0 0021 14.37zm-2.527 1.41a1.23 1.23 0 01-.732-.245 1.425 1.425 0 01-.482-.654 1.58 1.58 0 01-.07-.839 1.49 1.49 0 01.368-.738c.187-.2.423-.336.68-.388.256-.051.52-.018.76.097.239.114.442.304.582.546.14.242.212.524.206.811-.008.377-.15.736-.395 1a1.252 1.252 0 01-.917.41z"
                          />
                        </g>
                      </svg>

                      <p class="text-grey font-semibold">Settings</p>
                    </router-link>
                  </div>
                  <div @click.stop="logoutUser()">
                    <div class="flex items-center pl-12 mt-6 nav-item">
                      <svg
                        class="mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="24"
                        fill="none"
                      >
                        <path
                          d="M3.49141 17.2577C5.08239 18.8489 7.20862 19.7247 9.47994 19.7247C9.48426 19.7247 9.48868 19.7247 9.493 19.7247C11.7623 19.7214 13.8983 18.8456 15.5074 17.2589C17.1109 15.6777 17.9961 13.5668 18 11.315C18.0039 9.05217 17.1186 6.92486 15.5073 5.32504C15.3239 5.1429 15.0266 5.14299 14.8433 5.32509C14.6599 5.50718 14.6599 5.80245 14.8433 5.98459C16.2768 7.40782 17.0643 9.30029 17.0609 11.3134C17.0574 13.3155 16.2707 15.1919 14.8456 16.5972C13.4133 18.0096 11.5118 18.7891 9.49159 18.792C9.48764 18.792 9.48393 18.7921 9.47999 18.7921C7.46091 18.792 5.57106 18.014 4.15664 16.5994C2.72682 15.1798 1.93932 13.2952 1.93908 11.2928C1.93889 9.29036 2.72602 7.40558 4.15556 5.98566C4.33893 5.80357 4.33888 5.5083 4.15551 5.32621C3.97215 5.14407 3.67482 5.14416 3.49146 5.32625C1.88456 6.92234 0.999765 9.0413 1 11.2928C1.00014 13.5444 1.88541 15.6632 3.49141 17.2577Z"
                          stroke-width="0.5"
                        />
                        <path
                          d="M9.37598 1C9.10411 1.00005 8.88374 1.20692 8.88379 1.46202L8.88482 9.90039C8.88482 10.1555 9.1053 10.3624 9.37711 10.3623C9.64897 10.3623 9.86935 10.1554 9.8693 9.90029L9.86826 1.46193C9.86821 1.20678 9.64779 0.999954 9.37598 1Z"
                          stroke-width="0.5"
                        />
                      </svg>

                      <p class="text-grey font-semibold">Logout</p>
                    </div>
                  </div>
                  <div class="flex items-center pl-12 mt-6 nav-item">
                    <Button
                      text="Create Order"
                      :shadow="true"
                      class="mt-4 md:mt-0 md:hidden"
                      width="w-full"
                      fontSize="text-sm"
                      p="px-4 py-3"
                      @click="(showNav = !showNav), showOrderModal(true)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Button from "@/UI/Button";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Button,
  },
  data: () => ({
    showNav: false,
    openPopover: false,
  }),
  computed: {
    ...mapState({
      liveMode: (state) => state?.auth?.liveMode,
      merchant: (state) => state?.auth?.user,
      activatedStore: (state) => state?.auth?.activatedStore,
    }),
    logo() {
      return `${process.env.VUE_APP_BASE_URL}/media/image/${this.merchant.merchant.logoId}`;
    },
  },
  watch: {
    showNav(value) {
      if (value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
  mounted() {
    this.merchantActivatedStore();
  },
  methods: {
    ...mapActions("auth", ["logout", "activateStore", "setCurrentTab"]),
    ...mapActions("order", ["showOrderModal"]),
    handleOptionsOutside() {
      this.showNav = false;
    },
    setTab() {
      this.setCurrentTab("business");
    },
    merchantActivatedStore() {
      let step = this.merchant?.merchant?.completedMerchantSetupSteps;
      if (
        step?.includes("PROVIDED_BUSINESS_PRIMARY_DETAILS") &&
        step?.includes("PROVIDED_BUSINESS_SECONDARY_DETAILS")
      ) {
        this.activateStore(true);
      } else {
        this.activateStore(false);
      }
    },

    logoutUser() {
      this.logout()
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
svg {
  fill: #acacba;
}
.header {
  background-color: #f6f7ff;
  box-shadow: 0px 2px 4px #d9dcf2;
}
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(235, 227, 255, 0.8) !important;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 0.4s ease-in 0s;
}
.sidebar-menu {
  position: absolute;
  z-index: 200;
  opacity: none;
  height: 100%;
  box-shadow: 0px 6.65584px 39.9351px rgba(128, 70, 251, 0.2);
}
.nav-item {
  padding: 0.8rem 2rem 0.8rem 3rem;
}
.sidebar-content a.router-link-exact-active {
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  background-color: #ebe3ff;
}
.sidebar-content a.router-link-exact-active p {
  color: #000000;
  font-weight: bold;
}
.sidebar-content a.router-link-exact-active svg {
  fill: #000000;
}
.logout-card div:hover {
  color: #c70039;
  fill: #c70039;
  stroke: #c70039;
}

.sidebar {
  overflow: auto;
}

.sidebar::-webkit-scrollbar {
  width: 5px !important;
}
.sidebar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #d3d3d3;
  border-radius: 10px;
}
.sidebar::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 10px;
}
</style>
