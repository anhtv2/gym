<template>
  <div>
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Lịch tập hội viên</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn btn-primary shadow-md mr-2">In Lịch tập</button>
        <span class="ml-auto sm:ml-0">
          <button class="btn px-2 box" @click="showFilterModal">
            <span class="w-5 h-5 flex items-center justify-center">
              <FilterIcon class="w-4 h-4" />
            </span>
          </button>
        </span>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5 mt-5">
      <!-- BEGIN: Calendar Side Menu -->
      <div class="col-span-12 xl:col-span-4 2xl:col-span-3">
        <div class="box p-5 intro-y">
          <button type="button" class="btn btn-primary w-full mt-2">
            <Edit3Icon class="w-4 h-4 mr-2" />Tạo lịch tập
          </button>
          <div id="calendar-events" class="border-t border-b border-slate-200/60 dark:border-darkmode-400 mt-6 mb-5 py-3">
            <h2 class="p-3 font-medium">Danh sách lịch tập hôm nay</h2>
            <div v-for="(book) in visibleTodayBooking" :key="book.bookingId" class="relative">
              <div class="event p-3 -mx-3 cursor-pointer transition duration-300 ease-in-out hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md flex items-center">
                <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
                <div class="pr-10">
                  <div class="event__title truncate">{{ book.memberName }}</div>
                  <div class="text-slate-500 text-xs mt-0.5">
                    <span class="event__days">{{ book.workoutName }}</span>
                    <span class="mx-1">•</span> {{ book.trainerName }}
                  </div>
                  <div class="text-slate-500 text-xs mt-0.5">
                    <span class="event__days">{{ book.date }}</span>
                    <span class="mx-1">•</span> {{ book.time }}
                  </div>
                </div>
              </div>
              <a class="flex items-center absolute top-0 bottom-0 my-auto right-0" href="">
                <EditIcon class="w-4 h-4 text-slate-500" />
              </a>
            </div>

            <div v-if="todayBooking.length > visibleTodayBooking.length" class="text-center mt-4">
              <button class="btn btn-outline-secondary" @click="showMoreBookings">Hiển thị thêm</button>
            </div>

            <div v-if="todayBooking.length === 0" class="text-slate-500 p-3 text-center">
              No events yet
            </div>
          </div>
        </div>
      </div>
      <!-- END: Calendar Side Menu -->

      <!-- BEGIN: Calendar Content -->
      <div class="col-span-12 xl:col-span-8 2xl:col-span-9">
        <div class="box p-5">
          <Calendar :externalEvents="events" @fetchBookings="fetchBookings" />
        </div>
      </div>
      <!-- END: Calendar Content -->
    </div>

    <!-- Filter Modal -->
    <Modal :show="isFilterModalVisible" @hide="hideFilterModal">
      <ModalBody>
        <div class="p-5">
          <h3 class="text-lg font-medium">Lọc lịch tập hội viên</h3>
          <div id="tabulator-html-filter-form" class="mr-auto mt-5">
            <div class="flex items-center mr-4">
              <label class="w-24 flex-none mr-2">Trường</label>
              <select id="tabulator-html-filter-field" v-model="filter.field" class="form-select mt-0 w-full">
                <option value="memberUser.name">Tên hội viên</option>
                <option value="memberUser.phone">Số điện thoại</option>
              </select>
            </div>
            <div class="flex items-center mr-4 mt-2">
              <label class="w-24 flex-none mr-2">So sánh</label>
              <select id="tabulator-html-filter-type" v-model="filter.type" class="form-select mt-0 w-full">
                <option value="like" selected>like</option>
                <option value="=">=</option>
                <option value="<">&lt;</option>
                <option value="<=">&lt;=</option>
                <option value=">">></option>
                <option value=">=">>=</option>
                <option value="!=">!=</option>
              </select>
            </div>
            <div class="flex items-center mr-4 mt-0">
              <label class="w-24 flex-none mr-2">Value</label>
              <input id="tabulator-html-filter-value" type="text" class="form-control w-full mt-2" placeholder="Giá trị..." v-model="filter.value" />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div class="px-5 pb-8 flex justify-end">
          <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideFilterModal">Hủy</button>
          <button type="button" class="btn btn-primary w-24" @click="filterBookingFunc">Lọc</button>
        </div>
      </ModalFooter>
    </Modal>
  </div>
</template>

<script setup>
import Calendar from '@/components/calendar/Main.vue';
import { getBookings } from '@/api/booking';
import { computed, onMounted, ref } from 'vue';

const events = ref([]);
const todayBooking = ref([]);
const visibleTodayBookingCount = ref(5); // Number of initially visible bookings

const isFilterModalVisible = ref(false);

const showFilterModal = () => {
  isFilterModalVisible.value = true;
};

const hideFilterModal = () => {
  isFilterModalVisible.value = false;
};

const filter = ref({
  field: 'memberUser.name',
  type: 'like',
  value: '',
});

const filterBookingFunc = async () => {
  await fetchBookings(filter.value);
  console.log(events.value);
  hideFilterModal();
};

const fetchBookings = async (start, end) => {
  if (!start || !end) {
    const today = new Date().toISOString().split('T')[0];
    start = today;
    end = today;
  }

  const { data } = await getBookings({
    start_date: start,
    end_date: end,
  });

  events.value = data?.map((booking) => ({
    title: booking.memberName,
    start: `${booking.date}T${booking.startTime}`,
    end: `${booking.date}T${booking.endTime}`,
    url: `/bookings/${booking.bookingId}`,
  }));

  console.log(events.value);
};

const fetchTodayBooking = async () => {
  const today = new Date().toISOString().split('T')[0];
  const { data } = await getBookings({
    field: 'date',
    type: '=',
    value: today,
    sort_by: 'time',
    sort_enum: 'asc',
  });
  todayBooking.value = data;
};

const showMoreBookings = () => {
  visibleTodayBookingCount.value += 5; // Increase the number of visible bookings by 5
};

const visibleTodayBooking = computed(() => {
  return todayBooking.value.slice(0, visibleTodayBookingCount.value);
});

onMounted(async () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

  await fetchBookings(startOfMonth, endOfMonth);
  await fetchTodayBooking();
});
</script>
