<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Thêm mới phòng tập</h2>
  </div>
  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin thiết bị -->
      <div class="intro-y box lg:mt-5">
        <div
          class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <h2 class="font-medium text-base mr-auto">Thông tin phòng tập</h2>
        </div>
        <div class="p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="create-member-form-1" class="form-label"
                      >Tên phòng tập</label
                    >
                    <input
                      v-model="nameRoom"
                      type="text"
                      class="form-control"
                      placeholder="Tên thiết bị"
                    />
                  </div>
                  <div class="mt-3">
                    <label for="create-member-form-2" class="form-label"
                      >Chức năng</label
                    >
                    <input
                      v-model="duration"
                      type="number"
                      step="50000"
                      class="form-control"
                      placeholder="Giá thiết bị"
                    />
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <label for="create-member-form-4" class="form-label"
                      >Tầng</label
                    >
                    <input
                      v-model="price"
                      type="number"
                      step="50000"
                      class="form-control"
                      placeholder="Giá thiết bị"
                    />
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="create-member-form-7" class="form-label">Ghi chú</label>
                    <textarea
                      v-model="note"
                      rows="5"
                      class="form-control"
                      placeholder="Ghi chú"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-5">
            <button
              @click="createRoomFunc"
              type="button"
              class="btn btn-primary w-20 mt-3"
            >
              Lưu
            </button>
            <router-link
              :to="{ name: 'list-rooms' }"
              class="btn btn-outline-secondary ml-3 w-20 mt-3"
            >
              Hủy
            </router-link>
          </div>
        </div>
      </div>
      <!-- END: Thông tin thiết bị -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { createRoom } from "@/api/rooms";
import { CreateRoomRequest } from "@/api/rooms/interfaces";
import { ref } from "vue";
import { showMessage } from "@/common/utils/helpers";
import router from "@/router";

const nameRoom = ref("");
const freeServices = ref([]);
const price = ref(0);
const note = ref("");
const duration = ref(0);

const createRoomFunc = async () => {
  const data = {
    name: nameRoom.value,
    freeServices: freeServices.value,
    price: price.value,
    description: note.value,
    duration: duration.value,
  } as CreateRoomRequest;
  const res = await createRoom(data);
  if (res) {
    showMessage("Thêm mới thiết bị thành công", true);
    router.push({ name: "list-rooms" });
  }
};
</script>
