<template>
  <div
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
    class="flex justify-center"
  >
    <canvas ref="chartRef" :class="props.class">
      <!--    Begin : If canvas error-->
      <p>Your browser does not support the canvas element.</p>
      <!--  End : If canvas error   -->
    </canvas>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
// Chart.register
// https://www.chartjs.org/docs/master/getting-started/integration.html#bundlers-webpack-rollup-etc
import Chart from "chart.js/auto";

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: "line",
    validator: (value) => {
      return ["line", "pie", "doughnut", "bar"].indexOf(value) !== -1;
    },
  },
  data: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  width: {
    type: [Number, String],
    default: "auto",
  },
  height: {
    type: [Number, String],
    default: "auto",
  },
  class: {
    type: String,
    default: "",
  },
});

const chartRef = ref();

const init = () => {
  // canvas and getContext
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
  // https://www.chartjs.org/docs/master/configuration/
  const ctx = chartRef.value?.getContext("2d");
  const chart = new Chart(ctx, {
    type: props.type,
    data: props.data,
    options: props.options,
  });

  watch(props, () => {
    chart.data = props.data;
    chart.options = props.options;
    chart.update();
  });
};

onMounted(() => {
  init();
});
</script>
