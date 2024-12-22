<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Chỉnh sửa thông tin hội viên</h2>
  </div>

  <TabGroup class="py-5">
    <TabList class="nav-boxed-tabs text-bold flex sm:flex-row flex-col">
      <Tab v-for="tab in tabs" :key="tab.id" tag="button" class="w-full py-2">
        <h6 class="font-medium">{{ tab.name }}</h6>
      </Tab>
    </TabList>
    <TabPanels class="">
      <TabPanel class="leading-relaxed">
        <MemberInfoTab :formData="formData" :newImage="newImage" :datePickerOptions="datePickerOptions" :financials="financials" :membershipInfo="membershipInfo" @preview-file="previewFiles" @remove-preview="removePreview" @update="updateMemberFunc" />
      </TabPanel>
      <!-- <TabPanel class="leading-relaxed">
        <MemberHealthInfo />
      </TabPanel> -->
      <TabPanel class="leading-relaxed">
        <MemberHistoryInfo />
      </TabPanel>
      <TabPanel class="leading-relaxed">
        <MemberBodyMeasurement />
      </TabPanel>
      <TabPanel class="leading-relaxed">
        <MembershipInfo />
      </TabPanel>
      <TabPanel class="leading-relaxed">
        <MemberPaymentList :financials="financials" @fetch-member-financial="fetchMemberFinancial" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDetailMember, editMember, getMemberFinancials } from '@/api/members';
import { showMessage } from '@/common/utils/helpers';
import router from '@/router';
import { CreateMemberRequest } from '@/api/members/interfaces/create';
import MemberInfoTab from './components/InfoTab.vue';
import MemberHealthInfo from './components/HealthInfo.vue';
import MemberHistoryInfo from './components/HistoryInfo.vue';
import MemberBodyMeasurement from './components/BodyMeasurement.vue';
import MemberPaymentList from './components/Payment.vue';
import MembershipInfo from './components/MembershipInfo.vue';

const financials = ref({
  total_sales: 0,
  total_revenue: 0,
  total_receivable: 0,
});

const tabs = [
  { id: 1, name: 'Thông tin hội viên' },
  // { id: 2, name: 'Thông tin sức khỏe' },
  { id: 2, name: 'Lịch sử tập luyện' },
  { id: 3, name: 'Chỉ số cơ thể' },
  { id: 4, name: 'Gói dịch vụ' },
  { id: 5, name: 'Lịch sử thanh toán' },
];
const datePickerOptions = {
  autoApply: false,
  showWeekNumbers: true,
  dropdowns: {
    minYear: 1970,
    maxYear: null,
    months: true,
    years: true,
  },
};
const formData = ref<CreateMemberRequest>({
  name: '',
  gender: '1',
  avatar: '',
  phone: '',
  email: '',
  address: '',
  birth_date: '',
});
const membershipInfo = ref({
  start_date: '',
  end_date: '',
  membership_name: '',
});

const paramId = router.currentRoute.value.params.id.toString();
const select = ref('1');
const newImageFile = ref(null);
const newImage = ref('');
const existingImage = ref('');

const getMemberData = async () => {
  const res = await getDetailMember(paramId);
  formData.value.name = res.data.MemberName;
  formData.value.gender = res.data.MemberGender;
  formData.value.phone = res.data.MemberPhone;
  formData.value.email = res.data.MemberEmail;
  formData.value.address = res.data.MemberAddress;
  formData.value.birth_date = res.data.MemberBirthDate;
  newImage.value = res.data.MemberAvatar;
  existingImage.value = res.data.MemberAvatar;
  membershipInfo.value.start_date = res.data.StartDate;
  membershipInfo.value.end_date = res.data.EndDate;
  membershipInfo.value.membership_name = res.data.PackageName;
};

onMounted(async () => {
  await getMemberData();
  await fetchMemberFinancial();
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
  const data = {
    ...formData.value,
    avatar: newImageFile.value,
  };
  const formDataToSend = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'avatar' && value) {
      formDataToSend.append(key, value);
      return;
    } else if (key === 'avatar' && !value) {
      formDataToSend.append(key, existingImage.value);
      return;
    }
    formDataToSend.append(key, value?.toString() || '');
  });

  const res = await editMember(paramId, formDataToSend);
  if (res) {
    showMessage('Chỉnh sửa thông tin hội viên thành công', true);
    router.push({ name: 'list-members' });
  }
};

const fetchMemberFinancial = async () => {
  const paramId = router.currentRoute.value.params.id.toString();
  const response = await getMemberFinancials(paramId);
  financials.value = response.data;
};
</script>
