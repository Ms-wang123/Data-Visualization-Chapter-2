// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const todoZone = document.getElementById('todo-zone');
    const progressZone = document.getElementById('progress-zone');
    const doneZone = document.getElementById('done-zone');
    const newItemInput = document.getElementById('newItemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    
    // 所有拖放区域
    const dropZones = document.querySelectorAll('.dropzone');
    
    // 从本地存储加载项目
    let items = JSON.parse(localStorage.getItem('dragDropItems')) || {
        todo: [
            { id: 'item1', content: '设计用户界面' },
            { id: 'item2', content: '开发后端API' },
            { id: 'item3', content: '编写测试用例' }
        ],
        progress: [
            { id: 'item4', content: '实现用户认证' }
        ],
        done: [
            { id: 'item5', content: '项目需求分析' }
        ]
    };
    
    // 渲染项目
    function renderItems() {
        // 清空所有区域
        todoZone.innerHTML = '';
        progressZone.innerHTML = '';
        doneZone.innerHTML = '';
        
        // 渲染待处理项目
        items.todo.forEach(item => {
            const itemElement = createItemElement(item);
            todoZone.appendChild(itemElement);
        });
        
        // 渲染进行中项目
        items.progress.forEach(item => {
            const itemElement = createItemElement(item);
            progressZone.appendChild(itemElement);
        });
        
        // 渲染已完成项目
        items.done.forEach(item => {
            const itemElement = createItemElement(item);
            doneZone.appendChild(itemElement);
        });
        
        // 添加拖放事件监听器
        addDragDropEventListeners();
    }
    
    // 创建项目元素
    function createItemElement(item) {
        const div = document.createElement('div');
        div.className = 'draggable-item';
        div.draggable = true;
        div.dataset.id = item.id;
        
        div.innerHTML = `
            <div class="drag-handle"><i class="fas fa-grip-lines"></i></div>
            <div class="item-content">${item.content}</div>
            <div class="item-actions">
                <button class="btn btn-sm btn-danger delete-item">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        return div;
    }
    
    // 添加拖放事件监听器
    function addDragDropEventListeners() {
        const draggableItems = document.querySelectorAll('.draggable-item');
        
        // 为每个可拖动项目添加事件监听器
        draggableItems.forEach(item => {
            // 开始拖动
            item.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', item.dataset.id);
                item.classList.add('dragging');
                
                // 延迟添加半透明效果，以便用户可以看到拖动开始
                setTimeout(() => {
                    item.style.opacity = '0.5';
                }, 0);
            });
            
            // 结束拖动
            item.addEventListener('dragend', function() {
                item.classList.remove('dragging');
                item.style.opacity = '1';
            });
            
            // 删除按钮事件
            const deleteBtn = item.querySelector('.delete-item');
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                deleteItem(item.dataset.id);
            });
        });
        
        // 为每个放置区域添加事件监听器
        dropZones.forEach(zone => {
            // 拖动进入区域
            zone.addEventListener('dragenter', function(e) {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            // 拖动在区域上方
            zone.addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            
            // 拖动离开区域
            zone.addEventListener('dragleave', function() {
                zone.classList.remove('drag-over');
            });
            
            // 放置在区域
            zone.addEventListener('drop', function(e) {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const itemId = e.dataTransfer.getData('text/plain');
                const item = findItemById(itemId);
                
                if (item) {
                    // 从原区域移除
                    removeItemFromAllZones(itemId);
                    
                    // 添加到新区域
                    if (zone.id === 'todo-zone') {
                        items.todo.push(item);
                    } else if (zone.id === 'progress-zone') {
                        items.progress.push(item);
                    } else if (zone.id === 'done-zone') {
                        items.done.push(item);
                    }
                    
                    // 保存并重新渲染
                    saveItems();
                    renderItems();
                }
            });
        });
    }
    
    // 通过ID查找项目
    function findItemById(id) {
        let foundItem = null;
        
        // 在所有区域中查找
        ['todo', 'progress', 'done'].forEach(zone => {
            items[zone].forEach(item => {
                if (item.id === id) {
                    foundItem = item;
                }
            });
        });
        
        return foundItem;
    }
    
    // 从所有区域中移除项目
    function removeItemFromAllZones(id) {
        ['todo', 'progress', 'done'].forEach(zone => {
            items[zone] = items[zone].filter(item => item.id !== id);
        });
    }
    
    // 删除项目
    function deleteItem(id) {
        removeItemFromAllZones(id);
        saveItems();
        renderItems();
    }
    
    // 添加新项目
    function addNewItem() {
        const content = newItemInput.value.trim();
        
        if (content) {
            // 生成唯一ID
            const id = 'item' + Date.now();
            
            // 创建新项目
            const newItem = {
                id: id,
                content: content
            };
            
            // 添加到待处理区域
            items.todo.push(newItem);
            
            // 保存并重新渲染
            saveItems();
            renderItems();
            
            // 清空输入框
            newItemInput.value = '';
        }
    }
    
    // 保存项目到本地存储
    function saveItems() {
        localStorage.setItem('dragDropItems', JSON.stringify(items));
    }
    
    // 添加项目按钮点击事件
    addItemBtn.addEventListener('click', addNewItem);
    
    // 输入框回车事件
    newItemInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewItem();
        }
    });
    
    // 初始渲染项目
    renderItems();
});