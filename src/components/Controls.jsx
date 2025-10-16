import React from 'react'
import { Search, Filter, Download } from 'lucide-react'
import './Controls.css'

const Controls = ({
  currentChartType,
  onChartTypeChange,
  sortBy,
  onSortChange,
  filterValue,
  onFilterChange,
  chartRef
}) => {
  const chartTypes = [
    { value: 'line', label: '折线图', description: '显示数据趋势' },
    { value: 'bar', label: '柱状图', description: '比较分类数据' },
    { value: 'pie', label: '饼图', description: '显示比例分布' },
    { value: 'scatter', label: '散点图', description: '分析变量关系' },
    { value: 'radar', label: '雷达图', description: '多维度评估' },
    { value: 'area', label: '面积图', description: '累积效果展示' }
  ]

  const sortOptions = [
    { value: 'default', label: '默认排序' },
    { value: 'asc', label: '升序排序' },
    { value: 'desc', label: '降序排序' }
  ]

  const handleDownload = () => {
    if (chartRef.current) {
      const image = chartRef.current.toBase64Image()
      const link = document.createElement('a')
      link.download = `chart-${currentChartType}-${Date.now()}.png`
      link.href = image
      link.click()
    }
  }

  return (
    <div className="controls">
      <div className="controls-section">
        <h3>图表类型</h3>
        <div className="chart-type-grid">
          {chartTypes.map(type => (
            <button
              key={type.value}
              className={`chart-type-btn ${currentChartType === type.value ? 'active' : ''}`}
              onClick={() => onChartTypeChange(type.value)}
              title={type.description}
            >
              <span className="chart-type-label">{type.label}</span>
              <span className="chart-type-desc">{type.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="controls-section">
        <h3>数据控制</h3>
        <div className="data-controls">
          <div className="control-group">
            <label htmlFor="search">
              <Search size={16} />
              <span>筛选数据</span>
            </label>
            <input
              id="search"
              type="text"
              placeholder="输入关键词筛选..."
              value={filterValue}
              onChange={(e) => onFilterChange(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="control-group">
            <label htmlFor="sort">
              <Filter size={16} />
              <span>排序方式</span>
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button className="download-btn" onClick={handleDownload}>
            <Download size={16} />
            <span>下载图表</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Controls