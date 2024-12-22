<template>
      <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin phòng tập -->
      <div class="intro-y box lg:mt-5">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Thông tin phòng tập</h2>
        </div>
        <div class="p-5">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="create-member-form-1" class="form-label">Tên phòng tập</label>
                    <input v-model="formData.name" type="text" class="form-control" placeholder="Tên phòng tập" />
                  </div>
                  <!-- <div class="mt-3">
                    <label for="create-member-form-2" class="form-label">Chức năng</label>
                    <input v-model="formData.description" type="number" step="50000" class="form-control" placeholder="Chức năng phòng tập" />
                  </div> -->
                  <div class="mt-3">
                    <label for="create-member-form-4" class="form-label">Sức chứa (Người)</label>
                    <input v-model="formData.max_capacity" type="number" step="50000" class="form-control" placeholder="Người" />
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <label for="create-member-form-4" class="form-label">Vị trí (Tầng)</label>
                    <input v-model="formData.floor" type="number" step="50000" class="form-control" placeholder="Tầng" />
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="create-member-form-7" class="form-label">Ghi chú</label>
                    <textarea v-model="formData.description" rows="5" class="form-control" placeholder="Ghi chú"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-5">
          <button @click="updateRoomFunc" type="button" class="btn btn-primary w-20 mt-3">
            Lưu
          </button>
          <router-link :to="{ name: 'list-rooms' }" class="btn btn-outline-secondary ml-3 w-20 mt-3">
            Hủy
          </router-link>
        </div>
      </div>
      <!-- END: Thông tin phòng tập -->

    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['formData']);
const emit = defineEmits(['update']);
const updateRoomFunc = () => {
  emit('update');
};
</script>