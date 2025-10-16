// 水平条形图模块
export const HorizontalBarChart = {
    title: "2.3 条形图 - 网购替代率",
    description: "展示各商品种类的网购替代率数据",
    supportZoom: true,
    supportReset: true,
    options: [
        { label: "普通条形图", value: "bar" },
        { label: "排序条形图", value: "sorted" },
        { label: "带标签条形图", value: "labeled" }
    ],
    selectedOption: "bar",
    data: {
        categories: [
            "家政、家教、保姆等生活服务", "飞机票、火车票", "家具", "手机、手机配件", 
            "计算机及其配套产品", "汽车用品", "通信充值、游戏充值", "个人护理用品", 
            "书报杂志及音像制品", "餐饮、旅游、住宿", "家用电器", 
            "食品、饮料、烟酒、保健品", "家庭日杂用品", "保险、演出票务", 
            "服装、鞋帽、家用纺织品", "数码产品", "其他商品和服务", "工艺品、收藏品"
        ],
        values: [
            0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 
            0.860, 0.856, 0.854, 0.835, 0.826, 0.816, 0.798, 0.765, 0.763, 0.67
        ]
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        
        // 准备数据
        let categories = [...this.data.categories];
        let values = [...this.data.values];
        
        // 如果选择排序，则按值排序
        if (option === "sorted") {
            const combined = categories.map((category, index) => ({
                category,
                value: values[index]
            }));
            
            combined.sort((a, b) => a.value - b.value);
            
            categories = combined.map(item => item.category);
            values = combined.map(item => item.value);
        }
        
        const options = {
            title: {
                text: '各商品种类的网购替代率',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    return `${params[0].name}: ${(params[0].value * 100).toFixed(1)}%`;
                },
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '25%',
                right: '5%',
                bottom: '5%',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                name: '替代率',
                axisLabel: {
                    formatter: function(value) {
                        return (value * 100).toFixed(0) + '%';
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: categories,
                axisLabel: {
                    interval: 0,
                    formatter: function(value) {
                        if (value.length > 8) {
                            return value.substring(0, 8) + '...';
                        }
                        return value;
                    }
                },
                triggerEvent: true
            },
            series: [
                {
                    name: '网购替代率',
                    type: 'bar',
                    data: values,
                    itemStyle: {
                        color: function(params) {
                            // 根据值的大小设置不同的颜色
                            const value = params.value;
                            if (value > 0.9) return '#ff7e5f';
                            if (value > 0.8) return '#feb47b';
                            return '#4a6fa5';
                        }
                    },
                    label: {
                        show: option === "labeled",
                        position: 'right',
                        formatter: function(params) {
                            return (params.value * 100).toFixed(1) + '%';
                        }
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'slider',
                    yAxisIndex: 0,
                    width: 10,
                    right: '1%',
                    start: 0,
                    end: 100
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
        
        // 添加点击事件，显示完整类别名称
        chart.on('click', function(params) {
            if (params.componentType === 'yAxis') {
                const fullName = categories[params.value];
                if (window.app && window.app.selectedDataPoint) {
                    window.app.selectedDataPoint = {
                        '商品类别': fullName,
                        '替代率': `${(values[params.value] * 100).toFixed(1)}%`
                    };
                }
            }
        });
        
        return chart;
    }
};