// 工具函数

// 获取X轴标题
export function getXAxisTitle(chartType) {
    const titles = {
        'line': '日期',
        'bar': '财年',
        'horizontalBar': '替代率',
        'area': '月份',
        'histogram': '分数区间',
        'scatter': '速度 (km/h)',
        'boxplot': '年份',
        'errorbar': '季节'
    };
    return titles[chartType] || '';
}

// 获取Y轴标题
export function getYAxisTitle(chartType) {
    const titles = {
        'line': '温度 (°C)',
        'bar': 'GMV (亿元)',
        'horizontalBar': '商品类别',
        'area': '物流费用 (万元)',
        'histogram': '频数',
        'scatter': '制动距离 (m)',
        'boxplot': '发电量 (亿千瓦时)',
        'errorbar': '生物量 (g/m²)'
    };
    return titles[chartType] || '';
}

// 生成随机颜色
export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 格式化数字
export function formatNumber(num, decimals = 2) {
    return Number(num).toFixed(decimals);
}

// 计算数组平均值
export function calculateAverage(arr) {
    if (!arr || arr.length === 0) return 0;
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
}

// 计算数组中位数
export function calculateMedian(arr) {
    if (!arr || arr.length === 0) return 0;
    
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
        return sorted[mid];
    }
}

// 计算四分位数
export function calculateQuartiles(arr) {
    if (!arr || arr.length === 0) return { q1: 0, median: 0, q3: 0 };
    
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    const median = calculateMedian(sorted);
    const lowerHalf = sorted.slice(0, mid);
    const upperHalf = sorted.length % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
    
    return {
        q1: calculateMedian(lowerHalf),
        median: median,
        q3: calculateMedian(upperHalf)
    };
}

// 计算标准差
export function calculateStandardDeviation(arr) {
    if (!arr || arr.length <= 1) return 0;
    
    const mean = calculateAverage(arr);
    const squaredDiffs = arr.map(value => Math.pow(value - mean, 2));
    const variance = calculateAverage(squaredDiffs);
    
    return Math.sqrt(variance);
}

// 生成随机数据
export function generateRandomData(length, min, max) {
    const data = [];
    for (let i = 0; i < length; i++) {
        data.push(Math.random() * (max - min) + min);
    }
    return data;
}

// 下载数据为CSV
export function downloadCSV(data, filename) {
    if (!data || !data.length) return;
    
    // 获取所有可能的列
    const allColumns = new Set();
    data.forEach(row => {
        Object.keys(row).forEach(key => allColumns.add(key));
    });
    
    const columns = Array.from(allColumns);
    
    // 创建CSV内容
    let csvContent = columns.join(',') + '\n';
    
    data.forEach(row => {
        const rowValues = columns.map(column => {
            const value = row[column] !== undefined ? row[column] : '';
            // 如果值包含逗号、引号或换行符，则用引号括起来
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        });
        csvContent += rowValues.join(',') + '\n';
    });
    
    // 创建Blob并下载
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename || 'data.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 解析CSV数据
export function parseCSV(csvText) {
    if (!csvText) return [];
    
    const lines = csvText.split('\n');
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',');
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',');
        const row = {};
        
        headers.forEach((header, index) => {
            let value = values[index] || '';
            
            // 尝试将数字字符串转换为数字
            if (!isNaN(value) && value.trim() !== '') {
                value = parseFloat(value);
            }
            
            row[header] = value;
        });
        
        data.push(row);
    }
    
    return data;
}

// 防抖函数
export function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// 节流函数
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 深拷贝对象
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }
    
    if (obj instanceof Object) {
        const copy = {};
        Object.keys(obj).forEach(key => {
            copy[key] = deepClone(obj[key]);
        });
        return copy;
    }
    
    return obj;
}