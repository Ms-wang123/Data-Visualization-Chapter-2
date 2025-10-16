// 模拟数据 - 基于第2章.ipynb的可视化数据
export const chartData = {
  line: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: '最高气温',
        data: [32, 33, 34, 34, 33, 31],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: '最低气温',
        data: [19, 19, 20, 22, 22, 21],
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  },
  
  bar: {
    labels: ['FY2013', 'FY2014', 'FY2015', 'FY2016', 'FY2017', 'FY2018', 'FY2019'],
    datasets: [
      {
        label: 'GMV (亿元)',
        data: [10770, 16780, 24440, 30920, 37670, 48200, 57270],
        backgroundColor: '#667eea',
        borderColor: '#5a6fd8',
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
          '#ff6b6b', '#667eea', '#feca57', '#1dd1a1',
          '#9c88ff', '#ff9ff3', '#54a0ff', '#00d2d3'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  },
  
  scatter: {
    datasets: [
      {
        label: '速度与制动距离',
        data: [
          { x: 10, y: 0.5 }, { x: 20, y: 2.0 }, { x: 30, y: 4.4 },
          { x: 40, y: 7.9 }, { x: 50, y: 12.3 }, { x: 60, y: 17.7 },
          { x: 70, y: 24.1 }, { x: 80, y: 31.5 }, { x: 90, y: 39.9 },
          { x: 100, y: 49.2 }, { x: 110, y: 59.5 }, { x: 120, y: 70.8 },
          { x: 130, y: 83.1 }, { x: 140, y: 96.4 }, { x: 150, y: 110.7 },
          { x: 160, y: 126.0 }, { x: 170, y: 142.2 }, { x: 180, y: 159.4 },
          { x: 190, y: 177.6 }, { x: 200, y: 196.8 }
        ],
        backgroundColor: '#ff9ff3',
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  },
  
  radar: {
    labels: ['研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '传统型(C)', '现实型(R)'],
    datasets: [
      {
        label: '能力评估',
        data: [0.40, 0.85, 0.43, 0.30, 0.20, 0.34],
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        borderColor: '#ff6b6b',
        pointBackgroundColor: '#ff6b6b',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ff6b6b'
      }
    ]
  },
  
  area: {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    datasets: [
      {
        label: '物流费用A',
        data: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290],
        backgroundColor: 'rgba(102, 126, 234, 0.3)',
        borderColor: '#667eea',
        fill: true
      },
      {
        label: '物流费用B',
        data: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
        backgroundColor: 'rgba(78, 205, 196, 0.3)',
        borderColor: '#4ecdc4',
        fill: true
      },
      {
        label: '物流费用C',
        data: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288],
        backgroundColor: 'rgba(255, 107, 107, 0.3)',
        borderColor: '#ff6b6b',
        fill: true
      }
    ]
  }
};

export const chartOptions = {
  line: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '温度变化趋势'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: '温度 (°C)'
        }
      }
    }
  },
  
  bar: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '阿里巴巴GMV统计'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'GMV (亿元)'
        }
      }
    }
  },
  
  pie: {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: '支付宝月账单分布'
      }
    }
  },
  
  scatter: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '汽车速度与制动距离关系'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '速度 (km/h)'
        }
      },
      y: {
        title: {
          display: true,
          text: '制动距离 (m)'
        }
      }
    }
  },
  
  radar: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '霍兰德职业兴趣测试'
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 1
      }
    }
  },
  
  area: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '物流费用堆积面积图'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '费用 (元)'
        }
      }
    }
  }
};