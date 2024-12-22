import { RoleValue } from '@/common/enums/permision/role'

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    name: 'home',
    path: '/',
    component: () => import('@/layouts/side-menu/Main.vue'),
    meta: { requiresAuth: true, title: 'Trang chủ' },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          requiresAuth: true,
          title: 'Dashboard',
          role: [RoleValue.TRAINER, RoleValue.STAFF, RoleValue.MEMBER],
        },
      },
      {
        path: '/trainers',
        name: 'trainers',
        meta: {
          requiresAuth: true,
          title: 'Huấn luyện viên',
          role: [RoleValue.STAFF],
        },
        children: [
          {
            path: '',
            name: 'list-trainers',
            component: () => import('@/views/trainer/List.vue'),
            meta: { requiresAuth: true, title: 'Danh sách huấn luyện viên' },
          },
          {
            path: 'create',
            children: [
              {
                path: '',
                name: 'create-trainer',
                component: () => import('@/views/trainer/Create.vue'),
                meta: { requiresAuth: true, title: 'Thêm huấn luyện viên' },
              },
            ],
          },
          {
            path: 'requests-dayoff',
            children: [
              {
                path: '',
                name: 'requests-dayoff',
                component: () => import('@/views/trainer/RequestDayOff.vue'),
                meta: { requiresAuth: true, title: 'Danh sách yêu cầu nghỉ' },
              },
            ],
          },
          {
            path: ':id/edit',
            name: 'edit-trainer',
            component: () => import('@/views/trainer/Edit.vue'),
            meta: { requiresAuth: true, title: 'Chỉnh sửa huấn luyện viên' },
          },
        ],
      },
      {
        path: '/members',
        name: 'members',
        meta: {
          requiresAuth: true,
          title: 'Hội viên',
          role: [RoleValue.TRAINER, RoleValue.STAFF],
        },
        children: [
          {
            path: '',
            name: 'list-members',
            component: () => import('@/views/member/List.vue'),
            meta: { requiresAuth: true, title: 'Danh sách hội viên' },
          },
          {
            path: 'create',
            children: [
              {
                path: '',
                name: 'create-member',
                component: () => import('@/views/member/Create.vue'),
                meta: { requiresAuth: true, title: 'Thêm hội viên' },
              },
            ],
          },
          {
            path: 'checkin',
            children: [
              {
                path: '',
                name: 'checkin-history',
                component: () => import('@/views/home/Home.vue'),
                meta: { requiresAuth: true, title: 'Lịch sử checkin' },
              },
            ],
          },
          {
            path: ':id/edit',
            name: 'edit-member',
            component: () => import('@/views/member/Edit.vue'),
            meta: { requiresAuth: true, title: 'Chỉnh sửa hội viên' },
          },
        ],
      },
      {
        path: '/memberships',
        name: 'memberships',
        meta: { requiresAuth: true, title: 'Gói tập' },
        children: [
          {
            path: '',
            name: 'list-memberships',
            component: () => import('@/views/membership/List.vue'),
            meta: {
              requiresAuth: true,
              title: 'Danh sách gói tập',
              role: [RoleValue.STAFF],
            },
          },
          {
            path: ':id/edit',
            name: 'edit-membership',
            component: () => import('@/views/membership/Edit.vue'),
            meta: { requiresAuth: true, title: 'Chỉnh sửa gói tập' },
          },
          {
            path: 'create',
            children: [
              {
                path: '',
                name: 'create-membership',
                component: () => import('@/views/membership/Create.vue'),
                meta: { requiresAuth: true, title: 'Thêm gói tập' },
              },
            ],
          },
        ],
      },
      {
        path: '/services',
        name: 'services',
        meta: { requiresAuth: true, title: 'Lớp dịch vụ' },
        children: [
          {
            path: '',
            name: 'list-services',
            component: () => import('@/views/service/List.vue'),
            meta: { requiresAuth: true, title: 'Danh sách lớp dịch vụ' },
          },
          {
            path: ':id/edit',
            name: 'edit-service',
            component: () => import('@/views/service/Edit.vue'),
            meta: { requiresAuth: true, title: 'Chỉnh sửa lớp dịch vụ' },
          },
          {
            path: ':id/sessions',
            name: 'service-sessions',
            children: [
              {
                path: '',
                name: 'service-sessions-list',
                component: () => import('@/views/service/Session.vue'),
                meta: { requiresAuth: true, title: 'Chỉnh sửa buổi tập' },
              },
              {
                path: ':sessionId/workouts',
                name: 'service-session-workouts',
                component: () => import('@/views/service/Workout.vue'),
                meta: { requiresAuth: true, title: 'Chỉnh sửa buổi tập' },
              }
            ],
          },
          {
            path: 'create',
            children: [
              {
                path: '',
                name: 'create-service',
                component: () => import('@/views/service/Create.vue'),
                meta: { requiresAuth: true, title: 'Thêm lớp dịch vụ' },
              },
            ],
          },
        ],
      },
      {
        path: '/schedule',
        name: 'schedule',
        meta: { requiresAuth: true, title: 'Lịch trình' },
        children: [
          {
            path: 'members',
            name: 'schedule-members',
            component: () => import('@/views/schedule/Member.vue'),
            meta: { requiresAuth: true, title: 'Lịch tập luyện hội viên' },
          },
          {
            path: 'requests',
            name: 'schedule-requests',
            component: () => import('@/views/schedule/Booking.vue'),
            meta: { requiresAuth: true, title: 'Danh sách lịch hẹn' },
          },
          {
            path: 'trainers',
            name: 'schedule-trainers',
            component: () => import('@/views/schedule/Trainer.vue'),
            meta: { requiresAuth: true, title: 'Lịch dạy huấn luyện viên' },
          },
          {
            path: 'create',
            name: 'create-schedule',
            component: () => import('@/views/schedule/RegisterWorkout.vue'),
            meta: { requiresAuth: true, title: 'Đăng ký tập luyện' },
          },
          {
            path: 'assign',
            name: 'assign-schedule',
            component: () => import('@/views/schedule/AssignTrainer.vue'),
            meta: { requiresAuth: true, title: 'Phân bổ huấn luyện' },
          },
          // {
          // path: 'trainers',
          // name: 'schedule-trainers',
          // component: () => import('@/views/schedule/Trainer.vue'),
          // meta: { requiresAuth: true, title: 'Danh sách huấn luyện viên' }
          // }
        ],
      },
      {
        path: '/rooms',
        name: 'rooms',
        meta: { requiresAuth: true, title: 'Phòng tập' },
        children: [
          {
            path: '',
            name: 'list-rooms',
            component: () => import('@/views/room/List.vue'),
            meta: {
              requiresAuth: true,
              title: 'Danh sách phòng tập',
              role: [RoleValue.STAFF],
            },
          },
          {
            path: ':id/edit',
            name: 'edit-room',
            component: () => import('@/views/room/Edit.vue'),
            meta: { requiresAuth: true, title: 'Chỉnh sửa phòng tập' },
          },
          {
            path: 'create',
            children: [
              {
                path: '',
                name: 'create-room',
                component: () => import('@/views/room/Create.vue'),
                meta: { requiresAuth: true, title: 'Thêm phòng tập' },
              },
            ],
          },
        ],
      },
      {
        path: '/equipments',
        name: 'equipments',
        meta: { requiresAuth: true, title: 'Thiết bị' },
        children: [
          {
            path: '',
            name: 'list-equipments',
            component: () => import('@/views/equipment/List.vue'),
            meta: {
              requiresAuth: true,
              title: 'Danh sách thiết bị',
              role: [RoleValue.STAFF],
            },
          },
          {
            path: ':id/edit',
            name: 'edit-equipment',
            component: () => import('@/views/equipment/Edit.vue'),
            meta: { requiresAuth: true, title: 'Chỉnh sửa thiết bị' },
          },
          {
            path: 'create',
            children: [
              {
                path: '',
                name: 'create-equipment',
                component: () => import('@/views/equipment/Create.vue'),
                meta: { requiresAuth: true, title: 'Thêm thiết bị' },
              },
            ],
          },
        ],
      },
      {
        path: '/workouts',
        name: 'workouts',
        meta: { requiresAuth: true, title: 'Bài tập' },
        children: [
          {
            path: '',
            name: 'list-workouts',
            component: () => import('@/views/workout/List.vue'),
            meta: {
              requiresAuth: true,
              title: 'Danh sách bài tập',
              role: [RoleValue.STAFF],
            },
          },
          {
            path: ':id/edit',
            name: 'edit-workout',
            component: () => import('@/views/workout/Edit.vue'),
            meta: { requiresAuth: true, title: 'Chỉnh sửa bài tập' },
          },
          {
            path: 'create',
            children: [
              {
                path: '',
                name: 'create-workout',
                component: () => import('@/views/workout/Create.vue'),
                meta: { requiresAuth: true, title: 'Thêm bài tập' },
              },
            ],
          },
        ],
      },
      {
        path: '/reports',
        name: 'reports',
        meta: { requiresAuth: true, title: 'Báo cáo' },
        component: () => import('@/views/report/Report.vue'),
      },
      {
        path: '/users',
        name: 'users',
        meta: { requiresAuth: true, title: 'Người dùng' },
        children: [
          {
            path: '',
            name: 'list-users',
            component: () => import('@/views/user/List.vue'),
            meta: { requiresAuth: true, title: 'Danh sách người dùng' },
            children: [
              {
                path: 'create',
                name: 'create-user',
                component: () => import('@/views/user/Create.vue'),
                meta: { requiresAuth: true, title: 'Thêm người dùng' },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'errors.404',
    path: '/404',
    component: () => import('@/views/error-page/ErrorPage.vue'),
  },
  {
    name: 'errors.403',
    path: '/403',
    component: () => import('@/views/error-page/PermisionPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error-page/ErrorPage.vue'),
  },
  {
    path: '/unauthorized',
    component: () => import('@/views/error-page/PermisionPage.vue'),
  },
]

export default routes
