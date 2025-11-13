// 全局变量
let currentCharts = {};
let liveUpdateInterval = null;
let autoRefreshInterval = null;
let dashboardLayout = [];

// 多维数据集（支持筛选和钻取）
const datasets = {
    line: {
        labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
        datasets: [
            {
                label: '最高气温',
                data: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23],
                borderColor: '#ff6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1,
                fill: false,
                metadata: {
                    category: 'temperature',
                    unit: '°C',
                    source: '气象局',
                    drilldown: {
                        '4月': [32, 31, 33, 30, 34],
                        '5月': [33, 32, 34, 33, 35]
                    }
                }
            },
            {
                label: '最低气温',
                data: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14],
                borderColor: '#36a2eb',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.1,
                fill: false,
                metadata: {
                    category: 'temperature',
                    unit: '°C',
                    source: '气象局'
                }
            }
        ]
    },
    bar: {
        labels: ['FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017', 'FY2018', 'FY2019'],
        datasets: [
            {
                label: '阿里巴巴GMV(亿元)',
                data: [10770, 16780, 24440, 30920, 37670, 48200, 57270],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#8AC249'
                ],
                borderColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#8AC249'
                ],
                borderWidth: 2,
                metadata: {
                    category: 'ecommerce',
                    unit: '亿元',
                    source: '阿里巴巴财报',
                    drilldown: {
                        'FY2019': {
                            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                            data: [12500, 14500, 15270, 15000]
                        }
                    }
                }
            }
        ]
    },
    horizontalBar: {
        labels: ['家政服务', '飞机票', '家具', '手机', '计算机', '汽车用品', '通信充值', '个人护理', '书报杂志', '餐饮旅游'],
        datasets: [
            {
                label: '网购替代率',
                data: [0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 0.860, 0.856],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#8AC249', '#EA526F', '#6A0572', '#AB83A1'
                ],
                borderColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#8AC249', '#EA526F', '#6A0572', '#AB83A1'
                ],
                borderWidth: 2,
                metadata: {
                    category: 'ecommerce',
                    unit: '%',
                    source: 'CNNIC',
                    drilldown: {
                        '家政服务': {
                            labels: ['保洁', '月嫂', '维修', '搬家'],
                            data: [0.95, 0.92, 0.88, 0.85]
                        }
                    }
                }
            }
        ]
    },
    area: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '公司A',
                data: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true,
                metadata: {
                    category: 'logistics',
                    unit: '万元',
                    source: '物流公司A'
                }
            },
            {
                label: '公司B',
                data: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: true,
                metadata: {
                    category: 'logistics',
                    unit: '万元',
                    source: '物流公司B'
                }
            },
            {
                label: '公司C',
                data: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                fill: true,
                metadata: {
                    category: 'logistics',
                    unit: '万元',
                    source: '物流公司C'
                }
            }
        ]
    },
    pie: {
        labels: ['购物', '人情往来', '餐饮美食', '通信物流', '生活日用', '交通出行', '休闲娱乐', '其他'],
        datasets: [
            {
                data: [800, 100, 1000, 200, 300, 200, 200, 200],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC249', '#EA526F'
                ],
                borderColor: '#fff',
                borderWidth: 2,
                metadata: {
                    category: 'expense',
                    unit: '元',
                    source: '支付宝',
                    drilldown: {
                        '购物': {
                            labels: ['服装', '数码', '家居', '食品'],
                            data: [300, 200, 150, 150]
                        }
                    }
                }
            }
        ]
    },
    scatter: {
        datasets: [
            {
                label: '汽车速度与制动距离',
                data: [
                    { x: 10, y: 0.5 },
                    { x: 20, y: 2.0 },
                    { x: 30, y: 4.4 },
                    { x: 40, y: 7.9 },
                    { x: 50, y: 12.3 },
                    { x: 60, y: 17.7 },
                    { x: 70, y: 24.1 },
                    { x: 80, y: 31.5 },
                    { x: 90, y: 39.9 },
                    { x: 100, y: 49.2 }
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
            }
        ]
    },
    radar: {
        labels: ['研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '传统型(C)', '现实型(R)'],
        datasets: [
            {
                label: '人员1',
                data: [0.40, 0.32, 0.35, 0.30, 0.30, 0.88],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
            },
            {
                label: '人员2',
                data: [0.85, 0.35, 0.30, 0.40, 0.40, 0.30],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            }
        ]
    }
};

// 图表配置
const chartConfigs = {
    line: {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: '未来12个月最高气温和最低气温' },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'nearest'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    },
    bar: {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: '2013—2019财年阿里巴巴GMV' }
            }
        }
    },
    horizontalBar: {
        type: 'bar',
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: '各商品种类的网购替代率' }
            }
        }
    },
    area: {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: '物流公司物流费用统计' }
            },
            scales: {
                y: {
                    stacked: true
                }
            }
        }
    },
    pie: {
        type: 'pie',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: '支付宝月账单报告' }
            }
        }
    },
    scatter: {
        type: 'scatter',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: '汽车速度与制动距离的关系' }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    },
    radar: {
        type: 'radar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: '多维度人员能力评估' }
            }
        }
    }
};

// 默认组件配置
const defaultWidgets = [
    { id: 'widget1', type: 'line', title: '温度趋势图表' },
    { id: 'widget2', type: 'bar', title: '销售数据图表' },
    { id: 'widget3', type: 'pie', title: '消费比例图表' },
    { id: 'widget4', type: 'radar', title: '能力评估图表' }
];

// 移动端触摸优化
let touchStartX = 0;
let touchStartY = 0;

// 检测触摸设备
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    console.log('增强型仪表板初始化中...');
    
    // 检测设备类型
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        console.log('检测到触摸设备，已启用触摸优化');
    }
    
    // 初始化导航
    initializeNavigation();
    
    // 初始化拖拽功能（触摸设备优化）
    initializeDragAndDrop();
    
    // 初始化仪表板
    initializeDashboard();
    
    // 开始实时数据更新
    startLiveStats();
    
    // 移动端手势支持
    initializeTouchGestures();
    
    console.log('仪表板初始化完成');
});

// 初始化触摸手势
function initializeTouchGestures() {
    const dashboardGrid = document.getElementById('dashboardGrid');
    
    if (isTouchDevice()) {
        // 长按菜单
        dashboardGrid.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            
            const target = e.target.closest('.chart-widget');
            if (target) {
                target._touchTimer = setTimeout(() => {
                    showTouchMenu(target, e.touches[0].clientX, e.touches[0].clientY);
                }, 800);
            }
        });
        
        dashboardGrid.addEventListener('touchend', function(e) {
            const target = e.target.closest('.chart-widget');
            if (target && target._touchTimer) {
                clearTimeout(target._touchTimer);
            }
        });
        
        // 滑动切换
        let touchEndX = 0;
        let touchEndY = 0;
        
        dashboardGrid.addEventListener('touchmove', function(e) {
            touchEndX = e.touches[0].clientX;
            touchEndY = e.touches[0].clientY;
        });
        
        dashboardGrid.addEventListener('touchend', function(e) {
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            // 检测水平滑动
            if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) {
                    // 向右滑动
                    console.log('向右滑动');
                } else {
                    // 向左滑动
                    console.log('向左滑动');
                }
            }
        });
    }
}

// 显示触摸菜单
function showTouchMenu(widget, x, y) {
    // 移除现有菜单
    const existingMenu = document.querySelector('.touch-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    const menu = document.createElement('div');
    menu.className = 'touch-menu';
    menu.style.cssText = `
        position: fixed;
        left: ${Math.min(x, window.innerWidth - 200)}px;
        top: ${Math.min(y, window.innerHeight - 200)}px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        padding: 10px;
        min-width: 150px;
    `;
    
    menu.innerHTML = `
        <div class="touch-menu-item" onclick="refreshChart('${widget.id}')">
            🔄 刷新
        </div>
        <div class="touch-menu-item" onclick="fullscreenChart('${widget.id}')">
            📺 全屏
        </div>
        <div class="touch-menu-item" onclick="removeWidget('${widget.id}')">
            ❌ 删除
        </div>
        <div class="touch-menu-item" onclick="closeTouchMenu()">
            取消
        </div>
    `;
    
    document.body.appendChild(menu);
    
    // 点击外部关闭菜单
    setTimeout(() => {
        document.addEventListener('click', closeTouchMenu, { once: true });
    }, 100);
}

// 关闭触摸菜单
function closeTouchMenu() {
    const menu = document.querySelector('.touch-menu');
    if (menu) {
        menu.remove();
    }
}

// 导航功能
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            
            // 更新导航状态
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 隐藏汉堡菜单（移动端）
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // 显示对应部分（简单实现）
            alert(`导航到: ${targetSection} - 功能开发中`);
        });
    });
}

// 初始化拖拽功能
function initializeDragAndDrop() {
    const dashboardGrid = document.getElementById('dashboardGrid');
    
    Sortable.create(dashboardGrid, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        onEnd: function(evt) {
            console.log('组件位置已更新');
            saveLayout();
        }
    });
}

// 初始化仪表板
function initializeDashboard() {
    const dashboardGrid = document.getElementById('dashboardGrid');
    
    // 加载布局
    loadLayout();
    
    // 创建默认组件
    defaultWidgets.forEach(widget => {
        createChartWidget(widget.id, widget.type, widget.title);
    });
}

// 创建图表组件
function createChartWidget(widgetId, chartType, title) {
    const dashboardGrid = document.getElementById('dashboardGrid');
    
    const widget = document.createElement('div');
    widget.className = 'chart-widget';
    widget.id = widgetId;
    
    widget.innerHTML = `
        <div class="widget-header">
            <h3 class="widget-title">${title}</h3>
            <div class="widget-actions">
                <button class="widget-btn" onclick="refreshChart('${widgetId}')" title="刷新">🔄</button>
                <button class="widget-btn" onclick="removeWidget('${widgetId}')" title="删除">❌</button>
                <button class="widget-btn" onclick="fullscreenChart('${widgetId}')" title="全屏">📺</button>
            </div>
        </div>
        <div class="chart-container">
            <canvas id="${widgetId}Canvas"></canvas>
        </div>
        <div class="widget-footer">
            <small>最后更新: ${new Date().toLocaleTimeString()}</small>
        </div>
    `;
    
    dashboardGrid.appendChild(widget);
    
    // 延迟渲染图表，确保DOM已加载
    setTimeout(() => {
        renderChart(widgetId, chartType);
    }, 100);
}

// 渲染图表
function renderChart(widgetId, chartType) {
    const canvas = document.getElementById(`${widgetId}Canvas`);
    if (!canvas) {
        console.error(`Canvas not found for widget: ${widgetId}`);
        return;
    }
    
    // 销毁现有图表
    if (currentCharts[widgetId]) {
        currentCharts[widgetId].destroy();
    }
    
    const config = chartConfigs[chartType];
    if (!config) {
        console.error(`Chart config not found for type: ${chartType}`);
        return;
    }
    
    // 复制数据以避免修改原始数据
    const data = JSON.parse(JSON.stringify(datasets[chartType]));
    
    try {
        currentCharts[widgetId] = new Chart(canvas, {
            type: config.type,
            data: data,
            options: {
                ...config.options,
                onClick: function(event, elements) {
                    if (elements.length > 0) {
                        const element = elements[0];
                        const dataset = this.data.datasets[element.datasetIndex];
                        const label = this.data.labels ? this.data.labels[element.index] : null;
                        
                        // 数据钻取功能
                        if (dataset.metadata && dataset.metadata.drilldown && dataset.metadata.drilldown[label]) {
                            drilldownData(this, element.datasetIndex, label);
                        }
                    }
                }
            }
        });
        
        console.log(`图表渲染成功: ${widgetId} - ${chartType}`);
    } catch (error) {
        console.error(`图表渲染失败: ${widgetId}`, error);
    }
}

// 更新图表类型
function updateChart() {
    const chartType = document.getElementById('chartType').value;
    
    // 更新所有组件（简单实现，实际中应该选择性地更新）
    Object.keys(currentCharts).forEach(widgetId => {
        renderChart(widgetId, chartType);
    });
}

// 实时数据统计
function startLiveStats() {
    setInterval(() => {
        // 模拟实时数据更新
        const users = Math.floor(Math.random() * 1000) + 1000;
        const sales = Math.floor(Math.random() * 50000) + 20000;
        const conversion = (Math.random() * 2 + 2).toFixed(1);
        const response = Math.floor(Math.random() * 100) + 100;
        
        document.getElementById('liveUsers').textContent = users.toLocaleString();
        document.getElementById('liveSales').textContent = '¥' + sales.toLocaleString();
        document.getElementById('liveConversion').textContent = conversion + '%';
        document.getElementById('liveResponse').textContent = response + 'ms';
        
        // 添加动画效果
        animateStatUpdate();
    }, 2000);
}

// 动画效果
function animateStatUpdate() {
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        stat.style.transform = 'scale(1.1)';
        setTimeout(() => {
            stat.style.transform = 'scale(1)';
        }, 200);
    });
}

// 开始实时更新
function startLiveUpdate() {
    if (liveUpdateInterval) {
        clearInterval(liveUpdateInterval);
    }
    
    liveUpdateInterval = setInterval(() => {
        randomizeData();
        console.log('实时数据已更新');
    }, 3000);
    
    alert('实时数据更新已启动');
}

// 随机化数据
function randomizeData() {
    Object.keys(currentCharts).forEach(widgetId => {
        const chart = currentCharts[widgetId];
        if (chart && chart.data && chart.data.datasets) {
            chart.data.datasets.forEach(dataset => {
                if (dataset.data && Array.isArray(dataset.data)) {
                    dataset.data = dataset.data.map(() => 
                        Math.floor(Math.random() * 100) + 1
                    );
                }
            });
            chart.update('active');
        }
    });
    
    // 更新组件时间戳
    document.querySelectorAll('.widget-footer small').forEach(footer => {
        footer.textContent = `最后更新: ${new Date().toLocaleTimeString()}`;
    });
}

// 应用筛选器
function applyFilters() {
    const timeRange = document.getElementById('timeRange').value;
    const dataDimension = document.getElementById('dataDimension').value;
    
    console.log(`应用筛选器 - 时间范围: ${timeRange}, 数据维度: ${dataDimension}`);
    
    // 应用筛选逻辑到所有图表
    Object.keys(currentCharts).forEach(widgetId => {
        const chart = currentCharts[widgetId];
        if (chart && chart.data) {
            // 基于时间范围筛选数据
            const filteredData = filterDataByTimeRange(chart.data, timeRange);
            
            // 基于数据维度筛选
            const dimensionData = filterDataByDimension(filteredData, dataDimension);
            
            // 更新图表数据
            chart.data = dimensionData;
            chart.update();
        }
    });
    
    showFilterNotification(`筛选条件已应用: ${getTimeRangeLabel(timeRange)} - ${getDimensionLabel(dataDimension)}`);
}

// 根据时间范围筛选数据
function filterDataByTimeRange(data, timeRange) {
    const filteredData = JSON.parse(JSON.stringify(data));
    
    switch (timeRange) {
        case 'today':
            // 今日数据 - 显示最近24小时
            if (filteredData.labels && filteredData.labels.length > 0) {
                filteredData.labels = filteredData.labels.slice(-24);
                filteredData.datasets.forEach(dataset => {
                    if (dataset.data) {
                        dataset.data = dataset.data.slice(-24);
                    }
                });
            }
            break;
        case 'week':
            // 本周数据 - 显示最近7天
            if (filteredData.labels && filteredData.labels.length > 0) {
                filteredData.labels = filteredData.labels.slice(-7);
                filteredData.datasets.forEach(dataset => {
                    if (dataset.data) {
                        dataset.data = dataset.data.slice(-7);
                    }
                });
            }
            break;
        case 'month':
            // 本月数据 - 显示最近30天
            if (filteredData.labels && filteredData.labels.length > 0) {
                filteredData.labels = filteredData.labels.slice(-30);
                filteredData.datasets.forEach(dataset => {
                    if (dataset.data) {
                        dataset.data = dataset.data.slice(-30);
                    }
                });
            }
            break;
        case 'quarter':
            // 本季度数据 - 显示最近90天
            if (filteredData.labels && filteredData.labels.length > 0) {
                filteredData.labels = filteredData.labels.slice(-90);
                filteredData.datasets.forEach(dataset => {
                    if (dataset.data) {
                        dataset.data = dataset.data.slice(-90);
                    }
                });
            }
            break;
        // 'year' 和默认情况显示所有数据
        default:
            break;
    }
    
    return filteredData;
}

// 根据数据维度筛选数据
function filterDataByDimension(data, dimension) {
    const filteredData = JSON.parse(JSON.stringify(data));
    
    // 这里可以根据具体业务需求实现维度筛选
    // 例如：只显示特定数据集或调整数据格式
    
    return filteredData;
}

// 获取时间范围标签
function getTimeRangeLabel(timeRange) {
    const labels = {
        'today': '今日',
        'week': '本周',
        'month': '本月',
        'quarter': '本季度',
        'year': '本年'
    };
    return labels[timeRange] || '全部时间';
}

// 获取数据维度标签
function getDimensionLabel(dimension) {
    const labels = {
        'sales': '销售额',
        'users': '用户数',
        'conversion': '转化率',
        'revenue': '收入'
    };
    return labels[dimension] || '所有维度';
}

// 显示筛选通知
function showFilterNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// 数据钻取功能
function enableChartDrilldown() {
    Object.keys(currentCharts).forEach(widgetId => {
        const chart = currentCharts[widgetId];
        if (chart) {
            // 移除现有的事件监听器
            chart.canvas.removeEventListener('click', chart._drilldownHandler);
            
            // 添加新的点击事件监听器
            chart._drilldownHandler = function(event) {
                const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
                if (points.length > 0) {
                    const firstPoint = points[0];
                    const datasetIndex = firstPoint.datasetIndex;
                    const index = firstPoint.index;
                    
                    // 获取图表数据
                    const dataset = chart.data.datasets[datasetIndex];
                    const label = chart.data.labels ? chart.data.labels[index] : null;
                    
                    // 检查是否有钻取数据
                    if (dataset.metadata && dataset.metadata.drilldown && dataset.metadata.drilldown[label]) {
                        drilldownData(chart, datasetIndex, label);
                    }
                }
            };
            
            chart.canvas.addEventListener('click', chart._drilldownHandler);
        }
    });
}

// 执行数据钻取
function drilldownData(chart, datasetIndex, label) {
    const dataset = chart.data.datasets[datasetIndex];
    const drilldownData = dataset.metadata.drilldown[label];
    
    if (drilldownData) {
        // 保存原始数据以便返回
        chart._originalData = JSON.parse(JSON.stringify(chart.data));
        
        // 更新图表显示钻取数据
        chart.data.labels = drilldownData.labels || drilldownData;
        chart.data.datasets = [{
            label: `${label} - 详细数据`,
            data: drilldownData.data || drilldownData,
            backgroundColor: '#4CAF50',
            borderColor: '#388E3C',
            borderWidth: 2
        }];
        
        chart.update();
        
        // 添加返回按钮
        addBackButton(chart);
        
        showFilterNotification(`已钻取到: ${label}`);
    }
}

// 添加返回按钮
function addBackButton(chart) {
    // 移除现有的返回按钮
    if (chart._backButton) {
        chart._backButton.remove();
    }
    
    // 创建返回按钮
    const backButton = document.createElement('button');
    backButton.textContent = '← 返回上一级';
    backButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: #2196F3;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 100;
        font-size: 12px;
    `;
    
    backButton.onclick = function() {
        if (chart._originalData) {
            chart.data = chart._originalData;
            chart.update();
            backButton.remove();
            chart._backButton = null;
            showFilterNotification('已返回上一级');
        }
    };
    
    // 将按钮添加到图表容器
    const chartContainer = chart.canvas.parentNode;
    chartContainer.style.position = 'relative';
    chartContainer.appendChild(backButton);
    chart._backButton = backButton;
}

// 切换自动刷新
function toggleAutoRefresh() {
    const autoRefresh = document.getElementById('autoRefresh').value;
    
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    if (autoRefresh !== 'off') {
        const interval = getIntervalFromValue(autoRefresh);
        autoRefreshInterval = setInterval(() => {
            randomizeData();
            console.log('自动刷新数据');
        }, interval);
        
        console.log(`自动刷新已启动: ${autoRefresh}`);
    } else {
        console.log('自动刷新已关闭');
    }
}

// 获取时间间隔
function getIntervalFromValue(value) {
    switch (value) {
        case '5s': return 5000;
        case '30s': return 30000;
        case '1m': return 60000;
        default: return 0;
    }
}

// 刷新单个图表
function refreshChart(widgetId) {
    if (currentCharts[widgetId]) {
        const chart = currentCharts[widgetId];
        const chartType = Object.keys(chartConfigs).find(type => 
            chartConfigs[type].type === chart.config.type
        );
        
        if (chartType) {
            renderChart(widgetId, chartType);
        }
    }
}

// 移除组件
function removeWidget(widgetId) {
    if (confirm('确定要删除这个组件吗？')) {
        const widget = document.getElementById(widgetId);
        if (widget) {
            widget.remove();
            
            if (currentCharts[widgetId]) {
                currentCharts[widgetId].destroy();
                delete currentCharts[widgetId];
            }
            
            saveLayout();
        }
    }
}

// 全屏显示图表
function fullscreenChart(widgetId) {
    const widget = document.getElementById(widgetId);
    if (widget) {
        if (!document.fullscreenElement) {
            widget.requestFullscreen().catch(err => {
                console.error(`全屏请求失败: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// 重置布局
function resetLayout() {
    if (confirm('确定要重置仪表板布局吗？所有自定义设置将丢失。')) {
        const dashboardGrid = document.getElementById('dashboardGrid');
        dashboardGrid.innerHTML = '';
        
        // 销毁所有图表
        Object.keys(currentCharts).forEach(widgetId => {
            if (currentCharts[widgetId]) {
                currentCharts[widgetId].destroy();
            }
        });
        currentCharts = {};
        
        // 重新创建默认组件
        initializeDashboard();
        
        localStorage.removeItem('dashboardLayout');
        alert('布局已重置');
    }
}

// 保存布局
function saveLayout() {
    const widgets = document.querySelectorAll('.chart-widget');
    dashboardLayout = Array.from(widgets).map(widget => ({
        id: widget.id,
        type: getChartTypeFromWidget(widget)
    }));
    
    localStorage.setItem('dashboardLayout', JSON.stringify(dashboardLayout));
}

// 加载布局
function loadLayout() {
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
        try {
            dashboardLayout = JSON.parse(savedLayout);
            
            // 根据保存的布局创建组件
            dashboardLayout.forEach(widget => {
                createChartWidget(widget.id, widget.type, `${widget.type}图表`);
            });
        } catch (error) {
            console.error('布局加载失败:', error);
        }
    }
}

// 获取组件图表类型
function getChartTypeFromWidget(widget) {
    const canvas = widget.querySelector('canvas');
    if (canvas && canvas.id) {
        const widgetId = canvas.id.replace('Canvas', '');
        const chart = currentCharts[widgetId];
        if (chart) {
            return Object.keys(chartConfigs).find(type => 
                chartConfigs[type].type === chart.config.type
            );
        }
    }
    return 'line'; // 默认类型
}

// 导出报告
function exportDashboard() {
    // 创建报告数据
    const reportData = {
        timestamp: new Date().toISOString(),
        layout: dashboardLayout,
        stats: {
            users: document.getElementById('liveUsers').textContent,
            sales: document.getElementById('liveSales').textContent,
            conversion: document.getElementById('liveConversion').textContent,
            response: document.getElementById('liveResponse').textContent
        }
    };
    
    // 创建下载链接
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `dashboard-report-${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    alert('报告已导出');
}

// 模态框功能
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 窗口大小变化处理
window.addEventListener('resize', function() {
    Object.keys(currentCharts).forEach(widgetId => {
        if (currentCharts[widgetId]) {
            currentCharts[widgetId].resize();
        }
    });
});

// 触摸设备支持
document.addEventListener('touchstart', function() {}, {passive: true});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // 退出全屏
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('全局错误:', e.error);
});

console.log('增强型仪表板JavaScript已加载');