<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Chỉnh sửa bài tập</h2>
  </div>

  <TabGroup class="py-5">
    <TabList class="nav-boxed-tabs text-bold flex sm:flex-row flex-col">
      <Tab v-for="tab in tabs" :key="tab.id" tag="button" class="w-full py-2">
        <h6 class="font-medium">{{ tab.name }}</h6>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel class="leading-relaxed">
        <InfoTab />
      </TabPanel>
      <TabPanel class="leading-relaxed">
        <EquipmentTab />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup lang="ts">
import InfoTab from './components/Info.vue';
import EquipmentTab from './components/Equipment.vue';
const tabs = [
  { id: 1, name: 'Thông tin bài tập' },
  { id: 2, name: 'Thiết bị' },
];
</script>
