<template>
  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin thiết bị -->
      <div class="intro-y box lg:mt-5">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Thông tin bài tập</h2>
        </div>
        <div class="p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="create-member-form-1" class="form-label">Tên bài tập</label>
                    <input v-model="name" type="text" class="form-control" placeholder="Tên bài tập" />
                  </div>

                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <label for="create-member-form-2" class="form-label">thời lượng</label>
                    <input v-model="duration" type="number" step="50000" class="form-control" placeholder="Thời lượng" />
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="create-member-form-7" class="form-label">Mô tả</label>
                    <textarea v-model="description" rows="5" class="form-control" placeholder="Ghi chú"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-5">
            <button @click="createWorkoutFunc" type="button" class="btn btn-primary w-20 mt-3">
              Lưu
            </button>
            <router-link :to="{ name: 'list-workouts' }" class="btn btn-outline-secondary ml-3 w-20 mt-3">
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
import { onMounted, ref } from "vue";
import { showMessage } from "@/common/utils/helpers";
import router from "@/router";
import { editWorkout, getDetailWorkout } from "@/api/workouts";

const nameRoom = ref("");
const description = ref("");
const duration = ref(0);

const editWorkoutFunc = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  try {
    await editWorkout(paramId, {
      name: nameRoom.value,
      description: description.value,
      duration: duration.value,
    });
    showMessage("Chỉnh sửa bài tập thành công", true);
    router.push({ name: "list-workouts" });
  } catch (error) {
    console.error(error);
  }
};
const fetchDetailWorkout = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  try {
    const response = await getDetailWorkout(paramId);
    nameRoom.value = response.data.name;
    description.value = response.data.description;
    duration.value = response.data.duration;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchDetailWorkout();
});
</script>