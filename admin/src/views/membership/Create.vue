<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Thêm mới dịch vụ</h2>
  </div>
  <div class="grid">
    <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
      <!-- BEGIN: Thông tin dịch vụ -->
      <div class="intro-y box lg:mt-5">
        <div
          class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <h2 class="font-medium text-base mr-auto">Thông tin dịch vụ</h2>
        </div>
        <div class="p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <div class="flex flex-col-reverse xl:flex-row flex-col">
            <div class="flex-1 mt-6 xl:mt-0">
              <div class="grid grid-cols-12 gap-x-5">
                <div class="col-span-12 2xl:col-span-6">
                  <div>
                    <label for="create-member-form-1" class="form-label"
                      >Tên dịch vụ</label
                    >
                    <input
                      v-model="nameMembership"
                      type="text"
                      class="form-control"
                      placeholder="Tên dịch vụ"
                    />
                  </div>
                  <div class="mt-3">
                    <label for="create-member-form-2" class="form-label"
                      >Thời lượng</label
                    >
                    <input
                      v-model="duration"
                      type="number"
                      step="50000"
                      class="form-control"
                      placeholder="Giá dịch vụ"
                    />
                  </div>
                </div>
                <div class="col-span-12 2xl:col-span-6">
                  <div class="mt-3 2xl:mt-0">
                    <label for="create-member-form-4" class="form-label"
                      >Giá dịch vụ (VND)</label
                    >
                    <input
                      v-model="price"
                      type="number"
                      step="50000"
                      class="form-control"
                      placeholder="Giá dịch vụ"
                    />
                  </div>
                  <div class="mt-3">
                    <label for="create-member-form-2" class="form-label"
                      >Dịch vụ miễn phí</label
                    >
                    <div class="flex flex-col sm:flex-row">
                      <div class="form-check mr-2">
                        <input
                          v-model="freeServices"
                          id="checkbox-switch-4"
                          class="form-check-input"
                          type="checkbox"
                          value="1"
                        />
                        <label class="form-check-label" for="checkbox-switch-4"
                          >Khăn</label
                        >
                      </div>
                      <div class="form-check mr-2 sm:mt-0">
                        <input
                          v-model="freeServices"
                          id="checkbox-switch-5"
                          class="form-check-input"
                          type="checkbox"
                          value="2"
                        />
                        <label class="form-check-label" for="checkbox-switch-5"
                          >Nước</label
                        >
                      </div>
                      <div class="form-check mr-2 sm:mt-0">
                        <input
                          v-model="freeServices"
                          id="checkbox-switch-6"
                          class="form-check-input"
                          type="checkbox"
                          value="3"
                        />
                        <label class="form-check-label" for="checkbox-switch-6"
                          >Vé xe</label
                        >
                      </div>
                    </div>
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
              @click="createMembershipFunc"
              type="button"
              class="btn btn-primary w-20 mt-3"
            >
              Lưu
            </button>
            <router-link
              :to="{ name: 'list-memberships' }"
              class="btn btn-outline-secondary ml-3 w-20 mt-3"
            >
              Hủy
            </router-link>
          </div>
        </div>
      </div>
      <!-- END: Thông tin dịch vụ -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { createMembership } from "@/api/memberships";
import { CreateMembershipRequest } from "@/api/memberships/interfaces";
import { ref } from "vue";
import { showMessage } from "@/common/utils/helpers";
import router from "@/router";

const nameMembership = ref("");
const freeServices = ref([]);
const price = ref(0);
const note = ref("");
const duration = ref(0);

const createMembershipFunc = async () => {
  const data = {
    name: nameMembership.value,
    freeServices: freeServices.value,
    price: price.value,
    description: note.value,
    duration: duration.value,
  } as CreateMembershipRequest;
  const res = await createMembership(data);
  if (res) {
    showMessage("Thêm mới dịch vụ thành công", true);
    router.push({ name: "list-memberships" });
  }
};
</script>
