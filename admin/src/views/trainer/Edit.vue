<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Chỉnh sửa thông tin huấn luyện viên</h2>
  </div>

  <TabGroup class="py-5">
    <TabList class="nav-boxed-tabs text-bold flex sm:flex-row flex-col">
      <Tab v-for="tab in tabs" :key="tab.id" tag="button" class="w-full py-2">
        <h6 class="font-medium">{{ tab.name }}</h6>
      </Tab>
    </TabList>
    <TabPanels class="">
      <TabPanel class="leading-relaxed">
        <TrainerInfoTab :formData="formData" :newImage="newImage" @preview-file="previewFiles" @remove-preview="removePreview" @update="updateMemberFunc" />
      </TabPanel>
      <TabPanel class="leading-relaxed">
        <TrainerWorkoutTab :formData="formData" />
      </TabPanel>
      <TabPanel class="leading-relaxed">
        <TrainerDaysOffTab :formData="formData" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { showMessage } from '@/common/utils/helpers';
import router from '@/router';
import { getDetailTrainer } from '@/api/trainers';
import { CreateTrainerRequest } from '@/api/trainers/interfaces';
import TrainerInfoTab from './components/InfoTab.vue';
import TrainerWorkoutTab from './components/WorkoutTab.vue';
import TrainerDaysOffTab from './components/DaysOffTab.vue';

const tabs = [
  { id: 1, name: 'Thông tin huấn luyện viên' },
  { id: 2, name: 'Danh sách bài tập khả dụng' },
  { id: 3, name: 'Ngày làm việc cố định' },
];

const formData = ref<CreateTrainerRequest>({
  name: '',
  gender: '1',
  avatar: '',
  phone: '',
  email: '',
  address: '',
  birth_date: '',
  specialty: '',
  experience: '',
});

const paramId = router.currentRoute.value.params.id?.toString() || '';
const select = ref('1');
const newImageFile = ref(null);
const newImage = ref('');
const existingImage = ref('');

const getTrainerData = async () => {
  const res = await getDetailTrainer(paramId);
  formData.value = res.data;
  newImage.value = res.data.avatar;
  existingImage.value = res.data.avatar;
};

onMounted(async () => {
  await getTrainerData();
});

const previewFiles = (event: any) => {
  const input = event.target;
  if (input.files) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      newImage.value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
    newImageFile.value = input.files[0];
  }
};

const removePreview = () => {
  newImage.value = '';
  const input = document.getElementById('form-avatar') as HTMLInputElement;
  input.value = '';
  newImageFile.value = null;
};
const updateMemberFunc = async () => {
  // const data = {
  //   ...formData.value,
  //   avatar: newImageFile.value,
  // };
  // const formDataToSend = new FormData();

  // Object.entries(data).forEach(([key, value]) => {
  //   if (key === 'avatar' && value) {
  //     formDataToSend.append(key, value);
  //     return;
  //   } else if (key === 'avatar' && !value) {
  //     formDataToSend.append(key, existingImage.value);
  //     return;
  //   }
  //   formDataToSend.append(key, value?.toString() || '');
  // });

  // const res = await editMember(paramId, formDataToSend);
  // if (res) {
  //   showMessage('Chỉnh sửa thông tin hội viên thành công', true);
  //   router.push({ name: 'list-members' });
  // }
};

</script>
