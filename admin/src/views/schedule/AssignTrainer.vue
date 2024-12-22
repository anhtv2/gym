<template>
  <div class="grid grid-cols-12 gap-5 mt-5">
    <!-- BEGIN: Trainer Side Menu -->
    <div class="col-span-12 xl:col-span-4 2xl:col-span-3">
      <div class="box p-5 intro-y mt-14">
        <button type="button" class="btn btn-primary w-full mt-2" @click="autoAssignTrainers" :disabled="isLoading">
          <Edit3Icon class="w-4 h-4 mr-2" />
          <template v-if="isLoading">
            <LoadingIcon class="w-4 h-4 mr-2 animate-spin" />
            Đang tải...
          </template>
          <template v-else>
            Tạo lịch tập tự động
          </template>
        </button>
        <div id="trainer-list" class="border-t border-b border-slate-200/60 dark:border-darkmode-400 mt-6 mb-5 py-3">
          <h2 class="p-3 font-medium">Danh sách huấn luyện viên đề cử cho yêu cầu số: {{ currentRequestId }}</h2>
          <div v-if="currentRequestTrainers.length">
            <div v-for="element in currentRequestTrainers" :key="element.name">
              <div class="trainer-item p-3 -mx-3 cursor-pointer transition duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md flex items-center">
                <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <div class="pr-10">
                  <div class="trainer-name truncate">{{ element.name }} - {{ element.bookingCount }} Booking</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500 text-center">Không có huấn luyện viên nào.</div>
        </div>
      </div>
    </div>
    <!-- END: Trainer Side Menu -->

    <!-- BEGIN: Requests Content -->
    <div class="col-span-12 xl:col-span-8 2xl:col-span-9">
      <!-- Action Buttons -->
      <div class="flex justify-end mb-4">
        <button v-if="violations.length" @click="showModal" class="btn btn-danger mr-2">Xem vi phạm</button>
        <button class="btn btn-primary mr-2" @click="saveAssignments">
          Lưu
        </button>
        <button class="btn btn-secondary" @click="resetAssignments">
          Reset
        </button>
      </div>
      <!-- End Action Buttons -->

      <div class="box p-5 h-screen overflow-y-auto">
        <h3 class="text-lg font-medium mb-4">Danh sách yêu cầu tập luyện</h3>
        <div v-if="trainingRequests.length">
          <div v-for="request in trainingRequests" :key="request.id" class="mb-4 p-4 border border-gray-200 rounded-md relative flex flex-col xl:flex-row items-start xl:items-center" @click="updateCurrentRequestTrainers(request.id)">
            <!-- Workout Information -->
            <div class="event p-3 mx-3 cursor-pointer transition duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md flex-grow">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
                <div class="pr-10">
                  <div class="event__title truncate">{{ request.memberName }} (Booking ID: {{ request.id }})</div>
                  <div class="text-slate-500 text-xs mt-0.5">
                    <span class="event__days">{{ request.workoutName }}</span>
                  </div>
                  <div class="text-slate-500 text-xs mt-0.5">
                    <span class="event__days">{{ request.date }}</span>
                    <span class="mx-1">•</span> {{ request.start_time }} -{{ request.end_time }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Trainer Dropdown -->
            <div class="w-full xl:w-auto flex-grow xl:flex-grow-0 mx-auto my-auto">
              <label for="trainerSelect" class="block text-sm font-medium text-gray-700">Huấn luyện viên:</label>
              <select id="trainerSelect" class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" v-model="request.assignedTrainer" @change="updateTrainer(request.id, request.assignedTrainer)">
                <option :value="null">Chưa được phân công</option>
                <option v-for="trainer in trainers" :key="trainer.id" :value="trainer" :selected="request.assignedTrainer?.id === trainer.id">
                  {{ trainer.name }}
                </option>
              </select>
            </div>

            <div class="flex items-center mt-2 xl:mt-8 mx-2">
              <button class="btn btn-danger" @click="removeRequest(request.id)">
                Xóa
              </button>
              <button class="btn btn-primary ml-2" @click="updateCurrentRequestTrainers(request.id)">
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500 text-center">Không có yêu cầu nào cho tuần tới.</div>
      </div>
    </div>
    <!-- END: Requests Content -->
  </div>

  <Modal :show="isModalVisible" @hide="hideModal">
    <ModalBody>
      <div class="p-5 text-center">
        <!-- Violation Display -->
        <div v-if="violations.length" class="mb-4 p-4 border border-red-200 bg-red-100 rounded-md">
          <h3 class="text-lg font-medium text-danger">Vi phạm mềm:{{ violations.length }}</h3>
          <ul class="list-disc list-inside">
            <li v-for="violation,index in violations" :key="index" class="text-red-700">
              {{ violation }}
            </li>
          </ul>
        </div>
        <!-- End Violation Display -->
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideModal">
          Hủy
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getBookings, autoAssignBooking } from '@/api/booking';
import { getTrainers } from '@/api/trainers';
import { recommendTrainers, saveBooking } from '@/api/booking';
import { showMessage } from '@/common/utils/helpers';

interface Trainer {
  id: number;
  name: string;
  bookingCount?: number;
}

interface TrainingRequest {
  id: number;
  memberName: string;
  workoutName: string;
  workoutId: number;
  date: string;
  start_time: string;
  end_time: string;
  assignedTrainer: Trainer | null;
}


const trainers = ref<Trainer[]>([]);
const trainingRequests = ref<TrainingRequest[]>([]);
const initialBookings = ref<TrainingRequest[]>([]);
const currentRequestTrainers = ref<Trainer[]>([]);
const currentRequestId = ref<number | null>(null);
const violations = ref<string[]>([]);
const isLoading = ref(false);
const isModalVisible = ref(false);

const hideModal = () => {
  isModalVisible.value = false;
};

const showModal = () => {
  isModalVisible.value = true;
};

const fetchTrainers = async (): Promise<void> => {
  try {
    const res = await getTrainers({});
    trainers.value = res.data.map((trainer: any) => ({
      id: trainer.TrainerId,
      name: trainer.name
    }));
  } catch (error) {
    console.error('Error fetching trainers:', error);
  }
};

const fetchBookings = async (): Promise<void> => {
  try {
    const today = new Date();
    const nextSunday = new Date(today.setDate(today.getDate() + (0 - today.getDay()) + 7));
    const nextSaturday = new Date(nextSunday.getTime() + 6 * 24 * 60 * 60 * 1000);

    const startOfWeekISO = nextSunday.toISOString().split('T')[0];
    const endOfWeekISO = nextSaturday.toISOString().split('T')[0];

    const response = await getBookings({ start_date: startOfWeekISO, end_date: endOfWeekISO });
    trainingRequests.value = response.data.map((booking: any) => ({
      id: booking.bookingId,
      memberName: booking.memberName,
      workoutName: booking.workoutName,
      workoutId: booking.workoutId,
      date: booking.date,
      start_time: booking.startTime,
      end_time: booking.endTime,
      assignedTrainer: booking.bookingTrainerId ? {
        id: booking.bookingTrainerId,
        name: booking.bookingTrainerName
      } : null
    }));

    initialBookings.value = JSON.parse(JSON.stringify(trainingRequests.value)); // Store the initial state
  } catch (error) {
    console.error('Error fetching training requests:', error);
  }
};

const autoAssignTrainers = async (): Promise<void> => {
  try {
    isLoading.value = true;
    const today = new Date();
    const nextSunday = new Date(today.setDate(today.getDate() + (0 - today.getDay()) + 7))
    const nextSaturday = new Date(nextSunday.getTime() + 6 * 24 * 60 * 60 * 1000);

    const startOfWeekISO = nextSunday.toISOString().split('T')[0];
    const endOfWeekISO = nextSaturday.toISOString().split('T')[0];
    const response = await autoAssignBooking({ startDate: startOfWeekISO, endDate: endOfWeekISO, extraBookings: {} });
    if (response) {
      const solution = response.data.solution;
      solution.forEach((assignment: any) => {
        const request = trainingRequests.value.find(request => request.id === assignment.booking_id);
        if (request) {
          const assignedTrainer = trainers.value.find(trainer => trainer.id === assignment.trainer_id);
          if (assignedTrainer) {
            request.assignedTrainer = assignedTrainer;
          }
        }
      });

      const violationsData = response.data.violations;
      violations.value = violationsData

      showMessage('Huấn luyện viên đã được phân công tự động!', true);
    }
  } catch (error) {
    console.error('Error auto-assigning trainers:', error);
  } finally {
    isLoading.value = false;
  }
};

const saveAssignments = async (): Promise<void> => {
  try {
    const response = await saveBooking(trainingRequests.value);
    if (response.statusCode === 200) {
      showMessage('Lưu thành công!', true);
    }
  } catch (error) {
    showMessage('Lưu thất bại!', false);
  }
};

const resetAssignments = (): void => {
  trainingRequests.value = JSON.parse(JSON.stringify(initialBookings.value)); // Reset to initial state
};

const removeRequest = (requestId: number): void => {
  trainingRequests.value = trainingRequests.value.filter(request => request.id !== requestId);
};

const updateTrainer = (requestId: number, trainer: Trainer | null): void => {
  const request = trainingRequests.value.find(request => request.id === requestId);
  if (request) {
    request.assignedTrainer = trainer;
  }
};

const calulateBookingCount = (trainerId: number) => {
  return trainingRequests.value.filter(request => request.assignedTrainer?.id === trainerId).length;
};
// Loại bỏ các huấn luyện viên đang làm việc trong cùng thời gian của yêu cầu hiện tại
const filterConflictCurrentRequestTrainers = () => {
  const currentRequest = trainingRequests.value.find(request => request.id === currentRequestId.value);
  if (!currentRequest) return;

  const date = currentRequest.date;
  const start_time = currentRequest.start_time;
  const end_time = currentRequest.end_time;

  currentRequestTrainers.value = currentRequestTrainers.value.filter(trainer => {
    const bookings = trainingRequests.value.filter(request => request.assignedTrainer?.id === trainer.id);
    return !bookings.some(request => {
      if (request.date === date) {
        return (start_time >= request.start_time && start_time < request.end_time) ||
          (end_time > request.start_time && end_time <= request.end_time);
      }
      return false;
    });
  });

};

const updateCurrentRequestTrainers = async (requestId: number) => {
  const request = trainingRequests.value.find(request => request.id === requestId);
  if (request) {
    currentRequestId.value = requestId;
    console.log('currentRequestId:', currentRequestId.value);
    const response = await recommendTrainers(request.id.toString());
    currentRequestTrainers.value = response.data.map((trainer: any) => ({
      id: trainer.id,
      name: trainer.staff.user.name,
      bookingCount: calulateBookingCount(trainer.id)
    }));
    console.log('currentRequestTrainers:', currentRequestTrainers.value);
    filterConflictCurrentRequestTrainers();
    console.log('currentRequestTrainers:', currentRequestTrainers.value);
    // Sort trainers by booking count
    currentRequestTrainers.value.sort((a, b) => (a.bookingCount ?? 0) - (b.bookingCount ?? 0));
  }
};

onMounted(async () => {
  await Promise.all([fetchTrainers(), fetchBookings()]);
});

interface AutoAssignResponse {
  success: boolean;
  data: {
    solution: Array<{
      trainer_id: number;
      booking_id: number;
    }>
  };
}
</script>
