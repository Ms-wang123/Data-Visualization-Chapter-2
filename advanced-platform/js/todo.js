// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const taskInput = document.getElementById('taskInput');
    const taskPriority = document.getElementById('taskPriority');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const allTasksList = document.getElementById('allTasksList');
    const activeTasksList = document.getElementById('activeTasksList');
    const completedTasksList = document.getElementById('completedTasksList');
    
    // 从本地存储加载任务
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // 渲染任务列表
    function renderTasks() {
        // 清空任务列表
        allTasksList.innerHTML = '';
        activeTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';
        
        // 如果没有任务，显示提示信息
        if (tasks.length === 0) {
            allTasksList.innerHTML = '<li class="list-group-item">暂无任务</li>';
            activeTasksList.innerHTML = '<li class="list-group-item">暂无进行中的任务</li>';
            completedTasksList.innerHTML = '<li class="list-group-item">暂无已完成的任务</li>';
            return;
        }
        
        // 过滤任务
        const activeTasks = tasks.filter(task => !task.completed);
        const completedTasks = tasks.filter(task => task.completed);
        
        // 如果没有活动任务，显示提示信息
        if (activeTasks.length === 0) {
            activeTasksList.innerHTML = '<li class="list-group-item">暂无进行中的任务</li>';
        }
        
        // 如果没有已完成任务，显示提示信息
        if (completedTasks.length === 0) {
            completedTasksList.innerHTML = '<li class="list-group-item">暂无已完成的任务</li>';
        }
        
        // 渲染所有任务
        tasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            allTasksList.appendChild(taskElement.cloneNode(true));
            
            if (task.completed) {
                completedTasksList.appendChild(taskElement);
            } else {
                activeTasksList.appendChild(taskElement);
            }
        });
        
        // 添加事件监听器
        addTaskEventListeners();
    }
    
    // 创建任务元素
    function createTaskElement(task, index) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.dataset.index = index;
        
        // 设置优先级类
        let priorityClass = '';
        let priorityText = '';
        
        switch (task.priority) {
            case 'high':
                priorityClass = 'priority-high';
                priorityText = '高优先级';
                break;
            case 'medium':
                priorityClass = 'priority-medium';
                priorityText = '中优先级';
                break;
            case 'low':
                priorityClass = 'priority-low';
                priorityText = '低优先级';
                break;
        }
        
        li.innerHTML = `
            <div class="task-item">
                <div class="task-check">
                    <input type="checkbox" class="form-check-input task-checkbox" ${task.completed ? 'checked' : ''}>
                </div>
                <div class="task-text ${task.completed ? 'completed' : ''}">
                    ${task.text}
                </div>
                <div class="task-priority">
                    <span class="badge ${priorityClass}">${priorityText}</span>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-danger delete-task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        return li;
    }
    
    // 添加任务事件监听器
    function addTaskEventListeners() {
        // 复选框事件
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const taskIndex = parseInt(this.closest('.list-group-item').dataset.index);
                toggleTaskCompletion(taskIndex);
            });
        });
        
        // 删除按钮事件
        document.querySelectorAll('.delete-task').forEach(button => {
            button.addEventListener('click', function() {
                const taskIndex = parseInt(this.closest('.list-group-item').dataset.index);
                deleteTask(taskIndex);
            });
        });
    }
    
    // 添加新任务
    function addTask() {
        const text = taskInput.value.trim();
        const priority = taskPriority.value;
        
        if (text) {
            const newTask = {
                text: text,
                priority: priority,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            
            // 清空输入框
            taskInput.value = '';
        }
    }
    
    // 切换任务完成状态
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
    
    // 删除任务
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
    
    // 保存任务到本地存储
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // 添加任务按钮点击事件
    addTaskBtn.addEventListener('click', addTask);
    
    // 输入框回车事件
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // 初始渲染任务列表
    renderTasks();
});