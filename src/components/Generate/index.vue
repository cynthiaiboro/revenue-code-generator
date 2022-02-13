<template>
  <div class="w-full my-4">
    <div class="flex justify-between items-center mx-4">
      <h2>Revenue Code generated table</h2>
      <div class="flex">
        <div
          class="flex justify-center items-center rounded bg-primary h-12 px-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.65052 3.35002L5.86052 6.14002C5.54052 6.45002 5.76052 6.99002 6.21052 6.99002H8.00052V13C8.00052 13.55 8.45052 14 9.00052 14C9.55052 14 10.0005 13.55 10.0005 13V6.99002H11.7905C12.2405 6.99002 12.4605 6.45002 12.1405 6.14002L9.35052 3.35002C9.16052 3.16002 8.84052 3.16002 8.65052 3.35002ZM16.0005 17.01V11C16.0005 10.45 15.5505 10 15.0005 10C14.4505 10 14.0005 10.45 14.0005 11V17.01H12.2105C11.7605 17.01 11.5405 17.55 11.8605 17.86L14.6505 20.64C14.8505 20.83 15.1605 20.83 15.3605 20.64L18.1505 17.86C18.4705 17.55 18.2405 17.01 17.8005 17.01H16.0005Z"
              fill="white"
            />
          </svg>
          <span class="text-white font-bold pl-2">Export</span>
        </div>
        <div
          class="ml-3 flex justify-center items-center rounded bg-white h-12 px-5 border border-4 border-lightGrey"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11 18H13C13.55 18 14 17.55 14 17C14 16.45 13.55 16 13 16H11C10.45 16 10 16.45 10 17C10 17.55 10.45 18 11 18ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7ZM7 13H17C17.55 13 18 12.55 18 12C18 11.45 17.55 11 17 11H7C6.45 11 6 11.45 6 12C6 12.55 6.45 13 7 13Z"
              fill="#1C6806"
            />
          </svg>
          <span class="text-primary font-bold pl-2">Filter</span>
        </div>
      </div>
    </div>
    <table id="template-table" class="w-full table-auto mt-6">
      <thead class="bg-primary text-white text-left">
        <tr>
          <th>Revenue Code</th>
          <th>Line item (Revnue Source)</th>
          <th>Assesment type</th>
          <th>Frequency</th>
          <th>MDA</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 20" :key="i">
          <td>022000800100</td>
          <td>MOTOR VEHICLE ADVANCES (REPAYMENTS)</td>
          <td>Building</td>
          <td>Yearly</td>
          <td>Imo State Internal Revenue Service (IIRS)</td>
          <td>
            <div class="action-button rounded py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                class="mx-auto"
              >
                <path
                  d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                  fill="#1C6806"
                />
              </svg>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Button from "@/UI/Button";
export default {
  components: {
    Button,
  },
};
</script>

<style scoped>
table th {
  padding: 10px 15px !important;
}
table td {
  padding: 10px 15px !important;
  color: #4e584b;
  border-bottom: 1px solid #f2f2f2;
}
.action-button {
  border: 1px solid #f7f8f7;
}
</style>
