<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Danh sách thiết bị</h2>

    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <router-link
        :to="{ name: 'create-room' }"
        class="btn btn-primary shadow-md mr-2"
      >
        Thêm mới thiết bị
      </router-link>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Field</label>
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="name">Name</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Type</label>
          <select
            id="tabulator-html-filter-type"
            v-model="filter.type"
            class="form-select w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="like" selected>like</option>
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="!=">!=</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Value</label>
          <input
            id="tabulator-html-filter-value"
            v-model="filter.value"
            type="text"
            class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search..."
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <button
            id="tabulator-html-filter-go"
            type="button"
            class="btn btn-primary w-full sm:w-16"
            @click="onFilter"
          >
            Go
          </button>
          <button
            id="tabulator-html-filter-reset"
            type="button"
            class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
            @click="onResetFilter"
          >
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button
          id="tabulator-print"
          class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2"
          @click="onPrint"
        >
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <Dropdown class="w-1/2 sm:w-auto">
          <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
            <FileTextIcon class="w-4 h-4 mr-2" /> Export
            <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem @click="onExportCsv">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export CSV
              </DropdownItem>
              <DropdownItem @click="onExportJson">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export JSON
              </DropdownItem>
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
              </DropdownItem>
              <DropdownItem @click="onExportHtml">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export HTML
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div
        id="tabulator"
        ref="tableRef"
        class="mt-5 table-report table-report--tabulator"
      ></div>
    </div>

    <!-- Sử dụng Modal component -->
    <Modal :show="isModalVisible" @hide="hideDeleteConfirmationModal">
      <ModalBody>
        <div class="p-5 text-center">
          <XCircleIcon class="w-16 h-16 text-theme-6 mx-auto mt-3" />
          <div class="text-3xl mt-5">Are you sure?</div>
          <div class="text-gray-600 mt-2">
            Bạn có chắc muốn xóa phòng tập này không? <br />Thay tác này sẽ không thể hoàn
            tác
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button
            type="button"
            class="btn btn-outline-secondary w-24 mr-1"
            @click="hideDeleteConfirmationModal"
          >
            Hủy
          </button>
          <button type="button" class="btn btn-danger w-24" @click="deleteRoomById">
            Xóa
          </button>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Delete Confirmation Modal -->
  </div>
  <!-- END: HTML Table Data -->
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import { upperCaseValue } from "@/common/utils/helpers";
import { getEquipments } from "@/api/equipments";

import router from "@/router";
const tableRef = ref();
const tabulator = ref();
const isModalVisible = ref(false);
const deleteEquipmentId = ref(null);
const filter = reactive({
  field: "name",
  type: "like",
  value: "",
});

const RequestFunc = async (url, config, params) => {
  let last_page = 0;
  let data = [];
  const page = params.page - 1;
  const take = params.size;
  const limit = params.size;
  const order = params.sorters[0] ? params.sorters[0].field : "EquipmentId";
  const sort = params.sorters[0] ? params.sorters[0].dir : "asc";

  await getEquipments({
    page: page,
    take: take,
    sort_by: order,
    sort_enum: upperCaseValue(sort),
    field: filter ? filter.field : null,
    type: filter ? filter.type : null,
    value: filter ? filter.value[0] : null,
    status: filter && filter.value[1] != 0 ? filter.value[1] : null,
  }).then((response) => {
    last_page = response.meta.pageCount;
    data = response.data;
  });
  return new Promise((resolve, reject) => {
    resolve({
      last_page,
      data,
    });
    reject(new Error("Error"));
  });
};

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    ajaxURL: "linhlinhsoma",
    ajaxFiltering: true,
    ajaxSorting: true,
    ajaxRequestFunc: RequestFunc,
    printAsHtml: true,
    printStyled: true,
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: "ID",
        // minWidth: 180,
        width:100,
        responsive: 0,
        field: "EquipmentId",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `
            <div class="flex items-center lg:justify-center">
              <div class="intro-x">
                <div class="font-medium whitespace-nowrap">${cell.getData().EquipmentId}</div>
              </div>
            </div>`;
        },
      },
      {
        title: "TÊN THIẾT BỊ",
        minWidth: 180,
        responsive: 0,
        field: "EquipmentName",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `
            <div class="flex items-center lg:justify-center">
              <div class="intro-x">
                <div class="font-medium whitespace-nowrap">${cell.getData().EquipmentName}</div>
              </div>
            </div>`;
        },
      },
      {
        title: "MÃ SERIAL",
        minWidth: 180,
        responsive: 0,
        field: "EquipmentSerialId",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `
            <div class="flex items-center lg:justify-center">
              <div class="intro-x">
                <div class="font-medium whitespace-nowrap">${cell.getData().EquipmentSerialId}</div>
              </div>
            </div>`;
        },
      },
      {
        title: "VỊ TRÍ",
        minWidth: 180,
        responsive: 0,
        field: "RoomName",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `
            <div class="flex items-center lg:justify-center">
              <div class="intro-x">
                <div class="font-medium whitespace-nowrap">${cell.getData().RoomName}</div>
              </div>
            </div>`;
        },
      },
      {
        title: "TÌNH TRẠNG",
        minWidth: 100,
        field: "EquipmentCondition",
        hozAlign: "left",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                        <div class="font-medium whitespace-nowrap">${
                          cell.getData().EquipmentCondition
                        }</div>
                </div > `;
        },
      },
      {
        title: "ACTIONS",
        minWidth: 100,
        width: 100,
        field: "actions",
        responsive: 1,
        hozAlign: "left",
        vertAlign: "middle",
        print: false,
        download: false,
        headerSort: false,
        formatter(cell) {
          const editButton = dom(`
    <a class="flex items-center mr-3 text-primary" href = "javascript:;" >
        <i data-lucide="check-square" class="w-4 h-4 mr-1"></i>
              </a > `);

          dom(editButton).on("click", function () {
            const roomId = cell.getData().id;
            router.push({
              name: "edit-room",
              params: {
                id: roomId,
              },
            });
          });

          const deleteButton = dom(`
    <a class="flex items-center mr-3 text-danger" href = "javascript:;" data - toggle="modal"
data-target="#delete-confirmation-modal" >
    <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i>
              </a > `);

          dom(deleteButton).on("click", function () {
            showDeleteConfirmationModal(cell.getData().id);
          });
          const container = dom(
            '<div class="flex lg:justify-center items-center"></div>'
          );
          container.append(editButton[0]);
          container.append(deleteButton[0]);

          return container[0];
        },
      },

      // For print format
      // {
      //     title: 'TÊN HỘI VIÊN',
      //     field: 'name',
      //     visible: false,
      //     print: true,
      //     download: true,
      // },
      // {
      //     title: 'SỐ ĐIỆN THOẠI',
      //     field: 'phone',
      //     visible: false,
      //     print: true,
      //     download: true,
      // },
      // {
      //     title: 'ĐỊA CHỈ',
      //     field: 'address',
      //     visible: false,
      //     print: true,
      //     download: true,
      // },
      // {
      //     title: 'STATUS',
      //     field: 'status',
      //     visible: false,
      //     print: true,
      //     download: true,
      //     formatterPrint(cell) {
      //         return cell.getValue() ? 'Active' : 'Inactive'
      //     },
      // },
    ],
    renderComplete() {
      createIcons({
        icons,
        "stroke-width": 1.5,
        nameAttr: "data-lucide",
      });
    },
  });
};

const showDeleteConfirmationModal = (id) => {
  deleteEquipmentId.value = id;
  isModalVisible.value = true;
};

const hideDeleteConfirmationModal = () => {
  deleteEquipmentId.value = null;
  isModalVisible.value = false;
};

const deleteEquipmentById = async () => {
  await deleteEquipment(deleteEquipmentId.value);
  hideDeleteConfirmationModal();
  tabulator.value.replaceData();
};
// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

// Filter function
const onFilter = () => {
  tabulator.value.setFilter(filter.field, filter.type, filter.value);
};

// On reset filter
const onResetFilter = () => {
  filter.field = "name";
  filter.type = "like";
  filter.value = "";
  onFilter();
};

// Export
const onExportCsv = () => {
  tabulator.value.download("csv", "data.csv");
};

const onExportJson = () => {
  tabulator.value.download("json", "data.json");
};

const onExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  tabulator.value.download("xlsx", "data.xlsx", {
    sheetName: "Products",
  });
};

const onExportHtml = () => {
  tabulator.value.download("html", "data.html", {
    style: true,
  });
};

// Print
const onPrint = () => {
  tabulator.value.print();
};

onMounted(() => {
  initTabulator();
  reInitOnResizeWindow();
});
</script>
