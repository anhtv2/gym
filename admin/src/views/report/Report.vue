<template>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <!-- Daily Revenue Chart -->
    <div class="intro-y col-span-12 lg:col-span-6">
      <div class="intro-y box p-5">
        <input type="month" v-model="selectedMonth" class="form-control" @change="fetchDailyRevenueData" />
        <div class="mt-6">
          <ReportBarChart1 :data_datasets_data="dailyRevenueData" :data_labels="dailyRevenueLabels" :options_plugins_title_text="'Doanh thu theo ngày'" :data_datasets_label="'Doanh thu'" />
        </div>
      </div>
    </div>

    <!-- Monthly Revenue Chart -->
    <div class="intro-y col-span-12 lg:col-span-6">
      <div class="intro-y box p-5">
        <input type="number" v-model="selectedYear" class="form-control" @change="fetchMonthlyRevenueData" />
        <div class="mt-6">
          <ReportBarChart1 :data_datasets_data="monthlyRevenueData" :data_labels="monthlyRevenueLabels" :options_plugins_title_text="'Doanh thu theo tháng'" :data_datasets_label="'Doanh thu'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ReportBarChart1 from '@/components/chart/bar-chart1/main.vue';
import SimpleLineChart1 from '@/components/chart/line-chart1/main.vue';
import { getReportRevenueMonthly, getReportRevenueYearly } from '@/api/dashboard';

const selectedMonth = ref<string | null>(null);
const selectedYear = ref<number>(2024);

const dailyRevenueLabels = ref<string[]>(Array.from({ length: 31 }, (_, i) => (i + 1).toString()));
const dailyRevenueData = ref<number[]>([]);

const monthlyRevenueLabels = ref<string[]>(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
const monthlyRevenueData = ref<number[]>([]);

const fetchDailyRevenueData = async () => {
  if (!selectedMonth.value) return;
  const month = selectedMonth.value.split('-')[1];
  const year = selectedMonth.value.split('-')[0];
  const response = await getReportRevenueMonthly({ month: parseInt(month), year: parseInt(year) });
  if (response.statusCode === 200) {
    const data = response.data;
    dailyRevenueData.value = new Array(31).fill(0);
    data.forEach((item: { day: number; sales: string }) => {
      dailyRevenueData.value[item.day - 1] = parseFloat(item.sales);
    });
  }
};

const fetchMonthlyRevenueData = async () => {
  const response = await getReportRevenueYearly({ year: selectedYear.value });
  if (response.statusCode === 200) {
    const data = response.data;
    monthlyRevenueData.value = new Array(12).fill(0);
    data.forEach((item: { month: number; sales: string }) => {
      monthlyRevenueData.value[item.month - 1] = parseFloat(item.sales);
    });
  }
};

// Initial data fetch
onMounted(() => {
  fetchDailyRevenueData();
  fetchMonthlyRevenueData();
});
</script>
