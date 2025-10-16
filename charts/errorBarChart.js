// 误差棒图模块
export const ErrorBarChart = {
    title: "2.10 误差棒图 - 细根生物量",
    description: "展示4个树种不同季节的细根生物量及其误差范围",
    supportZoom: true,
    supportReset: true,
    options: [
        { label: "垂直误差棒", value: "vertical" },
        { label: "水平误差棒", value: "horizontal" },
        { label: "分组误差棒", value: "grouped" }
    ],
    selectedOption: "vertical",
    data: {
        seasons: ["春季", "夏季", "秋季"],
        species: ["树种A", "树种B", "树种C", "树种D"],
        values: {
            A: [2.04, 1.57, 1.63],
            B: [1.69, 1.61, 1.64],
            C: [4.65, 4.99, 4.94],
            D: [3.39, 2.33, 4.10]
        },
        errors: {
            A: [0.16, 0.08, 0.10],
            B: [0.27, 0.14, 0.14],
            C: [0.34, 0.32, 0.29],
            D: [0.23, 0.23, 0.39]
        }
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        
        const isHorizontal = option === "horizontal";
        const isGrouped = option === "grouped";
        
        // 准备数据
        const seriesData = [];
        const barWidth = 0.2;
        
        this.data.species.forEach((species, index) => {
            const speciesKey = ['A', 'B', 'C', 'D'][index];
            const xData = isHorizontal ? 
                this.data.values[speciesKey] : 
                this.data.seasons.map((_, i) => i + (index * barWidth));
            
            seriesData.push({
                name: species,
                type: 'bar',
                barWidth: barWidth,
                data: xData.map((x, i) => ({
                    value: isHorizontal ? [x, i] : [i, x],
                    itemStyle: {
                        color: ['#4a6fa5', '#6c8fb3', '#ff7e5f', '#feb47b'][index]
                    }
                })),
                errorBar: {
                    data: this.data.errors[speciesKey].map((err, i) => ({
                        value: isHorizontal ? err : [i, err],
                        itemStyle: {
                            color: '#333'
                        }
                    })),
                    type: isHorizontal ? 'horizontal' : 'vertical'
                }
            });
        });
        
        const options = {
            title: {
                text: '4个树种不同季节的细根生物量',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    let result = `${params[0].axisValue}<br/>`;
                    params.forEach(param => {
                        const value = isHorizontal ? param.value[0] : param.value[1];
                        const error = param.seriesName.includes('error') ? '' : 
                            `±${this.data.errors[param.seriesName.replace('树种', '')][param.dataIndex]}`;
                        result += `${param.seriesName}: ${value}${error}<br/>`;
                    });
                    return result;
                }.bind(this)
            },
            legend: {
                data: this.data.species,
                bottom: 10
            },
            xAxis: {
                type: isHorizontal ? 'value' : 'category',
                name: isHorizontal ? '生物量 (g)' : '季节',
                nameLocation: 'middle',
                nameGap: 30,
                data: isHorizontal ? null : this.data.seasons,
                axisLabel: {
                    interval: 0
                }
            },
            yAxis: {
                type: isHorizontal ? 'category' : 'value',
                name: isHorizontal ? null : '生物量 (g)',
                nameLocation: 'middle',
                nameGap: 40,
                data: isHorizontal ? this.data.seasons : null
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
        
        // 如果是分组误差棒，调整数据格式
        if (isGrouped) {
            options.series = [];
            const groupWidth = barWidth * this.data.species.length;
            
            this.data.seasons.forEach((season, seasonIndex) => {
                this.data.species.forEach((species, speciesIndex) => {
                    const speciesKey = ['A', 'B', 'C', 'D'][speciesIndex];
                    const value = this.data.values[speciesKey][seasonIndex];
                    const error = this.data.errors[speciesKey][seasonIndex];
                    
                    options.series.push({
                        name: species,
                        type: 'bar',
                        barWidth: barWidth,
                        barGap: '0%',
                        barCategoryGap: '0%',
                        xAxisIndex: 0,
                        data: [{
                            value: [seasonIndex, value],
                            itemStyle: {
                                color: ['#4a6fa5', '#6c8fb3', '#ff7e5f', '#feb47b'][speciesIndex]
                            }
                        }],
                        errorBar: {
                            data: [{
                                value: [seasonIndex, error],
                                itemStyle: {
                                    color: '#333'
                                }
                            }],
                            type: 'vertical'
                        }
                    });
                });
            });
            
            options.xAxis.axisLabel = {
                interval: 0,
                formatter: function(value) {
                    return this.data.seasons[value];
                }.bind(this)
            };
        }
        
        chart.setOption(options);
        
        // 添加点击事件处理
        chart.on('click', function(params) {
            if (window.app && window.app.selectedDataPoint) {
                const value = isHorizontal ? params.value[0] : params.value[1];
                const error = this.data.errors[params.seriesName.replace('树种', '')][params.dataIndex];
                
                window.app.selectedDataPoint = {
                    '季节': isHorizontal ? params.name : params.axisValue,
                    '树种': params.seriesName,
                    '生物量': value,
                    '误差范围': `±${error}`
                };
            }
        }.bind(this));
        
        return chart;
    }
};