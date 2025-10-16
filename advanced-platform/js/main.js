// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏切换
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('content').classList.toggle('active');
    });

    // 页面导航
    const pageLinks = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page-content');

    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动链接的活动状态
            pageLinks.forEach(item => {
                item.parentElement.classList.remove('active');
            });
            
            // 添加当前链接的活动状态
            this.parentElement.classList.add('active');
            
            // 隐藏所有页面
            pages.forEach(page => {
                page.style.display = 'none';
            });
            
            // 显示选定的页面
            const targetPage = this.getAttribute('data-page');
            document.getElementById(`${targetPage}-page`).style.display = 'block';
        });
    });

    // 主题切换
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    // 检查本地存储中的主题偏好
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
    
    // 主题切换处理函数
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }
    
    // 监听主题切换事件
    toggleSwitch.addEventListener('change', switchTheme, false);

    // 初始化仪表盘图表
    const ctx = document.getElementById('statsChart').getContext('2d');
    const statsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
            datasets: [{
                label: '访问量',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#3498db',
                tension: 0.1
            }, {
                label: '注册用户',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#2ecc71',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '系统使用统计'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // 快速笔记功能
    const quickNote = document.getElementById('quickNote');
    const saveNoteBtn = document.getElementById('saveNote');
    
    // 从本地存储加载笔记
    if (localStorage.getItem('quickNote')) {
        quickNote.value = localStorage.getItem('quickNote');
    }
    
    // 保存笔记到本地存储
    saveNoteBtn.addEventListener('click', function() {
        localStorage.setItem('quickNote', quickNote.value);
        
        // 显示保存成功提示
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    笔记已保存！
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        document.body.appendChild(toast);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // 自动移除toast
        toast.addEventListener('hidden.bs.toast', function() {
            document.body.removeChild(toast);
        });
    });

    // 初始化所有工具提示
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 初始化所有下拉菜单
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });
});