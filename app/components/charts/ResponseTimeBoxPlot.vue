<template>
  <div class="chart-container">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

const chartRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!chartRef.value) return

  const chart = echarts.init(chartRef.value)

  // Data format: [min, Q1, median, Q3, max]
  chart.setOption({
    title: {
      text: 'Response Time Distribution',
    },

    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },
    },

    xAxis: {
      type: 'category',
      data: ['January', 'February', 'March', 'April', 'May'],
    },

    yAxis: {
      type: 'value',
      name: 'Response Time (ms)',
    },

    series: [
      {
        name: 'Response Time',
        type: 'boxplot',
        data: [
          [120, 130, 150, 200, 250],
          [100, 110, 130, 180, 220],
          [90, 100, 120, 170, 210],
          [110, 120, 140, 190, 230],
          [80, 95, 115, 160, 200],
        ],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
})
</script>

<style scoped>
.chart-container {
  width: 100%;
}

.chart {
  width: 100%;
  height: 400px;
}
</style>