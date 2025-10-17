# 数据可视化仪表板

一个基于 Chart.js 的交互式数据可视化项目，展示10种不同类型的图表。

## 📊 项目简介

本项目是一个完整的数据可视化仪表板，基于第2章.ipynb的数据集，实现了10种常见的数据可视化图表类型。项目使用纯前端技术栈，支持图表切换、交互操作和图表下载功能。

## ✨ 功能特性

- **10种图表类型**：折线图、柱形图、条形图、堆积面积图、直方图、饼图、散点图、箱形图、雷达图、误差棒图
- **交互式操作**：支持图表类型切换和参数调整
- **响应式设计**：适配不同屏幕尺寸
- **图表下载**：支持将图表导出为PNG格式
- **美观界面**：现代化UI设计，渐变背景和卡片布局

## 🚀 快速开始

### 在线访问

直接打开 `complete-dashboard.html` 文件即可在浏览器中查看效果。

### 本地运行

1. 克隆项目到本地：
```bash
git clone https://github.com/Ms-wang123/Data-Visualization-1.git
```

2. 打开项目目录：
```bash
cd Data-Visualization-1
```

3. 在浏览器中打开 `complete-dashboard.html` 文件

## 📈 图表展示

### 1. 折线图 (Line Chart)
- **数据**：未来15天最高气温和最低气温
- **用途**：展示温度变化趋势
- **技术**：使用 `plot()` 函数绘制

### 2. 柱形图 (Bar Chart)
- **数据**：2013-2019财年阿里巴巴GMV
- **用途**：展示财务数据对比
- **技术**：使用 `bar()` 函数绘制

### 3. 条形图 (Horizontal Bar Chart)
- **数据**：各商品种类的网购替代率
- **用途**：横向比较不同类别数据
- **技术**：使用 `barh()` 函数绘制

### 4. 堆积面积图 (Area Chart)
- **数据**：物流公司物流费用统计
- **用途**：展示多组数据的累积变化
- **技术**：使用 `stackplot()` 函数绘制

### 5. 直方图 (Histogram)
- **数据**：人脸识别的灰度直方图
- **用途**：展示数据分布情况
- **技术**：使用 `hist()` 函数绘制

### 6. 饼图 (Pie Chart)
- **数据**：支付宝月账单报告
- **用途**：展示各部分占比关系
- **技术**：使用 `pie()` 函数绘制

### 7. 散点图 (Scatter Plot)
- **数据**：汽车速度与制动距离的关系
- **用途**：展示变量间的相关性
- **技术**：使用 `scatter()` 函数绘制

### 8. 箱形图 (Box Plot)
- **数据**：2017年和2018年全国发电量统计
- **用途**：展示数据分布的五数概括
- **技术**：使用 `boxplot()` 函数绘制

### 9. 雷达图 (Radar Chart)
- **数据**：霍兰德职业兴趣测试
- **用途**：多维度数据比较
- **技术**：多维度数据可视化

### 10. 误差棒图 (Error Bar Chart)
- **数据**：树种的细根生物量
- **用途**：展示数据的不确定性
- **技术**：使用 `errorbar()` 函数绘制

## 🛠️ 技术栈

- **前端框架**：纯HTML/CSS/JavaScript
- **图表库**：Chart.js 4.4.0
- **样式设计**：CSS3渐变、Flexbox布局
- **交互功能**：原生JavaScript事件处理

## 📁 项目结构

```
Data-Visualization-1/
├── complete-dashboard.html    # 主仪表板文件
├── index.html                 # 项目首页
├── README.md                  # 项目说明文档
├── .nojekyll                  # GitHub Pages配置
├── js/                        # JavaScript模块
│   ├── app.js                # 应用主逻辑
│   ├── chartRenderers.js     # 图表渲染器
│   ├── datasets.js           # 数据集定义
│   └── utils.js              # 工具函数
├── src/                       # 源代码目录
│   └── components/           # React组件（可选）
├── charts/                    # 单个图表文件
└── advanced-platform/        # 高级平台功能
```

## 🎯 使用说明

1. **选择图表类型**：使用下拉菜单选择要查看的图表类型
2. **查看图表说明**：每个图表都有详细的说明文字
3. **下载图表**：点击"下载图表"按钮保存当前图表为PNG格式
4. **交互操作**：鼠标悬停可查看详细数据，点击图例可切换数据系列显示

## 🌐 部署说明

### GitHub Pages 部署

1. 确保项目包含 `.nojekyll` 文件
2. 在GitHub仓库设置中启用GitHub Pages
3. 选择主分支作为发布源

### 本地服务器部署

```bash
# 使用Python简单服务器
python -m http.server 8000

# 或使用Node.js http-server
npx http-server
```

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 项目主页：https://github.com/Ms-wang123/Data-Visualization-1
- 问题反馈：请通过GitHub Issues提交

## 🙏 致谢

- 感谢 Chart.js 团队提供的优秀图表库
- 感谢所有为项目做出贡献的开发者

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！