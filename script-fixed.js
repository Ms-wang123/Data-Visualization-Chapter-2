const { createApp, ref, reactive, computed, onMounted, watch, nextTick } = Vue;

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

// 颜色调色板
const colorPalettes = [
    { name: '默认', primary: '#667eea', secondary: '#764ba2' },
    { name: '商务', primary: '#3498db', secondary: '#2980b9' },
    { name: '自然', primary: '#27ae60', secondary: '#2ecc71' },
    { name: '热情', primary: '#e74c3c', secondary: '#c0392b' },
    { name: '优雅', primary: '#9b59b6', secondary: '#8e44ad' },
    { name: '活力', primary: '#f39c12', secondary: '#e67e22' }
];

// 案例研究数据
const caseStudies = [
    {
        id: 1,
        title: '电商销售分析',
        description: '分析不同商品类别的销售趋势和季节性变化',
        chartType: '折线图',
        dataPoints: '1200+'
    },
    {
        id: 2,
        title: '用户行为统计',
        description: '展示用户在不同时间段的活跃度和行为模式',
        chartType: '柱形图',
        dataPoints: '500+'
    },
    {
        id: 3,
        title: '产品性能对比',
        description: '比较不同产品版本的关键性能指标',
        chartType: '雷达图',
        dataPoints: '200+'
    },
    {
        id: 4,
        title: '市场调研数据',
        description: '可视化市场调研结果和用户偏好分布',
        chartType: '饼图',
        dataPoints: '800+'
    }
];

// 完整示例数据集
const datasets = {
    line: {
        labels: ['4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日'],
        datasets: [
            {
                label: '最高气温(°C)',
                data: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31],
                borderColor: '#ff6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: '最低气温(°C)',
                data: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16],
                borderColor: '#36a2eb',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.1,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    },
    bar: {
        labels: ['FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017', 'FY2018', 'FY2019'],
        datasets: [
            {
                label: '阿里巴巴GMV(亿元)',
                data: [10770, 16780, 24440, 30920, 37670, 48200, 57270],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#8AC249'
                ],
                borderColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#8AC249'
                ],
                borderWidth: 2
            }
        ]
    },
    horizontalBar: {
        labels: ['家政、家教、保姆等生活服务', '飞机票、火车票', '家具', '手机、手机配件', '计算机及其配套产品', 
                '汽车用品', '通信充值、游戏充值', '个人护理用品', '书报杂志及音像制品', '餐饮、旅游、住宿'],
        datasets: [
            {
                label: '网购替代率',
                data: [0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 0.860, 0.856],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#8AC249', '#EA526F', '#6A0572', '#AB83A1'
                ],
                borderColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#8AC249', '#EA526F', '#6A0572', '#AB83A1'
                ],
                borderWidth: 2
            }
        ]
    },
    area: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '公司A',
                data: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true,
                tension: 0.1
            },
            {
                label: '公司B',
                data: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: true,
                tension: 0.1
            }
        ]
    },
    histogram: {
        labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
        datasets: [
            {
                label: '分数分布',
                data: [5, 8, 12, 15, 20, 15, 12, 8, 3, 2],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#8AC249', '#EA526F', '#6A0572', '#AB83A1'
                ],
                borderColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#8AC249', '#EA526F', '#6A0572', '#AB83A1'
                ],
                borderWidth: 2
            }
        ]
    },
    pie: {
        labels: ['购物', '人情往来', '餐饮美食', '通信物流', '生活日用', '交通出行', '休闲娱乐', '其他'],
        datasets: [
            {
                label: '支付宝月账单',
                data: [800, 100, 1000, 200, 300, 200, 200, 200],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
                    '#FF9F40', '#8AC249', '#EA526F'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }
        ]
    },
    scatter: {
        datasets: [
            {
                label: '汽车速度与制动距离',
                data: [
                    { x: 10, y: 0.5 },
                    { x: 20, y: 2.0 },
                    { x: 30, y: 4.4 },
                    { x: 40, y: 7.9 },
                    { x: 50, y: 12.3 },
                    { x: 60, y: 17.7 },
                    { x: 70, y: 24.1 },
                    { x: 80, y: 31.5 },
                    { x: 90, y: 39.9 },
                    { x: 100, y: 49.2 },
                    { x: 110, y: 59.5 },
                    { x: 120, y: 70.8 },
                    { x: 130, y: 83.1 },
                    { x: 140, y: 96.4 },
                    { x: 150, y: 110.7 },
                    { x: 160, y: 126.0 },
                    { x: 170, y: 142.2 },
                    { x: 180, y: 159.4 },
                    { x: 190, y: 177.6 },
                    { x: 200, y: 196.8 }
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 6,
                pointHoverRadius: 8
            }
        ]
    },
    boxplot: {
        labels: ['2018年', '2017年'],
        datasets: [
            {
                label: '全国发电量统计',
                data: [
                    {
                        min: 5107.8,
                        q1: 5254.5,
                        median: 5443.3,
                        q3: 5550.6,
                        max: 6404.9
                    },
                    {
                        min: 4605.2,
                        q1: 4767.2,
                        median: 5168.9,
                        q3: 5219.6,
                        max: 6047.4
                    }
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                outlierColor: '#ff6384'
            }
        ]
    },
    radar: {
        labels: ['研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '传统型(C)', '现实型(R)'],
        datasets: [
            {
                label: '人员1',
                data: [0.40, 0.32, 0.35, 0.30, 0.30, 0.88],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: '人员2',
                data: [0.85, 0.35, 0.30, 0.40, 0.40, 0.30],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    },
    errorbar: {
        labels: ['春季', '夏季', '秋季'],
        datasets: [
            {
                label: '树种A',
                data: [2.04, 1.57, 1.63],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                errors: [0.16, 0.08, 0.10]
            },
            {
                label: '树种B',
                data: [1.69, 1.61, 1.64],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                errors: [0.27, 0.14, 0.14]
            },
            {
                label: '树种C',
                data: [4.65, 4.99, 4.94],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                errors: [0.34, 0.32, 0.29]
            },
            {
                label: '树种D',
                data: [3.39, 2.33, 4.10],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                errors: [0.23, 0.23, 0.39]
            }
        ]
    }
};

createApp({
    setup() {
        // 状态管理
        const activeTab = ref('dashboard');
        const selectedChartType = ref('line');
        const selectedColor = ref('默认');
        const currentChart = ref(null);
        const tooltip = reactive({
            visible: false,
            x: 0,
            y: 0,
            content: ''
        });

        const controlValues = reactive({
            pointSize: 4,
            barWidth: 0.5,
            innerRadius: 0,
            bubbleSize: 5,
            animationSpeed: 1000,
            showLegend: true,
            showGrid: true,
            smoothLines: false
        });

        const currentChartData = ref([]);
        const currentDataHeaders = ref([]);

        // 计算属性
        const currentChartTitle = computed(() => {
            const chartType = chartTypes.find(c => c.id === selectedChartType.value);
            return chartType ? chartType.title : '';
        });

        const currentChartDescription = computed(() => {
            const chartType = chartTypes.find(c => c.id === selectedChartType.value);
            return chartType ? chartType.description : '';
        });

        // 方法
        const updateChart = () => {
            nextTick(() => {
                renderChart();
            });
        };

        const selectColor = (colorName) => {
            selectedColor.value = colorName;
            updateChartColors();
        };

        const updateChartColors = () => {
            updateChart();
        };

        const addDataRow = () => {
            const newRow = {};
            currentDataHeaders.value.forEach(header => {
                newRow[header] = 0;
            });
            currentChartData.value.push(newRow);
            updateChart();
        };

        const removeDataRow = (index) => {
            if (currentChartData.value.length > 1) {
                currentChartData.value.splice(index, 1);
                updateChart();
            }
        };

        const updateChartData = (index, header, value) => {
            currentChartData.value[index][header] = value;
            updateChart();
        };

        const resetData = () => {
            updateDataTable();
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
                    const data = JSON.parse(e.target.result);
                    if (data.labels && data.datasets) {
                        datasets[selectedChartType.value] = data;
                        updateDataTable();
                        updateChart();
                    }
                } catch (error) {
                    alert('文件格式错误，请上传有效的JSON文件');
                }
            };
            reader.readAsText(file);
            event.target.value = '';
        };

        const exportData = () => {
            const data = datasets[selectedChartType.value];
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.download = `chart-data-${selectedChartType.value}.json`;
            link.href = URL.createObjectURL(dataBlob);
            link.click();
        };

        const downloadChart = () => {
            if (currentChart.value) {
                const link = document.createElement('a');
                link.download = `chart-${selectedChartType.value}.png`;
                link.href = currentChart.value.toBase64Image();
                link.click();
            }
        };

        const toggleFullscreen = () => {
            const chartContainer = document.querySelector('.chart-container');
            if (!document.fullscreenElement) {
                chartContainer.requestFullscreen().catch(err => {
                    console.log(`全屏请求错误: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        };

        const loadCaseStudy = (caseStudy) => {
            const chartMap = {
                '电商销售分析': 'line',
                '用户行为统计': 'bar',
                '产品性能对比': 'radar',
                '市场调研数据': 'pie'
            };
            
            selectedChartType.value = chartMap[caseStudy.title] || 'line';
            activeTab.value = 'dashboard';
            
            setTimeout(() => {
                updateDataTable();
                updateChart();
            }, 100);
        };

        const updateDataTable = () => {
            const chartType = selectedChartType.value;
            const dataConfig = datasets[chartType];
            
            if (chartType === 'scatter') {
                currentDataHeaders.value = ['X值', 'Y值'];
                currentChartData.value = dataConfig.datasets[0].data.map(point => ({
                    'X值': point.x,
                    'Y值': point.y
                }));
            } else if (chartType === 'boxplot') {
                currentDataHeaders.value = ['年份', '最小值', 'Q1', '中位数', 'Q3', '最大值'];
                currentChartData.value = dataConfig.labels.map((label, index) => ({
                    '年份': label,
                    '最小值': dataConfig.datasets[0].data[index].min,
                    'Q1': dataConfig.datasets[0].data[index].q1,
                    '中位数': dataConfig.datasets[0].data[index].median,
                    'Q3': dataConfig.datasets[0].data[index].q3,
                    '最大值': dataConfig.datasets[0].data[index].max
                }));
            } else if (chartType === 'pie' || chartType === 'horizontalBar') {
                currentDataHeaders.value = ['类别', '数值'];
                currentChartData.value = dataConfig.labels.map((label, index) => ({
                    '类别': label,
                    '数值': dataConfig.datasets[0].data[index]
                }));
            } else if (dataConfig.datasets && dataConfig.datasets.length > 1) {
                // 多数据集图表（如line, area）
                currentDataHeaders.value = dataConfig.labels;
                currentChartData.value = dataConfig.labels.map((label, index) => {
                    const row = { '类别': label };
                    dataConfig.datasets.forEach((dataset, datasetIndex) => {
                        row[dataset.label] = dataset.data[index];
                    });
                    return row;
                });
            } else {
                // 单数据集图表
                currentDataHeaders.value = ['类别', '数值'];
                currentChartData.value = dataConfig.labels.map((label, index) => ({
                    '类别': label,
                    '数值': dataConfig.datasets[0].data[index]
                }));
            }
        };

        const renderChart = () => {
            const ctx = document.getElementById('chartCanvas');
            if (!ctx) return;
            
            const context = ctx.getContext('2d');
            
            // 销毁现有图表
            if (currentChart.value) {
                currentChart.value.destroy();
            }

            const chartType = selectedChartType.value;
            const dataConfig = JSON.parse(JSON.stringify(datasets[chartType])); // 深拷贝
            
            // 应用颜色主题
            const colorPalette = colorPalettes.find(c => c.name === selectedColor.value) || colorPalettes[0];
            
            let config = {
                type: chartType === 'horizontalBar' ? 'bar' : chartType,
                data: dataConfig,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: controlValues.animationSpeed
                    },
                    plugins: {
                        legend: {
                            display: controlValues.showLegend && (chartType === 'pie' || chartType === 'radar' || 
                                   (dataConfig.datasets && dataConfig.datasets.length > 1)),
                            position: 'top'
                        },
                        tooltip: {
                            enabled: true,
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y;
                                    } else if (context.parsed !== null) {
                                        label += context.parsed;
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            display: chartType !== 'pie' && chartType !== 'radar',
                            grid: {
                                display: controlValues.showGrid
                            }
                        },
                        y: {
                            display: chartType !== 'pie' && chartType !== 'radar',
                            grid: {
                                display: controlValues.showGrid
                            }
                        }
                    },
                    elements: {
                        point: {
                            radius: controlValues.pointSize,
                            hoverRadius: controlValues.pointSize + 2
                        },
                        line: {
                            tension: controlValues.smoothLines ? 0.4 : 0
                        }
                    }
                }
            };

            // 特殊图表类型处理
            if (chartType === 'horizontalBar') {
                config.options.indexAxis = 'y';
            }

            if (chartType === 'pie') {
                config.options.plugins.tooltip.callbacks.label = function(context) {
                    const label = context.label || '';
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value} (${percentage}%)`;
                };
            }

            if (chartType === 'radar') {
                config.options.scales = {
                    r: {
                        beginAtZero: true,
                        grid: {
                            display: controlValues.showGrid
                        }
                    }
                };
            }

            // 处理箱形图
            if (chartType === 'boxplot') {
                // 箱形图需要特殊处理，这里用柱形图模拟
                config.type = 'bar';
                config.data = {
                    labels: dataConfig.labels,
                    datasets: [{
                        label: dataConfig.datasets[0].label,
                        data: dataConfig.datasets[0].data.map(d => d.median),
                        backgroundColor: colorPalette.primary,
                        borderColor: colorPalette.secondary,
                        borderWidth: 2
                    }]
                };
            }

            // 处理误差棒图
            if (chartType === 'errorbar') {
                // Chart.js 默认不支持误差棒，这里用柱形图 + 误差线模拟
                const datasets = dataConfig.datasets.map((dataset, index) => {
                    const colors = [colorPalette.primary, colorPalette.secondary, '#36a2eb', '#ffce56'];
                    return {
                        label: dataset.label,
                        data: dataset.data,
                        backgroundColor: colors[index % colors.length] + '80',
                        borderColor: colors[index % colors.length],
                        borderWidth: 2
                    };
                });
                config.data.datasets = datasets;
            }

            try {
                currentChart.value = new Chart(context, config);

                // 添加交互事件
                context.canvas.addEventListener('mousemove', (event) => {
                    const rect = context.canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    
                    const points = currentChart.value.getElementsAtEventForMode(
                        event, 'nearest', { intersect: true }, false
                    );
                    
                    if (points.length > 0) {
                        const point = points[0];
                        const dataset = currentChart.value.data.datasets[point.datasetIndex];
                        const label = currentChart.value.data.labels[point.index];
                        let value = '';
                        
                        if (chartType === 'scatter') {
                            const dataPoint = dataset.data[point.index];
                            value = `X: ${dataPoint.x}, Y: ${dataPoint.y}`;
                        } else {
                            value = dataset.data[point.index];
                        }
                        
                        tooltip.visible = true;
                        tooltip.x = x + 10;
                        tooltip.y = y - 10;
                        tooltip.content = `${dataset.label || label}: ${value}`;
                    } else {
                        tooltip.visible = false;
                    }
                });
                
                context.canvas.addEventListener('mouseleave', () => {
                    tooltip.visible = false;
                });
            } catch (error) {
                console.error('图表渲染错误:', error);
                alert('图表渲染失败，请检查数据格式');
            }
        };

        // 监听图表类型变化
        watch(selectedChartType, () => {
            updateDataTable();
            updateChart();
        });

        // 监听控制值变化
        watch(controlValues, () => {
            updateChart();
        }, { deep: true });

        // 初始化
        onMounted(() => {
            updateDataTable();
            
            // 确保Canvas元素存在
            nextTick(() => {
                renderChart();
            });
            
            // 添加键盘快捷键
            document.addEventListener('keydown', (event) => {
                if (event.ctrlKey && event.key === 's') {
                    event.preventDefault();
                    downloadChart();
                }
            });

            // 监听窗口大小变化
            window.addEventListener('resize', () => {
                if (currentChart.value) {
                    currentChart.value.resize();
                }
            });
        });

        return {
            activeTab,
            selectedChartType,
            selectedColor,
            controlValues,
            tooltip,
            currentChartData,
            currentDataHeaders,
            currentChartTitle,
            currentChartDescription,
            chartTypes,
            colorPalettes,
            caseStudies,
            updateChart,
            selectColor,
            addDataRow,
            removeDataRow,
            updateChartData,
            resetData,
            importData,
            handleFileUpload,
            exportData,
            downloadChart,
            toggleFullscreen,
            loadCaseStudy
        };
    }
}).mount('#app');