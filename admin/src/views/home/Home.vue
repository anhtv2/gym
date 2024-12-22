<template>
  <!-- BEGIN: General Report -->
  <div class="col-span-12 mt-8">
    <!-- Overview Section -->
    <div class="intro-y flex items-center h-10">
      <h2 class="text-lg font-medium truncate mr-5">Tổng quan</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y" v-for="(stat, index) in stats" :key="index">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex items-center">
              <div class="report-box__icon">
                <component :is="stat.icon" class="report-box__icon" :class="stat.iconClass" />
              </div>
            </div>
            <div class="text-xl font-bold leading-tight mt-6">{{ stat.label }}</div>
            <div class="text-base text-gray-600 mt-1 leading-tight"> {{ stat.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Current Workout Information Section -->
    <!-- <div class="intro-y flex items-center h-10 mt-8">
      <h2 class="text-lg font-medium truncate mr-5">Thông tin tập luyện</h2>
    </div>
    <div class="box mt-5">
      <div class="overflow-x-auto mt-5">
        <table class="table">
          <thead>
            <tr>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">#</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Tên Khu Vực</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Số người đang tập luyện</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Sức chứa tối đa</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-gray-200 dark:bg-dark-1" v-for="(area, index) in workoutAreas" :key="area.id">
              <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
              <td class="border-b dark:border-dark-5">{{ area.name }}</td>
              <td class="border-b dark:border-dark-5">{{ area.current }}</td>
              <td class="border-b dark:border-dark-5">{{ area.capacity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->

    <!-- Potential Members Section -->
    <div class="intro-y flex items-center h-10 mt-8">
      <h2 class="text-lg font-medium truncate mr-5">Hội viên tiềm năng</h2>
    </div>
    <div class="box mt-5">
      <div class="overflow-x-auto mt-5">
        <table class="table">
          <thead>
            <tr>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">#</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Tên</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Email</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Điện thoại</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Tổng số đặt lịch</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-gray-200 dark:bg-dark-1" v-for="(member, index) in members" :key="member.member_id">
              <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
              <td class="border-b dark:border-dark-5">{{ member.member_name }}</td>
              <td class="border-b dark:border-dark-5">{{ member.member_email }}</td>
              <td class="border-b dark:border-dark-5">{{ member.member_phone }}</td>
              <td class="border-b dark:border-dark-5">{{ member.booking_count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Available Trainers Section -->
    <div class="intro-y flex items-center h-10 mt-8">
      <h2 class="text-lg font-medium truncate mr-5">Huấn luyện viên đang rảnh</h2>
    </div>
    <div class="box mt-5">
      <div class="overflow-x-auto mt-5">
        <table class="table">
          <thead>
            <tr>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">#</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Tên</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Email</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Điện thoại</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Kinh nghiệm</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Chuyên môn</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-gray-200 dark:bg-dark-1" v-for="(trainer, index) in trainers" :key="trainer.trainer_staff_id">
              <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
              <td class="border-b dark:border-dark-5">{{ trainer.user_name }}</td>
              <td class="border-b dark:border-dark-5">{{ trainer.user_email }}</td>
              <td class="border-b dark:border-dark-5">{{ trainer.user_phone }}</td>
              <td class="border-b dark:border-dark-5">{{ trainer.trainer_experience }}</td>
              <td class="border-b dark:border-dark-5">{{ trainer.trainer_specialty }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Exercises Section -->
    <div class="intro-y flex items-center h-10 mt-8">
      <h2 class="text-lg font-medium truncate mr-5">Bài tập</h2>
    </div>
    <div class="box mt-5">
      <div class="overflow-x-auto mt-5">
        <table class="table">
          <thead>
            <tr>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">#</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Tên Bài Tập</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Mô tả</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Thời lượng</th>
              <th class="border-b-2 dark:border-dark-5 whitespace-nowrap">Ảnh đại diện</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-gray-200 dark:bg-dark-1" v-for="(exercise, index) in workouts" :key="exercise.id">
              <td class="border-b dark:border-dark-5">{{ index + 1 }}</td>
              <td class="border-b dark:border-dark-5">{{ exercise.name }}</td>
              <td class="border-b dark:border-dark-5">{{ exercise.description }}</td>
              <td class="border-b dark:border-dark-5">{{ exercise.duration }} phút</td>
              <td class="border-b dark:border-dark-5"><img :src="exercise.thumbnail" class="h-16 w-16 object-cover rounded" alt="Exercise Thumbnail"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { UsersIcon } from 'lucide-vue-next';
import { getDashboardData } from '@/api/dashboard';

const stats = ref([
  { icon: UsersIcon, iconClass: '', label: 'Số lượt đặt chỗ', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Số hội viên', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Hội viên hoạt động', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Hội viên không hoạt động', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Hội viên sắp hết hạn', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Số khu vực', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Số HLV', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Số bài tập', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Doanh thu tổng', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Tổng doanh thu', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
  { icon: UsersIcon, iconClass: '', label: 'Tổng tiền phải thu', value: '', percentage: '', indicatorClass: 'bg-theme-9' },
]);

const workoutAreas = ref([]);
const members = ref([
  { member_id: 1, member_name: '', member_email: '', member_phone: '', booking_count: 0 }
]);
const trainers = ref([
  { trainer_staff_id: 1, user_name: '', user_email: '', user_phone: '', trainer_experience: '', trainer_specialty: '' }
]);
const workouts = ref([
  { id: 1, name: '', description: '', duration: 0, thumbnail: '' }
]);

const fetchData = async () => {
  try {
    const response = await getDashboardData();
    stats.value[0].value = response.data.data.dashboard.data.bookingCount;
    stats.value[1].value = response.data.data.dashboard.data.memberCount;
    stats.value[2].value = response.data.data.dashboard.data.activeMembers;
    stats.value[3].value = response.data.data.dashboard.data.inactiveMembers;
    stats.value[4].value = response.data.data.dashboard.data.expiringMembers;
    stats.value[5].value = response.data.data.dashboard.data.roomCount;
    stats.value[6].value = response.data.data.dashboard.data.trainerCount;
    stats.value[7].value = response.data.data.dashboard.data.workoutCount;
    stats.value[8].value = response.data.data.dashboard.data.totalSales;
    stats.value[9].value = response.data.data.dashboard.data.totalRevenue || 0;
    stats.value[10].value = response.data.data.dashboard.data.totalReceivable;


    workoutAreas.value = response.data.data.dashboard.meta;
    members.value = response.data.data.member.data;
    trainers.value = response.data.data.trainer.data;
    workouts.value = response.data.data.workout.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

</script>

