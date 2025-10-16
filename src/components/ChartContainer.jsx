import React, { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import './ChartContainer.css'

// 注册Chart.js组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

const ChartContainer = ({ chartType, data, options, chartRef }) => {
  const chartInstance = useRef(null)

  useEffect(() => {
    // 图表类型变化时重置图表
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }
  }, [chartType])

  const getChartComponent = () => {
    const chartProps = {
      ref: (node) => {
        chartRef.current = node
        chartInstance.current = node
      },
      data: data,
      options: {
        ...options,
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          intersect: false
        },
        plugins: {
          ...options?.plugins,
          tooltip: {
            ...options?.plugins?.tooltip,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || ''
                if (label) {
                  label += ': '
                }
                if (context.parsed.y !== undefined) {
                  label += context.parsed.y
                } else if (context.parsed !== undefined) {
                  label += context.parsed
                }
                return label
              }
            }
          }
        },
        onHover: (event, elements) => {
          if (event.native) {
            const canvas = event.native.target
            canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default'
          }
        }
      }
    }

    switch (chartType) {
      case 'line':
        return <Chart type="line" {...chartProps} />
      case 'bar':
        return <Chart type="bar" {...chartProps} />
      case 'pie':
        return <Chart type="pie" {...chartProps} />
      case 'scatter':
        return <Chart type="scatter" {...chartProps} />
      case 'radar':
        return <Chart type="radar" {...chartProps} />
      case 'area':
        return <Chart 
          type="line" 
          {...chartProps}
          options={{
            ...chartProps.options,
            elements: {
              line: {
                tension: 0.4,
                fill: true
              }
            }
          }}
        />
      default:
        return <Chart type="line" {...chartProps} />
    }
  }

  if (!data || !data.datasets || data.datasets.length === 0) {
    return (
      <div className="chart-container error">
        <div className="error-content">
          <h3>数据加载失败</h3>
          <p>请检查数据配置或刷新页面</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        {getChartComponent()}
      </div>
      
      <div className="chart-info">
        <h3 className="chart-title">
          {options?.plugins?.title?.text || '数据可视化图表'}
        </h3>
        <p className="chart-description">
          {getChartDescription(chartType)}
        </p>
      </div>
    </div>
  )
}

const getChartDescription = (chartType) => {
  const descriptions = {
    line: '显示数据随时间或其他连续变量的变化趋势',
    bar: '比较不同类别的数据值，直观显示差异',
    pie: '展示各部分占整体的比例关系',
    scatter: '研究两个变量之间的相关性',
    radar: '多维度数据比较分析',
    area: '强调数据随时间变化的累积效应'
  }
  
  return descriptions[chartType] || '交互式数据可视化图表'
}

export default ChartContainer