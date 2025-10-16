// 堆积面积图模块
export const AreaChart = {
    title: "2.4 堆积面积图 - 物流费用",
    description: "展示物流公司不同类别的物流费用统计数据",
    supportZoom: true,
    supportReset: true,
    options: [
        { label: "堆积面积图", value: "area" },
        { label: "平滑曲线", value: "smooth" },
        { label: "百分比堆积", value: "percent" }
    ],
    selectedOption: "area",
    data: {
        months: Array.from({ length: 12 }, (_, i) => `${i + 1}月`),
        companyA: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290],
        companyB: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
        companyC: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288]
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        
        const isSmooth = option === "smooth";
        const isPercent = option === "percent";
        
        let series = [
            {
                name: '公司A',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: { focus: 'series' },
                data: this.data.companyA,
                smooth: isSmooth
            },
            {
                name: '公司B',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: { focus: 'series' },
                data: this.data.companyB,
                smooth: isSmooth
            },
            {
                name: '公司C',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: { focus: 'series' },
                data: this.data.companyC,
                smooth: isSmooth
            }
        ];
        
        const options = {
            title: {
                text: '物流公司物流费用统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['公司A', '公司B', '公司C'],
                bottom: 10
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                    dataView: { show: true, readOnly: true },
                    restore: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.data.months
            },
            yAxis: {
                type: 'value',
                name: isPercent ? '百分比' : '费用',
                axisLabel: {
                    formatter: isPercent ? '{value}%' : '{value}'
                }
            },
            series: series
        };
        
        if (isPercent) {
            options.tooltip.formatter = function(params) {
                let result = `${params[0].axisValue}<br/>`;
                params.forEach(param => {
                    result += `${param.seriesName}: ${param.value}%<br/>`;
                });
                return result;
            };
        }
        
        chart.setOption(options);
        
        // 添加点击事件处理
        chart.on('click', function(params) {
            if (window.app && window.app.selectedDataPoint) {
                window.app.selectedDataPoint = {
                    '月份': params[0].axisValue,
                    '公司A': `${params[0].value}${isPercent ? '%' : ''}`,
                    '公司B': `${params[1].value}${isPercent ? '%' : ''}`,
                    '公司C': `${params[2].value}${isPercent ? '%' : ''}`
                };
            }
        });
        
        return chart;
    }
};