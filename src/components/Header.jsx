import React from 'react'
import { BarChart3, Download, Settings } from 'lucide-react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand">
          <BarChart3 className="header-icon" />
          <h1>数据可视化仪表板</h1>
        </div>
        
        <div className="header-actions">
          <button className="header-btn">
            <Download size={18} />
            <span>导出数据</span>
          </button>
          
          <button className="header-btn">
            <Settings size={18} />
            <span>设置</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header