// 折线图模块
export const LineChart = {
    title: "2.1 折线图 - 气温变化",
    description: "展示未来15天最高气温和最低气温的变化趋势",
    supportZoom: true,
    supportReset: true,
    options: [
        { label: "线性图表", value: "line" },
        { label: "平滑曲线", value: "smooth" },
        { label: "面积图", value: "area" }
    ],
    selectedOption: "line",
    data: {
        xData: Array.from({ length: 15 }, (_, i) => i + 4),
        yMax: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31],
        yMin: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16]
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        const smooth = option === "smooth" || option === "area";
        const areaStyle = option === "area" ? { opacity: 0.3 } : null;
        
        const options = {
            title: {
                text: '未来15天气温变化',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    const day = params[0].axisValue;
                    const max = params[0].data;
                    const min = params[1].data;
                    return `第${day}天<br/>最高气温: ${max}°C<br/>最低气温: ${min}°C`;
                }
            },
            legend: {
                data: ['最高气温', '最低气温'],
                bottom: 10
            },
            xAxis: {
                type: 'category',
                data: this.data.xData,
                name: '天数',
                nameLocation: 'middle',
                nameGap: 30,
                axisLabel: {
                    formatter: '{value} 天'
                }
            },
            yAxis: {
                type: 'value',
                name: '温度 (°C)',
                nameLocation: 'middle',
                nameGap: 40,
                axisLine: {
                    show: true
                },
                axisLabel: {
                    formatter: '{value} °C'
                }
            },
            series: [
                {
                    name: '最高气温',
                    type: 'line',
                    data: this.data.yMax,
                    smooth: smooth,
                    areaStyle: areaStyle,
                    itemStyle: {
                        color: '#ff7e5f'
                    },
                    emphasis: {
                        itemStyle: {
                            borderWidth: 3
                        }
                    }
                },
                {
                    name: '最低气温',
                    type: 'line',
                    data: this.data.yMin,
                    smooth: smooth,
                    areaStyle: areaStyle,
                    itemStyle: {
                        color: '#4a6fa5'
                    },
                    emphasis: {
                        itemStyle: {
                            borderWidth: 3
                        }
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                {
                    show: true,
                    type: 'slider',
                    bottom: 60
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
            },
            animation: true
        };
        
        chart.setOption(options);
        
        // 添加点击事件处理
        chart.on('click', function(params) {
            if (window.app && window.app.selectedDataPoint) {
                window.app.selectedDataPoint = {
                    '天数': `第${params.name}天`,
                    '温度': `${params.value}°C`,
                    '系列': params.seriesName
                };
            }
        });
        
        return chart;
    }
};