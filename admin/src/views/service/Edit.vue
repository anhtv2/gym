<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Xem và chỉnh sửa lớp dịch vụ</h2>
  </div>

  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin lớp dịch vụ -->
      <div class="intro-y box lg:mt-5">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Thông tin lớp dịch vụ</h2>
        </div>
        <div class="p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <div class="flex flex-col-reverse xl:flex-row">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="create-package-form-1" class="form-label">Tên lớp dịch vụ</label>
                    <input v-model="formData.name" type="text" class="form-control" placeholder="Tên dịch vụ" />
                  </div>
                  <div class="mt-3">
                    <label for="create-package-form-2" class="form-label">Loại lớp dịch vụ</label>
                    <select v-model="formData.service_type" class="form-select">
                      <option v-for="(label, value) in TypeLabel" :key="value" :value="value">{{ label }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <label for="create-package-form-4" class="form-label">Giá dịch vụ (VND)</label>
                    <input v-model="formData.price" type="number" step="50000" class="form-control" placeholder="Giá dịch vụ" />
                  </div>
                  <div class="mt-3">
                    <label for="create-package-form-2" class="form-label">Thời lượng</label>
                    <input v-model="formData.duration" type="text" class="form-control" placeholder="Thời lượng" />
                  </div>
                  <div class="mt-3">
                    <label for="create-package-form-2" class="form-label">Số lượng tối đa</label>
                    <input v-model="formData.max_participant" type="number" class="form-control" placeholder="Số lượng tối đa" />
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="create-package-form-7" class="form-label">Ghi chú</label>
                    <textarea v-model="formData.description" rows="5" class="form-control" placeholder="Ghi chú"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
              <label for="create-member-form-8" class="form-label">Thumbnail</label>
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
        </div>
        <div class="p-5">
          <button @click="handleSave" type="button" class="btn btn-primary w-20 mt-3">
            Lưu
          </button>
          <router-link :to="{ name: 'list-services' }" class="btn btn-outline-secondary ml-3 w-20 mt-3">
            Hủy
          </router-link>
        </div>
      </div>
      <!-- END: Thông tin dịch vụ -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDetailService, editService } from '@/api/services';
import { showMessage } from '@/common/utils/helpers';
import router from '@/router';
import { CreateServiceRequest } from '@/api/services/interfaces';
import { TypeLabel } from '@/common/enums/services/type';

const formData = ref<CreateServiceRequest>({
  name: '',
  service_type: '',
  price: 0,
  duration: 0,
  max_participant: 0,
  description: '',
  thumbnail: '',
});
const newImageFile = ref(null);
const newImage = ref('');
const existingImage = ref('');

const paramId = router.currentRoute.value.params.id.toString();

const getServiceData = async () => {
  const res = await getDetailService(paramId);
  formData.value.name = res.data.name;
  formData.value.service_type = res.data.service_type;
  formData.value.price = res.data.price;
  formData.value.duration = res.data.duration;
  formData.value.max_participant = res.data.max_participants;
  formData.value.description = res.data.description;
  newImage.value = res.data.thumbnail;
  existingImage.value = res.data.thumbnail;
};

onMounted(async () => {
  await getServiceData();
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

const handleSave = async () => {
  const data = {
    ...formData.value,
    thumbnail: newImageFile.value,
  };
  const formDataToSend = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'thumbnail' && value) {
      formDataToSend.append(key, value);
      return;
    } else if (key === 'thumbnail' && !value) {
      formDataToSend.append(key, existingImage.value);
      return;
    }
    formDataToSend.append(key, value?.toString() || '');
  });

  const res = await editService(paramId, formDataToSend);
  if (res) {
    showMessage('Chỉnh sửa thông tin lớp dịch vụ thành công', true);
    router.push({ name: 'list-services' });
  }
};
</script>