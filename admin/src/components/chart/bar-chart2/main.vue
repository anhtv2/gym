<template>
  <ChartBar
    type="bar"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
    class=""
  />
</template>
<script>
export default {
  name: "bar-chart2",
};
</script>
<script setup>
import { computed } from "vue";
import { colors } from "@/common/utils/colors";

const props = defineProps({
  width: {
    type: [Number, String],
    default: "auto",
    required: false,
  },
  height: {
    type: [Number, String],
    default: "auto",
    required: false,
  },
  data_labels: {
    type: Array,
    required: true,
    default: () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  options_plugins_title_text: {
    type: String,
    required: false,
    default: "title test",
  },
  data_datasets: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const data = computed(() => {
  return {
    labels: props.data_labels,
    datasets: props.data_datasets,
  };
});

const options = computed(() => {
  return {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: props.options_plugins_title_text,
      },
    },
    scales: {
      x: {
        grid: {
          drawTicks: false,
          display: true,
        },
        ticks: {
          font: {
            size: 11,
          },
          display: true,
          color: colors.slate["500"](0.8),
        },
        border: {
          dash: [5, 5],
          display: true,
          color: colors.slate["300"](),
        },
      },
      y: {
        grid: {
          drawTicks: false,
          display: true,
        },
        ticks: {
          display: true,
          color: colors.slate["500"](0.8),
          stepSize: 1,
          callback: (yValue) => {
            return Math.floor(yValue); // format to your liking
          },
        },
        border: {
          dash: [5, 5],
          display: true,
          color: colors.slate["300"](),
        },
      },
    },
  };
});
</script>
