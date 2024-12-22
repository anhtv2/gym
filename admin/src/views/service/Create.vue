<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Thêm mới lớp dịch vụ</h2>
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
                    <input v-model="name" type="text" class="form-control" placeholder="Tên dịch vụ" />
                  </div>
                  <div class="mt-3">
                    <label for="create-package-form-2" class="form-label">Loại lớp dịch vụ</label>
                    <select v-model="serviceType" class="form-select">
                      <option v-for="(label, value) in TypeLabel" :key="value" :value="TypeValue[value]">{{ label }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <label for="create-package-form-4" class="form-label">Giá dịch vụ (VND)</label>
                    <input v-model="price" type="number" step="50000" class="form-control" placeholder="Giá dịch vụ" />
                  </div>
                  <div class="mt-3">
                    <label for="create-package-form-2" class="form-label">Thời lượng</label>
                    <input v-model="duration" type="text" class="form-control" placeholder="Thời lượng" />
                  </div>
                  <div class="mt-3">
                    <label for="create-package-form-2" class="form-label">Số lượng tối đa</label>
                    <input v-model="maxParticipants" type="number" class="form-control" placeholder="Số lượng tối đa" />
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="create-package-form-7" class="form-label">Ghi chú</label>
                    <textarea v-model="description" rows="5" class="form-control" placeholder="Ghi chú"></textarea>
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
import { ref } from 'vue';
import { TypeValue, TypeLabel } from '@/common/enums/services/type';
import { createService } from '@/api/services';
import { useRouter } from 'vue-router';
import { showMessage } from '@/common/utils/helpers';

const name = ref('');
const serviceType = ref(TypeValue[0]);
const price = ref(0);
const duration = ref('');
const maxParticipants = ref(0);
const description = ref('');

const router = useRouter();
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

const handleSave = async () => {
  try {
    const data = {
      name: name.value,
      service_type: serviceType.value,
      price: price.value,
      duration: duration.value,
      max_participants: maxParticipants.value,
      description: description.value,
      thumbnail: newImageFile.value,
    };
    const formDataToSend = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'thumbnail' && value) {
        formDataToSend.append(key, value);
        return;
      }
      formDataToSend.append(key, value?.toString() || '');
    });

    const response = await createService(formDataToSend);
    if (response.statusCode === 201) {
      showMessage('Tạo lớp dịch vụ thành công', true);
      router.push({ name: 'list-services' });
    }
  } catch (error) {
    showMessage('Có lỗi xảy ra, vui lòng thử lại sau', false);
  }
};
</script>
