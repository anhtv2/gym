<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Thêm mới hội viên</h2>
  </div>
  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin hội viên -->
      <div class="intro-y box lg:mt-5">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Thông tin hội viên</h2>
        </div>
        <div class="p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="create-member-form-1" class="form-label">Tên hội viên</label>
                    <input v-model="formData.name" type="text" class="form-control" placeholder="Tên hội viên" />
                  </div>
                  <div class="mt-3">
                    <label for="create-member-form-2" class="form-label">Giới tính</label>
                    <select v-model="formData.gender" class="form-select">
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                      <option value="3">Khác</option>
                    </select>
                  </div>
                  <div class="mt-3">
                    <label for="create-member-form-3" class="form-label">Ngày sinh</label>
                    <div class="relative form-control">
                      <div class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                        <CalendarIcon class="w-4 h-4" />
                      </div>
                      <Litepicker v-model="formData.birth_date" :options="datePickerOptions" class="form-control pl-12" />
                    </div>
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <label for="create-member-form-4" class="form-label">Số điện thoại</label>
                    <input v-model="formData.phone" type="text" class="form-control" placeholder="Số điện thoại" />
                  </div>
                  <div class="mt-3">
                    <label for="create-member-form-5" class="form-label">Email</label>
                    <input v-model="formData.email" type="text" class="form-control" placeholder="Email" />
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="create-member-form-7" class="form-label">Địa chỉ</label>
                    <textarea v-model="formData.address" rows="8" class="form-control" placeholder="Địa chỉ">
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
              <label for="create-member-form-8" class="form-label">Avatar</label>

              <div class="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                <div class="h-40 relative image-fit mx-auto">
                  <img v-if="newImage" class="rounded-md cursor-pointer zoom-in" alt="" :src="newImage" />
                  <Tippy v-if="newImage" tag="div" content="Remove this profile photo?" class="cursor-pointer w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2">
                    <xIcon class="w-4 h-4" @click="removePreview()" />
                  </Tippy>
                </div>
                <div class="mx-auto cursor-pointer relative mt-5">
                  <button type="button" class="btn btn-primary w-full">
                    Chọn hình ảnh
                  </button>
                  <input id="form-avatar" type="file" class="w-full h-full top-0 left-0 absolute opacity-0" @change="previewFiles($event)" />
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary w-20 mt-3" @click="createMemberFunc">
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
import { ref } from 'vue';
import { createMember } from '@/api/members';
import { CreateMemberRequest } from '@/api/members/interfaces/create';
import { showMessage } from '@/common/utils/helpers';
import router from '@/router';

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
  password: '12345678',
});

const select = ref('1');
const newImage = ref(null);
const newImageFile = ref(null);

const previewFiles = (event: any) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e: any) => {
      newImage.value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
    newImageFile.value = input.files[0];
  }
};

const removePreview = () => {
  newImage.value = null;
  const input = document.getElementById('form-avatar') as HTMLInputElement;
  input.value = '';
  newImageFile.value = null;
};
const createMemberFunc = async () => {
  const data = {
    ...formData.value,
    avatar: newImageFile.value,
  };

  const formDataToSend = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'avatar' && value) {
      formDataToSend.append(key, value);
      return;
    }
    formDataToSend.append(key, value?.toString() || '');
  });

  const res = await createMember(formDataToSend);
  if (res) {
    showMessage('Thêm mới hội viên thành công', true);
    router.push({ name: 'list-members' });
  }
};
</script>
