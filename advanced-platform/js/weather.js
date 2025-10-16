// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const cityInput = document.getElementById('cityInput');
    const searchWeatherBtn = document.getElementById('searchWeatherBtn');
    const weatherCard = document.getElementById('weatherCard');
    const weatherCity = document.getElementById('weatherCity');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherTemp = document.getElementById('weatherTemp');
    const weatherDesc = document.getElementById('weatherDesc');
    const weatherHumidity = document.getElementById('weatherHumidity');
    const weatherWind = document.getElementById('weatherWind');
    const weatherPressure = document.getElementById('weatherPressure');
    const weatherVisibility = document.getElementById('weatherVisibility');
    const forecastContainer = document.getElementById('forecastContainer');
    
    // OpenWeatherMap API密钥（注意：在实际应用中，应该保护API密钥）
    // 这里使用的是模拟数据，实际使用时需要替换为真实的API密钥
    const apiKey = 'YOUR_API_KEY';
    
    // 搜索天气按钮点击事件
    searchWeatherBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city) {
            // 在实际应用中，这里应该调用真实的API
            // fetchWeatherData(city);
            
            // 为了演示，我们使用模拟数据
            displayMockWeatherData(city);
        }
    });
    
    // 输入框回车事件
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                // 在实际应用中，这里应该调用真实的API
                // fetchWeatherData(city);
                
                // 为了演示，我们使用模拟数据
                displayMockWeatherData(city);
            }
        }
    });
    
    // 获取天气数据（实际API调用）
    function fetchWeatherData(city) {
        // 当前天气API URL
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`;
        
        // 天气预报API URL
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`;
        
        // 获取当前天气
        fetch(currentWeatherUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('城市未找到');
                }
                return response.json();
            })
            .then(data => {
                // 显示天气卡片
                weatherCard.style.display = 'block';
                
                // 更新天气信息
                weatherCity.textContent = `${data.name}, ${data.sys.country}`;
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                weatherTemp.textContent = Math.round(data.main.temp);
                weatherDesc.textContent = data.weather[0].description;
                weatherHumidity.textContent = data.main.humidity;
                weatherWind.textContent = data.wind.speed;
                weatherPressure.textContent = data.main.pressure;
                weatherVisibility.textContent = (data.visibility / 1000).toFixed(1);
                
                // 获取天气预报
                return fetch(forecastUrl);
            })
            .then(response => response.json())
            .then(data => {
                // 清空预报容器
                forecastContainer.innerHTML = '';
                
                // 获取未来5天的预报（每天一个）
                const dailyForecasts = {};
                
                data.list.forEach(item => {
                    const date = new Date(item.dt * 1000).toLocaleDateString();
                    
                    if (!dailyForecasts[date]) {
                        dailyForecasts[date] = item;
                    }
                });
                
                // 显示预报
                Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
                    const date = new Date(forecast.dt * 1000);
                    const dayName = date.toLocaleDateString('zh-CN', { weekday: 'short' });
                    const dateStr = date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
                    
                    const forecastItem = document.createElement('div');
                    forecastItem.className = 'forecast-item';
                    forecastItem.innerHTML = `
                        <div class="forecast-date">${dayName}</div>
                        <div class="forecast-date">${dateStr}</div>
                        <div class="forecast-icon">
                            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
                        </div>
                        <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
                        <div class="forecast-desc">${forecast.weather[0].description}</div>
                    `;
                    
                    forecastContainer.appendChild(forecastItem);
                });
            })
            .catch(error => {
                console.error('获取天气数据时出错:', error);
                alert('无法获取天气数据。请检查城市名称是否正确。');
            });
    }
    
    // 显示模拟天气数据（用于演示）
    function displayMockWeatherData(city) {
        // 显示天气卡片
        weatherCard.style.display = 'block';
        
        // 更新天气信息
        weatherCity.textContent = city;
        weatherIcon.src = 'https://openweathermap.org/img/wn/02d@2x.png';
        weatherTemp.textContent = '23';
        weatherDesc.textContent = '多云';
        weatherHumidity.textContent = '65';
        weatherWind.textContent = '5.2';
        weatherPressure.textContent = '1013';
        weatherVisibility.textContent = '10.0';
        
        // 清空预报容器
        forecastContainer.innerHTML = '';
        
        // 模拟天气预报数据
        const mockForecasts = [
            { day: '周一', date: '9月25日', icon: '01d', temp: 24, desc: '晴天' },
            { day: '周二', date: '9月26日', icon: '02d', temp: 23, desc: '多云' },
            { day: '周三', date: '9月27日', icon: '10d', temp: 20, desc: '小雨' },
            { day: '周四', date: '9月28日', icon: '01d', temp: 22, desc: '晴天' },
            { day: '周五', date: '9月29日', icon: '02d', temp: 25, desc: '多云' }
        ];
        
        // 显示预报
        mockForecasts.forEach(forecast => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-date">${forecast.day}</div>
                <div class="forecast-date">${forecast.date}</div>
                <div class="forecast-icon">
                    <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.desc}">
                </div>
                <div class="forecast-temp">${forecast.temp}°C</div>
                <div class="forecast-desc">${forecast.desc}</div>
            `;
            
            forecastContainer.appendChild(forecastItem);
        });
    }
});