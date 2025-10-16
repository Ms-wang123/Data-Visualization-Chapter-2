// 图表渲染器

// 折线图渲染器
function renderLineChart(ctx, data, controlValues) {
    // 应用交互控制参数
    const updatedData = JSON.parse(JSON.stringify(data));
    updatedData.datasets.forEach(dataset => {
        dataset.pointRadius = controlValues.pointSize;
        dataset.pointHoverRadius = controlValues.pointSize + 2;
    });
    
    window.currentChart = new Chart(ctx, {
        type: 'line',
        data: updatedData,
        options: {
            responsive: true,
            animation: {
                duration: controlValues.animationSpeed
            },
            plugins: {
                legend: {
                    display: controlValues.showLegend
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '温度 (°C)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '日期'
                    }
                }
            }
        }
    });
}

// 柱形图渲染器
function renderBarChart(ctx, data, horizontal = false, controlValues) {
    const updatedData = JSON.parse(JSON.stringify(data));
    
    window.currentChart = new Chart(ctx, {
        type: 'bar',
        data: updatedData,
        options: {
            indexAxis: horizontal ? 'y' : 'x',
            responsive: true,
            animation: {
                duration: controlValues.animationSpeed
            },
            plugins: {
                legend: {
                    display: controlValues.showLegend
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: horizontal ? '替代率' : '财年'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: horizontal ? '商品种类' : 'GMV(亿元)'
                    }
                }
            },
            barPercentage: controlValues.barWidth,
            categoryPercentage: 0.8
        }
    });
}

// 堆积面积图渲染器
function renderAreaChart(ctx, data, controlValues) {
    window.currentChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            animation: {
                duration: controlValues.animationSpeed
            },
            plugins: {
                legend: {
                    display: controlValues.showLegend
                },
                filler: {
                    propagate: true
                }
            },
            scales: {
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: '物流费用 (万元)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '月份'
                    }
                }
            }
        }
    });
}

// 直方图渲染器
function renderHistogramChart(ctx, data, controlValues) {
    window.currentChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            animation: {
                duration: controlValues.animationSpeed
            },
            plugins: {
                legend: {
                    display: controlValues.showLegend
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '频数'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '灰度值'
                    }
                }
            },
            barPercentage: 1.0,
            categoryPercentage: 1.0
        }
    });
}

// 饼图渲染器
function renderPieChart(ctx, data, controlValues) {
    window.currentChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            animation: {
                duration: controlValues.animationSpeed
            },
            plugins: {
                legend: {
                    display: controlValues.showLegend,
                    position: 'right'
                }
            },
            cutout: `${controlValues.innerRadius * 100}%`
        }
    });
}

// 散点图渲染器
function renderScatterChart(ctx, data, controlValues) {
    // 应用交互控制参数
    const updatedData = JSON.parse(JSON.stringify(data));
    updatedData.datasets.forEach(dataset => {
        dataset.data.forEach(point => {
            point.r = point.r * (controlValues.bubbleSize / 5);
        });
    });
    
    window.currentChart = new Chart(ctx, {
        type: 'bubble',
        data: updatedData,
        options: {
            responsive: true,
            animation: {
                duration: controlValues.animationSpeed
            },
            plugins: {
                legend: {
                    display: controlValues.showLegend
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `速度: ${context.raw.x} km/h, 制动距离: ${context.raw.y} m`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '制动距离 (m)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '速度 (km/h)'
                    }
                }
            }
        }
    });
}

// 箱形图渲染器
function renderBoxPlotChart(ctx, data, controlValues) {
    // Chart.js没有内置箱形图，这里使用条形图模拟
    const boxplotData = {
        labels: data.labels,
        datasets: []
    };
    
    // 为每个箱形图数据点创建5个数据集（最小值、Q1、中位数、Q3、最大值）
    data.datasets[0].data.forEach((boxData, i) => {
        // 最小值到Q1
        boxplotData.datasets.push({
            label: `${data.labels[i]} - 最小值到Q1`,
            data: Array(data.labels.length).fill(0),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        });
        boxplotData.datasets[boxplotData.datasets.length - 1].data[i] = boxData.q1 - boxData.min;
        
        // Q1到中位数
        boxplotData.datasets.push({
            label: `${data.labels[i]} - Q1到中位数`,
            data: Array(data.labels.length).fill(0),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        });
        boxplotData.datasets[boxplotData.datasets.length - 1].data[i] = boxData.median - boxData.q1;
        
        // 中位数到Q3
        boxplotData.datasets.push({
            label: `${data.labels[i]} - 中位数到Q3`,
            data: Array(data.labels.length).fill(0),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        });
        boxplotData.datasets[boxplotData.datasets.length - 1].data[i] = boxData.q3 - boxData.median;
        
        // Q3到最大值
        boxplotData.datasets.push({
            label: `${data.labels[i]} - Q3到最大值`,
            data: Array(data.labels.length).fill(0),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        });
        boxplotData.datasets[boxplotData.datasets.length - 1].data[i] = boxData.max - boxData.q3;
    });
    
    window.currentChart = new Chart(ctx, {
        type: 'bar',
        data: boxplotData,
        options: {
            responsive: true,
            animation: {
                duration: controlValues.animationSpeed
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return data.labels[context[0].dataIndex];
                        },
                        label: function(context) {
                            const boxData = data.datasets[0].data[context.dataIndex];
                            return [
                                `最小值: ${boxData.min}`,
                                `Q1: ${boxData.q1}`,
                                `中位数: ${boxData.median}`,
                                `Q3: ${boxData.q3}`,
                                `最大值: ${boxData.max}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: '年份'
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: '发电量 (亿千瓦时)'
                    }
                }
            }
        }
    });
}

// 雷达图渲染器
function renderRadarChart(data, controlValues) {
    // 使用D3.js绘制雷达图
    const container = document.getElementById('radarContainer');
    container.innerHTML = '';
    
    const width = container.clientWidth;
    const height = 400;
    const margin = 60;
    const radius = Math.min(width, height) / 2 - margin;
    
    const svg = d3.select('#radarContainer')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width/2}, ${height/2})`);
    
    // 雷达图的角度和半径比例尺
    const angleScale = d3.scalePoint()
        .domain(data.labels)
        .range([0, 2 * Math.PI]);
    
    const radiusScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, radius]);
    
    // 绘制雷达图的轴线
    const axisGrid = svg.append('g').attr('class', 'axis-grid');
    
    // 绘制同心圆
    const levels = 5;
    axisGrid.selectAll('.level')
        .data(d3.range(1, levels + 1).map(i => i / levels))
        .enter()
        .append('circle')
        .attr('class', 'level')
        .attr('r', d => radiusScale(d))
        .style('fill', 'none')
        .style('stroke', '#999')
        .style('stroke-opacity', 0.5);
    
    // 绘制轴线
    axisGrid.selectAll('.axis')
        .data(data.labels)
        .enter()
        .append('line')
        .attr('class', 'axis')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', (d, i) => radiusScale(1.1) * Math.cos(angleScale(d) - Math.PI/2))
        .attr('y2', (d, i) => radiusScale(1.1) * Math.sin(angleScale(d) - Math.PI/2))
        .style('stroke', '#999')
        .style('stroke-width', '1px');
    
    // 添加轴标签
    axisGrid.selectAll('.axis-label')
        .data(data.labels)
        .enter()
        .append('text')
        .attr('class', 'axis-label')
        .attr('x', (d, i) => radiusScale(1.2) * Math.cos(angleScale(d) - Math.PI/2))
        .attr('y', (d, i) => radiusScale(1.2) * Math.sin(angleScale(d) - Math.PI/2))
        .text(d => d)
        .style('font-size', '12px')
        .style('text-anchor', 'middle')
        .attr('dy', '0.35em');
    
    // 创建雷达图路径生成器
    const radarLine = d3.lineRadial()
        .angle((d, i) => angleScale(data.labels[i]) - Math.PI/2)
        .radius((d, i) => radiusScale(d))
        .curve(d3.curveLinearClosed);
    
    // 绘制雷达图区域
    const radarGroups = svg.selectAll('.radar-group')
        .data(data.datasets)
        .enter()
        .append('g')
        .attr('class', 'radar-group');
    
    // 绘制雷达图填充区域
    radarGroups.append('path')
        .attr('class', 'radar-area')
        .attr('d', d => radarLine(d.data))
        .style('fill', d => d.backgroundColor)
        .style('fill-opacity', 0.6)
        .style('stroke', d => d.borderColor)
        .style('stroke-width', '2px');
    
    // 绘制雷达图数据点
    radarGroups.selectAll('.radar-point')
        .data((d, i) => d.data.map((value, j) => ({value, index: j, color: d.pointBackgroundColor})))
        .enter()
        .append('circle')
        .attr('class', 'radar-point')
        .attr('cx', (d, i) => radiusScale(d.value) * Math.cos(angleScale(data.labels[d.index]) - Math.PI/2))
        .attr('cy', (d, i) => radiusScale(d.value) * Math.sin(angleScale(data.labels[d.index]) - Math.PI/2))
        .attr('r', 5)
        .style('fill', d => d.color);
    
    // 添加图例
    if (controlValues.showLegend) {
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${radius + 20}, ${-radius})`);
        
        data.datasets.forEach((d, i) => {
            const legendRow = legend.append('g')
                .attr('transform', `translate(0, ${i * 20})`);
            
            legendRow.append('rect')
                .attr('width', 10)
                .attr('height', 10)
                .style('fill', d.backgroundColor)
                .style('stroke', d.borderColor);
            
            legendRow.append('text')
                .attr('x', 20)
                .attr('y', 10)
                .text(d.label)
                .style('font-size', '12px');
        });
    }
}

// 误差棒图渲染器
function renderErrorBarChart(ctx, data, controlValues) {
    // Chart.js没有内置误差棒图，这里使用条形图和自定义插件模拟
    window.currentChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            animation: {
                duration: controlValues.animationSpeed
            },
            plugins: {
                legend: {
                    display: controlValues.showLegend
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const datasetIndex = context.datasetIndex;
                            const index = context.dataIndex;
                            const value = context.raw;
                            const errorBar = data.datasets[datasetIndex].errorBars[index];
                            return `${data.datasets[datasetIndex].label}: ${value} ± ${errorBar.plus}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '细根生物量 (g/m²)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '季节'
                    }
                }
            }
        },
        plugins: [{
            id: 'errorBars',
            afterDatasetDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden && dataset.errorBars) {
                        meta.data.forEach((element, index) => {
                            const errorBar = dataset.errorBars[index];
                            if (errorBar) {
                                const { x, y } = element.tooltipPosition();
                                const errorBarWidth = 10;
                                
                                ctx.save();
                                ctx.beginPath();
                                ctx.moveTo(x, y - errorBar.plus * 20);
                                ctx.lineTo(x, y + errorBar.minus * 20);
                                ctx.moveTo(x - errorBarWidth/2, y - errorBar.plus * 20);
                                ctx.lineTo(x + errorBarWidth/2, y - errorBar.plus * 20);
                                ctx.moveTo(x - errorBarWidth/2, y + errorBar.minus * 20);
                                ctx.lineTo(x + errorBarWidth/2, y + errorBar.minus * 20);
                                ctx.strokeStyle = dataset.borderColor;
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                ctx.restore();
                            }
                        });
                    }
                });
            }
        }]
    });
}