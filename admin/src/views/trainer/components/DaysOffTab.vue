<template>
  <div class="intro-y box lg:mt-5">
    <div class="p-5 font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400">
      Lịch làm việc
    </div>
    <div class="p-5">
      <div class="mt-5 overflow-x-auto">
        <table class="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Ca/Ngày</th>
              <th v-for="day in daysOfWeek" :key="day.id" class="border border-gray-300 p-2">{{ day.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(shift, index) in shifts" :key="index">
              <td class="border border-gray-300 p-2 text-center">{{ shift.label }}</td>
              <td v-for="day in daysOfWeek" :key="day.id" class="border border-gray-300 p-2 text-center">
                <button class="w-10 h-10 border border-gray-300 bg-white cursor-pointer inline-flex justify-center items-center rounded-lg" :class="{ 'bg-primary text-white': isSelected(day.id, shift.id) }" @click="toggleShift(day.id, shift.id)">
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" class="btn btn-primary w-20 mt-3" @click="updateMemberFunc">
        Lưu
      </button>
      <router-link :to="{ name: 'list-members' }" class="btn btn-outline-secondary ml-3 w-20 mt-3">
        Hủy
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getWorkSchedule, updateWorkSchedule } from '@/api/trainers';
import router from '@/router';
import { showMessage } from '@/common/utils/helpers';

const selectedShifts = ref<{ [key: number]: number[] }>({});

const daysOfWeek = [
  { id: 0, label: 'Chủ Nhật' },
  { id: 1, label: 'Thứ 2' },
  { id: 2, label: 'Thứ 3' },
  { id: 3, label: 'Thứ 4' },
  { id: 4, label: 'Thứ 5' },
  { id: 5, label: 'Thứ 6' },
  { id: 6, label: 'Thứ 7' }
];
const shifts = [
  { id: 0, label: 'Sáng' },
  { id: 1, label: 'Chiều' },
  { id: 2, label: 'Tối' }
];

const updateMemberFunc = () => {
  // Your update logic here
  const data = formatedData();
  const paramId = router.currentRoute.value.params.id?.toString() || '';
  updateWorkSchedule(paramId, data).then((response) => {
    if (response.statusCode === 200) {
      showMessage('Cập nhật lịch làm việc thành công', true);
    } else {
      showMessage('Cập nhật lịch làm việc thất bại', false);
    }
  });
};

onMounted(async () => {
  await fetchWorkSchedule();
});

const fetchWorkSchedule = async () => {
  const paramId = router.currentRoute.value.params.id?.toString() || '';
  const response = await getWorkSchedule(paramId);
  if (response.statusCode === 200) {
    const data = JSON.parse(response.data[0].WorkSchedules);
    data.forEach((item: any) => {
      if (!selectedShifts.value[item.day]) {
        selectedShifts.value[item.day] = [];
      }
      if (item.isSelected) {
        selectedShifts.value[item.day].push(item.shift);
      }
    });
  }
};

const toggleShift = (day: number, shift: number) => {
  if (!selectedShifts.value[day]) {
    selectedShifts.value[day] = [];
  }
  const index = selectedShifts.value[day].indexOf(shift);
  if (index === -1) {
    selectedShifts.value[day].push(shift);
  } else {
    selectedShifts.value[day].splice(index, 1);
  }
};

const isSelected = (day: number, shift: number) => {
  return selectedShifts.value[day] && selectedShifts.value[day].includes(shift);
};

const formatedData = () => {
  const data: { day: number; shift: number; isSelected: boolean; }[] = [];
  for (const day in selectedShifts.value) {
    selectedShifts.value[day].forEach((shift: number) => {
      data.push({ day: Number(day), shift: Number(shift), isSelected: true });
    });
  }
  return data;
};
</script>
