<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted, onBeforeUnmount, ref } from "vue"

const chartRef = ref<HTMLElement | null>(null)

let chart: echarts.ECharts | null = null

const renderChart = () => {
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)

  const option: echarts.EChartsOption = {
    title: {
      text: "Monthly Revenue Bar Chart",
    },

    tooltip: {
      trigger: "axis",
    },

    xAxis: {
      type: "category",
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
      ],
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        name: "Revenue",
        type: "bar",
        emphasis: {
          itemStyle: {
            color: "#ff6600",
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
        },
        data: [
          12000,
          18000,
          15000,
          22000,
          26000,
          30000,
        ],
      },
    ],
  }

  chart.setOption(option)
}

const handleResize = () => {
  chart?.resize()
}

onMounted(() => {
  renderChart()

  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)

  chart?.dispose()
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div
      ref="chartRef"
      class="h-80 w-full"
    ></div>
  </div>
</template>