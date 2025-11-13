@echo off
chcp 65001 >nul
echo ================================================
echo GitHub上传助手 - 增强版数据可视化仪表板
echo 目标仓库: Ms-wang123/Data-Visualization-Chapter-2
echo ================================================
echo.

echo 正在检查Git安装...
git --version >nul 2>&1
if errorlevel 1 (
    echo 错误: Git未安装或未配置
    echo 请先安装Git或使用网页版上传
    echo 参考: GitHub上传指南.md
    pause
    exit /b 1
)

echo Git已安装，版本:
git --version
echo.

echo 步骤1: 创建临时工作目录
if not exist "temp-upload" mkdir temp-upload
cd temp-upload

echo.
echo 步骤2: 克隆目标仓库
git clone https://github.com/Ms-wang123/Data-Visualization-Chapter-2.git
if errorlevel 1 (
    echo 错误: 仓库克隆失败
    echo 可能原因: 仓库不存在或权限不足
    goto :manual_upload
)

cd Data-Visualization-Chapter-2

echo.
echo 步骤3: 删除仓库现有文件
git rm -r . >nul 2>&1
git commit -m "清理仓库，准备上传新版本"

echo.
echo 步骤4: 复制增强版仪表板文件
copy "..\..\enhanced-dashboard.html" .
copy "..\..\enhanced-dashboard.js" .
copy "..\..\demo-enhanced-dashboard.html" .
copy "..\..\enhanced-dashboard-README.md" .
copy "..\..\complete-dashboard.html" .
copy "..\..\GitHub上传指南.md" .

echo.
echo 步骤5: 添加并提交文件
git add .
git commit -m "上传增强版数据可视化仪表板

新增功能:
- 实时数据更新和图表交互
- 拖拽式组件调整功能  
- 数据筛选和钻取功能
- 响应式移动端设计
- 现代化UI界面"

echo.
echo 步骤6: 推送到GitHub
git push origin main
if errorlevel 1 (
    echo 错误: 推送失败
    goto :manual_upload
)

echo.
echo ================================================
echo 上传成功！
echo.
echo 项目文件已上传到:
echo https://github.com/Ms-wang123/Data-Visualization-Chapter-2
echo.
echo 主要文件:
echo - enhanced-dashboard.html (主仪表板)
echo - enhanced-dashboard.js (交互脚本)
echo - demo-enhanced-dashboard.html (演示页面)
echo - enhanced-dashboard-README.md (说明文档)
echo - complete-dashboard.html (原始版本)
echo ================================================

cd ..\..
rd /s /q temp-upload
pause
exit /b 0

:manual_upload
echo.
echo ================================================
echo 自动上传失败，请使用手动方案:
echo.
echo 方案1: 网页上传（推荐）
echo 1. 访问 https://github.com/Ms-wang123/Data-Visualization-Chapter-2
echo 2. 点击"Upload files"
echo 3. 拖拽6个核心文件上传
echo.
echo 方案2: GitHub Desktop
echo 1. 安装GitHub Desktop
echo 2. 克隆仓库并替换文件
echo 3. 提交并推送
echo ================================================
pause
exit /b 1