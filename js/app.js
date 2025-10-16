// 应用主逻辑
const { createApp, ref, reactive, computed, onMounted, watch } = Vue;

// 图表类型定义
const chartTypes = [
    { id: 'line', name: '折线图', title: '未来15天最高气温和最低气温', description: '使用plot()绘制折线图展示温度变化趋势' },
    { id: 'bar', name: '柱形图', title: '2013—2019财年阿里巴巴GMV', description: '使用bar()绘制柱形图展示财务数据' },
    { id: 'horizontalBar', name: '条形图', title: '各商品种类的网购替代率', description: '使用barh()绘制条形图展示替代率数据' },
    { id: 'area', name: '堆积面积图', title: '物流公司物流费用统计', description: '使用stackplot()绘制堆积面积图展示费用变化' },
    { id: 'histogram', name: '直方图', title: '人脸识别的灰度直方图', description: '使用hist()绘制直方图展示数据分布' },
    { id: 'pie', name: '饼图', title: '支付宝月账单报告', description: '使用pie()绘制饼图或圆环图展示消费占比' },
    { id: 'scatter', name: '散点图', title: '汽车速度与制动距离的关系', description: '使用scatter()绘制散点图或气泡图展示相关性' },
    { id: 'boxplot', name: '箱形图', title: '2017年和2018年全国发电量统计', description: '使用boxplot()绘制箱形图展示数据分布' },
    { id: 'radar', name: '雷达图', title: '霍兰德职业兴趣测试', description: '绘制雷达图展示多维度数据比较' },
    { id: 'errorbar', name: '误差棒图', title: '树种的细根生物量', description: '使用errorbar()绘制误差棒图展示数据的不确定性' }
];

// 创建Vue应用
const app = createApp({
    setup() {
        // 状态管理
        const selectedChartType = ref('line');
        const chart = ref(null);
        const controlValues = reactive({
            pointSize: 3,
            barWidth: 0.5,
            innerRadius: 0,
            bubbleSize: 5,
            animationSpeed: 1000,
            showLegend: true
        });
        
        // 计算属性
        const currentChartTitle = computed(() => {
            const chartType = chartTypes.find(c => c.id === selectedChartType.value);
            return chartType ? chartType.title : '';
        });
        
        const currentChartDescription = computed(() => {
            const chartType = chartTypes.find(c => c.id === selectedChartType.value);
            return chartType ? chartType.description : '';
        });
        
        const currentChartData = ref([]);
        const currentDataHeaders = ref([]);
        
        // 方法
        const selectChartType = (chartType) => {
            selectedChartType.value = chartType;
            updateDataTable();
            renderChart();
        };
        
        const updateDataTable = () => {
            const data = datasets[selectedChartType.value];
            if (!data) return;
            
            // 根据图表类型处理数据
            let tableData = [];
            let headers = [];
            
            if (selectedChartType.value === 'scatter') {
                // 散点图特殊处理
                headers = ['x', 'y', 'size'];
                tableData = data.datasets[0].data.map(point => ({
                    x: point.x,
                    y: point.y,
                    size: point.r
                }));
            } else if (selectedChartType.value === 'boxplot') {
                // 箱形图特殊处理
                headers = ['label', 'min', 'q1', 'median', 'q3', 'max'];
                tableData = data.labels.map((label, i) => ({
                    label: label,
                    min: data.datasets[0].data[i].min,
                    q1: data.datasets[0].data[i].q1,
                    median: data.datasets[0].data[i].median,
                    q3: data.datasets[0].data[i].q3,
                    max: data.datasets[0].data[i].max
                }));
            } else if (selectedChartType.value === 'errorbar') {
                // 误差棒图特殊处理
                headers = ['label', 'value', 'error'];
                tableData = data.labels.map((label, i) => ({
                    label: label,
                    value: data.datasets[0].data[i],
                    error: data.datasets[0].errorBars[i].plus
                }));
            } else {
                // 其他图表通用处理
                headers = ['label'];
                data.datasets.forEach((dataset, i) => {
                    headers.push(dataset.label || `数据集${i+1}`);
                });
                
                data.labels.forEach((label, i) => {
                    const row = { label: label };
                    data.datasets.forEach((dataset, j) => {
                        row[dataset.label || `数据集${j+1}`] = dataset.data[i];
                    });
                    tableData.push(row);
                });
            }
            
            currentDataHeaders.value = headers;
            currentChartData.value = tableData;
        };
        
        // 数据操作方法
        const addDataRow = () => {
            const newRow = {};
            currentDataHeaders.value.forEach(header => {
                newRow[header] = 0;
            });
            currentChartData.value.push(newRow);
        };
        
        const removeDataRow = (index) => {
            currentChartData.value.splice(index, 1);
            updateChart();
        };
        
        const importData = () => {
            document.getElementById('fileInput').click();
        };
        
        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    
                    // 更新数据集
                    if (importedData.chartType && importedData.data) {
                        selectedChartType.value = importedData.chartType;
                        datasets[selectedChartType.value] = importedData.data;
                        updateDataTable();
                        renderChart();
                    }
                } catch (error) {
                    alert('导入数据格式错误，请检查JSON格式是否正确');
                    console.error('导入数据错误:', error);
                }
            };
            reader.readAsText(file);
        };
        
        const exportData = () => {
            // 从表格数据重建数据集
            const exportData = {
                chartType: selectedChartType.value,
                data: rebuildDatasetFromTable()
            };
            
            // 创建下载链接
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `chart_data_${selectedChartType.value}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        };
        
        // 初始化
        onMounted(() => {
            updateDataTable();
            renderChart();
        });
        
        // 导出方法和状态
        return {
            chartTypes,
            selectedChartType,
            controlValues,
            currentChartTitle,
            currentChartDescription,
            currentChartData,
            currentDataHeaders,
            selectChartType,
            updateChart,
            addDataRow,
            removeDataRow,
            importData,
            handleFileUpload,
            exportData
        };
    }
}).mount('#app');

// 图表渲染函数
function renderChart() {
    const selectedChartType = app.selectedChartType;
    const controlValues = app.controlValues;
    const ctx = document.getElementById('chartCanvas');
    
    // 如果已有图表，销毁它
    if (window.currentChart) {
        window.currentChart.destroy();
    }
    
    // 获取当前图表数据
    const data = datasets[selectedChartType];
    if (!data) return;
    
    // 根据图表类型渲染不同的图表
    switch (selectedChartType) {
        case 'line':
            renderLineChart(ctx, data, controlValues);
            break;
        case 'bar':
            renderBarChart(ctx, data, false, controlValues);
            break;
        case 'horizontalBar':
            renderBarChart(ctx, data, true, controlValues);
            break;
        case 'area':
            renderAreaChart(ctx, data, controlValues);
            break;
        case 'histogram':
            renderHistogramChart(ctx, data, controlValues);
            break;
        case 'pie':
            renderPieChart(ctx, data, controlValues);
            break;
        case 'scatter':
            renderScatterChart(ctx, data, controlValues);
            break;
        case 'boxplot':
            renderBoxPlotChart(ctx, data, controlValues);
            break;
        case 'radar':
            renderRadarChart(data, controlValues);
            break;
        case 'errorbar':
            renderErrorBarChart(ctx, data, controlValues);
            break;
    }
}

// 从表格数据重建数据集
function rebuildDatasetFromTable() {
    const selectedChartType = app.selectedChartType;
    const currentChartData = app.currentChartData;
    const currentDataHeaders = app.currentDataHeaders;
    
    // 获取原始数据结构
    const originalData = datasets[selectedChartType];
    if (!originalData) return originalData;
    
    // 根据图表类型处理数据
    let newData = JSON.parse(JSON.stringify(originalData));
    
    // 根据表格数据更新数据集
    // 这里只实现基本的数据更新逻辑，实际应用中可能需要更复杂的处理
    if (selectedChartType === 'scatter') {
        newData.datasets[0].data = currentChartData.map(row => ({
            x: parseFloat(row.x),
            y: parseFloat(row.y),
            r: parseFloat(row.size)
        }));
    } else if (selectedChartType === 'boxplot') {
        currentChartData.forEach((row, i) => {
            if (i < newData.labels.length) {
                newData.labels[i] = row.label;
                newData.datasets[0].data[i] = {
                    min: parseFloat(row.min),
                    q1: parseFloat(row.q1),
                    median: parseFloat(row.median),
                    q3: parseFloat(row.q3),
                    max: parseFloat(row.max),
                    outliers: []
                };
            }
        });
    } else {
        // 通用处理
        newData.labels = currentChartData.map(row => row.label);
        
        // 更新每个数据集的数据
        newData.datasets.forEach((dataset, i) => {
            const datasetLabel = dataset.label || `数据集${i+1}`;
            dataset.data = currentChartData.map(row => parseFloat(row[datasetLabel]));
        });
    }
    
    return newData;
}