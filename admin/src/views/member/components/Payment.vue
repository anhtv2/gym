<!-- MemberInfoTab.vue -->
<template>
  <!-- BEGIN: Thông tin hội viên -->
  <div class="intro-y box mt-5">
    <div class="intro-y flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
      <h2 class="text-lg font-medium mr-auto">Lịch sử thanh toán</h2>
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
              Ngày thanh toán
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Số tiền
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Hình thức
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-gray-200 dark:bg-dark-1" v-for="(item, index) in tableData" :key="index">
            <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
            <td class="border-b dark:border-dark-5">{{ item.payment_date }}</td>
            <td class="border-b dark:border-dark-5">{{ item.payment_amount }}</td>
            <td class="border-b dark:border-dark-5">{{ item.payment_type }}</td>
          </tr>
        </tbody>
      </table>

      <!-- END: Striped Rows -->
      <div class="p-5">
        <!-- <button
            type="button"
            class="btn btn-primary w-20 mt-3"
            @click="updateMemberFunc"
          >
            Lưu
          </button>
          <router-link
            :to="{ name: 'list-members' }"
            class="btn btn-outline-secondary ml-3 w-20 mt-3"
          >
            Hủy
          </router-link> -->
      </div>
    </div>
    <!-- END: Thông tin hội viên -->
  </div>
  <Modal :show="isModalCreateVisible" @hide="hideCreatePaymentModal">
    <ModalBody>
      <div class="p-5">
        <div>
          <label class="form-label">Công nợ cần thanh toán</label>
          <input type="text" class="form-control border" v-model="financials.total_receivable" disabled />
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
          <select class="form-control" v-model="formData.payment_type">
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
import { getMemberMembershipPayments, createMemberMembershipPayment } from '@/api/members';
import router from '@/router';
import { CreateMemberMembershipPaymentRequest } from '@/api/members/interfaces/create';

const props = defineProps(['financials'])
const emit = defineEmits(['fetch-member-financial']);
const isModalCreateVisible = ref(false);
const isModalUpdateVisible = ref(false);
const updatePaymentId = ref(null);
const requiredAmount = ref(0);
const tableData = ref([
  { id: 0, payment_date: '', payment_amount: 0, payment_type: '', }
]);
const formData = ref({
  payment_date: '',
  payment_amount: 0,
  payment_type: '',
  payment_note: '',
});
const showCreatePaymentModal = () => {
  isModalCreateVisible.value = true;
};

const hideCreatePaymentModal = () => {
  isModalCreateVisible.value = false;
};

const createPaymentFunc = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  const data = {
    payment_date: formData.value.payment_date,
    payment_amount: formData.value.payment_amount,
    payment_type: formData.value.payment_type,
    payment_note: formData.value.payment_note,
  } as CreateMemberMembershipPaymentRequest;

  const response = await createMemberMembershipPayment(paramId, data);

  if (response) {
    fetchMembershipPayments();
    isModalCreateVisible.value = false;
    await fetchMembershipPayments();
    await fetchMemberFinancial();
  }


};

const datePickerOptions = {
  autoApply: false,
  showWeekNumbers: true,
  dropdowns: {
    minYear: 1970,
    maxYear: null,
    months: true,
    years: true,
  },
};
onMounted(async () => {
  await fetchMembershipPayments();
});

const fetchMembershipPayments = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  const response = await getMemberMembershipPayments(paramId);
  if (response) {
    tableData.value = response.data;
  }
};

const fetchMemberFinancial = () => {
  emit('fetch-member-financial');
};

</script>
