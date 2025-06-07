import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { defineNuxtPlugin } from '#app';

// 文件名中的 .client 后缀会告诉 Nuxt 这个插件只在浏览器（客户端）环境中加载。
// 在这个插件中，将完成 ECharts 的初始化配置，并将 VChart 组件注册为全局组件。

export default defineNuxtPlugin((nuxtApp) => {
  use([
    CanvasRenderer,
    PieChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
  ]);
  
  nuxtApp.vueApp.component('v-chart', VChart);
}); 