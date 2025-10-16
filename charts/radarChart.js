// 雷达图模块
export const RadarChart = {
    title: "2.9 雷达图 - 职业兴趣测试",
    description: "展示霍兰德职业兴趣测试结果",
    supportZoom: false,
    supportReset: true,
    options: [
        { label: "标准雷达图", value: "standard" },
        { label: "填充雷达图", value: "filled" },
        { label: "多指标雷达图", value: "multi" }
    ],
    selectedOption: "standard",
    data: {
        dimensions: ['研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '传统型(C)', '现实型(R)'],
        indicators: [
            { name: '研究型(I)', max: 1 },
            { name: '艺术型(A)', max: 1 },
            { name: '社会型(S)', max: 1 },
            { name: '企业型(E)', max: 1 },
            { name: '传统型(C)', max: 1 },
            { name: '现实型(R)', max: 1 }
        ],
        testResults: [
            [0.40, 0.32, 0.35, 0.30, 0.30, 0.88],
            [0.85, 0.35, 0.30, 0.40, 0.40, 0.30],
            [0.43, 0.89, 0.30, 0.28, 0.22, 0.30],
            [0.30, 0.25, 0.48, 0.85, 0.45, 0.40],
            [0.20, 0.38, 0.87, 0.45, 0.32, 0.28],
            [0.34, 0.31, 0.38, 0.40, 0.92, 0.28]
        ]
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        
        const isFilled = option === "filled";
        const isMulti = option === "multi";
        
        // 准备数据
        const seriesData = [];
        
        if (isMulti) {
            // 多指标雷达图
            this.data.testResults.forEach((result, index) => {
                seriesData.push({
                    value: result,
                    name: `测试者 ${index + 1}`
                });
            });
        } else {
            // 单指标雷达图
            seriesData.push({
                value: this.data.testResults[0],
                name: '测试结果'
            });
        }
        
        const options = {
            title: {
                text: '霍兰德职业兴趣测试',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                data: isMulti ? seriesData.map(item => item.name) : [],
                bottom: 10
            },
            radar: {
                indicator: this.data.indicators,
                shape: 'circle',
                splitNumber: 5,
                axisName: {
                    color: '#333',
                    fontSize: 12
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(74, 111, 165, 0.1)', 'rgba(74, 111, 165, 0.2)']
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(74, 111, 165, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(74, 111, 165, 0.5)'
                    }
                }
            },
            series: [
                {
                    name: '测试结果',
                    type: 'radar',
                    data: seriesData,
                    areaStyle: isFilled ? {
                        color: 'rgba(255, 126, 95, 0.3)'
                    } : null,
                    lineStyle: {
                        width: 2
                    },
                    symbol: 'circle',
                    symbolSize: 6,
                    label: {
                        show: true,
                        formatter: function(params) {
                            return params.value;
                        }
                    }
                }
            ],
            toolbox: {
                feature: {
                    saveAsImage: {},
                    dataView: { show: true, readOnly: true },
                    restore: {}
                }
            }
        };
        
        chart.setOption(options);
        
        // 添加点击事件处理
        chart.on('click', function(params) {
            if (window.app && window.app.selectedDataPoint) {
                const result = {};
                params.data.value.forEach((value, index) => {
                    result[this.data.dimensions[index]] = value;
                });
                
                window.app.selectedDataPoint = {
                    '测试者': params.seriesName,
                    ...result
                };
            }
        }.bind(this));
        
        return chart;
    }
};