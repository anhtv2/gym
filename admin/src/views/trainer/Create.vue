<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Thêm mới huấn luyện viên</h2>
  </div>
  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin huấn luyện viên -->
      <div class="intro-y box lg:mt-5">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Thông tin huấn luyện viên</h2>
        </div>
        <div class="p-5">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="create-trainer-form-1" class="form-label">Tên huấn luyện viên</label>
                    <input v-model="name" type="text" class="form-control" placeholder="Tên huấn luyện viên" />
                  </div>
                  <div class="mt-3">
                    <label for="create-trainer-form-2" class="form-label">Giới tính</label>
                    <select v-model="gender" class="form-select">
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                      <option value="3">Khác</option>
                    </select>
                  </div>
                  <div class="mt-3">
                    <label for="create-trainer-form-3" class="form-label">Ngày sinh</label>
                    <div class="relative form-control">
                      <div
                        class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                        <CalendarIcon class="w-4 h-4" />
                      </div>
                      <Litepicker v-model="date" :options="{

                        showWeekNumbers: true,
                        maxDate: new Date(),
                        autoRefresh: true,
                        dropdowns: {
                          minYear: 1900,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                        format: 'YYYY-MM-DD',
                      }" class="form-control pl-12" />
                    </div>
                  </div>

                  <div class="mt-3">
                    <label for="create-trainer-form-9" class="form-label">Facebook</label>
                    <input v-model="facebook" type="text" class="form-control" placeholder="Facebook link" />
                  </div>

                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <label for="create-trainer-form-4" class="form-label">Số điện thoại</label>
                    <input v-model="phone" type="text" class="form-control" placeholder="Số điện thoại" />
                  </div>
                  <div class="mt-3">
                    <label for="create-trainer-form-5" class="form-label">Email</label>
                    <input v-model="email" type="text" class="form-control" placeholder="Email" />
                  </div>
                  <div class="mt-3">
                    <label for="create-trainer-form-6" class="form-label">Trạng thái hoạt động</label>
                    <select v-model="status" class="form-select">
                      <option value="1">Bình thường</option>
                      <option value="5">Chưa thanh toán</option>
                    </select>
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="create-trainer-form-7" class="form-label">Ghi chú</label>
                    <textarea v-model="note" rows="5" class="form-control" placeholder="Ghi chú">
                    </textarea>
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <label for="create-trainer-form-7" class="form-label">Địa chỉ</label>
                    <textarea v-model="address" rows="8" class="form-control" placeholder="Địa chỉ">
                    </textarea>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-primary w-20 mt-3" @click="createTrainerFunc">
                Lưu
              </button>
              <router-link :to="{ name: 'list-trainers' }" class="btn btn-outline-secondary ml-3 w-20 mt-3">
                Hủy
              </router-link>
            </div>
            <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
              <label for="create-trainer-form-8" class="form-label">Avatar</label>
              <div class="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                <div class="h-40 relative image-fit mx-auto">
                  <img v-if="newImage" class="rounded-md cursor-pointer zoom-in" alt="" :src="newImage" />
                  <Tippy v-if="newImage" tag="div" content="Remove this profile photo?"
                    class="cursor-pointer w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2">
                    <xIcon class="w-4 h-4" @click="removePreview()" />
                  </Tippy>
                </div>
                <div class="mx-auto cursor-pointer relative mt-5">
                  <button type="button" class="btn btn-primary w-full">
                    Chọn hình ảnh
                  </button>
                  <input id="form-avatar" type="file" class="w-full h-full top-0 left-0 absolute opacity-0"
                    @change="previewFiles($event)" />
                </div>
              </div>

              <label for="create-trainer-form-8" class="form-label mt-3">Chứng chỉ PT</label>
              <div class="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                <div class="h-40 relative image-fit mx-auto">
                  <img v-if="newCerImage" class="rounded-md cursor-pointer zoom-in" alt="" :src="newCerImage" />
                  <Tippy v-if="newCerImage" tag="div" content="Remove this profile photo?"
                    class="cursor-pointer w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2">
                    <xIcon class="w-4 h-4" @click="removeCerPreview()" />
                  </Tippy>
                </div>
                <div class="mx-auto cursor-pointer relative mt-5">
                  <button type="button" class="btn btn-primary w-full">
                    Chọn hình ảnh
                  </button>
                  <input id="form-cer" type="file" class="w-full h-full top-0 left-0 absolute opacity-0"
                    @change="previewCerFile($event)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Thông tin huấn luyện viên -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createTrainer } from "@/api/trainers";
import { CreateTrainerRequest } from '@/api/trainers/interfaces';
import { showMessage } from "@/common/utils/helpers";
import router from "@/router";

const select = ref("1");
const newImage = ref(null);
const newImageFile = ref(null);
const newCerImage = ref(null);
const newCerImageFile = ref(null);

const name = ref("");
const gender = ref("1");
const phone = ref("");
const email = ref("");
const status = ref(1);
const note = ref("");
const address = ref("");
const date = ref("");
const facebook = ref("");

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
  const input = document.getElementById("form-avatar") as HTMLInputElement;
  input.value = "";
  newImageFile.value = null;
};

const previewCerFile = (event: any) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e: any) => {
      newCerImage.value = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
    newCerImageFile.value = input.files[0];
  }
};

const removeCerPreview = () => {
  newCerImage.value = null;
  const input = document.getElementById("form-cer") as HTMLInputElement;
  input.value = "";
  newCerImageFile.value = null;
};

const createTrainerFunc = async () => {
  const data = {
    name: name.value,
    gender: gender.value,
    avatar: newImageFile.value,
    certificate: newCerImageFile.value,
    phone: phone.value,
    email: email.value,
    status: status.value,
    address: address.value,
    birth_date: date.value,
    note: note.value,
    facebook: facebook.value,
  } as CreateTrainerRequest;

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("gender", data.gender);
  formData.append("avatar", data.avatar);
  formData.append("certificate", data.certificate);
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  formData.append("status", data.status.toString());
  formData.append("address", data.address);
  formData.append("birth_date", data.birth_date);
  formData.append("note", note.value);
  formData.append("facebook", facebook.value);

  const res = await createTrainer(formData);
  if (res) {
    showMessage("Thêm mới huấn luyện viên thành công", true);
    router.push({ name: "list-trainers" });
  }
};
</script>
