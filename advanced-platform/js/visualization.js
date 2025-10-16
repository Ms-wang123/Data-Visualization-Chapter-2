// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 获取图表相关元素
    const chartCanvas = document.getElementById('visualizationChart');
    const dataInput = document.getElementById('dataInput');
    const exampleDataSelect = document.getElementById('exampleDataSelect');
    const chartTypeRadios = document.querySelectorAll('input[name="chartType"]');
    const generateChartBtn = document.getElementById('generateChartBtn');
    const updateChartBtn = document.getElementById('updateChartBtn');
    const chartTitle = document.getElementById('chartTitle');
    const xAxisLabel = document.getElementById('xAxisLabel');
    const yAxisLabel = document.getElementById('yAxisLabel');
    const colorThemeSelect = document.getElementById('colorThemeSelect');
    const showLegendSwitch = document.getElementById('showLegendSwitch');
    const showGridSwitch = document.getElementById('showGridSwitch');
    const animationSwitch = document.getElementById('animationSwitch');
    const chartDescription = document.getElementById('chartDescription');

    // 图表实例
    let currentChart = null;

    // 颜色主题
    const colorThemes = {
        default: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#d35400', '#c0392b', '#7f8c8d'],
        pastel: ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f', '#cab2d6', '#ffff99', '#b3b3b3', '#b15928', '#8dd3c7', '#bebada'],
        bright: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff', '#0080ff', '#ff0080'],
        dark: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
        colorful: ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4']
    };

    // 示例数据
    const exampleData = {
        temperature: {
            title: '未来15天最高气温和最低气温',
            xAxisLabel: '日期',
            yAxisLabel: '温度 (°C)',
            data: {
                labels: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日'],
                datasets: [
                    {
                        label: '最高气温',
                        data: [28, 29, 30, 31, 33, 32, 30, 29, 28, 27, 29, 30, 31, 32, 33],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.2)'
                    },
                    {
                        label: '最低气温',
                        data: [18, 19, 20, 21, 22, 21, 20, 19, 18, 17, 18, 19, 20, 21, 22],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.2)'
                    }
                ]
            },
            type: 'line',
            description: '这个折线图展示了未来15天的最高气温和最低气温预测。可以看到温度整体呈现波动上升的趋势。'
        },
        alibaba: {
            title: '2013-2019财年阿里巴巴淘宝和天猫平台的GMV',
            xAxisLabel: '财年',
            yAxisLabel: 'GMV (亿元)',
            data: {
                labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019'],
                datasets: [
                    {
                        label: '淘宝',
                        data: [10000, 12000, 14000, 16000, 18000, 20000, 22000],
                        backgroundColor: 'rgba(255, 159, 64, 0.7)'
                    },
                    {
                        label: '天猫',
                        data: [5000, 7000, 9000, 12000, 15000, 18000, 21000],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }
                ]
            },
            type: 'bar',
            description: '这个柱形图展示了2013-2019财年阿里巴巴旗下淘宝和天猫平台的GMV（商品交易总额）。可以看到两个平台的GMV都呈现稳定增长的趋势，天猫的增长速度略快于淘宝。'
        },
        online: {
            title: '各商品种类的网购替代率',
            xAxisLabel: '替代率 (%)',
            yAxisLabel: '商品种类',
            data: {
                labels: ['服装鞋帽', '家用电器', '手机数码', '家居家装', '美妆个护', '食品生鲜', '医药保健', '汽车用品'],
                datasets: [
                    {
                        label: '网购替代率',
                        data: [85, 70, 65, 50, 45, 30, 25, 20],
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    }
                ]
            },
            type: 'horizontalBar',
            description: '这个条形图展示了不同商品种类的网购替代率。服装鞋帽的网购替代率最高，达到85%，而汽车用品的网购替代率最低，只有20%。'
        },
        logistics: {
            title: '物流公司物流费用统计',
            xAxisLabel: '月份',
            yAxisLabel: '费用 (万元)',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    {
                        label: '运输费',
                        data: [120, 130, 125, 135, 140, 150, 160, 165, 155, 170, 180, 190],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    },
                    {
                        label: '仓储费',
                        data: [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)'
                    },
                    {
                        label: '包装费',
                        data: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
                        backgroundColor: 'rgba(255, 206, 86, 0.5)'
                    }
                ]
            },
            type: 'area',
            description: '这个堆积面积图展示了物流公司全年的物流费用统计，包括运输费、仓储费和包装费。可以看到各项费用都呈现逐月增长的趋势，尤其是在下半年增长更为明显。'
        },
        face: {
            title: '人脸识别的灰度直方图',
            xAxisLabel: '灰度值',
            yAxisLabel: '像素数量',
            data: {
                labels: Array.from({length: 20}, (_, i) => i * 13),
                datasets: [
                    {
                        label: '像素分布',
                        data: [10, 35, 85, 150, 250, 350, 450, 550, 650, 750, 650, 550, 450, 350, 250, 150, 85, 35, 10, 5],
                        backgroundColor: 'rgba(75, 192, 192, 0.7)'
                    }
                ]
            },
            type: 'histogram',
            description: '这个直方图展示了人脸识别过程中的灰度值分布。灰度值在中间范围（约100-150）的像素数量最多，呈现出典型的正态分布特征。'
        },
        alipay: {
            title: '支付宝月账单报告',
            xAxisLabel: '',
            yAxisLabel: '',
            data: {
                labels: ['餐饮', '购物', '交通', '娱乐', '住房', '通讯', '医疗', '其他'],
                datasets: [
                    {
                        label: '支出比例',
                        data: [30, 25, 15, 10, 8, 5, 4, 3],
                        backgroundColor: [
                            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#7FC97F'
                        ]
                    }
                ]
            },
            type: 'pie',
            description: '这个饼图展示了支付宝月账单中各类支出的比例。餐饮支出占比最高，达到30%，其次是购物支出，占25%。'
        },
        car: {
            title: '汽车速度与制动距离的关系',
            xAxisLabel: '速度 (km/h)',
            yAxisLabel: '制动距离 (m)',
            data: {
                datasets: [
                    {
                        label: '制动距离',
                        data: [
                            {x: 30, y: 10, r: 5},
                            {x: 40, y: 15, r: 6},
                            {x: 50, y: 22, r: 7},
                            {x: 60, y: 30, r: 8},
                            {x: 70, y: 42, r: 9},
                            {x: 80, y: 55, r: 10},
                            {x: 90, y: 70, r: 11},
                            {x: 100, y: 90, r: 12},
                            {x: 110, y: 115, r: 13},
                            {x: 120, y: 140, r: 14}
                        ],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }
                ]
            },
            type: 'scatter',
            description: '这个散点图展示了汽车速度与制动距离之间的关系。可以看到随着速度的增加，制动距离呈现非线性增长的趋势，气泡大小表示数据点的重要性。'
        },
        power: {
            title: '2017年和2018年全国发电量统计',
            xAxisLabel: '发电类型',
            yAxisLabel: '发电量 (亿千瓦时)',
            data: {
                labels: ['火电', '水电', '核电', '风电', '太阳能'],
                datasets: [
                    {
                        label: '2017年',
                        data: [
                            {min: 4500, q1: 4800, median: 5000, q3: 5200, max: 5500},
                            {min: 1000, q1: 1100, median: 1200, q3: 1300, max: 1400},
                            {min: 200, q1: 220, median: 240, q3: 260, max: 280},
                            {min: 150, q1: 170, median: 190, q3: 210, max: 230},
                            {min: 50, q1: 60, median: 70, q3: 80, max: 90}
                        ],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    },
                    {
                        label: '2018年',
                        data: [
                            {min: 4700, q1: 5000, median: 5200, q3: 5400, max: 5700},
                            {min: 1100, q1: 1200, median: 1300, q3: 1400, max: 1500},
                            {min: 220, q1: 240, median: 260, q3: 280, max: 300},
                            {min: 180, q1: 200, median: 220, q3: 240, max: 260},
                            {min: 70, q1: 80, median: 90, q3: 100, max: 110}
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    }
                ]
            },
            type: 'boxplot',
            description: '这个箱形图展示了2017年和2018年全国不同类型发电量的统计数据。可以看到2018年各类发电量相比2017年都有所增长，其中风电和太阳能的增长比例较大。'
        },
        holland: {
            title: '霍兰德职业兴趣测试',
            xAxisLabel: '',
            yAxisLabel: '',
            data: {
                labels: ['现实型', '研究型', '艺术型', '社会型', '企业型', '常规型'],
                datasets: [
                    {
                        label: '测试得分',
                        data: [70, 85, 65, 90, 75, 60],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                    }
                ]
            },
            type: 'radar',
            description: '这个雷达图展示了霍兰德职业兴趣测试的结果。测试者在社会型和研究型方面的得分最高，表明可能适合从事教育、咨询或科研等相关职业。'
        },
        root: {
            title: '4个树种不同季节的细根生物量',
            xAxisLabel: '季节',
            yAxisLabel: '细根生物量 (g/m²)',
            data: {
                labels: ['春季', '夏季', '秋季', '冬季'],
                datasets: [
                    {
                        label: '松树',
                        data: [120, 150, 130, 100],
                        errorBars: [10, 15, 12, 8],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)'
                    },
                    {
                        label: '杉树',
                        data: [100, 130, 120, 90],
                        errorBars: [8, 12, 10, 7],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)'
                    },
                    {
                        label: '橡树',
                        data: [90, 120, 110, 80],
                        errorBars: [7, 10, 9, 6],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgb(255, 206, 86)'
                    },
                    {
                        label: '枫树',
                        data: [80, 110, 100, 70],
                        errorBars: [6, 9, 8, 5],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)'
                    }
                ]
            },
            type: 'errorbar',
            description: '这个误差棒图展示了4个树种在不同季节的细根生物量及其误差范围。可以看到所有树种的细根生物量在夏季达到最高，冬季最低，且松树的细根生物量整体高于其他树种。'
        }
    };

    // 初始化图表描述
    updateChartDescription();

    // 生成图表
    function generateChart() {
        // 获取选中的图表类型
        let selectedChartType = '';
        chartTypeRadios.forEach(radio => {
            if (radio.checked) {
                selectedChartType = radio.value;
            }
        });

        // 获取图表数据
        let chartData;
        try {
            // 尝试解析用户输入的数据
            if (dataInput.value.trim()) {
                // 尝试解析为JSON
                try {
                    chartData = JSON.parse(dataInput.value);
                } catch (e) {
                    // 如果不是JSON，尝试解析为CSV
                    const lines = dataInput.value.trim().split('\n');
                    const headers = lines[0].split(',');
                    const datasets = [];
                    
                    // 第一列作为标签
                    const labels = [];
                    for (let i = 1; i < lines.length; i++) {
                        const values = lines[i].split(',');
                        labels.push(values[0]);
                    }
                    
                    // 其余列作为数据集
                    for (let i = 1; i < headers.length; i++) {
                        const data = [];
                        for (let j = 1; j < lines.length; j++) {
                            const values = lines[j].split(',');
                            data.push(parseFloat(values[i]));
                        }
                        
                        datasets.push({
                            label: headers[i],
                            data: data,
                            backgroundColor: getColor(i - 1, 0.7),
                            borderColor: getColor(i - 1, 1)
                        });
                    }
                    
                    chartData = {
                        labels: labels,
                        datasets: datasets
                    };
                }
            } else {
                // 如果没有输入数据，使用示例数据
                const selectedExample = exampleDataSelect.value;
                if (selectedExample && exampleData[selectedExample]) {
                    chartData = exampleData[selectedExample].data;
                    chartTitle.value = exampleData[selectedExample].title;
                    xAxisLabel.value = exampleData[selectedExample].xAxisLabel;
                    yAxisLabel.value = exampleData[selectedExample].yAxisLabel;
                    
                    // 更新选中的图表类型
                    selectedChartType = exampleData[selectedExample].type;
                    document.getElementById(selectedChartType + 'Chart').checked = true;
                    
                    // 更新图表描述
                    chartDescription.innerHTML = `<p>${exampleData[selectedExample].description}</p>`;
                } else {
                    throw new Error('请输入数据或选择示例数据');
                }
            }
        } catch (error) {
            alert('数据格式错误: ' + error.message);
            return;
        }

        // 销毁现有图表
        if (currentChart) {
            currentChart.destroy();
        }

        // 获取图表配置
        const showLegend = showLegendSwitch.checked;
        const showGrid = showGridSwitch.checked;
        const useAnimation = animationSwitch.checked;
        const selectedColorTheme = colorThemes[colorThemeSelect.value] || colorThemes.default;

        // 应用颜色主题
        chartData.datasets.forEach((dataset, index) => {
            const color = selectedColorTheme[index % selectedColorTheme.length];
            if (selectedChartType === 'line') {
                dataset.borderColor = color;
                dataset.backgroundColor = hexToRgba(color, 0.2);
            } else if (selectedChartType === 'pie' || selectedChartType === 'doughnut') {
                dataset.backgroundColor = selectedColorTheme.map(color => color);
            } else {
                dataset.backgroundColor = hexToRgba(color, 0.7);
                dataset.borderColor = color;
            }
        });

        // 创建图表配置
        const chartConfig = {
            type: getChartJsType(selectedChartType),
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: useAnimation ? 1000 : 0
                },
                plugins: {
                    title: {
                        display: !!chartTitle.value,
                        text: chartTitle.value,
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        display: showLegend
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: !!xAxisLabel.value,
                            text: xAxisLabel.value
                        },
                        grid: {
                            display: showGrid
                        }
                    },
                    y: {
                        title: {
                            display: !!yAxisLabel.value,
                            text: yAxisLabel.value
                        },
                        grid: {
                            display: showGrid
                        }
                    }
                }
            }
        };

        // 特殊图表类型的配置
        if (selectedChartType === 'radar') {
            delete chartConfig.options.scales;
        } else if (selectedChartType === 'pie' || selectedChartType === 'doughnut') {
            delete chartConfig.options.scales;
            if (selectedChartType === 'doughnut') {
                chartConfig.options.cutout = '50%';
            }
        } else if (selectedChartType === 'horizontalBar') {
            chartConfig.options.indexAxis = 'y';
        } else if (selectedChartType === 'scatter') {
            chartConfig.options.scales.x.type = 'linear';
            chartConfig.options.scales.y.type = 'linear';
        }

        // 创建图表
        currentChart = new Chart(chartCanvas, chartConfig);

        // 更新图表描述
        updateChartDescription(selectedChartType);
    }

    // 更新图表
    function updateChart() {
        if (currentChart) {
            // 获取图表配置
            const showLegend = showLegendSwitch.checked;
            const showGrid = showGridSwitch.checked;
            const useAnimation = animationSwitch.checked;
            const selectedColorTheme = colorThemes[colorThemeSelect.value] || colorThemes.default;

            // 应用颜色主题
            currentChart.data.datasets.forEach((dataset, index) => {
                const color = selectedColorTheme[index % selectedColorTheme.length];
                if (currentChart.config.type === 'line') {
                    dataset.borderColor = color;
                    dataset.backgroundColor = hexToRgba(color, 0.2);
                } else if (currentChart.config.type === 'pie' || currentChart.config.type === 'doughnut') {
                    dataset.backgroundColor = selectedColorTheme.map(color => color);
                } else {
                    dataset.backgroundColor = hexToRgba(color, 0.7);
                    dataset.borderColor = color;
                }
            });

            // 更新图表配置
            currentChart.options.plugins.title.display = !!chartTitle.value;
            currentChart.options.plugins.title.text = chartTitle.value;
            currentChart.options.plugins.legend.display = showLegend;
            currentChart.options.animation.duration = useAnimation ? 1000 : 0;

            if (currentChart.options.scales) {
                currentChart.options.scales.x.title.display = !!xAxisLabel.value;
                currentChart.options.scales.x.title.text = xAxisLabel.value;
                currentChart.options.scales.x.grid.display = showGrid;
                
                currentChart.options.scales.y.title.display = !!yAxisLabel.value;
                currentChart.options.scales.y.title.text = yAxisLabel.value;
                currentChart.options.scales.y.grid.display = showGrid;
            }

            // 更新图表
            currentChart.update();
        }
    }

    // 更新图表描述
    function updateChartDescription(chartType) {
        if (!chartType) {
            chartDescription.innerHTML = `
                <p>请选择图表类型并输入数据，然后点击"生成图表"按钮来创建可视化图表。</p>
                <p>您可以直接输入数据，或者从示例数据中选择一个来快速开始。</p>
            `;
            return;
        }

        const descriptions = {
            line: '折线图适用于显示数据在一段时间内的变化趋势，特别是连续的时间序列数据。',
            bar: '柱形图适用于比较不同类别的数据大小，可以清晰地展示各类别之间的差异。',
            horizontalBar: '条形图是柱形图的水平版本，当类别名称较长或类别数量较多时特别有用。',
            area: '堆积面积图适用于显示部分与整体的关系，以及各部分随时间的变化趋势。',
            histogram: '直方图用于展示数据的分布情况，特别是连续数据的频率分布。',
            pie: '饼图用于显示各部分占整体的比例，适合展示构成或占比数据。',
            scatter: '散点图用于展示两个变量之间的关系，可以发现它们之间的相关性或模式。',
            boxplot: '箱形图用于展示数据的分布特征，包括中位数、四分位数和异常值。',
            radar: '雷达图用于比较多个变量的数据，适合展示多维度的性能或特征评估。',
            errorbar: '误差棒图用于显示数据的不确定性或变异性，常用于科学研究中展示测量误差。'
        };

        chartDescription.innerHTML = `<p>${descriptions[chartType] || '请选择图表类型并输入数据。'}</p>`;
    }

    // 获取Chart.js图表类型
    function getChartJsType(type) {
        const typeMap = {
            line: 'line',
            bar: 'bar',
            horizontalBar: 'bar',
            area: 'line',
            histogram: 'bar',
            pie: 'pie',
            scatter: 'bubble',
            boxplot: 'bar',
            radar: 'radar',
            errorbar: 'bar'
        };
        return typeMap[type] || 'line';
    }

    // 获取颜色
    function getColor(index, alpha) {
        const colors = colorThemes.default;
        const color = colors[index % colors.length];
        return hexToRgba(color, alpha);
    }

    // 十六进制颜色转RGBA
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // 事件监听器
    generateChartBtn.addEventListener('click', generateChart);
    updateChartBtn.addEventListener('click', updateChart);
    
    // 示例数据选择事件
    exampleDataSelect.addEventListener('change', function() {
        const selectedExample = exampleDataSelect.value;
        if (selectedExample && exampleData[selectedExample]) {
            // 清空数据输入框
            dataInput.value = '';
            
            // 设置图表标题和轴标签
            chartTitle.value = exampleData[selectedExample].title;
            xAxisLabel.value = exampleData[selectedExample].xAxisLabel;
            yAxisLabel.value = exampleData[selectedExample].yAxisLabel;
            
            // 设置图表类型
            const chartType = exampleData[selectedExample].type;
            document.getElementById(chartType + 'Chart').checked = true;
            
            // 更新图表描述
            chartDescription.innerHTML = `<p>${exampleData[selectedExample].description}</p>`;
        }
    });

    // 图表类型选择事件
    chartTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateChartDescription(this.value);
        });
    });
});