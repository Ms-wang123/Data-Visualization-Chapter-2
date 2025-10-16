const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

// 处理所有GET请求，返回index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(port, () => {
    console.log(`数据可视化应用正在运行，请访问 http://localhost:${port}`);
    console.log('按Ctrl+C停止服务器');
});