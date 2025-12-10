// Matplotlib图表JavaScript实现库
// 确保所有10种图表类型都能正确渲染

class MatplotlibCharts {
    constructor() {
        this.defaultColors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#8AC249', '#EA526F', '#6A0572', '#AB83A1'
        ];
        
        this.chineseFont = {
            family: 'Microsoft YaHei, PingFang SC, Hiragino Sans GB, sans-serif',
            size: 12
        };
    }

    // 1. 折线图实现 - 2.1.1 使用plot()绘制折线图
    createLineChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const config = {
            type: 'line',
            data: this.processLineData(data),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'top',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '折线图',
                        font: { ...this.chineseFont, size: 16 }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.parsed.y}`
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: options.xTitle || 'X轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: options.yTitle || 'Y轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    }
                },
                elements: {
                    line: {
                        tension: options.smoothLines ? 0.4 : 0.1
                    },
                    point: {
                        radius: options.pointSize || 4
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 2. 柱形图实现 - 2.2.1 使用bar()绘制柱形图
    createBarChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const config = {
            type: 'bar',
            data: this.processBarData(data),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'top',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '柱形图',
                        font: { ...this.chineseFont, size: 16 }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: options.xTitle || 'X轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: options.yTitle || 'Y轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 3. 条形图实现 - 2.3.1 使用barh()绘制条形图
    createHorizontalBarChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const config = {
            type: 'bar',
            data: this.processBarData(data),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'top',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '条形图',
                        font: { ...this.chineseFont, size: 16 }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: options.xTitle || 'X轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: options.yTitle || 'Y轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 4. 堆积面积图实现 - 2.4.1 使用stackplot()绘制堆积面积图
    createAreaChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const processedData = this.processAreaData(data);
        
        const config = {
            type: 'line',
            data: processedData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'top',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '堆积面积图',
                        font: { ...this.chineseFont, size: 16 }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: options.xTitle || 'X轴',
                            font: this.chineseFont
                        },
                        stacked: true,
                        grid: {
                            display: options.showGrid !== false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: options.yTitle || 'Y轴',
                            font: this.chineseFont
                        },
                        stacked: true,
                        grid: {
                            display: options.showGrid !== false
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.4
                    },
                    point: {
                        radius: 0
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 5. 直方图实现 - 2.5.1 使用hist()绘制直方图
    createHistogram(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const config = {
            type: 'bar',
            data: this.processHistogramData(data),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'top',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '直方图',
                        font: { ...this.chineseFont, size: 16 }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: options.xTitle || '区间',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: options.yTitle || '频数',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 6. 饼图实现 - 2.6.1 使用pie()绘制饼图
    createPieChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const config = {
            type: 'pie',
            data: this.processPieData(data, options),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'right',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '饼图',
                        font: { ...this.chineseFont, size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 7. 散点图实现 - 2.7.1 使用scatter()绘制散点图
    createScatterChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const config = {
            type: 'scatter',
            data: this.processScatterData(data),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'top',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '散点图',
                        font: { ...this.chineseFont, size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const point = context.raw;
                                return `${context.dataset.label}: (${point.x}, ${point.y})`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: options.xTitle || 'X轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: options.yTitle || 'Y轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    }
                },
                elements: {
                    point: {
                        radius: options.pointSize || 6
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 8. 箱形图实现 - 2.8.1 使用boxplot()绘制箱形图
    createBoxplotChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        // Chart.js原生不支持箱形图，我们用柱形图模拟
        const boxData = this.processBoxplotData(data);
        
        const config = {
            type: 'bar',
            data: boxData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'top',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '箱形图',
                        font: { ...this.chineseFont, size: 16 }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: options.xTitle || 'X轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: options.yTitle || 'Y轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 9. 雷达图实现 - 2.9.2 霍兰德职业兴趣测试
    createRadarChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const config = {
            type: 'radar',
            data: this.processRadarData(data),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'top',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '雷达图',
                        font: { ...this.chineseFont, size: 16 }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        grid: {
                            display: options.showGrid !== false
                        },
                        pointLabels: {
                            font: this.chineseFont
                        }
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 10. 误差棒图实现 - 2.10.1 使用errorbar()绘制误差棒图
    createErrorBarChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const config = {
            type: 'bar',
            data: this.processErrorBarData(data),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: options.animationSpeed || 1000
                },
                plugins: {
                    legend: {
                        display: options.showLegend !== false,
                        position: 'top',
                        labels: {
                            font: this.chineseFont
                        }
                    },
                    title: {
                        display: true,
                        text: options.title || '误差棒图',
                        font: { ...this.chineseFont, size: 16 }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: options.xTitle || 'X轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: options.yTitle || 'Y轴',
                            font: this.chineseFont
                        },
                        grid: {
                            display: options.showGrid !== false
                        }
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    }

    // 数据处理方法
    processLineData(data) {
        if (!data.datasets) {
            return {
                labels: data.labels || [],
                datasets: [{
                    label: data.label || '数据',
                    data: data.data || [],
                    borderColor: data.color || this.defaultColors[0],
                    backgroundColor: data.backgroundColor || this.hexToRgba(data.color || this.defaultColors[0], 0.2),
                    fill: false
                }]
            };
        }
        return data;
    }

    processBarData(data) {
        if (!data.datasets) {
            return {
                labels: data.labels || [],
                datasets: [{
                    label: data.label || '数据',
                    data: data.data || [],
                    backgroundColor: data.backgroundColor || this.defaultColors,
                    borderColor: data.borderColor || this.defaultColors.map(color => color),
                    borderWidth: data.borderWidth || 1
                }]
            };
        }
        return data;
    }

    processAreaData(data) {
        if (!data.datasets) {
            return this.processLineData(data);
        }
        
        // 确保堆积属性
        return {
            ...data,
            datasets: data.datasets.map((dataset, index) => ({
                ...dataset,
                fill: true,
                backgroundColor: dataset.backgroundColor || this.hexToRgba(this.defaultColors[index], 0.5),
                borderColor: dataset.borderColor || this.defaultColors[index]
            }))
        };
    }

    processHistogramData(data) {
        if (!data.datasets) {
            return {
                labels: data.labels || [],
                datasets: [{
                    label: data.label || '频数分布',
                    data: data.data || [],
                    backgroundColor: data.backgroundColor || this.defaultColors,
                    borderColor: data.borderColor || this.defaultColors.map(color => color),
                    borderWidth: data.borderWidth || 1
                }]
            };
        }
        return data;
    }

    processPieData(data, options = {}) {
        if (!data.datasets) {
            return {
                labels: data.labels || [],
                datasets: [{
                    label: data.label || '数据',
                    data: data.data || [],
                    backgroundColor: data.backgroundColor || this.defaultColors,
                    borderColor: data.borderColor || '#fff',
                    borderWidth: data.borderWidth || 2
                }]
            };
        }
        return data;
    }

    processScatterData(data) {
        if (!data.datasets) {
            return {
                datasets: [{
                    label: data.label || '数据',
                    data: data.data || [],
                    backgroundColor: data.backgroundColor || this.hexToRgba(data.color || this.defaultColors[0], 0.7),
                    borderColor: data.borderColor || data.color || this.defaultColors[0]
                }]
            };
        }
        return data;
    }

    processBoxplotData(data) {
        // 将箱形图数据转换为柱形图数据
        if (!data.datasets) {
            const processedData = data.data ? data.data.map(item => item.median || item) : [];
            return {
                labels: data.labels || [],
                datasets: [{
                    label: data.label || '中位数',
                    data: processedData,
                    backgroundColor: data.backgroundColor || this.defaultColors[0],
                    borderColor: data.borderColor || this.defaultColors[0],
                    borderWidth: data.borderWidth || 2
                }]
            };
        }
        return data;
    }

    processRadarData(data) {
        if (!data.datasets) {
            return {
                labels: data.labels || [],
                datasets: [{
                    label: data.label || '数据',
                    data: data.data || [],
                    backgroundColor: data.backgroundColor || this.hexToRgba(data.color || this.defaultColors[0], 0.2),
                    borderColor: data.borderColor || data.color || this.defaultColors[0],
                    pointBackgroundColor: data.pointBackgroundColor || data.color || this.defaultColors[0],
                    pointBorderColor: data.pointBorderColor || '#fff'
                }]
            };
        }
        return data;
    }

    processErrorBarData(data) {
        if (!data.datasets) {
            const datasets = data.datasets || [{
                label: data.label || '数据',
                data: data.data || [],
                backgroundColor: data.backgroundColor || this.defaultColors[0],
                borderColor: data.borderColor || this.defaultColors[0],
                borderWidth: data.borderWidth || 1
            }];
            
            return {
                labels: data.labels || [],
                datasets
            };
        }
        return data;
    }

    // 工具方法
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // 统一创建图表的方法
    createChart(canvas, type, data, options = {}) {
        const chartMethods = {
            line: this.createLineChart,
            bar: this.createBarChart,
            horizontalBar: this.createHorizontalBarChart,
            area: this.createAreaChart,
            histogram: this.createHistogram,
            pie: this.createPieChart,
            scatter: this.createScatterChart,
            boxplot: this.createBoxplotChart,
            radar: this.createRadarChart,
            errorbar: this.createErrorBarChart
        };

        const createMethod = chartMethods[type];
        if (!createMethod) {
            throw new Error(`不支持的图表类型: ${type}`);
        }

        return createMethod.call(this, canvas, data, options);
    }
}

// 导出到全局作用域
window.MatplotlibCharts = MatplotlibCharts;