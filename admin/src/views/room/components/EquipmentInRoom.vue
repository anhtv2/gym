<template>
  <!-- BEGIN: Thông tin thiết bị trong phòng tập -->
  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <div class="intro-y box lg:mt-5">
        <div class="p-5 font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400">
          Thiết bị trong phòng tập
        </div>
        <div class="p-5">
          <div class="form-inline items-start flex-col xl:flex-row mt-2 pt-2 first:mt-0 first:pt-0">
            <div class="form-label xl:w-64 xl:!mr-10">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium form-label">Danh sách thiết bị</div>
                </div>
                <div class="leading-relaxed text-slate-500 text-xs mt-3">
                  Các thiết bị được lắp đặt trong phòng tập
                </div>
              </div>
            </div>
            <div class="w-full mt-3 xl:mt-0 flex-1">
              <div class="relative pl-5 pr-5 xl:pr-10 py-10 bg-slate-50 dark:bg-transparent dark:border rounded-md">
                <div>
                  <div class="form-inline mt-5 items-start first:mt-0">
                    <label class="form-label mt-2 sm:w-20">Thiết bị</label>
                    <div class="flex-1">
                      <div v-for="(equipment, index) in equipments" :key="index" class="xl:flex items-center mt-5 first:mt-0">
                        <div class="input-group flex-1">
                          <TomSelect v-model="equipment.name" :options="equipmentOptions" placeholder="Chọn loại thiết bị" class="w-full mr-3">
                            <option v-for="option in equipmentOptions" :key="option.value" :value="option.value">
                              {{ option.label }}
                            </option>
                          </TomSelect>
                          <input v-model="equipment.quantity" type="number" class="w-full rounded" placeholder="Số lượng" />
                        </div>
                        <div class="w-20 flex text-slate-500 mt-3 xl:mt-0">
                          <button class="ml-3 xl:ml-5" @click="removeEquipment(index)">
                            <Trash2Icon class="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="xl:ml-20 xl:pl-5 xl:pr-20 mt-5 first:mt-0">
                    <button class="btn btn-outline-primary border-dashed w-full" @click="addEquipment">
                      <PlusIcon class="w-4 h-4 mr-2" />Thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Thông tin hội viên -->
      <div class="p-5">
        <button @click="updateRoomFunc" type="button" class="btn btn-primary w-20 mt-3">
          Lưu
        </button>
        <router-link :to="{ name: 'list-rooms' }" class="btn btn-outline-secondary ml-3 w-20 mt-3">
          Hủy
        </router-link>
      </div>
    </div>
  </div>
  <!-- END: Thông tin thiết bị trong phòng tập -->
</template>

<script setup lang="ts">
const props = defineProps(['equipments', 'equipmentOptions']);
const emit = defineEmits(['addEquipment', 'removeEquipment', 'updateRoomFunc']);

const addEquipment = () => {
  emit('addEquipment');
};

const removeEquipment = (index: number) => {
  emit('removeEquipment', index);
};

const updateRoomFunc = () => {
  emit('updateRoomFunc');
};
</script>
