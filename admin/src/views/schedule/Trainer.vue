<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Lịch tập huấn luyện viên</h2>
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

  <!-- BEGIN: Calendar Content -->
  <div class="col-span-12 xl:col-span-8 2xl:col-span-9 mt-5">
    <div class="box p-5">
      <Calendar :externalEvents="events" />
    </div>
  </div>
  <!-- END: Calendar Content -->

  <Modal :show="isFilterModalVisible" @hide="hideFilterModal">
    <ModalBody>
      <div class="p-5">
        <h3 class="text-lg font-medium">Lọc lịch tập hội viên</h3>
        <div id="tabulator-html-filter-form" class="mr-auto mt-5">
          <div class="flex items-center mr-4">
            <label class="w-24 flex-none mr-2">Trường</label>
            <select id="tabulator-html-filter-field" v-model="filter.field" class="form-select mt-0 w-full">
              <option value="BookingTrainerUser.name">Tên hội viên</option>
              <option value="BookingTrainerUser.phone">Số điện thoại</option>
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

  <Modal :show="isCreateBookingModalVisible" @hide="hideCreateBookingModal">
    <ModalBody>
      <div class="p-5">
        <h3 class="text-lg font-medium">Tạo lịch tập hội viên</h3>
        <div class="mt-5">
          <label class="form-label">Hội viên</label>
          <input type="text" class="form-control" placeholder="Nhập tên hội viên..." />
        </div>
        <div class="mt-5">
          <label class="form-label">Ngày</label>
          <input type="date" class="form-control" />
        </div>
        <div class="mt-5">
          <label class="form-label">Thời gian</label>
          <input type="time" class="form-control" />
        </div>
        <div class="mt-5">
          <label class="form-label">Bài tập</label>
          <input type="text" class="form-control" placeholder="Nhập tên bài tập..." />
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="px-5 pb-8 flex justify-end">
        <button type="button" class="btn btn-outline-secondary w-24 mr-1" @click="hideCreateBookingModal">Hủy</button>
        <button type="button" class="btn btn-primary w-24" @click="filterBookingFunc">Lọc</button>
      </div>
    </ModalFooter>
  </Modal>
</template>

<script setup>
  import Calendar from '@/components/calendar/Main.vue';
  import { FilterIcon, Edit3Icon, EditIcon } from 'lucide-vue-next';
  import { getBookings } from '@/api/booking';
  import { onMounted, ref } from 'vue';

  const events = ref([]);

  const isFilterModalVisible = ref(false);
  const isCreateBookingModalVisible = ref(false);
  const showFilterModal = () => {
    isFilterModalVisible.value = true;
  };

  const hideFilterModal = () => {
    isFilterModalVisible.value = false;
  };

  const showCreateBookingModal = () => {
    isCreateBookingModalVisible.value = true;
  };

  const hideCreateBookingModal = () => {
    isCreateBookingModalVisible.value = false;
  };

  const filter = ref({
    field: 'BookingTrainerUser.name',
    type: 'like',
    value: '',
  });

  const filterBookingFunc = async () => {
    await fetchBookings(filter.value);
    console.log(events.value)
    hideFilterModal();
  };

  const fetchBookings = async (filter) => {
    if(!filter) filter = { field: 'BookingTrainerUser.name', type: 'like', value: '' };
    const { data } = await getBookings(filter);
    events.value = data.map((booking) => ({
      id: booking.bookingId,
      title: booking.bookingTrainerName,
      start: `${booking.date}T${booking.time}`,
      url: `/bookings/${booking.bookingId}`,
    }));
  };

  onMounted(() => {
    fetchBookings();
  });
</script>
