# GitHub上传指南 - 数据可视化项目

由于Git安装遇到问题，以下是几种替代方案来上传您的项目到GitHub。

## 方案1：使用GitHub Desktop（推荐）

### 步骤：
1. **下载GitHub Desktop**
   - 访问 https://desktop.github.com/
   - 下载并安装GitHub Desktop

2. **配置GitHub Desktop**
   - 打开GitHub Desktop
   - 登录您的GitHub账户
   - 点击"File" → "Add Local Repository"
   - 选择您的桌面文件夹（C:\Users\30528\Desktop）
   - 点击"Add Repository"

3. **提交和推送**
   - 在GitHub Desktop中，您会看到所有更改的文件
   - 填写提交信息："初始提交: 数据可视化仪表板项目"
   - 点击"Commit to main"
   - 点击"Push origin"将代码推送到GitHub

## 方案2：使用网页版GitHub上传

### 步骤：
1. **访问GitHub仓库**
   - 打开 https://github.com/Ms-wang123/Data-Visualization-1
   - 如果仓库不存在，先创建新仓库

2. **上传文件**
   - 点击"Add file" → "Upload files"
   - 将桌面上的以下文件拖拽到上传区域：
     - complete-dashboard.html
     - complete-dashboard.js
     - README.md
     - index.html
     - simple-dashboard.html
     - styles.css
     - script.js
     - main.js
     - package.json
     - vite.config.js
     - server.js
     - 404.html
     - test.html
     - test_output.html
     - js/ 文件夹（包含所有JavaScript文件）
     - charts/ 文件夹（包含所有图表组件）
     - src/ 文件夹（包含源代码）

3. **提交更改**
   - 填写提交信息："初始提交: 数据可视化仪表板项目"
   - 点击"Commit changes"

## 方案3：修复Git安装后使用命令行

### 检查Git安装：
1. 重新启动PowerShell
2. 运行 `git --version` 检查是否正常工作
3. 如果仍然不行，重新安装Git：
   - 访问 https://git-scm.com/download/win
   - 下载最新版Git for Windows
   - 安装时选择"Use Git from the Windows Command Prompt"

### 上传步骤（Git正常工作后）：
```bash
# 1. 初始化Git仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "初始提交: 数据可视化仪表板项目"

# 4. 添加远程仓库
git remote add origin https://github.com/Ms-wang123/Data-Visualization-1.git

# 5. 推送到GitHub
git branch -M main
git push -u origin main
```

## 项目文件说明

### 主要文件：
- `complete-dashboard.html` - 完整的数据可视化仪表板（10种图表）
- `complete-dashboard.js` - 仪表板的JavaScript逻辑
- `README.md` - 项目详细说明文档
- `simple-dashboard.html` - 简化版仪表板
- `index.html` - 主页面入口

### 支持文件：
- `js/` - JavaScript模块目录
- `charts/` - 图表组件目录  
- `src/` - 源代码目录
- 各种配置文件和样式文件

## 推荐方案

**强烈推荐使用方案1（GitHub Desktop）**，因为：
- 图形化界面，操作简单
- 不需要命令行知识
- 自动处理Git配置
- 提供直观的文件状态显示

如果您选择方案2（网页上传），请确保上传所有必要的文件夹和文件，以保持项目的完整性。

## 后续步骤

上传成功后，您的项目将可以通过以下地址访问：
https://github.com/Ms-wang123/Data-Visualization-1

您还可以通过GitHub Pages部署您的网页，让其他人可以直接在线访问您的数据可视化仪表板。