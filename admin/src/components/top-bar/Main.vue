<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <nav aria-label="breadcrumb" class="-intro-x mr-auto hidden sm:flex">
      <ol class="breadcrumb">
        <li v-for="(item, index) in routeMatched" :key="index" class="breadcrumb-item"
          :class="{ active: index === routeMatched.length - 1 }">
          <template v-if="index === routeMatched.length - 1">
            {{ item.meta.title }}
          </template>
          <template v-else>
            <router-link :to="item.path">{{ item.meta.title }}</router-link>
          </template>
        </li>
      </ol>
    </nav>
    <!-- END: Breadcrumb -->

    <!-- BEGIN: Account Menu -->
    <Dropdown class="intro-x w-8 h-8">
      <DropdownToggle tag="div" role="button"
        class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
        <img alt="Buusama" src="@/assets/images/profile-5.jpg" />
      </DropdownToggle>
      <DropdownMenu class="w-56">
        <DropdownContent class="bg-primary text-white">
          <DropdownHeader tag="div" class="!font-normal">
            <div class="font-medium">{{ currentUser.name }} - {{ userRole }} </div>
            <div class="text-xs text-white/70 dark:text-slate-500 mt-2">
              {{ currentUser.email }}
            </div>
          </DropdownHeader>
          <DropdownDivider class="border-white/[0.08]" />
          <DropdownItem class="dropdown-item hover:bg-white/5" @click="actionLogout">
            <ToggleRightIcon class="w-4 h-4 mr-2" />
            Logout
          </DropdownItem>
        </DropdownContent>
      </DropdownMenu>
    </Dropdown>
    <!-- END: Account Menu -->
  </div>
  <!-- END: Top Bar -->
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { RoleValue, RoleLabel } from '@/common/enums/permision/role'
export default {
  name: 'TopBar',
  setup() {
    const searchDropdown = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()

    const routeMatched = computed(() => {
      return router.currentRoute.value.matched.filter(item => item.meta && item.meta.title);
    });

    const showSearchDropdown = () => {
      searchDropdown.value = true
    }

    const hideSearchDropdown = () => {
      searchDropdown.value = false
    }

    async function actionLogout() {
      authStore.logout()
    }
    const currentUser = computed(() => {
      return JSON.parse(authStore.currentUser ?? "")
    })

    const roleMapping: { [key: number]: string } = {
      [RoleValue.ADMIN]: RoleLabel.ADMIN,
      [RoleValue.TRAINER]: RoleLabel.TRAINER,
      [RoleValue.STAFF]: RoleLabel.STAFF,
      [RoleValue.MEMBER]: RoleLabel.MEMBER,
    }

    const userRole = computed(() => {
      const role = currentUser.value.role as RoleValue
      return roleMapping[role] || RoleLabel.MEMBER
    })

    return {
      searchDropdown,
      showSearchDropdown,
      hideSearchDropdown,
      actionLogout,
      currentUser,
      userRole,
      routeMatched,
    }
  },
}
</script>
