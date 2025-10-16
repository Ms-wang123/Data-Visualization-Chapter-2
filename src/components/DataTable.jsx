import React, { useState } from 'react'
import { ChevronUp, ChevronDown, Filter, Download } from 'lucide-react'
import './DataTable.css'

const DataTable = ({ data, chartType }) => {
  const [sortField, setSortField] = useState('label')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  if (!data || !data.labels || !data.datasets) {
    return (
      <div className="data-table error">
        <div className="error-content">
          <h3>暂无数据</h3>
          <p>请选择有效的图表类型</p>
        </div>
      </div>
    )
  }

  // 准备表格数据
  const tableData = data.labels.map((label, index) => {
    const rowData = { label }
    data.datasets.forEach((dataset, datasetIndex) => {
      rowData[`value${datasetIndex}`] = dataset.data[index]
      rowData[`dataset${datasetIndex}`] = dataset
    })
    return rowData
  })

  // 排序功能
  const sortedData = [...tableData].sort((a, b) => {
    let aValue, bValue
    
    if (sortField === 'label') {
      aValue = a.label
      bValue = b.label
    } else {
      aValue = a[sortField]
      bValue = b[sortField]
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  // 搜索筛选
  const filteredData = sortedData.filter(row =>
    row.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleDownload = () => {
    const csvContent = [
      ['标签', ...data.datasets.map(d => d.label)].join(','),
      ...filteredData.map(row => [
        row.label,
        ...data.datasets.map((_, index) => row[`value${index}`])
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `chart-data-${chartType}-${Date.now()}.csv`
    link.click()
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <Filter size={14} />
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  return (
    <div className="data-table">
      <div className="data-table-header">
        <h3>数据表格</h3>
        
        <div className="table-controls">
          <div className="search-control">
            <input
              type="text"
              placeholder="搜索数据..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button className="download-btn" onClick={handleDownload}>
            <Download size={14} />
            CSV导出
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th 
                className="sortable"
                onClick={() => handleSort('label')}
              >
                <span>标签</span>
                <SortIcon field="label" />
              </th>
              {data.datasets.map((dataset, index) => (
                <th 
                  key={index}
                  className="sortable"
                  onClick={() => handleSort(`value${index}`)}
                >
                  <span>{dataset.label}</span>
                  <SortIcon field={`value${index}`} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td className="label-cell">{row.label}</td>
                {data.datasets.map((dataset, datasetIndex) => (
                  <td key={datasetIndex} className="value-cell">
                    {row[`value${datasetIndex}`]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredData.length === 0 && (
          <div className="empty-state">
            <p>没有找到匹配的数据</p>
          </div>
        )}
      </div>
      
      <div className="data-table-footer">
        <span>显示 {filteredData.length} 条记录</span>
      </div>
    </div>
  )
}

export default DataTable