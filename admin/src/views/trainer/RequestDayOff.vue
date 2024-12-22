<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Danh sách yêu cầu nghỉ phép</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <router-link :to="{ name: 'create-trainer' }" class="btn btn-primary shadow-md mr-2">
        Tạo yêu cầu nghỉ phép
      </router-link>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Trường</label>
          <select id="tabulator-html-filter-field" v-model="filter.field" class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0">
            <option value="name">Tên huấn luyện viên</option>
            <option value="phone">Số điện thoại</option>
            <option value="address">Địa chỉ</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">So sánh</label>
          <select id="tabulator-html-filter-type" v-model="filter.type" class="form-select w-full mt-2 sm:mt-0 sm:w-auto">
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
          <input id="tabulator-html-filter-value" v-model="filter.value[0]" type="text" class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0" placeholder="Giá trị..." />
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Trạng thái</label>
          <select id="tabulator-html-filter-type" v-model="filter.value[1]" class="form-select w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="0">Tất cả</option>
            <option value="1">Chưa Duyệt</option>
            <option value="2">Đã Duyệt</option>
            <option value="3">Đã Từ Chối</option>
          </select>
        </div>
        <div class="mt-2 xl:mt-0">
          <button id="tabulator-html-filter-go" type="button" class="btn btn-primary w-full sm:w-16" @click="onFilter">
            Lọc
          </button>
          <button id="tabulator-html-filter-reset" type="button" class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1" @click="onResetFilter">
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2" @click="onPrint">
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
      <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import xlsx from 'xlsx';
  import { createIcons, icons } from 'lucide';
  import Tabulator from 'tabulator-tables';
  import dom from '@left4code/tw-starter/dist/js/dom';
  import { upperCaseValue } from '@/common/utils/helpers';
  import { getDaysOffRequests, approveDaysOffRequest,rejectDaysOffRequest } from '@/api/days_off_requests';
  import { showMessage } from '@/common/utils/helpers';
  import router from '@/router';

  const tableRef = ref();
  const tabulator = ref();
  const isModalVisible = ref(false);
  const deleteid = ref(null);
  const filter = reactive({
    field: 'name',
    type: 'like',
    value: ['', 0],
  });
  const tableData = reactive({
    totalRecordCount: 0,
    sortable: {
      order: 'asc',
      sort: 'name',
    },
    rows: [],
  });
  const imageAssets = import.meta.globEager(
    `/src/assets/images/*.{jpg,jpeg,png,svg}`,
  );

  const RequestFunc = async (url, config, params) => {
    let last_page = 0;
    let data = [];
    const page = params.page - 1;
    const limit = params.size;
    const order = params.sorters[0] ? params.sorters[0].field : 'table.date';
    const sort = params.sorters[0] ? params.sorters[0].dir : 'desc';
    const filter = params.filters[0] ? params.filters[0] : null;
    await getDaysOffRequests({
      page: page,
      take: limit,
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
      reject(new Error('Error'));
    });
  };

  const initTabulator = () => {
    tabulator.value = new Tabulator(tableRef.value, {
      ajaxURL: 'linhlinhsoma',
      ajaxFiltering: true,
      ajaxSorting: true,
      ajaxRequestFunc: RequestFunc,
      printAsHtml: true,
      printStyled: true,
      pagination: 'remote',
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 30, 40],
      layout: 'fitColumns',
      responsiveLayout: 'collapse',
      placeholder: 'Không có dữ liệu',
      columns: [
        {
          formatter: 'responsiveCollapse',
          width: 40,
          minWidth: 30,
          hozAlign: 'center',
          resizable: false,
          headerSort: false,
        },

        // For HTML table
        {
          title: 'ID',
          minWidth: 80,
          width: 80,
          responsive: 0,
          field: 'table.id',
          vertAlign: 'middle',
          hozAlign: 'left',
          print: false,
          download: false,
          formatter(cell) {
            return `
              <div class="font-medium">${cell.getData().id}</div>
            `;  
          },
        },
        {
          title: 'TÊN HUẤN LUYỆN VIÊN',
          minWidth: 200,
          responsive: 0,
          field: 'user.name',
          vertAlign: 'middle',
          print: false,
          download: false,
          formatter(cell) {
            return `
          <div class="flex items-center lg:justify-center">
            <div class="intro-x w-10 h-10 image-fit">
              <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" src="${
                cell.getData().trainer_avatar
              }">
            </div>
            <div class="intro-x ml-5">
              <div class="font-medium whitespace-nowrap">${cell.getData().trainer_name}</div>
            </div>
          </div>`;
          },
        },
        {
          title: 'NGÀY NGHỈ PHÉP',
          minWidth: 200,
          width: 200,
          field: 'table.date',
          hozAlign: 'center',
          vertAlign: 'middle',
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                  <div class="font-medium whitespace-nowrap">${cell.getData().date}</div>
              </div>`;
          },
        },
        {
          title: 'LÝ DO NGHỈ PHÉP',
          minWidth: 125,
          field: 'table.note',
          hozAlign: 'left',
          vertAlign: 'middle',
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                  <div class="font-medium whitespace-nowrap">${
                    cell.getData().note
                  }</div>
              </div>`;
          },
        },
         {
          title: 'TRẠNG THÁI',
          minWidth: 100,
          width: 150,
          field: 'table.status',
          hozAlign: 'left',
          vertAlign: 'middle',
          print: false,
          download: false,
          formatter(cell) {
            return `<div class="flex items-center lg:justify-center ${
              cell.getData().status === 1
                ? 'text-info'
                : cell.getData().status === 2
                  ? 'text-success'
                  : 'text-danger'
            }">
                ${cell.getData().status === 1
                  ? 'Chưa duyệt'
                  : cell.getData().status === 2
                    ? 'Đã duyệt'
                    : 'Đã từ chối'}
              </div>`;
          },
        },
        {
          title: 'ACTIONS',
          minWidth: 100,
          width: 180,
          field: 'actions',
          responsive: 1,
          hozAlign: 'left',
          vertAlign: 'middle',
          print: false,
          download: false,
          headerSort: false,
          formatter(cell) {
            const approveButton = dom(`
            <a class="flex items-center mr-3 text-primary" href="javascript:;">
                <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Duyệt
            </a>`);

            dom(approveButton).on('click', function () {
              approveFunc(cell.getData().id);
            });

            const rejectButton = dom(`
            <a class="flex items-center mr-3 text-danger" href="javascript:;" data-toggle="modal"
                    data-target="#delete-confirmation-modal">
                <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i>Từ chối
            </a>`);

            dom(rejectButton).on('click', function () {
              rejectFunc(cell.getData().id);
            });
            const container = dom(
              '<div class="flex lg:justify-center items-center"></div>',
            );
            if (cell.getData().status === 1) {
              container.append(approveButton);
              container.append(rejectButton);
            }

            return container[0];
          },
        },
      ],
      renderComplete() {
        createIcons({
          icons,
          'stroke-width': 1.5,
          nameAttr: 'data-lucide',
        });
      },
    });
  };

  const approveFunc = async (id) => {
    const res = await approveDaysOffRequest(id);
    tabulator.value.replaceData();
    if (res) {
      showMessage('Duyệt yêu cầu thành công', true);
    }
  };

  const rejectFunc = async (id) => {
    const res = await rejectDaysOffRequest(id);
    tabulator.value.replaceData();
    if (res) {
      showMessage('Từ chối yêu cầu thành công', true);
    }
  };
  
  // Redraw table onresize
  const reInitOnResizeWindow = () => {
    window.addEventListener('resize', () => {
      tabulator.value.redraw();
      createIcons({
        icons,
        'stroke-width': 1.5,
        nameAttr: 'data-lucide',
      });
    });
  };

  // Filter function
  const onFilter = () => {
    //add status to filter value array
    tabulator.value.setFilter(filter.field, filter.type, filter.value);
  };

  // On reset filter
  const onResetFilter = () => {
    filter.field = 'name';
    filter.type = 'like';
    filter.value = ['', 0];
    onFilter();
  };

  // Export
  const onExportCsv = () => {
    tabulator.value.download('csv', 'data.csv');
  };

  const onExportJson = () => {
    tabulator.value.download('json', 'data.json');
  };

  const onExportXlsx = () => {
    const win = window;
    win.XLSX = xlsx;
    tabulator.value.download('xlsx', 'data.xlsx', {
      sheetName: 'Products',
    });
  };

  const onExportHtml = () => {
    tabulator.value.download('html', 'data.html', {
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
