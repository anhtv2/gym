<template>
  <!-- BEGIN: Thông tin hội viên -->
  <div class="intro-y box lg:mt-5">
    <div class="intro-y flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
      <h2 class="text-lg font-medium mr-auto">Đăng ký theo giáo trình có HLV</h2>
    </div>
    <!-- BEGIN: Striped Rows -->

    <!-- Chọn hội viên -->
    <div class="p-5">
      <!-- Chọn hội viên -->
      <div class="mb-4">
        <label class="form-label">Chọn hội viên</label>
        <select v-model="selectedMemberId" class="form-control">
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

      <!-- Chọn dịch vụ -->
      <div class="mb-4">
        <label class="form-label">Chọn dịch vụ</label>
        <select v-model="selectedServiceId" class="form-control" @change="fetchSessionsAndWorkouts">
          <option v-for="service in serviceOptions" :key="service.value" :value="service.value">
            {{ service.label }}
          </option>
        </select>
      </div>

      <!-- Hiển thị sessions và chọn khung giờ có thể tập luyện -->
      <div v-if="sessions.length > 0">
        <div v-for="(session) in sessions" :key="session.id" class="mb-4">
          <h3 class="text-lg font-medium">{{ session.name }}</h3>
          <div class="flex items-center mb-2">
            <label class="form-label mr-2 flex-shrink-0" style="width: 100px;">Chọn ngày:</label>
            <select v-model="session.trainingDay" class="form-control mr-2">
              <option v-for="day in daysOfWeek" :key="day.value" :value="day.value">
                {{ day.label }}
              </option>
            </select>
          </div>
          <div v-for="(workout) in session.workouts" :key="workout.id" class="mt-2">
            <label class="font-medium">{{ workout.name }}</label>
            <div class="flex items-center mt-2">
              <input type="time" v-model="workout.trainingTime.start" class="form-control mr-2" placeholder="Thời gian bắt đầu" @change="updateEndTime(session, workout)" />
              <input type="time" v-model="workout.trainingTime.end" class="form-control mr-2" placeholder="Thời gian kết thúc" disabled />
              <select v-model="workout.trainingTime.trainer" class="form-control">
                <option value="">-- Chọn giáo viên --</option>
                <option v-for="trainer in workout.trainers" :key="trainer.id" :value="trainer.id">
                  {{ trainer.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Striped Rows -->

    <!-- END: Thông tin hội viên -->
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
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMembers } from '@/api/members';
import { getServices, getServiceSessions } from '@/api/services';
import { createListBooking } from '@/api/booking';
import { showMessage } from '@/common/utils/helpers';
import { TypeValue } from '@/common/enums/services/type';

const selectedMemberId = ref<string | null>(null);
const selectedServiceId = ref<string | null>(null);
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const memberOptions = ref<{ value: string; label: string }[]>([]);
const serviceOptions = ref<{ value: string; label: string }[]>([]);
const sessions = ref<Session[]>([]);
const errorDetails = ref<{ note: string; reason: string }[]>([]);
const daysOfWeek = [
  { value: 1, label: 'Thứ Hai' },
  { value: 2, label: 'Thứ Ba' },
  { value: 3, label: 'Thứ Tư' },
  { value: 4, label: 'Thứ Năm' },
  { value: 5, label: 'Thứ Sáu' },
  { value: 6, label: 'Thứ Bảy' },
  { value: 0, label: 'Chủ Nhật' },
];

interface Trainer {
  id: number;
  name: string;
}

interface Workout {
  id: number;
  name: string;
  duration: number;  // Thời lượng buổi tập tính bằng phút
  trainers: Trainer[];
  trainingTime: {
    start: string;
    end: string;  // Thời gian kết thúc buổi tập
    trainer: number;
  };
}

interface Session {
  id: number;
  name: string;
  trainingDay: number | null;
  workouts: Workout[];
}

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

const fetchSessionsAndWorkouts = async () => {
  if (!selectedServiceId.value) return;

  try {
    const response = await getServiceSessions(selectedServiceId.value);
    sessions.value = response.data.map((session: any) => ({
      id: session.id,
      name: session.name,
      trainingDay: null,
      workouts: session.workouts.map((workout: any) => ({
        id: workout.id,
        name: workout.name,
        duration: workout.duration,
        trainers: workout.trainers,
        trainingTime: { start: '', end: '', trainer: 0 }
      }))
    }));
  } catch (error) {
    console.error(error);
  }
};

const updateEndTime = (session: Session, workout: Workout) => {
  if (workout.trainingTime.start) {
    const [hours, minutes] = workout.trainingTime.start.split(':').map(Number);
    const startTime = new Date();
    startTime.setHours(hours, minutes);
    const endTime = new Date(startTime.getTime() + workout.duration * 60000);
    workout.trainingTime.end = endTime.toTimeString().slice(0, 5);
  } else {
    workout.trainingTime.end = '';
  }
};

const registerTrainingSession = async () => {
  if (!selectedMemberId.value || !startDate.value || !endDate.value) {
    showMessage('Vui lòng nhập đầy đủ thông tin', false);
    return;
  }
  // Kiểm tra các buổi tập đã được điền đầy đủ thông tin
  for (const session of sessions.value) {
    if (!session.trainingDay) {
      showMessage(`Vui lòng chọn ngày cho buổi tập "${session.name}"`, false);
      return;
    }
    for (const workout of session.workouts) {
      if (!workout.trainingTime.start) {
        showMessage(`Vui lòng chọn thời gian cho buổi tập "${workout.name}"`, false);
        return;
      }
    }
  }
  const bookingData = {
    memberId: selectedMemberId.value,
    startDate: startDate.value,
    endDate: endDate.value,
    trainingTimes: sessions.value.flatMap(session =>
      session.workouts.map(workout => ({
        dayOfWeek: session.trainingDay,
        start_time: workout.trainingTime.start,
        end_time: workout.trainingTime.end,
        workout: workout.id,
        trainer: workout.trainingTime.trainer
      }))
    ),
  };

  try {
    await createListBooking(bookingData);
  } catch (error: any) {
    if (error?.response?.data?.details) {
      errorDetails.value = error.response.data.details;
    }
  }
};

onMounted(async () => {
  await fetchMembers();
  await fetchServices();
});
</script>
