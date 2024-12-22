<!-- MemberInfoTab.vue -->
<template>
  <!-- BEGIN: Thông tin hội viên -->
  <div class="intro-y box lg:mt-5">
    <div class="intro-y flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
      <h2 class="text-lg font-medium mr-auto">Chỉ số cơ thể</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary shadow-md mr-2" @click="showCreatePaymentModal">Thêm</button>
      </div>
    </div>
    <!-- BEGIN: Striped Rows -->
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              #
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Ngày đo chỉ số
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Chiều cao
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Cân nặng
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              % mỡ
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              % cơ
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              % xương
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Vòng eo
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Vòng mông
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Vòng ngực
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-gray-200 dark:bg-dark-1" v-for="(item, index) in tableData" :key="index">
            <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
            <td class="border-b dark:border-dark-5">{{ item.measurement_date }}</td>
            <td class="border-b dark:border-dark-5">{{ item.height }}</td>
            <td class="border-b dark:border-dark-5">{{ item.weight }}</td>
            <td class="border-b dark:border-dark-5">{{ item.fat }}</td>
            <td class="border-b dark:border-dark-5">{{ item.muscle }}</td>
            <td class="border-b dark:border-dark-5">{{ item.bone }}</td>
            <td class="border-b dark:border-dark-5">{{ item.waist }}</td>
            <td class="border-b dark:border-dark-5">{{ item.hip }}</td>
            <td class="border-b dark:border-dark-5">{{ item.chest }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- END: Striped Rows -->
    <div class="p-5">
    </div>
  </div>
  <!-- END: Thông tin hội viên -->

  <Modal :show="isModalVisible" @hide="hideCreatePaymentModal">
    <ModalBody>
      <div class="p-5">
        <div>
          <label class="form-label">Công nợ cần thanh toán</label>
          <input type="text" class="form-control border" v-model="requiredAmount" disabled />
        </div>
        <div class="mt-3">
          <label class="form-label">Ngày thanh toán</label>
          <div class="relative form-control">
            <div class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
              <CalendarIcon class="w-4 h-4" />
            </div>
            <Litepicker v-model="formData.payment_date" :options="datePickerOptions" class="form-control pl-12" />
          </div>
        </div>
        <div class="mt-3">
          <label class="form-label">Số tiền</label>
          <input type="number" class="form-control" v-model="formData.payment_amount" />
        </div>
        <div class="mt-3">
          <label class="form-label">Phương thức thanh toán</label>
          <select class="form-control" v-model="formData.payment_method">
            <option value="1">Tiền mặt</option>
            <option value="2">Chuyển khoản</option>
          </select>
        </div>
        <div class="mt-3">
          <label class="form-label">Ghi chú</label>
          <textarea v-model="formData.payment_note" rows="4" class="form-control" placeholder="Ghi chú">
          </textarea>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="px-5 pb-8 flex justify-end"> <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideCreatePaymentModal">
          Hủy
        </button>
        <button type="button" class="btn btn-primary w-24" @click="createPaymentFunc">
          Tạo
        </button>
      </div>
    </ModalFooter>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getMemberMeasurements } from '@/api/members';
import router from '@/router';
const isModalVisible = ref(false);
const requiredAmount = ref(0);
const formData = ref({
  payment_date: '',
  payment_amount: '',
  payment_method: '',
  payment_note: '',
});

const tableData = ref([
  {
    id: '',
    measurement_date: '',
    height: 0,
    weight: 0,
    fat: 0,
    muscle: 0,
    bone: 0,
    waist: 0,
    hip: 0,
    chest: 0
  }
])
const showCreatePaymentModal = () => {
  isModalVisible.value = true;
};

const hideCreatePaymentModal = () => {
  isModalVisible.value = false;
};

const createPaymentFunc = () => {
  console.log(formData.value);
  isModalVisible.value = false;
};

const datePickerOptions = {
  autoApply: false,
  showWeekNumbers: true,
  dropdowns: {
    minYear: 1970,
    maxYear: null,
    months: true,
    years: true,
  }
};

const fetchMemberMeasurements = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  const res = await getMemberMeasurements(paramId);
  if (res) {
    tableData.value = res.data;
  }
}

onMounted(async () => {
  await fetchMemberMeasurements();
});

</script>
