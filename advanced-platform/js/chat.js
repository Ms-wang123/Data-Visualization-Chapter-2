// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const notificationSwitch = document.getElementById('notificationSwitch');
    const soundSwitch = document.getElementById('soundSwitch');
    const usernameInput = document.getElementById('usernameInput');
    const changeUsernameBtn = document.getElementById('changeUsernameBtn');
    
    // 用户名（默认为"用户"加随机数）
    let username = localStorage.getItem('chatUsername') || `用户${Math.floor(Math.random() * 1000)}`;
    usernameInput.value = username;
    
    // 通知设置
    let notificationsEnabled = localStorage.getItem('chatNotifications') !== 'false';
    let soundEnabled = localStorage.getItem('chatSound') !== 'false';
    
    notificationSwitch.checked = notificationsEnabled;
    soundSwitch.checked = soundEnabled;
    
    // 从本地存储加载消息
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    
    // 渲染消息
    function renderMessages() {
        // 清空消息容器
        chatMessages.innerHTML = '';
        
        // 如果没有消息，显示欢迎消息
        if (messages.length === 0) {
            const welcomeMessage = {
                author: '系统',
                text: '欢迎来到聊天室！',
                time: formatTime(new Date()),
                type: 'received'
            };
            
            const messageElement = createMessageElement(welcomeMessage);
            chatMessages.appendChild(messageElement);
            return;
        }
        
        // 渲染所有消息
        messages.forEach(message => {
            const messageElement = createMessageElement(message);
            chatMessages.appendChild(messageElement);
        });
        
        // 滚动到最新消息
        scrollToBottom();
    }
    
    // 创建消息元素
    function createMessageElement(message) {
        const div = document.createElement('div');
        div.className = `message-item ${message.type}`;
        
        div.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">${message.author}</span>
                    <span class="message-time">${message.time}</span>
                </div>
                <div class="message-text">
                    ${message.text}
                </div>
            </div>
        `;
        
        return div;
    }
    
    // 发送消息
    function sendMessage() {
        const text = messageInput.value.trim();
        
        if (text) {
            const newMessage = {
                author: username,
                text: text,
                time: formatTime(new Date()),
                type: 'sent'
            };
            
            // 添加到消息列表
            messages.push(newMessage);
            
            // 保存到本地存储
            saveMessages();
            
            // 渲染消息
            renderMessages();
            
            // 清空输入框
            messageInput.value = '';
            
            // 模拟接收回复（仅用于演示）
            setTimeout(() => {
                receiveMessage();
            }, 1000 + Math.random() * 2000);
        }
    }
    
    // 接收消息（模拟）
    function receiveMessage() {
        const responses = [
            '这个想法很有趣！',
            '我明白你的意思了。',
            '我需要再考虑一下这个问题。',
            '谢谢分享！',
            '我完全同意你的观点。',
            '这让我想起了一个类似的情况...',
            '有道理！',
            '我们可以进一步讨论这个话题。',
            '这是个好主意！',
            '我需要更多信息来理解这个问题。'
        ];
        
        const randomUser = `用户${Math.floor(Math.random() * 1000)}`;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const newMessage = {
            author: randomUser,
            text: randomResponse,
            time: formatTime(new Date()),
            type: 'received'
        };
        
        // 添加到消息列表
        messages.push(newMessage);
        
        // 保存到本地存储
        saveMessages();
        
        // 渲染消息
        renderMessages();
        
        // 发送通知
        if (notificationsEnabled) {
            sendNotification(randomUser, randomResponse);
        }
        
        // 播放声音
        if (soundEnabled) {
            playNotificationSound();
        }
    }
    
    // 发送通知
    function sendNotification(author, text) {
        // 检查浏览器是否支持通知
        if ('Notification' in window) {
            // 检查通知权限
            if (Notification.permission === 'granted') {
                // 创建通知
                new Notification('新消息', {
                    body: `${author}: ${text}`,
                    icon: 'https://via.placeholder.com/48'
                });
            } else if (Notification.permission !== 'denied') {
                // 请求通知权限
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('新消息', {
                            body: `${author}: ${text}`,
                            icon: 'https://via.placeholder.com/48'
                        });
                    }
                });
            }
        }
    }
    
    // 播放通知声音
    function playNotificationSound() {
        // 在实际应用中，这里应该创建并播放声音
        // 为了简单起见，我们只在控制台输出一条消息
        console.log('播放通知声音');
    }
    
    // 格式化时间
    function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    // 滚动到底部
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 保存消息到本地存储
    function saveMessages() {
        // 只保存最近的50条消息
        if (messages.length > 50) {
            messages = messages.slice(messages.length - 50);
        }
        
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    
    // 更改用户名
    function changeUsername() {
        const newUsername = usernameInput.value.trim();
        
        if (newUsername) {
            username = newUsername;
            localStorage.setItem('chatUsername', username);
            
            // 显示系统消息
            const systemMessage = {
                author: '系统',
                text: `用户名已更改为 "${username}"`,
                time: formatTime(new Date()),
                type: 'received'
            };
            
            messages.push(systemMessage);
            saveMessages();
            renderMessages();
        }
    }
    
    // 发送消息按钮点击事件
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // 输入框回车事件
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 更改用户名按钮点击事件
    changeUsernameBtn.addEventListener('click', changeUsername);
    
    // 通知开关事件
    notificationSwitch.addEventListener('change', function() {
        notificationsEnabled = this.checked;
        localStorage.setItem('chatNotifications', notificationsEnabled);
        
        // 如果启用通知，请求权限
        if (notificationsEnabled && 'Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    });
    
    // 声音开关事件
    soundSwitch.addEventListener('change', function() {
        soundEnabled = this.checked;
        localStorage.setItem('chatSound', soundEnabled);
    });
    
    // 初始渲染消息
    renderMessages();
});