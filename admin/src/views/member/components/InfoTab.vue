<!-- MemberInfoTab.vue -->
<template>
  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin hội viên -->
      <div class="intro-y box lg:mt-5">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="font-medium text-base mr-auto">Thông tin hội viên</h2>
        </div>
        <div class="p-5">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <div class="flex items-center form-label">
                      <div class="font-medium">Tên hội viên</div>
                      <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                      </div>
                    </div>
                    <input v-model="formData.name" type="text" class="form-control" placeholder="Tên hội viên" />
                  </div>
                  <div class="mt-3">
                    <div class="flex items-center form-label">
                      <div class="font-medium">Giới tính</div>
                    </div>
                    <select v-model="formData.gender" class="form-select">
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                      <option value="3">Khác</option>
                    </select>
                  </div>
                  <div class="mt-3">
                    <div class="flex items-center form-label">
                      <div class="font-medium">Ngày sinh</div>
                    </div>
                    <div class="relative form-control">
                      <div class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                        <CalendarIcon class="w-4 h-4" />
                      </div>
                      <Litepicker v-model="formData.birth_date" :options="datePickerOptions" class="form-control pl-12" />
                    </div>
                    <div class="mt-3">
                      <div class="flex items-center form-label">
                        <div class="font-medium">Email</div>
                        <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <input v-model="formData.email" type="text" class="form-control" placeholder="Email" />
                    </div>

                    <div class="mt-3">
                      <div class="flex items-center form-label">
                        <div class="font-medium">Số điện thoại</div>
                        <div class="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <input v-model="formData.phone" type="text" class="form-control" placeholder="Số điện thoại" />
                    </div>

                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <div class="flex items-center form-label">
                      <div class="font-medium">Ngày bắt đầu</div>
                    </div>
                    <input v-model="membershipInfo.start_date" type="text" class="form-control" disabled />
                  </div>

                  <div class="mt-3">
                    <div class="flex items-center form-label">
                      <div class="font-medium">Ngày kết thúc</div>
                    </div>
                    <input v-model="membershipInfo.end_date" type="text" class="form-control" disabled />
                  </div>

                  <div class="mt-3">
                    <div class="flex items-center form-label">
                      <div class="font-medium">Tổng doanh thu</div>
                    </div>
                    <input v-model="financials.total_sales" type="text" class="form-control" disabled />
                  </div>

                  <div class="mt-3">
                    <div class="flex items-center form-label">
                      <div class="font-medium">Tổng tiền đã thanh toán</div>
                    </div>
                    <input v-model="financials.total_revenue" type="text" class="form-control" disabled />
                  </div>
                  <div class="mt-3">
                    <div class="flex items-center form-label">
                      <div class="font-medium">Công nợ phải thu</div>
                    </div>
                    <input v-model="financials.total_receivable" type="text" class="form-control" disabled />
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="mt-3">
                    <div class="flex items-center form-label">
                      <div class="font-medium">Địa chỉ</div>
                    </div>
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
import { defineProps, defineEmits, defineComponent } from 'vue';

const props = defineProps(['financials', 'formData', 'newImage', 'datePickerOptions', 'membershipInfo']);
const emit = defineEmits(['preview-file', 'remove-preview', 'update']);

const previewFiles = (event: any) => {
  emit('preview-file', event);
};

const removePreview = () => {
  emit('remove-preview');
};

const updateMemberFunc = () => {
  emit('update');
};
</script>


