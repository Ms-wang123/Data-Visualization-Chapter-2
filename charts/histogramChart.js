// 直方图模块
export const HistogramChart = {
    title: "2.5 直方图 - 灰度分布",
    description: "模拟人脸识别中的灰度直方图分布",
    supportZoom: true,
    supportReset: true,
    options: [
        { label: "普通直方图", value: "normal" },
        { label: "平滑曲线", value: "smooth" },
        { label: "动态数据", value: "dynamic" }
    ],
    selectedOption: "normal",
    data: {
        // 生成随机数据
        generateData: function(count = 10000) {
            // 使用正态分布生成数据
            const mean = 0;
            const stdDev = 1;
            const data = [];
            
            for (let i = 0; i < count; i++) {
                // Box-Muller变换生成正态分布随机数
                const u = 1 - Math.random();
                const v = Math.random();
                const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                data.push(z * stdDev + mean);
            }
            
            return data;
        }
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        
        // 生成数据
        const data = this.data.generateData();
        
        // 计算直方图数据
        const bins = 25;
        const min = Math.min(...data);
        const max = Math.max(...data);
        const binWidth = (max - min) / bins;
        
        const histData = Array(bins).fill(0);
        data.forEach(val => {
            const binIndex = Math.min(Math.floor((val - min) / binWidth), bins - 1);
            histData[binIndex]++;
        });
        
        const xData = Array(bins).fill(0).map((_, i) => min + i * binWidth + binWidth / 2);
        
        const options = {
            title: {
                text: '灰度直方图',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function(params) {
                    const x = params[0].axisValue.toFixed(2);
                    const count = params[0].data;
                    return `灰度值: ${x}<br/>频数: ${count}`;
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: xData.map(x => x.toFixed(2)),
                name: '灰度值',
                nameLocation: 'middle',
                nameGap: 30,
                axisLabel: {
                    rotate: 45,
                    interval: 2
                }
            },
            yAxis: {
                type: 'value',
                name: '频数',
                nameLocation: 'middle',
                nameGap: 40
            },
            series: []
        };
        
        if (option === "normal" || option === "dynamic") {
            options.series.push({
                type: 'bar',
                data: histData,
                barWidth: '90%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#4a6fa5' },
                        { offset: 1, color: '#6c8fb3' }
                    ])
                }
            });
        }
        
        if (option === "smooth") {
            // 添加平滑曲线
            options.series.push({
                type: 'line',
                data: histData,
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#ff7e5f'
                },
                itemStyle: {
                    color: '#ff7e5f'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(255, 126, 95, 0.5)' },
                        { offset: 1, color: 'rgba(255, 126, 95, 0.1)' }
                    ])
                }
            });
        }
        
        chart.setOption(options);
        
        // 如果是动态数据，设置定时器更新数据
        if (option === "dynamic") {
            let timer = setInterval(function() {
                const newData = this.data.generateData();
                const newHistData = Array(bins).fill(0);
                
                newData.forEach(val => {
                    const binIndex = Math.min(Math.floor((val - min) / binWidth), bins - 1);
                    newHistData[binIndex]++;
                });
                
                chart.setOption({
                    series: [{
                        data: newHistData
                    }]
                });
            }.bind(this), 2000);
            
            // 保存定时器ID以便清除
            chart.timer = timer;
        }
        
        // 添加点击事件处理
        chart.on('click', function(params) {
            if (window.app && window.app.selectedDataPoint) {
                window.app.selectedDataPoint = {
                    '灰度值': params.name,
                    '频数': params.value
                };
            }
        });
        
        return chart;
    }
};