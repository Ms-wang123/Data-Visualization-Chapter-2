// 数据可视化展示平台 - 主应用文件
const { createApp, ref, reactive, onMounted, watch } = Vue;

// 导入图表模块
import { LineChart } from './charts/lineChart.js';
import { BarChart } from './charts/barChart.js';
import { HorizontalBarChart } from './charts/horizontalBarChart.js';
import { AreaChart } from './charts/areaChart.js';
import { HistogramChart } from './charts/histogramChart.js';
import { PieChart } from './charts/pieChart.js';
import { ScatterChart } from './charts/scatterChart.js';
import { BoxPlotChart } from './charts/boxPlotChart.js';
import { RadarChart } from './charts/radarChart.js';
import { ErrorBarChart } from './charts/errorBarChart.js';

// 创建Vue应用
createApp({
    setup() {
        // 状态管理
        const activeChart = ref(0);
        const isZoomed = ref(false);
        const selectedDataPoint = ref(null);
        let chartInstances = [];

        // 图表配置
        const charts = reactive([
            LineChart,
            BarChart,
            HorizontalBarChart,
            AreaChart,
            HistogramChart,
            PieChart,
            ScatterChart,
            BoxPlotChart,
            RadarChart,
            ErrorBarChart
        ]);

        // 选择图表
        function selectChart(index) {
            activeChart.value = index;
            renderChart();
        }

        // 切换缩放状态
        function toggleZoom() {
            isZoomed.value = !isZoomed.value;
            
            // 更新图表容器大小
            const chartView = document.getElementById(`chart-${activeChart.value}`);
            if (isZoomed.value) {
                chartView.classList.add('zoomed');
            } else {
                chartView.classList.remove('zoomed');
            }
            
            // 重新渲染图表以适应新尺寸
            setTimeout(() => {
                if (chartInstances[activeChart.value]) {
                    chartInstances[activeChart.value].resize();
                }
            }, 300);
        }

        // 重置图表
        function resetChart() {
            if (chartInstances[activeChart.value]) {
                // 清除可能存在的定时器
                if (chartInstances[activeChart.value].timer) {
                    clearInterval(chartInstances[activeChart.value].timer);
                }
                
                // 销毁当前图表实例
                chartInstances[activeChart.value].dispose();
                
                // 重新渲染
                renderChart();
            }
        }

        // 更新图表
        function updateChart() {
            resetChart();
        }

        // 渲染当前选中的图表
        function renderChart() {
            selectedDataPoint.value = null;
            
            const chartDom = document.getElementById(`chart-${activeChart.value}`);
            if (!chartDom) return;
            
            // 清除之前的图表
            if (chartInstances[activeChart.value]) {
                if (chartInstances[activeChart.value].timer) {
                    clearInterval(chartInstances[activeChart.value].timer);
                }
                chartInstances[activeChart.value].dispose();
            }
            
            // 获取当前图表配置
            const currentChart = charts[activeChart.value];
            const option = currentChart.selectedOption;
            
            // 渲染图表
            chartInstances[activeChart.value] = currentChart.render(chartDom, option);
        }

        // 初始化
        onMounted(() => {
            renderChart();
            
            // 监听窗口大小变化，调整图表大小
            window.addEventListener('resize', () => {
                chartInstances.forEach(chart => {
                    if (chart) {
                        chart.resize();
                    }
                });
            });
        });

        // 监听图表选项变化
        watch(() => activeChart.value, () => {
            renderChart();
        });

        return {
            activeChart,
            isZoomed,
            selectedDataPoint,
            charts,
            selectChart,
            toggleZoom,
            resetChart,
            updateChart
        };
    }
}).mount('#app');