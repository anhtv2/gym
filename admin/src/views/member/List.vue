<template>
  <!-- BEGIN: General Report -->
  <div class="col-span-12 mt-8">
    <div class="intro-y flex items-center h-10">
      <h2 class="text-lg font-medium truncate mr-5">Tổng quan</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <ShoppingCartIcon class="report-box__icon text-theme-10" />
              <div class="ml-auto">
                <Tippy
                  tag="div"
                  class="report-box__indicator bg-theme-9 cursor-pointer"
                  content="33% Higher than last month"
                >
                  33%
                  <ChevronUpIcon class="w-4 h-4" />
                </Tippy>
              </div>
            </div>
            <div class="text-3xl font-bold leading-8 mt-6">4.710</div>
            <div class="text-base text-gray-600 mt-1">Tổng số hội viên</div>
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <CreditCardIcon class="report-box__icon text-theme-11" />
              <div class="ml-auto">
                <Tippy
                  tag="div"
                  class="report-box__indicator bg-theme-6 cursor-pointer"
                  content="2% Lower than last month"
                >
                  2%
                  <ChevronDownIcon class="w-4 h-4" />
                </Tippy>
              </div>
            </div>
            <div class="text-3xl font-bold leading-8 mt-6">3.721</div>
            <div class="text-base text-gray-600 mt-1">Tham gia hôm nay</div>
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <MonitorIcon class="report-box__icon text-theme-12" />
              <div class="ml-auto">
                <Tippy
                  tag="div"
                  class="report-box__indicator bg-theme-9 cursor-pointer"
                  content="12% Higher than last month"
                >
                  12%
                  <ChevronUpIcon class="w-4 h-4" />
                </Tippy>
              </div>
            </div>
            <div class="text-3xl font-bold leading-8 mt-6">2.149</div>
            <div class="text-base text-gray-600 mt-1">Tỷ lệ hội viên mới</div>
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <UserIcon class="report-box__icon text-theme-9" />
              <div class="ml-auto">
                <Tippy
                  tag="div"
                  class="report-box__indicator bg-theme-9 cursor-pointer"
                  content="22% Higher than last month"
                >
                  22%
                  <ChevronUpIcon class="w-4 h-4" />
                </Tippy>
              </div>
            </div>
            <div class="text-3xl font-bold leading-8 mt-6">152.040</div>
            <div class="text-base text-gray-600 mt-1">Khách vãng lai</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Danh sách hội viên</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <router-link
        :to="{ name: 'create-member' }"
        class="btn btn-primary shadow-md mr-2"
      >
        Thêm mới hội viên
      </router-link>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Trường</label
          >
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="name">Tên hội viên</option>
            <option value="phone">Số điện thoại</option>
            <option value="address">Địa chỉ</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >So sánh</label
          >
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
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Value</label
          >
          <input
            id="tabulator-html-filter-value"
            v-model="filter.value[0]"
            type="text"
            class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
            placeholder="Giá trị..."
          />
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Trạng thái</label
          >
          <select
            id="tabulator-html-filter-type"
            v-model="filter.value[1]"
            class="form-select w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="0" selected>Tất cả</option>
            <option value="1">Đang hoạt động</option>
            <option value="2">Ngưng hoạt động</option>
            <option value="3">Sắp hết hạn</option>
          </select>
        </div>
        <div class="mt-2 xl:mt-0">
          <button
            id="tabulator-html-filter-go"
            type="button"
            class="btn btn-primary w-full sm:w-16"
            @click="onFilter"
          >
            Lọc
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
            Bạn có chắc muốn xóa hội viên này không? <br />Thay tác này sẽ không
            thể hoàn tác
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
          <button
            type="button"
            class="btn btn-danger w-24"
            @click="deleteMemberById"
          >
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
  import { ref, reactive, onMounted } from 'vue';
  import xlsx from 'xlsx';
  import { createIcons, icons } from 'lucide';
  import Tabulator from 'tabulator-tables';
  import dom from '@left4code/tw-starter/dist/js/dom';
  import { upperCaseValue } from '@/common/utils/helpers';
  import { getMembers, deleteMember } from '@/api/members';
  import MemberEdit from '@/views/member/Edit.vue';
  import router from '@/router';
  import { showMessage } from '@/common/utils/helpers';

  const tableRef = ref();
  const tabulator = ref();
  const isModalVisible = ref(false);
  const deleteMemberId = ref(null);
  const filter = reactive({
    field: 'name',
    type: 'like',
    value: ['', 0],
  });

  const RequestFunc = async (url, config, params) => {
    let last_page = 0;
    let data = [];
    const page = params.page - 1;
    const take = params.size;
    const order = params.sorters[0] ? params.sorters[0].field : 'MemberId';
    const sort = params.sorters[0] ? params.sorters[0].dir : 'desc';
    const filter = params.filters[0] ? params.filters[0] : null;

    await getMembers({
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
      placeholder: 'No matching records found',
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
          title: 'TÊN HỘI VIÊN',
          minWidth: 180,
          width: 250,
          responsive: 0,
          field: 'MemberName',
          vertAlign: 'middle',
          print: false,
          download: false,
          formatter(cell) {
            return `
          <div class="flex items-center lg:justify-center">
            <div class="intro-x w-10 h-10 image-fit">
              <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" src="${
                cell.getData().MemberAvatar
              }">
            </div>
            <div class="intro-x ml-5">
              <div class="font-medium whitespace-nowrap">${cell.getData().MemberName}</div>
              <div class="text-slate-500 text-xs whitespace-nowrap">${
                cell.getData().MemberEmail
              }</div>
            </div>
          </div>`;
          },
        },
        {
          title: 'SỐ ĐIỆN THOẠI',
          minWidth: 100,
          width: 150,
          field: 'MemberPhone',
          hozAlign: 'center',
          vertAlign: 'middle',
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                  <div class="font-medium whitespace-nowrap">${cell.getData().MemberPhone}</div>
              </div>`;
          },
        },
        {
          title: 'NGÀY SINH',
          minWidth: 100,
          width: 120,
          field: 'MemberBirthDate',
          hozAlign: 'center',
          vertAlign: 'middle',
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                  <div class="font-medium whitespace-nowrap">${cell.getData().MemberBirthDate}</div>
              </div>`;
          },
        },
        {
          title: 'GIỚI TÍNH',
          field: 'MemberGender',
          minWidth: 50,
          width: 110,
          hozAlign: 'center',
          vertAlign: 'middle',
          print: false,
          download: false,
          formatter(cell) {
            return `<div class="flex items-center lg:justify-center ${
              cell.getData().MemberGender == 1
                ? 'text-success'
                : cell.getData().MemberGender == 2
                  ? 'text-danger'
                  : 'text-info'
            }">
                ${
                  cell.getData().MemberGender == 1
                    ? 'Nam'
                    : cell.getData().MemberGender == 2
                      ? 'Nu'
                      : 'Khac'
                }
              </div>`;
          },
        },
        {
          title: 'ĐỊA CHỈ',
          minWidth: 200,
          width: 350,
          field: 'MemberAddress',
          hozAlign: 'left',
          vertAlign: 'middle',
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                  <div class="font-medium whitespace-nowrap">${
                    cell.getData().MemberAddress
                  }</div>
              </div>`;
          },
        },
        {
          title: 'NGÀY BẮT ĐẦU',
          minWidth: 100,
          width: 170,
          field: 'StartDate',
          hozAlign: 'left',
          vertAlign: 'middle',
          print: false,
          download: false,
          headerSort: false,
          formatter(cell) {
            return `<div class="flex items-center lg:justify-center text-info">
                ${cell.getData().StartDate}
              </div>`;
          },
        },
        {
          title: 'NGÀY KẾT THÚC',
          minWidth: 100,
          width: 170,
          field: 'Status',
          hozAlign: 'left',
          vertAlign: 'middle',
          print: false,
          download: false,
          headerSort: false,
          formatter(cell) {
            return `<div class="flex items-center lg:justify-center ${
              cell.getData().Status === 1
                ? 'text-success'
                : cell.getData().Status === 2
                  ? 'text-danger'
                  : 'text-info'
            }">
                ${cell.getData().EndDate}
              </div>`;
          },
        },
        {
          title: 'ACTIONS',
          minWidth: 30,
          width: 100,
          field: 'actions',
          responsive: 1,
          hozAlign: 'left',
          vertAlign: 'middle',
          print: false,
          download: false,
          headerSort: false,
          formatter(cell) {
            const editButton = dom(`
            <a class="flex items-center mr-3 text-primary" href="javascript:;">
                <i data-lucide="check-square" class="w-4 h-4 mr-1"></i>
            </a>`);

            dom(editButton).on('click', function () {
              const memberId = cell.getData().MemberId;
              router.push({
                name: 'edit-member',
                params: {
                  id: memberId,
                },
              });
            });

            const deleteButton = dom(`
            <a class="flex items-center mr-3 text-danger" href="javascript:;" data-toggle="modal"
                    data-target="#delete-confirmation-modal">
                <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i>
            </a>`);

            dom(deleteButton).on('click', function () {
              showDeleteConfirmationModal(cell.getData().MemberId);
            });
            const container = dom(
              '<div class="flex lg:justify-center items-center"></div>',
            );
            container.append(editButton[0]);
            container.append(deleteButton[0]);

            return container[0];
          },
        },

        // For print format
        {
          title: 'TÊN HỘI VIÊN',
          field: 'name',
          visible: false,
          print: true,
          download: true,
        },
        {
          title: 'SỐ ĐIỆN THOẠI',
          field: 'phone',
          visible: false,
          print: true,
          download: true,
        },
        {
          title: 'ĐỊA CHỈ',
          field: 'address',
          visible: false,
          print: true,
          download: true,
        },
        {
          title: 'STATUS',
          field: 'status',
          visible: false,
          print: true,
          download: true,
          formatterPrint(cell) {
            return cell.getValue() ? 'Active' : 'Inactive';
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

  const showDeleteConfirmationModal = (id) => {
    deleteMemberId.value = id;
    isModalVisible.value = true;
  };

  const hideDeleteConfirmationModal = () => {
    deleteMemberId.value = null;
    isModalVisible.value = false;
  };

  const deleteMemberById = async () => {
    const res = await deleteMember(deleteMemberId.value);
    hideDeleteConfirmationModal();
    tabulator.value.replaceData();
    if (res.statusCode === 200) {
      showMessage('Xóa hội viên thành công', true);
    } else {
      showMessage('Xóa hội viên thất bại', false);
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
