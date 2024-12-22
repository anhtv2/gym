<template>
  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin thiết bị -->
      <div class="intro-y box lg:mt-5">
        <div class="intro-y flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="text-lg font-medium mr-auto">Thiết bị yêu cầu cho bài tập</h2>
          <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
            <button class="btn btn-primary shadow-md mr-2" @click="showCreateModal">Thêm</button>
          </div>
        </div>
        <div class="p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">#</th>
                  <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Tên Thiết bị</th>
                  <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-gray-200 dark:bg-dark-1" v-for="(item, index) in tableData" :key="index">
                  <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
                  <td class="border-b dark:border-dark-5">{{ item.name }}</td>
                  <td class="border-b dark:border-dark-5">
                    <button @click="showDeleteConfirmationModal(item.id)" class="btn btn-danger shadow-md mt-0.5 w-20">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- END: Thông tin thiết bị -->
    </div>
  </div>

  <!-- Modal for creating new equipment -->
  <Modal :show="isCreateModalOpen" @hide="hideCreateModal">
    <ModalBody>
      <div class="p-5">
        <h2 class="text-lg font-medium">Thêm thiết bị</h2>
        <div class="form-control mt-3">
          <label for="category" class="label">Danh mục thiết bị</label>
          <select id="category" class="input w-full border mt-2" v-model="selectedCategoryId">
            <option value="" disabled selected>Chọn danh mục</option>
            <option v-for="category in equipmentCategories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="px-5 pb-8 flex justify-end">
        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideCreateModal">
          Hủy
        </button>
        <button type="button" class="btn btn-primary w-24" @click="createEquipment">
          Tạo
        </button>
      </div>
    </ModalFooter>
  </Modal>

  <!-- Modal for deleting equipment -->
  <Modal :show="isDeleteConfirmationModalOpen" @hide="hideDeleteConfirmationModal">
    <ModalBody>
      <div class="p-5">
        <h2 class="text-lg font-medium">Xác nhận xóa thiết bị</h2>
        <p class="mt-3">Bạn có chắc chắn muốn xóa thiết bị này?</p>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="px-5 pb-8 flex justify-end">
        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideDeleteConfirmationModal">
          Hủy
        </button>
        <button type="button" class="btn btn-danger w-24" @click="deleteEquipmentFunc">
          Xóa
        </button>
      </div>
    </ModalFooter>
  </Modal>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showMessage } from '@/common/utils/helpers';
import { getWorkoutEquipments, createWorkoutEquipment, deleteWorkoutEquipment } from '@/api/workouts';
import { getEquipmentCategories } from '@/api/equipment_categories';
import router from '@/router';

const isCreateModalOpen = ref(false);
const isDeleteConfirmationModalOpen = ref(false);
const selectedId = ref(0);
const equipmentCategories = ref([{ id: 0, name: '' }]);
const tableData = ref<Array<{ id: number; name: string }>>([]);
const newEquipmentName = ref('');
const selectedCategoryId = ref('');

const showCreateModal = () => {
  isCreateModalOpen.value = true;
};

const hideCreateModal = () => {
  isCreateModalOpen.value = false;
  selectedCategoryId.value = '';
};

const showDeleteConfirmationModal = (id: number) => {
  selectedId.value = id;
  isDeleteConfirmationModalOpen.value = true;
};

const hideDeleteConfirmationModal = () => {
  isDeleteConfirmationModalOpen.value = false;
  selectedId.value = 0;
};

const fetchWorkoutEquipment = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  const response = await getWorkoutEquipments(paramId);
  if (response.statusCode === 200) {
    tableData.value = response.data?.equipments.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));
  } else {
    showMessage('Có lỗi xảy ra khi lấy dữ liệu', false);
  }
};

const fetchEquipmentCategories = async () => {
  const response = await getEquipmentCategories();
  if (response.statusCode === 200) {
    equipmentCategories.value = response.data?.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));
  } else {
    showMessage('Có lỗi xảy ra khi lấy dữ liệu', false);
  }
};

const createEquipment = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  const payload = {
    equipmentId: selectedCategoryId.value,
  };
  hideCreateModal();

  const response = await createWorkoutEquipment(paramId, payload);
  if (response.statusCode === 201) {
    showMessage('Thêm thiết bị thành công', true);
    await fetchWorkoutEquipment();
  } else {
    showMessage('Có lỗi xảy ra khi thêm thiết bị', false);
  }
};

const deleteEquipmentFunc = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  const response = await deleteWorkoutEquipment(paramId, selectedId.value.toString());
  hideDeleteConfirmationModal();
  if (response.statusCode === 200) {
    showMessage('Xóa thiết bị thành công', true);
  } else {
    showMessage('Có lỗi xảy ra khi xóa thiết bị', false);
  }
  await fetchWorkoutEquipment();
};
onMounted(async () => {
  await fetchWorkoutEquipment();
  await fetchEquipmentCategories();
});
</script>
