<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Chỉnh sửa lớp dịch vụ</h2>
  </div>

  <!-- BEGIN: Thông tin hội viên -->
  <div class="intro-y box mt-5">
    <div class="intro-y flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
      <h2 class="text-lg font-medium mr-auto">Thông tin các buổi tập trong 1 tuần</h2>
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
            <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Tên buổi tập</th>
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
              <button @click="workoutFunc(item.id)" class="btn btn-primary shadow-md mr-2 mt-0.5 w-20">Bài tập</button>
              <button @click="() => showEditModal(item)" class="btn btn-primary shadow-md mr-2 mt-0.5 w-20">Sửa</button>
              <button @click="() => showDeleteConfirmationModal(item.id)" class="btn btn-danger shadow-md mt-0.5 w-20">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Thông tin hội viên -->
  </div>

  <Modal :show="isModalCreateVisible" @hide="hideCreateModal">
    <h2 class="p-10 text-lg font-medium mr-auto">Tạo buổi tập</h2>
    <ModalBody>
      <div class="p-5">
        <div>
          <label class="form-label">Tên buổi tập</label>
          <input type="text" v-model="newSession.name" class="form-control" />
        </div>
        <div class="mt-3">
          <label class="form-label">Mô tả buổi tập</label>
          <textarea rows="4" v-model="newSession.description" class="form-control"></textarea>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="px-5 pb-8 flex justify-end">
        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideCreateModal">Hủy</button>
        <button type="button" class="btn btn-primary w-24" @click="createSessionFunc">Tạo</button>
      </div>
    </ModalFooter>
  </Modal>

  <Modal :show="isModalEditVisible" @hide="hideEditModal">
    <h2 class="p-10 text-lg font-medium mr-auto">Sửa buổi tập</h2>
    <ModalBody>
      <div class="p-5">
        <div>
          <label class="form-label">Tên buổi tập</label>
          <input type="text" v-model="editSession.name" class="form-control" />
        </div>
        <div class="mt-3">
          <label class="form-label">Mô tả buổi tập</label>
          <textarea rows="4" v-model="editSession.description" class="form-control"></textarea>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="px-5 pb-8 flex justify-end">
        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideEditModal">Hủy</button>
        <button type="button" class="btn btn-primary w-24" @click="updateSessionFunc">Lưu</button>
      </div>
    </ModalFooter>
  </Modal>

  <Modal :show="isModalDeleteVisible" @hide="hideDeleteConfirmationModal">
    <ModalBody>
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-gray-600 mt-2">
          Bạn có chắc muốn xóa buổi tập này không? <br />Thao tác này sẽ không thể hoàn tác
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideDeleteConfirmationModal">Hủy</button>
        <button type="button" class="btn btn-danger w-24" @click="deleteSessionFunc">Xóa</button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import { getServiceSessions } from '@/api/services';
import { createSession, updateSession, deleteSession } from '@/api/sessions';

interface Session {
  id?: string;
  name: string;
  description: string;
}

const isModalCreateVisible = ref(false);
const isModalEditVisible = ref(false);
const isModalDeleteVisible = ref(false);

const tableData = ref<Session[]>([]);
const newSession = ref<Session>({ name: '', description: '' });
const editSession = ref<Session>({ id: '', name: '', description: '' });
const sessionIdToDelete = ref<string>('');

const hideCreateModal = () => {
  isModalCreateVisible.value = false;
};
const showCreateModal = () => {
  newSession.value = { name: '', description: '' };
  isModalCreateVisible.value = true;
};

const hideEditModal = () => {
  isModalEditVisible.value = false;
};
const showEditModal = (session: Session) => {
  editSession.value = { ...session };
  isModalEditVisible.value = true;
};

const hideDeleteConfirmationModal = () => {
  isModalDeleteVisible.value = false;
};
const showDeleteConfirmationModal = (id: string) => {
  sessionIdToDelete.value = id;
  isModalDeleteVisible.value = true;
};

const fetchServiceSessions = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  try {
    const response = await getServiceSessions(paramId);
    tableData.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const createSessionFunc = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  try {
    const sessionData = { ...newSession.value, service_id: paramId };
    await createSession(sessionData);
    await fetchServiceSessions();
    hideCreateModal();
  } catch (error) {
    console.error(error);
  }
};

const updateSessionFunc = async () => {
  try {
    await updateSession(editSession.value.id || '', editSession.value);
    await fetchServiceSessions();
    hideEditModal();
  } catch (error) {
    console.error(error);
  }
};

const deleteSessionFunc = async () => {
  try {
    await deleteSession(sessionIdToDelete.value);
    await fetchServiceSessions();
    hideDeleteConfirmationModal();
  } catch (error) {
    console.error(error);
  }
};

const workoutFunc = (sessionId: string) => {
  const serviceId = router.currentRoute.value.params.id.toString();
  router.push(`/services/${serviceId}/sessions/${sessionId}/workouts`);
};

onMounted(async () => {
  await fetchServiceSessions();
});
</script>
