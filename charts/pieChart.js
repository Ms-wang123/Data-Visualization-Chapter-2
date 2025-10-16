// 饼图/圆环图模块
export const PieChart = {
    title: "2.6 饼图/圆环图 - 支付宝账单",
    description: "展示支付宝月账单消费类别分布",
    supportZoom: false,
    supportReset: true,
    options: [
        { label: "饼图", value: "pie" },
        { label: "圆环图", value: "ring" },
        { label: "南丁格尔图", value: "rose" }
    ],
    selectedOption: "pie",
    data: {
        categories: ['购物', '人情往来', '餐饮美食', '通信物流', '生活日用', '交通出行', '休闲娱乐', '其他'],
        values: [800, 100, 1000, 200, 300, 200, 200, 200]
    },
    render(chartDom, option) {
        const chart = echarts.init(chartDom);
        
        const isPie = option === "pie";
        const isRing = option === "ring";
        const isRose = option === "rose";
        
        // 计算总和和百分比
        const total = this.data.values.reduce((sum, val) => sum + val, 0);
        const percentages = this.data.values.map(val => (val / total * 100).toFixed(1));
        
        // 准备数据
        const seriesData = this.data.categories.map((category, index) => ({
            name: category,
            value: this.data.values[index]
        }));
        
        const options = {
            title: {
                text: '支付宝月账单报告',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} 元 ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                top: 'center',
                data: this.data.categories
            },
            series: [
                {
                    name: '消费类别',
                    type: 'pie',
                    radius: isRing ? ['50%', '70%'] : (isRose ? '65%' : '60%'),
                    center: ['60%', '50%'],
                    roseType: isRose ? 'radius' : false,
                    itemStyle: {
                        borderRadius: 8,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        formatter: '{b}: {c} 元 ({d}%)'
                    },
                    data: seriesData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
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
                window.app.selectedDataPoint = {
                    '类别': params.name,
                    '金额': `${params.value} 元`,
                    '占比': `${params.percent}%`
                };
            }
        });
        
        return chart;
    }
};