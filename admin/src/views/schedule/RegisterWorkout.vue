<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Đăng ký lịch tập luyện</h2>
  </div>

  <TabGroup class="py-5">
    <TabList class="nav-boxed-tabs text-bold flex sm:flex-row flex-col">
      <Tab v-for="tab in tabs" :key="tab.id" tag="button" class="w-full py-2">
        <h6 class="font-medium">{{ tab.name }}</h6>
      </Tab>
    </TabList>
    <TabPanels class="">
        <TabPanel class="leading-relaxed">
            <RegisterPrivate />
        </TabPanel>
        <TabPanel class="leading-relaxed">
            <RegisterSelf />
        </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup lang="ts">
import RegisterPrivate from './components/RegisterPrivate.vue';
import RegisterSelf from './components/RegisterSelf.vue';
const tabs = [
  { id: 2, name: 'Đăng ký theo khung chương trình' },
  { id: 3, name: 'Đăng ký tự do' },
];
</script>
