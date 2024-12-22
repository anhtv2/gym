<!-- MemberInfoTab.vue -->
<template>
  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin hội viên -->
      <div class="intro-y box lg:mt-5">
        <div class="p-5 font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400">
          Các bài tập khả dụng
        </div>
        <div class="p-5">
          <div class="form-inline items-start flex-col xl:flex-row mt-2 pt-2 first:mt-0 first:pt-0">
            <div class="form-label xl:w-64 xl:!mr-10">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium form-label">Khả năng HLV</div>
                </div>
                <div class="leading-relaxed text-slate-500 text-xs mt-3">
                  Các bài tập huấn luyện viên có thể tập luyện cho hội viên.
                </div>
              </div>
            </div>
            <div class="w-full mt-3 xl:mt-0 flex-1">
              <div class="relative pl-5 pr-5 xl:pr-10 py-10 bg-slate-50 dark:bg-transparent dark:border rounded-md">
                <div class="form-inline mt-5 items-start first:mt-0">
                  <label class="form-label mt-2 sm:w-20">Bài tập</label>
                  <div class="flex-1">
                    <div v-for="(workout, index) in availableWorkouts" :key="index" class="xl:flex items-center mt-5 first:mt-0">
                      <div class="input-group flex-1">
                        <TomSelect v-model="workout.workoutName" :options="workoutOptions" placeholder="Chọn bài tập" class="w-full mr-3">
                          <option v-for="option in workoutOptions" :value="option.value" :key="option.value">
                            {{ option.label }}
                          </option>
                        </TomSelect>
                      </div>
                      <div class="w-20 flex text-slate-500 mt-3 xl:mt-0">
                        <button class="ml-3 xl:ml-5" @click="removeWorkout(index)">
                          <Trash2Icon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="xl:ml-20 xl:pl-5 xl:pr-20 mt-5 first:mt-0">
                  <button class="btn btn-outline-primary border-dashed w-full" @click="addWorkout">
                    <PlusIcon class="w-4 h-4 mr-2" />Thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary w-20 mt-3" @click="updateMemberFunc">
            Lưu
          </button>
          <router-link :to="{ name: 'list-members' }" class="btn btn-outline-secondary ml-3 w-20 mt-3">
            Hủy
          </router-link>
        </div>
      </div>
      <!-- END: Thông tin hội viên -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import { getWorkouts } from '@/api/workouts';
import { getAvailableWorkouts } from '@/api/trainers';
import router from '@/router';

const availableWorkouts = ref([{ workoutName: '', workoutId: 0 }]);
const workoutOptions = ref([{ value: '', label: '' }]);

const updateMemberFunc = () => {
  // Your update logic here
};
onMounted(async () => {
  await Promise.all([
    fetchWorkoutOptions(),
    fetchAvailableWorkouts()]);
});
const addWorkout = () => {
  availableWorkouts.value.push({ workoutId: 0, workoutName: '' });
};
const removeWorkout = (index: number) => {
  availableWorkouts.value.splice(index, 1);
};
const fetchWorkoutOptions = async () => {
  const res = await getWorkouts({});
  workoutOptions.value = res.data.map((item: any) => ({
    value: item.name,
    label: item.name,
  }));
};

const fetchAvailableWorkouts = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  const res = await getAvailableWorkouts(paramId);
  availableWorkouts.value = res.data;
};
</script>
