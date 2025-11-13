@echo off
chcp 65001 > nul
echo ====================================
echo 数据可视化仪表板启动脚本
echo ====================================
echo.
echo 正在检查系统环境...

:: 检查是否有浏览器
where msedge >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ 找到 Microsoft Edge 浏览器
    set "browser=msedge"
) else (
    where chrome >nul 2>&1
    if %errorlevel% == 0 (
        echo ✓ 找到 Google Chrome 浏览器
        set "browser=chrome"
    ) else (
        echo ! 未找到常用浏览器，尝试使用默认浏览器
        set "browser=start"
    )
)

echo.
echo 正在启动数据可视化仪表板...
echo.

:: 使用相对路径打开HTML文件
if "%browser%"=="msedge" (
    start msedge "%~dp0interactive-dashboard-fixed.html"
) else if "%browser%"=="chrome" (
    start chrome "%~dp0interactive-dashboard-fixed.html"
) else (
    start "" "%~dp0interactive-dashboard-fixed.html"
)

echo ✓ 仪表板已成功打开！
echo.
echo 如果浏览器没有自动打开，请手动打开以下文件：
echo "%~dp0interactive-dashboard-fixed.html"
echo.
echo 按任意键退出...
pause >nul