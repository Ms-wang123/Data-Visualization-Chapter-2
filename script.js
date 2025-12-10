// 数据可视化脚本 - 第2章图表完整实现
// 支持UTF-8编码，解决中文显示问题

class DataVisualization {
    constructor() {
        this.currentChart = null;
        this.currentChartType = 'line';
        this.animationEnabled = true;
        this.chartData = this.initializeChartData();
        this.init();
    }

    // 初始化图表数据
    initializeChartData() {
        return {
            line: {
                title: '未来15天最高气温和最低气温',
                description: '使用plot()绘制折线图展示温度变化趋势',
                labels: ['4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日'],
                datasets: [
                    {
                        label: '最高气温(°C)',
                        data: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.1,
                        borderWidth: 3,
                        fill: false
                    },
                    {
                        label: '最低气温(°C)',
                        data: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16],
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        tension: 0.1,
                        borderWidth: 3,
                        fill: false
                    }
                ]
            },
            bar: {
                title: '2013—2019财年阿里巴巴淘宝和天猫平台的GMV',
                description: '使用bar()绘制柱形图展示财务数据增长趋势',
                labels: ['FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017', 'FY2018', 'FY2019'],
                datasets: [
                    {
                        label: 'GMV(亿元)',
                        data: [10770, 16780, 24440, 30920, 37670, 48200, 57270],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(46, 204, 113, 0.7)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 206, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(153, 102, 255)',
                            'rgb(255, 159, 64)',
                            'rgb(46, 204, 113)'
                        ],
                        borderWidth: 2
                    }
                ]
            },
            horizontalBar: {
                title: '各商品种类的网购替代率',
                description: '使用barh()绘制条形图展示不同商品类别的网购替代率',
                labels: ['家政服务', '飞机票', '家具', '手机', '计算机', '汽车用品', '通信充值', '个人护理', '书报杂志', '餐饮旅游'],
                datasets: [
                    {
                        label: '网购替代率',
                        data: [0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 0.860, 0.856],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(46, 204, 113, 0.7)',
                            'rgba(231, 76, 60, 0.7)',
                            'rgba(241, 196, 15, 0.7)',
                            'rgba(52, 73, 94, 0.7)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 206, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(153, 102, 255)',
                            'rgb(255, 159, 64)',
                            'rgb(46, 204, 113)',
                            'rgb(231, 76, 60)',
                            'rgb(241, 196, 15)',
                            'rgb(52, 73, 94)'
                        ],
                        borderWidth: 2
                    }
                ]
            },
            area: {
                title: '物流公司物流费用统计',
                description: '使用stackplot()绘制堆积面积图展示三家物流公司的费用变化',
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    {
                        label: '公司A',
                        data: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '公司B',
                        data: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgb(54, 162, 235)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '公司C',
                        data: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288],
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgb(255, 206, 86)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            histogram: {
                title: '人脸识别的灰度直方图',
                description: '使用hist()绘制直方图展示图像灰度值分布',
                labels: ['0-50', '50-100', '100-150', '150-200', '200-250', '250-300', '300-350', '350-400', '400-450', '450-500'],
                datasets: [
                    {
                        label: '像素数量',
                        data: [1250, 2340, 3456, 4567, 5678, 4321, 3210, 2109, 1234, 567],
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 2
                    }
                ]
            },
            pie: {
                title: '支付宝月账单报告',
                description: '使用pie()绘制饼图展示月度消费分类占比',
                labels: ['购物', '人情往来', '餐饮美食', '通信物流', '生活日用', '交通出行', '休闲娱乐', '其他'],
                datasets: [
                    {
                        data: [800, 100, 1000, 200, 300, 200, 200, 200],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(46, 204, 113, 0.8)',
                            'rgba(52, 73, 94, 0.8)'
                        ],
                        borderColor: '#fff',
                        borderWidth: 3
                    }
                ]
            },
            scatter: {
                title: '汽车速度与制动距离的关系',
                description: '使用scatter()绘制散点图展示速度与制动距离的相关性',
                datasets: [
                    {
                        label: '测试数据',
                        data: [
                            {x: 10, y: 0.5},
                            {x: 20, y: 2.0},
                            {x: 30, y: 4.4},
                            {x: 40, y: 7.9},
                            {x: 50, y: 12.3},
                            {x: 60, y: 17.7},
                            {x: 70, y: 24.1},
                            {x: 80, y: 31.5},
                            {x: 90, y: 39.9},
                            {x: 100, y: 49.2},
                            {x: 110, y: 59.5},
                            {x: 120, y: 70.8},
                            {x: 130, y: 83.1},
                            {x: 140, y: 96.4},
                            {x: 150, y: 110.7},
                            {x: 160, y: 126.0},
                            {x: 170, y: 142.2},
                            {x: 180, y: 159.4},
                            {x: 190, y: 177.6},
                            {x: 200, y: 196.8}
                        ],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }
                ]
            },
            boxplot: {
                title: '2017年和2018年全国发电量统计',
                description: '使用boxplot()绘制箱形图展示两年发电量的分布情况',
                labels: ['2018年', '2017年'],
                datasets: [
                    {
                        label: '发电量(亿千瓦时)',
                        data: [
                            [5200, 5254.5, 5283.4, 5443.3, 6404.9],
                            [4605.2, 4767.2, 5168.9, 5219.6, 6047.4]
                        ],
                        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                        borderColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
                        borderWidth: 2
                    }
                ]
            },
            radar: {
                title: '霍兰德职业兴趣测试',
                description: '绘制雷达图展示六个维度的职业兴趣分布',
                labels: ['研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '传统型(C)', '现实型(R)'],
                datasets: [
                    {
                        label: '测试者A',
                        data: [0.40, 0.32, 0.35, 0.30, 0.30, 0.88],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2
                    },
                    {
                        label: '测试者B',
                        data: [0.85, 0.35, 0.30, 0.40, 0.40, 0.30],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(54, 162, 235)',
                        borderWidth: 2
                    }
                ]
            },
            errorbar: {
                title: '4个树种不同季节的细根生物量',
                description: '使用errorbar()绘制误差棒图展示生物量测量的不确定性',
                labels: ['春季', '夏季', '秋季'],
                datasets: [
                    {
                        label: '树种A',
                        data: [2.04, 1.57, 1.63],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        errorBars: [0.16, 0.08, 0.10]
                    },
                    {
                        label: '树种B',
                        data: [1.69, 1.61, 1.64],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 2,
                        errorBars: [0.27, 0.14, 0.14]
                    },
                    {
                        label: '树种C',
                        data: [4.65, 4.99, 4.94],
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgb(255, 206, 86)',
                        borderWidth: 2,
                        errorBars: [0.34, 0.32, 0.29]
                    },
                    {
                        label: '树种D',
                        data: [3.39, 2.33, 4.10],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 2,
                        errorBars: [0.23, 0.23, 0.39]
                    }
                ]
            }
        };
    }

    // 初始化方法
    init() {
        // 检查Chart.js是否加载
        if (typeof Chart === 'undefined') {
            console.error('Chart.js未加载，请确保Chart.js库已正确引入');
            return;
        }
        
        // 设置Chart.js默认字体
        Chart.defaults.font.family = "'Microsoft YaHei', 'SimHei', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#333';
        
        // 初始化事件监听器
        this.setupEventListeners();
        
        // 初始化默认图表
        this.initChart('line');
    }

    // 设置事件监听器
    setupEventListeners() {
        // 图表按钮点击事件
        const chartButtons = document.querySelectorAll('.chart-btn');
        chartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartType = e.target.getAttribute('data-chart');
                if (chartType) {
                    this.switchChart(chartType);
                }
            });
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.resetChart();
            } else if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.downloadChart();
            } else if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                this.showData();
            }
        });
    }

    // 切换图表
    switchChart(type) {
        // 更新按钮状态
        const chartButtons = document.querySelectorAll('.chart-btn');
        chartButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-chart="${type}"]`).classList.add('active');
        
        // 初始化新图表
        this.initChart(type);
    }

    // 初始化图表
    initChart(type = 'line') {
        const ctx = document.getElementById('myChart');
        if (!ctx) {
            console.error('找不到图表容器');
            return;
        }

        const chartData = this.chartData[type];
        if (!chartData) {
            console.error('找不到图表数据:', type);
            return;
        }
        
        // 更新标题和描述
        this.updateChartInfo(chartData);
        
        // 销毁现有图表
        if (this.currentChart) {
            this.currentChart.destroy();
        }
        
        // 创建新图表
        const config = this.createChartConfig(type, chartData);
        this.currentChart = new Chart(ctx, config);
        this.currentChartType = type;
    }

    // 更新图表信息
    updateChartInfo(chartData) {
        const titleElement = document.getElementById('chartTitle');
        const descElement = document.getElementById('chartDescription');
        
        if (titleElement) titleElement.textContent = chartData.title;
        if (descElement) descElement.textContent = chartData.description;
    }

    // 创建图表配置
    createChartConfig(type, data) {
        const baseOptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: this.animationEnabled ? 1000 : 0,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: '600'
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 6,
                    displayColors: true
                }
            }
        };

        // 根据图表类型调整配置
        let chartConfig = {
            type: type === 'horizontalBar' ? 'bar' : type,
            data: data,
            options: baseOptions
        };

        // 坐标轴配置
        if (type !== 'pie' && type !== 'radar') {
            chartConfig.options.scales = {
                x: {
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            };
        }

        // 特殊图表类型配置
        switch (type) {
            case 'horizontalBar':
                chartConfig.options.indexAxis = 'y';
                break;
                
            case 'pie':
                chartConfig.type = 'pie';
                chartConfig.options.scales = {};
                chartConfig.options.plugins.tooltip.callbacks = {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value}元 (${percentage}%)`;
                    }
                };
                break;
                
            case 'scatter':
                chartConfig.type = 'scatter';
                break;
                
            case 'radar':
                chartConfig.type = 'radar';
                chartConfig.options.scales = {
                    r: {
                        beginAtZero: true,
                        max: 1,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 14,
                                weight: '600'
                            }
                        },
                        ticks: {
                            stepSize: 0.2,
                            backdropColor: 'transparent'
                        }
                    }
                };
                break;
                
            case 'boxplot':
                chartConfig.type = 'bar';
                chartConfig.data.datasets = data.datasets.map((dataset, index) => ({
                    ...dataset,
                    data: dataset.data.map(values => [
                        values[0], // min
                        values[2], // median
                        values[4]  // max
                    ]),
                    backgroundColor: dataset.backgroundColor,
                    borderColor: dataset.borderColor,
                    borderWidth: dataset.borderWidth
                }));
                break;
                
            case 'errorbar':
                chartConfig.type = 'bar';
                chartConfig.plugins = {
                    ...chartConfig.plugins,
                    tooltip: {
                        ...chartConfig.plugins.tooltip,
                        callbacks: {
                            label: (context) => {
                                const dataset = context.dataset;
                                const value = context.parsed.y;
                                const errorBar = dataset.errorBars[context.dataIndex];
                                return `${dataset.label}: ${value} ± ${errorBar}`;
                            }
                        }
                    }
                };
                break;
        }

        return chartConfig;
    }

    // 重置图表
    resetChart() {
        this.initChart(this.currentChartType);
        this.showMessage('图表已重置', 'success');
    }

    // 下载图表
    downloadChart() {
        if (!this.currentChart) {
            this.showMessage('没有可下载的图表', 'error');
            return;
        }
        
        const link = document.createElement('a');
        link.download = `${this.currentChartType}-chart.png`;
        link.href = this.currentChart.toBase64Image();
        link.click();
        this.showMessage('图表下载成功', 'success');
    }

    // 切换动画
    toggleAnimation() {
        this.animationEnabled = !this.animationEnabled;
        this.initChart(this.currentChartType);
        this.showMessage(`动画已${this.animationEnabled ? '开启' : '关闭'}`, 'success');
    }

    // 随机数据
    randomizeData() {
        const data = this.chartData[this.currentChartType];
        data.datasets.forEach(dataset => {
            if (this.currentChartType === 'scatter') {
                dataset.data = dataset.data.map(point => ({
                    x: point.x,
                    y: Math.random() * 200
                }));
            } else if (this.currentChartType === 'pie') {
                dataset.data = dataset.data.map(() => Math.random() * 500 + 100);
            } else {
                dataset.data = dataset.data.map(() => Math.random() * 100 + 20);
            }
        });
        this.initChart(this.currentChartType);
        this.showMessage('数据已随机生成', 'success');
    }

    // 显示数据
    showData() {
        const data = this.chartData[this.currentChartType];
        console.group('📊 图表数据');
        console.log('图表类型:', this.currentChartType);
        console.log('数据:', data);
        console.groupEnd();
        this.showMessage('数据已在控制台显示，按F12查看', 'success');
    }

    // 显示代码
    showCode() {
        const codes = {
            line: `# 折线图代码示例
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(4, 19)
y_max = np.array([32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31])
y_min = np.array([19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16])

plt.plot(x, y_max)
plt.plot(x, y_min)
plt.title("未来15天最高气温和最低气温")
plt.xlabel("日期")
plt.ylabel("温度(°C)")
plt.legend()
plt.show()`,
            bar: `# 柱形图代码示例
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(1, 8)
y = np.array([10770, 16780, 24440, 30920, 37670, 48200, 57270])

plt.bar(x, y, tick_label=["FY2013", "FY2014", "FY2015", "FY2016", "FY2017", "FY2018", "FY2019"])
plt.title("2013-2019财年阿里巴巴GMV")
plt.xlabel("财年")
plt.ylabel("GMV(亿元)")
plt.show()`
        };
        
        const code = codes[this.currentChartType] || '# 查看第2章Jupyter Notebook获取完整代码';
        console.group('📝 Python代码');
        console.log(code);
        console.groupEnd();
        this.showMessage('代码已在控制台显示，按F12查看', 'success');
    }

    // 显示消息
    showMessage(text, type = 'success') {
        const messageArea = document.getElementById('messageArea');
        if (!messageArea) return;
        
        const messageClass = type === 'success' ? 'success-message' : 'error-message';
        messageArea.innerHTML = `<div class="${messageClass}">${text}</div>`;
        
        setTimeout(() => {
            messageArea.innerHTML = '';
        }, 3000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 确保Chart.js已加载
    if (typeof Chart === 'undefined') {
        console.error('Chart.js未加载，请检查script标签');
        return;
    }
    
    // 初始化数据可视化系统
    window.dataViz = new DataVisualization();
});

// 全局函数供HTML调用
window.resetChart = () => window.dataViz?.resetChart();
window.downloadChart = () => window.dataViz?.downloadChart();
window.toggleAnimation = () => window.dataViz?.toggleAnimation();
window.randomizeData = () => window.dataViz?.randomizeData();
window.showData = () => window.dataViz?.showData();
window.showCode = () => window.dataViz?.showCode();

// 导出类供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataVisualization;
}