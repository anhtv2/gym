<!-- MemberInfoTab.vue -->
<template>
  <!-- BEGIN: Thông tin hội viên -->
  <div class="intro-y box lg:mt-5">
    <div class="intro-y flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
      <h2 class="text-lg font-medium mr-auto">Lịch sử tập luyện</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary shadow-md mr-2" @click="showCreateModal">Thêm</button>
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
              Ngày tập luyện
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Dịch vụ
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Loại dịch vụ
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Huấn luyện viên
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Thời gian
            </th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">
              Ghi chú
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-gray-200 dark:bg-dark-1" v-for="(item, index) in tableData" :key="index">
            <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
            <td class="border-b dark:border-dark-5">{{ item.date }}</td>
            <td class="border-b dark:border-dark-5">{{ item.serviceName ?? item.workoutName }}</td>
            <td class="border-b dark:border-dark-5">{{ item.serviceType }}</td>
            <td class="border-b dark:border-dark-5">{{ item.trainerName ?? bookingTrainerName }}</td>
            <td class="border-b dark:border-dark-5">{{ item.time }}</td>
            <td class="border-b dark:border-dark-5">{{ item.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Striped Rows -->
    <div class="p-5">
    </div>
  </div>
  <!-- END: Thông tin hội viên -->

  <Modal :show="isCreateModalVisible" @hide="hideCreateModal">
    <ModalBody>
      <div class="p-5">
        <h3 class="text-lg font-medium">Đăng ký dịch vụ</h3>
        <div class="mt-3">
          <label class="form-label">Ngày đăng ký</label>
          <div class="relative form-control">
            <div class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
              <CalendarIcon class="w-4 h-4" />
            </div>
            <Litepicker v-model="formData.date" :options="datePickerOptions" class="form-control pl-12" />
          </div>
        </div>
        <div class="mt-3">
          <label class="form-label">Loại gói dịch vụ</label>
          <select class="form-control" v-model="formData.memberships_plan_id" @change="updateRequiredAmount">
            <option v-for="item in memberships" :value="item.id">{{ item.name }}</option> <!-- Add this line -->
          </select>
        </div>

        <div class="mt-3">
          <label class="form-label">Số tiền</label>
          <input type="number" class="form-control" disabled v-model="requiredAmount" />
        </div>

        <div class="mt-3">
          <label class="form-label">Ghi chú</label>
          <textarea v-model="formData.note" rows="4" class="form-control" placeholder="Ghi chú">
          </textarea>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="px-5 pb-8 flex justify-end"> <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideCreateModal">
          Hủy
        </button>
        <button type="button" class="btn btn-primary w-24" @click="createMemberMembershipFunc">
          Tạo
        </button>
      </div>
    </ModalFooter>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { getmemberMemberships, createMemberMembership } from '@/api/members';
import { getBookings } from '@/api/booking';
import router from '@/router';

const isCreateModalVisible = ref(false);
const requiredAmount = ref(0);
const paramId = router.currentRoute.value.params.id.toString();
const tableData = ref([
  { id: '', date: '', name: '', price: '', note: '' },
]);
const memberships = ref([
  { id: '', name: '', price: '' },
]);
const formData = ref({
  date: '',
  memberships_plan_id: '',
  note: '',
});
const showCreateModal = () => {
  isCreateModalVisible.value = true;
};

const hideCreateModal = () => {
  isCreateModalVisible.value = false;
};

const createMemberMembershipFunc = async () => {
  //  const data = {
  //      start_date: formData.value.date,
  //      membership_plan_id: formData.value.memberships_plan_id,
  //      note: formData.value.note,
  //  } as CreateMemberMembershipRequest;

  //  const response = await createMemberMembership(paramId, data);

  //  if(response) {
  //   showMessage('Đăng ký dịch vụ thành công', true);
  //   hideCreateModal();
  //   await fetchBookingsFunc();
  //   }
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
  await fetchBookingsFunc();
});
const fetchBookingsFunc = async () => {
  const response = await getBookings({ member_id: paramId });
  tableData.value = response.data;
};

const updateRequiredAmount = () => {
  const membership = memberships.value.find((item) => item.id === formData.value.memberships_plan_id);
  requiredAmount.value = Number(membership?.price);
};


</script>
