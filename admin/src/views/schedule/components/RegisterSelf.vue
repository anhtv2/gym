<template>
  <!-- BEGIN: Thông tin hội viên -->
  <div class="intro-y box lg:mt-5">
    <div class="intro-y flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
      <h2 class="text-lg font-medium mr-auto">Đăng ký tập luyện theo bài tập tự do</h2>
    </div>
    <!-- BEGIN: Striped Rows -->

    <!-- Chọn hội viên -->
    <div class="p-5">
      <!-- Chọn hội viên -->
      <div class="mb-4">
        <label class="form-label">Chọn hội viên</label>
        <select v-model="selectedMemberId" class="form-control">
          <option value=0>-- Chọn hội viên --</option>
          <option v-for="member in memberOptions" :key="member.value" :value="member.value">
            {{ member.label }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="form-label">Bắt đầu từ ngày</label>
        <input type="date" v-model="startDate" class="form-control" />
      </div>

      <div class="mb-4">
        <label class="form-label">Kết thúc vào ngày</label>
        <input type="date" v-model="endDate" class="form-control" />
      </div>

      <!-- Khung giờ có thể tập luyện -->
      <div v-for="(day, dayIndex) in daysOfWeek" :key="day.value">
        <div class="mb-4">
          <h3 class="text-lg font-medium">{{ day.label }}</h3>
          <div v-for="(time, timeIndex) in getTimesByDay(dayIndex)" :key="timeIndex" class="flex items-center mt-2">
            <input type="time" v-model="time.start_time" class="form-control mr-2" placeholder="Thời gian bắt đầu" @change="updateEndTime(dayIndex, timeIndex)" />
            <input type="time" v-model="time.end_time" class="form-control mr-2" placeholder="Thời gian kết thúc" disabled />
            <select v-model="time.workout" class="form-control mr-2" @change="updateEndTime(dayIndex, timeIndex)">
              <option value="">-- Chọn bài tập --</option>
              <option v-for="workout in workoutOptions" :key="workout.value" :value="workout.value">
                {{ workout.label }}
              </option>
            </select>
            <select v-model="time.trainer" class="form-control">
              <option value="">-- Chọn giáo viên --</option>
              <option v-for="trainer in trainerOptions" :key="trainer.value" :value="trainer.value">
                {{ trainer.label }}
              </option>
            </select>
            <button class="btn btn-danger ml-2" @click="removeTimeSlot(dayIndex, timeIndex)">Xóa</button>
          </div>
          <button class="btn btn-outline-primary border-dashed w-full mt-4" @click="addTimeSlot(dayIndex)">
            <PlusIcon class="w-4 h-4 mr-2" /> Thêm khung giờ
          </button>
        </div>
      </div>

    </div>
    <!-- END: Striped Rows -->

    <div class="p-5">
      <button class="btn btn-primary w-20" @click="registerTrainingSession">Đăng ký</button>
      <button class="btn btn-outline-secondary w-20 ml-2">Hủy</button>
    </div>

    <!-- Hiển thị lỗi chi tiết -->
    <div v-if="errorDetails.length > 0" class="p-5">
      <h3 class="text-lg font-medium text-red-600">Lỗi:</h3>
      <ul class="list-disc list-inside">
        <li v-for="error in errorDetails" :key="error.note">
          {{ error.note }} - {{ error.reason }}
        </li>
      </ul>
    </div>
  </div>
  <!-- END: Thông tin hội viên -->
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getMembers } from '@/api/members';
import { getServices } from '@/api/services';
import { getWorkouts } from '@/api/workouts';
import { getTrainers } from '@/api/trainers'; // Assuming this API exists
import { createListBooking } from '@/api/booking';
import { TypeValue } from '@/common/enums/services/type';
import { showMessage } from '@/common/utils/helpers';

const selectedMemberId = ref<string | null>(null);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const memberOptions = ref<{ value: string; label: string }[]>([]);
const serviceOptions = ref<{ value: string; label: string }[]>([]);
const workoutOptions = ref<{ value: string; label: string }[]>([]);
const trainerOptions = ref<{ value: string; label: string }[]>([]);
const trainingTimes = ref<{
  dayOfWeek: number;
  start_time: string;
  end_time: string;
  workout: number;
  trainer: number;
}[][]>([
  [], // Monday
  [], // Tuesday
  [], // Wednesday
  [], // Thursday
  [], // Friday
  [], // Saturday
  [], // Sunday
]);

const errorDetails = ref<{ note: string; reason: string }[]>([]);

const daysOfWeek = [
  { value: 0, label: 'Chủ Nhật' },
  { value: 1, label: 'Thứ Hai' },
  { value: 2, label: 'Thứ Ba' },
  { value: 3, label: 'Thứ Tư' },
  { value: 4, label: 'Thứ Năm' },
  { value: 5, label: 'Thứ Sáu' },
  { value: 6, label: 'Thứ Bảy' },
];

const updateEndTime = (dayIndex: number, timeIndex: number) => {
  const timeSlot = trainingTimes.value[dayIndex][timeIndex];
  const workout = workoutOptions.value.find(w => w.value === timeSlot.workout);
  
  if (timeSlot.start_time && workout) {
    const [hours, minutes] = timeSlot.start_time.split(':').map(Number);
    const endDate = new Date();
    endDate.setHours(hours, minutes + workout.duration);
    
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
    timeSlot.end_time = `${endHours}:${endMinutes}`;
  }
};


const fetchMembers = async () => {
  try {
    const response = await getMembers({});
    memberOptions.value = response.data.map((member: any) => ({
      value: member.MemberId,
      label: `${member.MemberName} - ${member.MemberPhone}`
    }));
  } catch (error) {
    console.error(error);
  }
};

const fetchServices = async () => {
  try {
    const response = await getServices({ field: 'table.service_type', type: '=', value: TypeValue.PRIVATE.toString() });
    serviceOptions.value = response.data.map((service: any) => ({
      value: service.id,
      label: service.name,
    }));
  } catch (error) {
    console.error(error);
  }
};

const fetchWorkouts = async () => {
  try {
    const response = await getWorkouts({});
    workoutOptions.value = response.data.map((workout: any) => ({
      value: workout.id,
      label: workout.name,
      duration: workout.duration,
    }));
  } catch (error) {
    console.error(error);
  }
};

const fetchTrainers = async () => {
  try {
    const response = await getTrainers({});
    trainerOptions.value = response.data.map((trainer: any) => ({
      value: trainer.TrainerId,
      label: trainer.name,
    }));
  } catch (error) {
    console.error(error);
  }
};

const addTimeSlot = (dayIndex: number) => {
  trainingTimes.value[dayIndex].push({
    dayOfWeek: dayIndex, start_time: '', end_time: '', workout: 0, trainer: 0
  });
};

const removeTimeSlot = (dayIndex: number, timeIndex: number) => {
  trainingTimes.value[dayIndex].splice(timeIndex, 1);
};

const registerTrainingSession = async () => {
  if (!startDate.value || !endDate.value) {
    console.error('Start date and end date are required');
    return;
  }

  const bookingData = {
    memberId: selectedMemberId.value,
    startDate: startDate.value,
    endDate: endDate.value,
    trainingTimes: trainingTimes.value.flat()
  };

  try {
    await createListBooking(bookingData);
    showMessage('Đăng ký thành công', true);
  } catch (error: any) {
    if (error?.response?.data?.details) {
      errorDetails.value = error.response.data.details;
    }
  }
};

const getTimesByDay = (dayIndex: number) => {
  return computed(() => trainingTimes.value[dayIndex]).value;
};

onMounted(async () => {
  await fetchMembers();
  await fetchServices();
  await fetchWorkouts();
  await fetchTrainers();
});
</script>
