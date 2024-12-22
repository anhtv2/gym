<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Thêm mới phòng tập</h2>
  </div>
  <TabGroup class="py-5">
    <TabList class="nav-boxed-tabs text-bold flex sm:flex-row flex-col">
      <Tab v-for="tab in tabs" :key="tab.id" tag="button" class="w-full py-2">
        <h6 class="font-medium">{{ tab.name }}</h6>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel class="leading-relaxed">
        <RoomInfoTab :formData="formData" @update="updateRoomFunc" />
      </TabPanel>
      <TabPanel class="leading-relaxed">
        <EquipmentInRoomTab
          :equipments="equipments"
          :equipmentOptions="equipmentOptions"
          @addEquipment="addEquipment"
          @removeEquipment="removeEquipment"
        />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getDetailRoom, editRoom, getEquipmentsByRoomId } from '@/api/rooms';
import { getEquipmentCategories } from '@/api/equipment_categories';
import { showMessage } from '@/common/utils/helpers';
import router from '@/router';
import RoomInfoTab from './components/RoomInfo.vue';
import EquipmentInRoomTab from './components/EquipmentInRoom.vue';
import type { CreateRoomRequest } from '@/api/rooms/interfaces';

const tabs = [
  { id: 1, name: 'Thông tin phòng tập' },
  { id: 2, name: 'Thiết bị trong phòng tập' },
];

const formData = ref({
  name: '',
  floor: 0,
  max_capacity: 0,
  description: '',
});

const paramId = router.currentRoute.value.params.id.toString();

const equipments = ref([{ name: '', quantity: 0 }]);
const equipmentOptions = ref([{ value: '', label: '' }]);

const fetchRoomDetails = async () => {
  try {
    const { data } = await getDetailRoom(paramId);
    formData.value = data;
  } catch (error) {
    console.error('Error fetching room details:', error);
  }
};

const fetchEquipmentOptions = async () => {
  try {
    const { data } = await getEquipmentCategories({});
    equipmentOptions.value = data.map((item: any) => ({
      label: item.name,
      value: item.name,
    }));
  } catch (error) {
    console.error('Error fetching equipment options:', error);
  }
};

const fetchRoomEquipments = async () => {
  try {
    const { data } = await getEquipmentsByRoomId(paramId);
    equipments.value = data;
  } catch (error) {
    console.error('Error fetching room equipments:', error);
  }
};

const updateRoomFunc = async () => {
  try {
    const roomData: CreateRoomRequest = formData.value;
    await editRoom(paramId, roomData);
    showMessage('Chỉnh sửa thông tin phòng tập thành công', true);
    router.push({ name: 'list-rooms' });
  } catch (error) {
    console.error('Error updating room:', error);
  }
};

const addEquipment = () => {
  equipments.value.push({ name: '', quantity: 1 });
};

const removeEquipment = (index: number) => {
  equipments.value.splice(index, 1);
};

onMounted(() => {
  fetchRoomDetails();
  fetchEquipmentOptions();
  fetchRoomEquipments();
});
</script>
