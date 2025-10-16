// 基于第2章.ipynb的完整数据
const chartData = {
    // 2.1 折线图 - 未来15天最高气温和最低气温
    line: {
        labels: ['第4天', '第5天', '第6天', '第7天', '第8天', '第9天', '第10天', '第11天', '第12天', '第13天', '第14天', '第15天', '第16天', '第17天', '第18天'],
        datasets: [
            {
                label: '最高气温 (°C)',
                data: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31],
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4
            },
            {
                label: '最低气温 (°C)',
                data: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16],
                borderColor: '#4ecdc4',
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                tension: 0.4
            }
        ]
    },
    
    // 2.2 柱形图 - 阿里巴巴GMV数据
    bar: {
        labels: ['FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017', 'FY2018', 'FY2019'],
        datasets: [{
            label: 'GMV (亿元)',
            data: [10770, 16780, 24440, 30920, 37670, 48200, 57270],
            backgroundColor: [
                '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
                '#FECA57', '#FF9FF3', '#54A0FF'
            ],
            borderColor: [
                '#FF5252', '#26A69A', '#29B6F6', '#81C784',
                '#FFA726', '#F48FB1', '#42A5F5'
            ],
            borderWidth: 2
        }]
    },
    
    // 2.3 条形图 - 商品种类网购替代率
    horizontalBar: {
        labels: [
            "家政、家教、保姆等生活服务", "飞机票、火车票", "家具", "手机、手机配件",
            "计算机及其配套产品", "汽车用品", "通信充值、游戏充值", "个人护理用品",
            "书报杂志及音像制品", "餐饮、旅游、住宿", "家用电器",
            "食品、饮料、烟酒、保健品", "家庭日杂用品", "保险、演出票务",
            "服装、鞋帽、家用纺织品", "数码产品", "其他商品和服务", "工艺品、收藏品"
        ],
        datasets: [{
            label: '网购替代率',
            data: [0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 0.860, 0.856, 0.854, 0.835, 0.826, 0.816, 0.798, 0.765, 0.763, 0.67],
            backgroundColor: '#96ceb4',
            borderColor: '#7bb899',
            borderWidth: 1
        }]
    },
    
    // 2.4 堆积面积图 - 物流费用统计
    stackedArea: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '物流公司A',
                data: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290],
                backgroundColor: 'rgba(255, 99, 132, 0.6)'
            },
            {
                label: '物流公司B',
                data: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            },
            {
                label: '物流公司C',
                data: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288],
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }
        ]
    },
    
    // 2.5 直方图 - 人脸识别灰度直方图
    histogram: {
        data: Array.from({length: 10000}, () => Math.random() * 100),
        bins: 25
    },
    
    // 2.6 饼图 - 支付宝月账单
    pie: {
        labels: ['购物', '人情往来', '餐饮美食', '通信物流', '生活日用', '交通出行', '休闲娱乐', '其他'],
        data: [800, 100, 1000, 200, 300, 200, 200, 200]
    },
    
    // 2.7 散点图 - 汽车速度与制动距离
    scatter: {
        x: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
        y: [0.5, 2.0, 4.4, 7.9, 12.3, 17.7, 24.1, 31.5, 39.9, 49.2, 59.5, 70.8, 83.1, 96.4, 110.7, 126.0, 142.2, 159.4, 177.6, 196.8]
    },
    
    // 2.8 箱形图 - 全国发电量统计
    boxplot: {
        labels: ['2018年', '2017年'],
        data: [
            [5200, 5254.5, 5283.4, 5107.8, 5443.3, 5550.6, 6400.2, 6404.9, 5483.1, 5330.2, 5543, 6199.9],
            [4605.2, 4710.3, 5168.9, 4767.2, 4947, 5203, 6047.4, 5945.5, 5219.6, 5038.1, 5196.3, 5698.6]
        ]
    },
    
    // 2.9 雷达图 - 霍兰德职业兴趣测试
    radar: {
        labels: ['研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '传统型(C)', '现实型(R)'],
        datasets: [
            {
                label: '测试者1',
                data: [0.40, 0.32, 0.35, 0.30, 0.30, 0.88],
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.2)'
            },
            {
                label: '测试者2',
                data: [0.85, 0.35, 0.30, 0.40, 0.40, 0.30],
                borderColor: '#4ecdc4',
                backgroundColor: 'rgba(78, 205, 196, 0.2)'
            }
        ]
    },
    
    // 2.10 误差棒图 - 细根生物量
    errorBar: {
        labels: ['春季', '夏季', '秋季'],
        datasets: [
            {
                label: '树种A',
                data: [2.04, 1.57, 1.63],
                error: [0.16, 0.08, 0.10],
                backgroundColor: '#ff9ff3'
            },
            {
                label: '树种B',
                data: [1.69, 1.61, 1.64],
                error: [0.27, 0.14, 0.14],
                backgroundColor: '#feca57'
            }
        ]
    }
};

// 图表配置和初始化代码...
let currentChart = null;
const chartTypes = [
    { id: 'line', name: '折线图', icon: '📈' },
    { id: 'bar', name: '柱形图', icon: '📊' },
    { id: 'horizontalBar', name: '条形图', icon: '📋' },
    { id: 'stackedArea', name: '堆积面积图', icon: '🗂️' },
    { id: 'histogram', name: '直方图', icon: '📏' },
    { id: 'pie', name: '饼图', icon: '🥧' },
    { id: 'scatter', name: '散点图', icon: '🔍' },
    { id: 'boxplot', name: '箱形图', icon: '📦' },
    { id: 'radar', name: '雷达图', icon: '🎯' },
    { id: 'errorBar', name: '误差棒图', icon: '📐' }
];

function initializeChart(type = 'line') {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    
    if (currentChart) {
        currentChart.destroy();
    }
    
    switch(type) {
        case 'line':
            currentChart = new Chart(ctx, {
                type: 'line',
                data: chartData.line,
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '未来15天最高气温和最低气温' },
                        tooltip: { mode: 'index', intersect: false }
                    },
                    scales: { y: { beginAtZero: false } }
                }
            });
            break;
            
        case 'bar':
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: chartData.bar,
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '2013-2019财年阿里巴巴GMV' }
                    }
                }
            });
            break;
            
        case 'horizontalBar':
            // 为每个条形生成不同颜色
            const barColors = chartData.horizontalBar.datasets[0].data.map((_, i) => {
                const colors = [
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
                    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
                    '#10AC84', '#EE5A24', '#A3CB38', '#1289A7', '#D980FA',
                    '#B53471', '#FFC312', '#C4E538'
                ];
                return colors[i % colors.length];
            });
            
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.horizontalBar.labels,
                    datasets: [{
                        label: chartData.horizontalBar.datasets[0].label,
                        data: chartData.horizontalBar.datasets[0].data,
                        backgroundColor: barColors,
                        borderColor: barColors.map(color => color.replace('FF', 'CC').replace('4E', '3A')),
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '各商品种类网购替代率' }
                    }
                }
            });
            break;
            
        case 'stackedArea':
            currentChart = new Chart(ctx, {
                type: 'line',
                data: chartData.stackedArea,
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '物流公司物流费用统计' }
                    },
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true }
                    }
                }
            });
            break;
            
        case 'histogram':
            // 直方图需要特殊处理
            const histogramData = chartData.histogram.data;
            const binCount = chartData.histogram.bins;
            const min = Math.min(...histogramData);
            const max = Math.max(...histogramData);
            const binSize = (max - min) / binCount;
            
            const bins = Array(binCount).fill(0);
            histogramData.forEach(value => {
                const binIndex = Math.floor((value - min) / binSize);
                if (binIndex < binCount) bins[binIndex]++;
            });
            
            // 为每个柱形生成不同颜色
            const histogramColors = Array.from({length: binCount}, (_, i) => {
                const hue = (i * 360 / binCount) % 360;
                return `hsl(${hue}, 70%, 65%)`;
            });
            
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Array.from({length: binCount}, (_, i) => 
                        `${(min + i * binSize).toFixed(1)}-${(min + (i+1) * binSize).toFixed(1)}`),
                    datasets: [{
                        label: '频率分布',
                        data: bins,
                        backgroundColor: histogramColors,
                        borderColor: histogramColors.map(color => color.replace('65%', '50%')),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '人脸识别灰度直方图' }
                    }
                }
            });
            break;
            
        case 'pie':
            currentChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: chartData.pie.labels,
                    datasets: [{
                        data: chartData.pie.data,
                        backgroundColor: [
                            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
                            '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '支付宝月账单报告' }
                    }
                }
            });
            break;
            
        case 'scatter':
            currentChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: '速度 vs 制动距离',
                        data: chartData.scatter.x.map((x, i) => ({x, y: chartData.scatter.y[i]})),
                        backgroundColor: '#ff9ff3',
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '汽车速度与制动距离的关系' }
                    },
                    scales: {
                        x: { title: { display: true, text: '速度 (km/h)' } },
                        y: { title: { display: true, text: '制动距离 (m)' } }
                    }
                }
            });
            break;
            
        case 'boxplot':
            // 箱形图替换为分组柱状图显示
            const boxplotData = chartData.boxplot.data;
            const boxplotLabels = chartData.boxplot.labels;
            
            // 计算每个数据集的统计值（最小值、第一四分位数、中位数、第三四分位数、最大值）
            const calculateStats = (data) => {
                const sorted = [...data].sort((a, b) => a - b);
                const min = Math.min(...data);
                const max = Math.max(...data);
                const q1 = sorted[Math.floor(sorted.length * 0.25)];
                const median = sorted[Math.floor(sorted.length * 0.5)];
                const q3 = sorted[Math.floor(sorted.length * 0.75)];
                
                return { min, q1, median, q3, max };
            };
            
            const stats2018 = calculateStats(boxplotData[0]);
            const stats2017 = calculateStats(boxplotData[1]);
            
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['最小值', '第一四分位数', '中位数', '第三四分位数', '最大值'],
                    datasets: [
                        {
                            label: `${boxplotLabels[0]}发电量`,
                            data: [stats2018.min, stats2018.q1, stats2018.median, stats2018.q3, stats2018.max],
                            backgroundColor: 'rgba(255, 99, 132, 0.8)'
                        },
                        {
                            label: `${boxplotLabels[1]}发电量`,
                            data: [stats2017.min, stats2017.q1, stats2017.median, stats2017.q3, stats2017.max],
                            backgroundColor: 'rgba(54, 162, 235, 0.8)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '2017-2018年全国发电量统计（箱形图数据展示）' }
                    }
                }
            });
            break;
            
        case 'radar':
            currentChart = new Chart(ctx, {
                type: 'radar',
                data: chartData.radar,
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '霍兰德职业兴趣测试' }
                    },
                    scales: {
                        r: { beginAtZero: true, max: 1 }
                    }
                }
            });
            break;
            
        case 'errorBar':
            // 误差棒图需要自定义插件
            currentChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.errorBar.labels,
                    datasets: chartData.errorBar.datasets.map(dataset => ({
                        label: dataset.label,
                        data: dataset.data,
                        backgroundColor: dataset.backgroundColor
                    }))
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: '4个树种不同季节的细根生物量' }
                    }
                }
            });
            break;
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 创建图表类型选择器
    const chartSelector = document.getElementById('chartSelector');
    chartTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.id;
        option.textContent = `${type.icon} ${type.name}`;
        chartSelector.appendChild(option);
    });
    
    // 初始化第一个图表
    initializeChart('line');
    
    // 添加事件监听器
    chartSelector.addEventListener('change', function() {
        initializeChart(this.value);
    });
    
    // 添加下载功能
    document.getElementById('downloadBtn').addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = `chart-${new Date().toISOString().slice(0,10)}.png`;
        link.href = document.getElementById('chartCanvas').toDataURL();
        link.click();
    });
});