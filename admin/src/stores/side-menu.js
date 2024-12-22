import { defineStore } from 'pinia';
import { RoleValue } from '../common/enums/permision/role';

export const useSideMenuStore = defineStore('sideMenu', {
  state: () => ({
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'dashboard',
        title: 'Home',
        role: [
          RoleValue.ADMIN,
          RoleValue.STAFF,
          RoleValue.TRAINER,
          RoleValue.MEMBER,
        ],
      },
      'devider',
      {
        icon: 'UserIcon',
        title: 'Hội Viên',
        role: [RoleValue.ADMIN, RoleValue.STAFF, RoleValue.TRAINER],
        subMenu: [
          {
            icon: '',
            pageName: 'create-member',
            title: 'Thêm hội viên',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
          },
          {
            icon: '',
            pageName: 'list-members',
            title: 'Danh sách hội viên',
            path: '/members',
            role: [RoleValue.ADMIN, RoleValue.STAFF, RoleValue.TRAINER],
          },
          {
            icon: '',
            pageName: 'checkin-history',
            title: 'Lịch sử checkin',
            role: [RoleValue.ADMIN, RoleValue.STAFF, RoleValue.TRAINER],
          },
        ],
      },
      {
        icon: 'UsersIcon',
        title: 'Huấn luyện viên',
        role: [RoleValue.ADMIN, RoleValue.STAFF],
        subMenu: [
          {
            icon: '',
            pageName: 'create-trainer',
            title: 'Thêm huấn luyện viên',
            role: [RoleValue.ADMIN],
          },
          {
            icon: '',
            pageName: 'requests-dayoff',
            title: 'Yêu cầu nghỉ phép',
            role: [RoleValue.ADMIN],
          },
          {
            icon: '',
            pageName: 'list-trainers',
            title: 'Danh sách huấn luyện viên',
            path: '/trainers',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
          },
        ],
      },
      {
        icon: 'PackageIcon',
        title: 'Gói dịch vụ',
        role: [RoleValue.ADMIN, RoleValue.STAFF],
        subMenu: [
          {
            icon: '',
            pageName: 'create-membership',
            title: 'Thêm gói dịch vụ',
            role: [RoleValue.ADMIN],
          },
          {
            icon: '',
            pageName: 'list-memberships',
            title: 'Danh sách gói dịch vụ',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
            path: '/memberships',
          },
        ],
      },
      {
        icon: 'CalendarIcon',
        title: 'Lịch tập',
        role: [RoleValue.ADMIN, RoleValue.STAFF, RoleValue.TRAINER],
        subMenu: [
          {
            icon: '',
            pageName: 'create-schedule',
            title: 'Đăng ký tập luyện',
            role: [RoleValue.ADMIN, RoleValue.STAFF, RoleValue.TRAINER],
            path: '/schedule/create',
          },
          {
            icon: '',
            pageName: 'assign-schedule',
            title: 'Phân công lịch tập',
            role: [RoleValue.ADMIN, RoleValue.STAFF, RoleValue.TRAINER],
            path: '/schedule/assign',
          },
          {
            icon: '',
            pageName: 'schedule-requests',
            title: 'Danh sách yêu cầu lịch tập hội viên',
            role: [RoleValue.ADMIN, RoleValue.STAFF, RoleValue.TRAINER],
            path: '/schedule/requests',
          },
          {
            icon: '',
            pageName: 'schedule-trainers',
            title: 'Lịch tập huấn luyện viên',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
            path: '/schedule/trainers',
          },
          {
            icon: '',
            pageName: 'schedule-members',
            title: 'Lịch tập hội viên',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
            path: '/schedule/members',
          },
        ],
      },
      'devider',
      {
        icon: 'BuildingIcon',
        title: 'Khu vực tập luyện',
        role: [RoleValue.ADMIN, RoleValue.STAFF],
        subMenu: [
          {
            icon: '',
            pageName: 'create-room',
            title: 'Thêm khu vực',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
          },
          {
            icon: '',
            pageName: 'list-rooms',
            title: 'Danh sách khu vực',
            path: '/rooms',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
          },
        ],
      },
      {
        icon: 'DumbbellIcon',
        title: 'Thiết bị',
        role: [RoleValue.ADMIN, RoleValue.STAFF],
        subMenu: [
          {
            icon: '',
            pageName: 'create-equipment',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
            title: 'Thêm thiết bị',
          },
          {
            icon: '',
            pageName: 'list-equipments',
            title: 'Danh sách thiết bị',
            path: '/equipments',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
          },
        ],
      },
      {
        icon: 'GanttChartSquareIcon',
        title: 'Bài tập',
        role: [RoleValue.ADMIN, RoleValue.STAFF],
        subMenu: [
          {
            icon: '',
            pageName: 'create-workout',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
            title: 'Thêm bài tập',
          },
          {
            icon: '',
            pageName: 'list-workouts',
            title: 'Danh sách bài tập',
            path: '/workouts',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
          },
        ],
      },
      {
        icon: 'ServerIcon',
        title: 'Lớp dịch vụ',
        role: [RoleValue.ADMIN, RoleValue.STAFF],
        subMenu: [
          {
            icon: '',
            pageName: 'create-service',
            title: 'Thêm lớp dịch vụ',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
          },
          {
            icon: '',
            pageName: 'list-services',
            title: 'Danh sách lớp dịch vụ',
            path: '/services',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
          },
        ],
      },
      'devider',
      {
        icon: 'UsersIcon',
        title: 'Thống kê, Báo cáo',
        role: [RoleValue.ADMIN, RoleValue.STAFF],
        subMenu: [
          {
            icon: '',
            pageName: 'reports',
            title: 'Thống kê doanh thu',
            path: '/reports',
            role: [RoleValue.ADMIN, RoleValue.STAFF],
          },
        ],
      },
    ],
  }),
});
