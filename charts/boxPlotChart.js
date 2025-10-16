// 箱形图模块
export const BoxPlotChart = {
    title: "2.8 箱形图 - 发电量统计",
    description: "展示2017年和2018年全国发电量统计数据",
    supportZoom: true,
    supportReset: true,
    options: [
        { label: "垂直箱形图", value: "vertical" },
        { label: "水平箱形图", value: "horizontal" },
        { label: "分组箱形图", value: "grouped" }
    ],
    selectedOption: "vertical",
    data: {
        data2018: [5200, 5254.5, 5283.4, 5107.8, 5443.3, 5550.6, 6400.2, 6404.9, 5483.1, 5330.2, 5543, 6199.9],
        data2017: [4605.2, 4710.3, 5168.9, 4767.2, 4947, 5203, 6047.4, 5945.5, 5219.6, 5038.1, 5196.3, 5698.6]
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        
        const isHorizontal = option === "horizontal";
        const isGrouped = option === "grouped";
        
        // 准备数据
        const seriesData = [
            {
                name: '2018年',
                type: 'boxplot',
                data: this.prepareBoxplotData(this.data.data2018),
                itemStyle: {
                    color: '#4a6fa5'
                }
            },
            {
                name: '2017年',
                type: 'boxplot',
                data: this.prepareBoxplotData(this.data.data2017),
                itemStyle: {
                    color: '#ff7e5f'
                }
            }
        ];
        
        const options = {
            title: {
                text: '2017-2018年全国发电量统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    const data = params.data;
                    return [
                        `${params.seriesName}`,
                        `最大值: ${data[5]}`,
                        `上四分位数: ${data[4]}`,
                        `中位数: ${data[3]}`,
                        `下四分位数: ${data[2]}`,
                        `最小值: ${data[1]}`
                    ].join('<br/>');
                }
            },
            legend: {
                data: ['2018年', '2017年'],
                bottom: 10
            },
            xAxis: {
                type: isHorizontal ? 'value' : 'category',
                name: '发电量 (亿千瓦时)',
                nameLocation: 'middle',
                nameGap: 30,
                data: isHorizontal ? null : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLabel: {
                    interval: 0,
                    rotate: isHorizontal ? 0 : 45
                }
            },
            yAxis: {
                type: isHorizontal ? 'category' : 'value',
                name: isHorizontal ? null : '发电量 (亿千瓦时)',
                nameLocation: 'middle',
                nameGap: 40,
                data: isHorizontal ? ['2018年', '2017年'] : null
            },
            series: seriesData,
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '15%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                    dataView: { show: true, readOnly: true },
                    restore: {}
                }
            }
        };
        
        // 如果是分组箱形图，调整数据格式
        if (isGrouped) {
            const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            const groupedData = [];
            
            months.forEach((month, index) => {
                groupedData.push({
                    name: month,
                    value: [
                        month,
                        this.prepareBoxplotData([this.data.data2018[index]]),
                        this.prepareBoxplotData([this.data.data2017[index]])
                    ]
                });
            });
            
            options.series = [
                {
                    name: '2018年',
                    type: 'boxplot',
                    data: groupedData.map(item => item.value[1][0]),
                    itemStyle: {
                        color: '#4a6fa5'
                    }
                },
                {
                    name: '2017年',
                    type: 'boxplot',
                    data: groupedData.map(item => item.value[2][0]),
                    itemStyle: {
                        color: '#ff7e5f'
                    }
                }
            ];
            
            options.xAxis.data = months;
            options.xAxis.type = 'category';
            options.yAxis.type = 'value';
        }
        
        chart.setOption(options);
        
        // 添加点击事件处理
        chart.on('click', function(params) {
            if (window.app && window.app.selectedDataPoint) {
                const data = params.data;
                window.app.selectedDataPoint = {
                    '年份/月份': isGrouped ? params.name : params.seriesName,
                    '最大值': data[5],
                    '上四分位数': data[4],
                    '中位数': data[3],
                    '下四分位数': data[2],
                    '最小值': data[1]
                };
            }
        });
        
        return chart;
    },
    
    // 计算箱形图数据
    prepareBoxplotData(rawData) {
        // 计算统计量
        const sorted = [...rawData].sort((a, b) => a - b);
        const q1 = this.calculatePercentile(sorted, 25);
        const median = this.calculatePercentile(sorted, 50);
        const q3 = this.calculatePercentile(sorted, 75);
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        
        // 计算上下边界
        const iqr = q3 - q1;
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;
        
        // 计算异常值
        const outliers = sorted.filter(d => d < lowerBound || d > upperBound);
        
        // 返回箱形图数据格式
        return [
            min,
            q1,
            median,
            q3,
            max,
            ...outliers
        ];
    },
    
    // 计算百分位数
    calculatePercentile(sortedData, percentile) {
        const index = (percentile / 100) * (sortedData.length - 1);
        if (Math.floor(index) === index) {
            return sortedData[index];
        } else {
            const lower = Math.floor(index);
            const upper = Math.ceil(index);
            return (sortedData[lower] + sortedData[upper]) / 2;
        }
    }
};