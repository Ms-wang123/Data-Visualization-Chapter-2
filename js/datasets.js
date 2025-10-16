// 示例数据集
const datasets = {
    line: {
        labels: ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
        datasets: [
            {
                label: '最高气温',
                data: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31],
                borderColor: '#ff6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1
            },
            {
                label: '最低气温',
                data: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16],
                borderColor: '#36a2eb',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.1
            }
        ]
    },
    bar: {
        labels: ['FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017', 'FY2018', 'FY2019'],
        datasets: [
            {
                label: '阿里巴巴GMV(亿元)',
                data: [10770, 16780, 24440, 30920, 37670, 48200, 57270],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    },
    horizontalBar: {
        labels: ['家政服务', '飞机票', '家具', '手机', '计算机', '汽车用品', '通信充值', '个人护理', '书报杂志', '餐饮旅游'],
        datasets: [
            {
                label: '网购替代率',
                data: [0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 0.860, 0.856],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
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
                fill: true
            },
            {
                label: '公司B',
                data: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: true
            },
            {
                label: '公司C',
                data: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                fill: true
            }
        ]
    },
    histogram: {
        labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
        datasets: [
            {
                label: '分数分布',
                data: [5, 8, 12, 15, 20, 15, 12, 8, 3, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
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
                borderWidth: 2
            }
        ]
    },
    scatter: {
        datasets: [
            {
                label: '汽车速度与制动距离',
                data: [
                    { x: 10, y: 0.5, r: 5 },
                    { x: 20, y: 2.0, r: 5 },
                    { x: 30, y: 4.4, r: 5 },
                    { x: 40, y: 7.9, r: 5 },
                    { x: 50, y: 12.3, r: 5 },
                    { x: 60, y: 17.7, r: 6 },
                    { x: 70, y: 24.1, r: 6 },
                    { x: 80, y: 31.5, r: 6 },
                    { x: 90, y: 39.9, r: 7 },
                    { x: 100, y: 49.2, r: 7 },
                    { x: 110, y: 59.5, r: 7 },
                    { x: 120, y: 70.8, r: 8 },
                    { x: 130, y: 83.1, r: 8 },
                    { x: 140, y: 96.4, r: 8 },
                    { x: 150, y: 110.7, r: 9 },
                    { x: 160, y: 126.0, r: 9 },
                    { x: 170, y: 142.2, r: 9 },
                    { x: 180, y: 159.4, r: 10 },
                    { x: 190, y: 177.6, r: 10 },
                    { x: 200, y: 196.8, r: 10 }
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
            }
        ]
    },
    boxplot: {
        labels: ['2018年', '2017年'],
        datasets: [
            {
                label: '全国发电量统计',
                data: [
                    {
                        min: 5107.8,
                        q1: 5254.5,
                        median: 5443.3,
                        q3: 5550.6,
                        max: 6404.9,
                        outliers: []
                    },
                    {
                        min: 4605.2,
                        q1: 4767.2,
                        median: 5168.9,
                        q3: 5219.6,
                        max: 6047.4,
                        outliers: []
                    }
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
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
    },
    errorbar: {
        labels: ['春季', '夏季', '秋季'],
        datasets: [
            {
                label: '树种A',
                data: [2.04, 1.57, 1.63],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                errorBars: {
                    '0': { plus: 0.16, minus: 0.16 },
                    '1': { plus: 0.08, minus: 0.08 },
                    '2': { plus: 0.10, minus: 0.10 }
                }
            },
            {
                label: '树种B',
                data: [1.69, 1.61, 1.64],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                errorBars: {
                    '0': { plus: 0.27, minus: 0.27 },
                    '1': { plus: 0.14, minus: 0.14 },
                    '2': { plus: 0.14, minus: 0.14 }
                }
            }
        ]
    }
};