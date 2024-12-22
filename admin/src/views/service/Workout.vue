<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Chỉnh sửa bài tập trong phiên</h2>
  </div>

  <!-- BEGIN: Thông tin hội viên -->
  <div class="intro-y box mt-5">
    <div class="intro-y flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
      <h2 class="text-lg font-medium mr-auto">Thông tin các bài tập trong buổi tập</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary shadow-md mr-2" @click="showCreateModal">Thêm</button>
      </div>
    </div>
    <!-- BEGIN: Striped Rows -->
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">#</th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Tên bài tập</th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Mô tả buổi tập</th>
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-gray-200 dark:bg-dark-1" v-for="(item, index) in tableData" :key="index">
            <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
            <td class="border-b dark:border-dark-5">{{ item.name }}</td>
            <td class="border-b dark:border-dark-5">{{ item.description }}</td>
            <td class="border-b dark:border-dark-5">
              <button @click="() => showDeleteConfirmationModal(item.id)" class="btn btn-danger shadow-md mt-0.5 w-20">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Thông tin hội viên -->
  </div>

  <Modal :show="isModalCreateVisible" @hide="hideCreateModal">
    <h2 class="p-10 text-lg font-medium mr-auto">Thêm bài tập vào phiên</h2>
    <ModalBody>
      <div class="p-5">
        <div>
          <label class="form-label">Chọn bài tập</label>
          <select v-model="selectedWorkoutId" class="form-control">
            <option v-for="workout in availableWorkouts" :key="workout.id" :value="workout.id">
              {{ workout.name }}
            </option>
          </select>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="px-5 pb-8 flex justify-end">
        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideCreateModal">Hủy</button>
        <button type="button" class="btn btn-primary w-24" @click="addWorkoutToSessionFunc">Thêm</button>
      </div>
    </ModalFooter>
  </Modal>

  <Modal :show="isModalDeleteVisible" @hide="hideDeleteConfirmationModal">
    <ModalBody>
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-gray-600 mt-2">
          Bạn có chắc muốn xóa bài tập này không? <br />Thao tác này sẽ không thể hoàn tác
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideDeleteConfirmationModal">Hủy</button>
        <button type="button" class="btn btn-danger w-24" @click="deleteSessionWorkoutFunc">Xóa</button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import { getServiceSessionWorkouts} from '@/api/services';
import { getWorkouts } from '@/api/workouts';
import { addWorkoutToSession, removeWorkoutFromSession } from '@/api/sessions';

interface Workout {
  id: string;
  name: string;
  description: string;
}

interface Session {
  id: string;
  name: string;
  description: string;
  workouts: Workout[];
}

const isModalCreateVisible = ref(false);
const isModalDeleteVisible = ref(false);

const tableData = ref<Workout[]>([]);
const availableWorkouts = ref<Workout[]>([]);
const selectedWorkoutId = ref<string | null>(null);
const sessionIdToDelete = ref<string>('');

const hideCreateModal = () => {
  isModalCreateVisible.value = false;
};
const showCreateModal = async () => {
  selectedWorkoutId.value = null;
  isModalCreateVisible.value = true;
  await fetchAvailableWorkouts(); // Fetch available workouts to populate the select
};

const hideDeleteConfirmationModal = () => {
  isModalDeleteVisible.value = false;
};
const showDeleteConfirmationModal = (id: string) => {
  sessionIdToDelete.value = id;
  isModalDeleteVisible.value = true;
};

const fetchServiceSessionsWorkout = async () => {
  const id = router.currentRoute.value.params.id.toString();
  const sessionId = router.currentRoute.value.params.sessionId.toString();
  try {
    const response = await getServiceSessionWorkouts(id, sessionId);
    tableData.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchAvailableWorkouts = async () => {
  try {
    const response = await getWorkouts({});
    availableWorkouts.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const addWorkoutToSessionFunc = async () => {
  const sessionId = router.currentRoute.value.params.sessionId.toString();
  try {
    if (selectedWorkoutId.value) {
      await addWorkoutToSession(sessionId, selectedWorkoutId.value);
      await fetchServiceSessionsWorkout();
      hideCreateModal();
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteSessionWorkoutFunc = async () => {
  const sessionId = router.currentRoute.value.params.sessionId.toString();
  try {
    await removeWorkoutFromSession(sessionId, sessionIdToDelete.value);
    await fetchServiceSessionsWorkout();
    hideDeleteConfirmationModal();
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchServiceSessionsWorkout();
});
</script>
