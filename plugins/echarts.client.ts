import { defineNuxtPlugin } from '#app';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';

// ECharts renderers
import { CanvasRenderer } from 'echarts/renderers';

// ECharts charts
import {
  LineChart,
  BarChart,
  PieChart
} from 'echarts/charts';

// ECharts components
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent
} from 'echarts/components';

export default defineNuxtPlugin((nuxtApp) => {
  // Register required ECharts modules treeshakably
  use([
    CanvasRenderer,
    LineChart,
    BarChart,
    PieChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    DataZoomComponent
  ]);

  // Register VChart component globally on client-side
  nuxtApp.vueApp.component('VChart', VChart);
});
