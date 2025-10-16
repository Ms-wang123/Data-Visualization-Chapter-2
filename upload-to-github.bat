@echo off
echo ================================================
echo GitHub上传助手 - 数据可视化项目
echo ================================================
echo.

echo 步骤1: 初始化Git仓库
git init

echo.
echo 步骤2: 添加所有文件到暂存区
git add .

echo.
echo 步骤3: 提交更改
git commit -m "初始提交: 数据可视化仪表板项目"

echo.
echo 步骤4: 添加远程仓库
git remote add origin https://github.com/Ms-wang123/Data-Visualization-1.git

echo.
echo 步骤5: 推送到GitHub
git branch -M main
git push -u origin main

echo.
echo ================================================
echo 上传完成！
echo 项目地址: https://github.com/Ms-wang123/Data-Visualization-1
echo ================================================
pause