import React, { useState, useRef } from 'react'
import Header from './components/Header'
import ChartContainer from './components/ChartContainer'
import Controls from './components/Controls'
import DataTable from './components/DataTable'
import { chartData, chartOptions } from './data/chartData'
import './App.css'

function App() {
  const [currentChartType, setCurrentChartType] = useState('line')
  const [sortBy, setSortBy] = useState('default')
  const [filterValue, setFilterValue] = useState('')
  const chartRef = useRef(null)

  const currentData = chartData[currentChartType]
  const currentOptions = chartOptions[currentChartType]

  // 数据处理函数
  const processData = () => {
    if (!currentData?.datasets?.[0]?.data) return currentData
    
    const data = JSON.parse(JSON.stringify(currentData))
    
    // 排序功能
    if (sortBy !== 'default' && data.labels) {
      const indices = data.labels.map((_, index) => index)
      
      indices.sort((a, b) => {
        const valueA = data.datasets[0].data[a]
        const valueB = data.datasets[0].data[b]
        
        if (sortBy === 'asc') return valueA - valueB
        if (sortBy === 'desc') return valueB - valueA
        return 0
      })
      
      data.labels = indices.map(i => data.labels[i])
      data.datasets = data.datasets.map(dataset => ({
        ...dataset,
        data: indices.map(i => dataset.data[i])
      }))
    }
    
    // 筛选功能
    if (filterValue && data.labels) {
      const filteredIndices = data.labels
        .map((label, index) => ({ label, index }))
        .filter(({ label }) => 
          label.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map(({ index }) => index)
      
      data.labels = filteredIndices.map(i => data.labels[i])
      data.datasets = data.datasets.map(dataset => ({
        ...dataset,
        data: filteredIndices.map(i => dataset.data[i])
      }))
    }
    
    return data
  }

  const processedData = processData()

  return (
    <div className="app">
      <Header />
      
      <div className="app-content">
        <Controls
          currentChartType={currentChartType}
          onChartTypeChange={setCurrentChartType}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          chartRef={chartRef}
        />
        
        <div className="chart-section">
          <ChartContainer
            chartType={currentChartType}
            data={processedData}
            options={currentOptions}
            chartRef={chartRef}
          />
          
          <DataTable 
            data={processedData}
            chartType={currentChartType}
          />
        </div>
      </div>
    </div>
  )
}

export default App