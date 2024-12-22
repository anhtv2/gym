<template>
  <ChartDoughnut
    type="pie"
    :width="props.width"
    :height="props.height"
    :data="data"
    class=""
  />
</template>
<script>
export default { name: "doughnut-chart" };
</script>
<script setup>
import { computed } from "vue";
// import { colors } from "@/utils/colors";

const props = defineProps({
  width: {
    type: [Number, String],
    default: "auto",
  },
  height: {
    type: [Number, String],
    default: "auto",
  },
  data_labels: {
    type: Array,
    required: true,
    default: () => ["Red", "Blue", "Yellow"],
  },
  data_datasets_label: {
    type: [Boolean, String],
    required: false,
    default: "Báo cáo thống kê",
  },
  data_datasets_data: {
    type: Array,
    required: true,
    default: () => [200, 180, 50],
  },
  data_backgroud_color: {
    type: Array,
    required: true,
    default: () => [
      "rgb(255, 99, 132)",
      "rgb(54, 162, 235)",
      "rgb(255, 205, 86)",
    ],
  },
  options_plugins_title_text: {
    type: String,
    required: false,
    default: "title test",
  },
});

const data = computed(() => {
  return {
    labels: props.data_labels,
    datasets: [
      {
        label: props.data_datasets_label,
        data: props.data_datasets_data,
        backgroundColor: props.data_backgroud_color,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };
});

// const options = computed(() => {
//   return {
//     maintainAspectRatio: true,
//     plugins: {
//       legend: {
//         display: true,
//       },
//       title: {
//         display: true,
//         text: props.options_plugins_title_text,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           drawTicks: false,
//           display: false,
//         },
//         ticks: {
//           font: {
//             size: 11,
//           },
//           display: true,
//           color: colors.slate["500"](0.8),
//         },
//         border: {
//           dash: [5, 5],
//           display: true,
//           color: colors.slate["300"](),
//         },
//       },
//       y: {
//         grid: {
//           drawTicks: false,
//           display: true,
//           colors: colors.dark(),
//         },
//         ticks: {
//           display: true,
//           color: colors.slate["500"](0.8),
//           stepSize: 1,
//           callback: (yValue) => {
//             return Math.floor(yValue); // format to your liking
//           },
//         },
//         border: {
//           dash: [5, 5],
//           display: true,
//           color: colors.slate["300"](),
//         },
//       },
//     },
//   };
// });
</script>
