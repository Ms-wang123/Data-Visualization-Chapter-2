// 全局变量
let currentChart = null;
let liveUpdateInterval = null;
let chartData = {
    line: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4
        }]
    },
    bar: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
        datasets: [{
            label: 'Sales',
            data: [12, 19, 3, 5, 2],
            backgroundColor: '#ff6b6b'
        }]
    },
    horizontalBar: {
        labels: ['项目1', '项目2', '项目3', '项目4', '项目5'],
        datasets: [{
            label: '完成度',
            data: [85, 60, 45, 90, 75],
            backgroundColor: '#4ecdc4'
        }]
    },
    area: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
            label: '收入',
            data: [30, 45, 35, 50],
            backgroundColor: 'rgba(78, 205, 196, 0.3)',
            borderColor: '#4ecdc4',
            fill: true
        }]
    },
    histogram: {
        labels: ['0-20', '20-40', '40-60', '60-80', '80-100'],
        datasets: [{
            label: '频率',
            data: [5, 15, 30, 25, 10],
            backgroundColor: '#45b7d1'
        }]
    },
    pie: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
            data: [30, 25, 15, 20, 10],
            backgroundColor: ['#ff6b6b', '#667eea', '#feca57', '#1dd1a1', '#9c88ff']
        }]
    },
    scatter: {
        datasets: [{
            label: '数据点',
            data: [
                {x: 10, y: 20}, {x: 15, y: 35}, {x: 25, y: 45},
                {x: 30, y: 55}, {x: 40, y: 65}, {x: 50, y: 75}
            ],
            backgroundColor: '#ff9ff3'
        }]
    },
    box: {
        labels: ['数据集A', '数据集B'],
        datasets: [{
            data: [
                [10, 15, 20, 25, 30, 35, 40],
                [5, 12, 18, 22, 28, 32, 38]
            ],
            backgroundColor: 'rgba(156, 136, 255, 0.2)',
            borderColor: '#9c88ff'
        }]
    },
    radar: {
        labels: ['Skill A', 'Skill B', 'Skill C', 'Skill D', 'Skill E'],
        datasets: [{
            label: 'Ability Assessment',
            data: [65, 59, 90, 81, 56],
            backgroundColor: 'rgba(255, 107, 107, 0.2)',
            borderColor: '#ff6b6b'
        }]
    },
    error: {
        labels: ['实验1', '实验2', '实验3', '实验4'],
        datasets: [{
            label: '测量值',
            data: [20, 35, 45, 30],
            backgroundColor: '#feca57',
            error: [2, 3, 1.5, 2.5]
        }]
    }
};

const chartConfigs = {
    line: {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '折线图 - 数据趋势分析' }
            }
        }
    },
    bar: {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '柱形图 - 分类数据比较' }
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
                title: { display: true, text: '条形图 - 水平数据展示' }
            }
        }
    },
    area: {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '面积图 - 数据累积效果' }
            }
        }
    },
    histogram: {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '直方图 - 数据分布情况' }
            }
        }
    },
    pie: {
        type: 'pie',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '饼图 - 比例分布展示' }
            }
        }
    },
    scatter: {
        type: 'scatter',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '散点图 - 变量关系分析' }
            },
            scales: {
                x: { type: 'linear', position: 'bottom' }
            }
        }
    },
    box: {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '箱形图 - 数据统计摘要' }
            }
        }
    },
    radar: {
        type: 'radar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '雷达图 - 多维度评估' }
            }
        }
    },
    error: {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: '误差棒图 - 测量不确定性' }
            }
        }
    }
};

const chartDescriptions = {
    line: '折线图用于展示数据随时间或其他连续变量的变化趋势，适合分析趋势和模式。',
    bar: '柱形图适用于比较不同类别的数据值，直观显示各类别之间的差异。',
    horizontalBar: '条形图是柱形图的水平版本，特别适合类别名称较长的情况。',
    area: '面积图在折线图基础上填充区域，强调数据随时间变化的累积效应。',
    histogram: '直方图展示数据的分布情况，帮助理解数据的集中趋势和离散程度。',
    pie: '饼图显示各部分占整体的比例关系，适合展示构成比例。',
    scatter: '散点图研究两个变量之间的关系，帮助发现相关性或聚类模式。',
    box: '箱形图展示数据的五数概括（最小值、第一四分位数、中位数、第三四分位数、最大值），以及异常值。',
    radar: '雷达图用于多维度数据比较，每个维度从中心点辐射出来，形成多边形。',
    error: '误差棒图显示测量数据的不确定性范围，常用于科学实验数据展示。'
};

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    initializeNavigation();
    
    // 延迟初始化图表，确保DOM完全加载
    setTimeout(function() {
        initializeChart();
        updateDataTable();
    }, 100);
});

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
            
            // 显示对应部分
            showSection(targetSection);
        });
    });
}

function showSection(sectionId) {
    // 隐藏所有部分
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标部分
    document.getElementById(sectionId).classList.add('active');
}

// 图表功能
function initializeChart() {
    const ctx = document.getElementById('mainChart');
    if (!ctx) {
        console.error('Canvas element not found');
        return;
    }
    
    const chartType = document.getElementById('chartType').value;
    const config = chartConfigs[chartType];
    
    if (currentChart) {
        currentChart.destroy();
    }
    
    // 确保数据格式正确
    const data = JSON.parse(JSON.stringify(chartData[chartType]));
    
    try {
        currentChart = new Chart(ctx, {
            type: config.type,
            data: data,
            options: config.options
        });
        console.log('Chart initialized successfully:', chartType);
    } catch (error) {
        console.error('Error initializing chart:', error);
    }
}

function updateChart() {
    const chartType = document.getElementById('chartType').value;
    
    // 更新图表标题和描述
    document.getElementById('chartTitle').textContent = 
        document.getElementById('chartType').options[document.getElementById('chartType').selectedIndex].text;
    document.getElementById('chartDescription').textContent = chartDescriptions[chartType];
    
    // 重新初始化图表
    initializeChart();
    updateDataTable();
}

function randomizeData() {
    const chartType = document.getElementById('chartType').value;
    const data = chartData[chartType];
    
    // 随机生成新数据
    if (data.datasets[0].data && Array.isArray(data.datasets[0].data)) {
        data.datasets[0].data = data.datasets[0].data.map(() => 
            Math.floor(Math.random() * 100) + 1
        );
    }
    
    // 更新图表
    currentChart.update();
    updateDataTable();
}

function resetData() {
    const chartType = document.getElementById('chartType').value;
    
    // 重置为原始数据（这里需要重新加载原始数据）
    chartData[chartType] = JSON.parse(JSON.stringify(
        Object.values(chartData).find(d => d !== chartData[chartType]) || chartData.line
    ));
    
    // 更新图表
    currentChart.update();
    updateDataTable();
}

function updateDataTable() {
    const chartType = document.getElementById('chartType').value;
    const data = chartData[chartType];
    const tableBody = document.getElementById('tableBody');
    
    tableBody.innerHTML = '';
    
    if (data.labels && data.datasets[0].data) {
        data.labels.forEach((label, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${label}</td>
                <td>${data.datasets[0].data[index]}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// 交互功能
function showTooltip(element, type) {
    const tooltip = element.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '1';
    }
}

function hideTooltip() {
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        tooltip.style.opacity = '0';
    });
}

function toggleDetails(element) {
    const details = element.querySelector('.details');
    details.classList.toggle('active');
}

function startLiveUpdate() {
    if (liveUpdateInterval) {
        clearInterval(liveUpdateInterval);
    }
    
    const liveValue = document.getElementById('liveValue');
    liveUpdateInterval = setInterval(() => {
        const newValue = Math.floor(Math.random() * 100) + 1;
        liveValue.textContent = newValue;
        
        // 添加动画效果
        liveValue.style.transform = 'scale(1.2)';
        setTimeout(() => {
            liveValue.style.transform = 'scale(1)';
        }, 200);
    }, 1000);
}

// 响应式调整
window.addEventListener('resize', function() {
    if (currentChart) {
        currentChart.resize();
    }
});

// 添加触摸设备支持
document.addEventListener('touchstart', function() {}, {passive: true});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideTooltip();
    }
});