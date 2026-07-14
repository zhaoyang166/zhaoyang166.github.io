 // 模拟数据库：编号与对应图片的映射
        const reportDatabase = {
            'GBT267485743': 'img/tp.png',
            // 可以在这里添加更多编号和对应的图片路径
            // 'GBT123456789': 'img/report2.png',
            // 'GBT987654321': 'img/report3.png',
        };

        // DOM元素
        const reportInput = document.getElementById('reportNumber');
        const searchButton = document.getElementById('searchButton');
        const resultContainer = document.getElementById('resultContainer');

        // 初始化：清空输入框
        function initializeSearch() {
            reportInput.value = '';
            reportInput.focus();
        }

        // 执行搜索
        function performSearch() {
            const inputNumber = reportInput.value.trim().toUpperCase();
            
            // 清空之前的结果
            resultContainer.innerHTML = '';
            resultContainer.style.display = 'none';

            if (!inputNumber) {
                showError('请输入报告编号');
                return;
            }

            // 检查编号是否存在
            if (reportDatabase.hasOwnProperty(inputNumber)) {
                showReport(inputNumber, reportDatabase[inputNumber]);
            } else {
                showError('抱歉，没有找到与搜索编号相关的产品！');
            }
            
            // 清空输入框以便下次输入
            reportInput.value = '';
        }

        // 显示报告
        function showReport(reportNumber, imagePath) {
            resultContainer.innerHTML = `
                <div class="success-message">检验报告：${reportNumber}</div>
                <img src="${imagePath}" alt="报告图片" class="report-image">
                <p>报告编号：${reportNumber}</p>
            `;
            resultContainer.style.display = 'block';
            
            // 滚动到结果区域
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }

        // 显示错误信息
        function showError(message) {
            resultContainer.innerHTML = `<div class="error-message">${message}</div>`;
            resultContainer.style.display = 'block';
            
            // 滚动到结果区域
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }

        // 事件监听
        searchButton.addEventListener('click', performSearch);
        
        reportInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });

        // 页面加载时初始化
        document.addEventListener('DOMContentLoaded', initializeSearch);
        
        // 防止浏览器自动填充
        window.addEventListener('pageshow', function(event) {
            if (event.persisted) {
                initializeSearch();
            }
        });