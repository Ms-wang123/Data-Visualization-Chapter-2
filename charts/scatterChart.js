// 散点图模块
export const ScatterChart = {
    title: "2.7 散点图 - 速度与制动距离",
    description: "展示汽车速度与制动距离之间的关系",
    supportZoom: true,
    supportReset: true,
    options: [
        { label: "散点图", value: "scatter" },
        { label: "气泡图", value: "bubble" },
        { label: "带趋势线", value: "trend" }
    ],
    selectedOption: "scatter",
    data: {
        speed: Array.from({ length: 20 }, (_, i) => (i + 1) * 10),
        distance: [0.5, 2.0, 4.4, 7.9, 12.3, 17.7, 24.1, 31.5, 39.9, 49.2,
                  59.5, 70.8, 83.1, 96.4, 110.7, 126.0, 142.2, 159.4, 177.6, 196.8]
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        
        // 准备数据
        const data = this.data.speed.map((speed, index) => ({
            name: `${speed} km/h`,
            value: [speed, this.data.distance[index]],
            symbolSize: option === "bubble" ? Math.sqrt(this.data.distance[index]) * 2 : 8
        }));
        
        // 计算趋势线数据
        const trendData = this.data.speed.map(speed => {
            // 简单的二次多项式拟合
            const distance = 0.005 * speed * speed + 0.1 * speed;
            return [speed, distance];
        });
        
        const options = {
            title: {
                text: '汽车速度与制动距离',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    return `速度: ${params.value[0]} km/h<br/>制动距离: ${params.value[1]} m`;
                }
            },
            xAxis: {
                type: 'value',
                name: '速度 (km/h)',
                nameLocation: 'middle',
                nameGap: 30,
                min: 0,
                max: 210
            },
            yAxis: {
                type: 'value',
                name: '制动距离 (m)',
                nameLocation: 'middle',
                nameGap: 40
            },
            series: [
                {
                    name: '实际数据',
                    type: 'scatter',
                    data: data,
                    itemStyle: {
                        color: '#4a6fa5'
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    yAxisIndex: 0,
                    start: 0,
                    end: 100
                }
            ],
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
        
        // 如果是气泡图，调整样式
        if (option === "bubble") {
            options.series[0].symbolSize = function(data) {
                return Math.sqrt(data.value[1]) * 2;
            };
            options.series[0].itemStyle = {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#ff7e5f' },
                    { offset: 1, color: '#feb47b' }
                ]),
                opacity: 0.8
            };
        }
        
        // 如果是带趋势线，添加趋势线
        if (option === "trend") {
            options.series.push({
                name: '趋势线',
                type: 'line',
                data: trendData,
                smooth: true,
                lineStyle: {
                    color: '#ff7e5f',
                    width: 3
                },
                symbol: 'none',
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            });
        }
        
        chart.setOption(options);
        
        // 添加点击事件处理
        chart.on('click', function(params) {
            if (window.app && window.app.selectedDataPoint) {
                window.app.selectedDataPoint = {
                    '速度': `${params.value[0]} km/h`,
                    '制动距离': `${params.value[1]} m`
                };
            }
        });
        
        return chart;
    }
};