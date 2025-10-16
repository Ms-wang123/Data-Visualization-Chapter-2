// 柱形图模块
export const BarChart = {
    title: "2.2 柱形图 - 阿里巴巴GMV",
    description: "展示2013-2019财年阿里巴巴淘宝和天猫平台的GMV数据",
    supportZoom: true,
    supportReset: true,
    options: [
        { label: "普通柱状图", value: "bar" },
        { label: "渐变柱状图", value: "gradient" },
        { label: "动态排序", value: "dynamic" }
    ],
    selectedOption: "bar",
    data: {
        years: ["FY2013", "FY2014", "FY2015", "FY2016", "FY2017", "FY2018", "FY2019"],
        values: [10770, 16780, 24440, 30920, 37670, 48200, 57270]
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        
        let itemStyle = {};
        if (option === "gradient") {
            itemStyle = {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#4a6fa5' },
                    { offset: 1, color: '#6c8fb3' }
                ])
            };
        }
        
        const options = {
            title: {
                text: '2013-2019财年阿里巴巴GMV',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b}: {c} 亿元'
            },
            xAxis: {
                type: 'category',
                data: this.data.years,
                axisLabel: {
                    interval: 0,
                    rotate: option === "dynamic" ? 45 : 0
                }
            },
            yAxis: {
                type: 'value',
                name: 'GMV (亿元)',
                nameLocation: 'middle',
                nameGap: 40,
                axisLine: {
                    show: true
                }
            },
            series: [
                {
                    type: 'bar',
                    data: this.data.values,
                    itemStyle: itemStyle,
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c} 亿元'
                    },
                    barWidth: option === "dynamic" ? '40%' : '50%',
                    animationDelay: function (idx) {
                        return idx * 100;
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
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
            },
            animationEasing: 'elasticOut'
        };
        
        chart.setOption(options);
        
        // 如果是动态排序，添加动画效果
        if (option === "dynamic") {
            // 添加动态排序效果
            let data = this.data.years.map((year, index) => ({
                year: year,
                value: this.data.values[index]
            }));
            
            let timer = setTimeout(function() {
                data.sort((a, b) => a.value - b.value);
                
                chart.setOption({
                    xAxis: {
                        data: data.map(item => item.year)
                    },
                    series: [{
                        data: data.map(item => item.value)
                    }]
                });
            }, 1000);
            
            // 保存定时器ID以便清除
            chart.timer = timer;
        }
        
        // 添加点击事件处理
        chart.on('click', function(params) {
            if (window.app && window.app.selectedDataPoint) {
                window.app.selectedDataPoint = {
                    '年份': params.name,
                    'GMV': `${params.value} 亿元`
                };
            }
        });
        
        return chart;
    }
};