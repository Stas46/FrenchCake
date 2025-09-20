// ПОЛЬЗОВАТЕЛЬСКИЙ ИНТЕРФЕЙС - Управление формами и отображением результатов

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeFillingSelects();
    generateTierInputs(); // для многоярусных тортов
    
    // Обработчик изменения формы торта
    const shapeSelect = document.getElementById('cakeShape');
    if (shapeSelect) {
        shapeSelect.addEventListener('change', updateSizeInputs);
    }
});

/**
 * Заполнение выпадающих списков начинок
 */
function initializeFillingSelects() {
    const fillings = getAllFillings();
    
    // Основные селекты начинок
    const selects = ['filling', 'fillingForSize'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        // Очищаем текущие опции (кроме первой)
        select.innerHTML = '<option value="">Выберите начинку</option>';
        
        // Добавляем все начинки без группировки
        fillings.forEach(filling => {
            const option = document.createElement('option');
            option.value = filling.key;
            option.textContent = `${filling.name} (${filling.density} г/см³)`;
            select.appendChild(option);
        });
    });
}

/**
 * Обновление полей ввода размеров в зависимости от выбранной формы
 */
function updateSizeInputs() {
    const shape = document.getElementById('cakeShape').value;
    const container = document.getElementById('sizeInputs');
    
    if (!shape || !container) return;
    
    let inputsHtml = '';
    
    switch (shape) {
        case 'round':
            inputsHtml = `
                <div class="size-inputs">
                    <div class="input-group">
                        <label for="diameter">Диаметр (см):</label>
                        <input type="number" id="diameter" min="5" max="100" step="0.1" placeholder="Например: 20" required>
                        <small>Обычно от 10 до 40 см</small>
                    </div>
                    <div class="input-group">
                        <label for="height">Высота (см):</label>
                        <input type="number" id="height" min="1" max="30" step="0.1" placeholder="Например: 6" required>
                        <small>Обычно от 4 до 12 см</small>
                    </div>
                </div>
            `;
            break;
            
        case 'square':
            inputsHtml = `
                <div class="size-inputs">
                    <div class="input-group">
                        <label for="side">Сторона (см):</label>
                        <input type="number" id="side" min="5" max="100" step="0.1" placeholder="Например: 20" required>
                        <small>Обычно от 10 до 40 см</small>
                    </div>
                    <div class="input-group">
                        <label for="heightSquare">Высота (см):</label>
                        <input type="number" id="heightSquare" min="1" max="30" step="0.1" placeholder="Например: 6" required>
                        <small>Обычно от 4 до 12 см</small>
                    </div>
                </div>
            `;
            break;
            
        case 'rectangular':
            inputsHtml = `
                <div class="size-inputs">
                    <div class="input-group">
                        <label for="length">Длина (см):</label>
                        <input type="number" id="length" min="5" max="100" step="0.1" placeholder="Например: 30" required>
                        <small>Длинная сторона</small>
                    </div>
                    <div class="input-group">
                        <label for="width">Ширина (см):</label>
                        <input type="number" id="width" min="5" max="100" step="0.1" placeholder="Например: 20" required>
                        <small>Короткая сторона</small>
                    </div>
                    <div class="input-group">
                        <label for="heightRect">Высота (см):</label>
                        <input type="number" id="heightRect" min="1" max="30" step="0.1" placeholder="Например: 6" required>
                        <small>Обычно от 4 до 12 см</small>
                    </div>
                </div>
            `;
            break;
    }
    
    container.innerHTML = inputsHtml;
}

/**
 * РАСЧЕТ ВЕСА ПО РАЗМЕРАМ
 */
function calculateWeight() {
    const shape = document.getElementById('cakeShape').value;
    const fillingKey = document.getElementById('filling').value;
    
    if (!shape) {
        showNotification('Выберите форму торта', 'error');
        return;
    }
    
    if (!fillingKey) {
        showNotification('Выберите начинку', 'error');
        return;
    }
    
    let dimensions = {};
    
    try {
        // Получаем размеры в зависимости от формы
        switch (shape) {
            case 'round':
                dimensions.diameter = parseFloat(document.getElementById('diameter').value);
                dimensions.height = parseFloat(document.getElementById('height').value);
                break;
            case 'square':
                dimensions.side = parseFloat(document.getElementById('side').value);
                dimensions.height = parseFloat(document.getElementById('heightSquare').value);
                break;
            case 'rectangular':
                dimensions.length = parseFloat(document.getElementById('length').value);
                dimensions.width = parseFloat(document.getElementById('width').value);
                dimensions.height = parseFloat(document.getElementById('heightRect').value);
                break;
        }
        
        // Выполняем расчет
        const result = calculator.calculateWeightFromDimensions(shape, dimensions, fillingKey);
        
        if (result.success) {
            displayWeightResult(result);
            showNotification('Расчет выполнен успешно!', 'success');
        } else {
            showNotification(result.error, 'error');
        }
        
    } catch (error) {
        showNotification('Ошибка при расчете: ' + error.message, 'error');
    }
}

/**
 * Отображение результата расчета веса
 */
function displayWeightResult(result) {
    const resultSection = document.getElementById('weightResult');
    const output = document.getElementById('weightOutput');
    
    const html = `
        <div class="result-item">
            <h4>🎂 ${result.shape}</h4>
            <div class="result-detail">
                <span>Размеры:</span>
                <span class="result-value">${result.dimensions}</span>
            </div>
            <div class="result-detail">
                <span>Начинка:</span>
                <span class="result-value">${result.filling.name}</span>
            </div>
            <div class="result-detail">
                <span>Плотность:</span>
                <span class="result-value">${result.filling.density} г/см³</span>
            </div>
            <div class="result-detail">
                <span>Объем:</span>
                <span class="result-value">${result.volume} см³</span>
            </div>
            <div class="result-detail" style="font-size: 1.2em; font-weight: bold; color: #007bff;">
                <span>Вес торта:</span>
                <span class="result-value">${result.weight} кг</span>
            </div>
            <div class="calculation-details">
                <h5>📐 Формула расчета:</h5>
                <p><code>${result.details.formula}</code></p>
                <p><code>Вес = Объем × Плотность</code></p>
                <h5>🧮 Расчет:</h5>
                <pre>${result.details.calculation}</pre>
            </div>
        </div>
    `;
    
    output.innerHTML = html;
    resultSection.style.display = 'block';
    
    // Плавная прокрутка к результату
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * РАСЧЕТ РАЗМЕРОВ ПО ВЕСУ
 */
function calculateSize() {
    const targetWeight = parseFloat(document.getElementById('targetWeight').value);
    const fillingKey = document.getElementById('fillingForSize').value;
    const preferredShape = document.getElementById('preferredShape').value;
    
    // Получаем пользовательские параметры
    const useCustomParams = document.getElementById('useCustomParams').checked;
    let customParams = null;
    
    if (useCustomParams) {
        customParams = {
            minHeight: parseFloat(document.getElementById('minHeight').value) || 4,
            maxHeight: parseFloat(document.getElementById('maxHeight').value) || 12,
            minDiameter: parseFloat(document.getElementById('minDiameter').value) || 12,
            maxDiameter: parseFloat(document.getElementById('maxDiameter').value) || 45,
            preferredHeights: document.getElementById('preferredHeights').value
        };
        
        // Парсим предпочитаемые высоты
        if (customParams.preferredHeights.trim()) {
            customParams.preferredHeights = customParams.preferredHeights
                .split(',')
                .map(h => parseFloat(h.trim()))
                .filter(h => !isNaN(h) && h > 0);
        } else {
            customParams.preferredHeights = null;
        }
    }
    
    if (!targetWeight || targetWeight <= 0) {
        showNotification('Введите корректный вес', 'error');
        return;
    }
    
    if (!fillingKey) {
        showNotification('Выберите начинку', 'error');
        return;
    }
    
    try {
        const result = calculator.calculateSizeFromWeight(targetWeight, fillingKey, preferredShape, customParams);
        
        if (result.success) {
            displaySizeResult(result);
            showNotification('Варианты размеров рассчитаны!', 'success');
        } else {
            showNotification(result.error, 'error');
        }
        
    } catch (error) {
        showNotification('Ошибка при расчете: ' + error.message, 'error');
    }
}

/**
 * Отображение результата расчета размеров
 */
function displaySizeResult(result) {
    const resultSection = document.getElementById('sizeResult');
    const output = document.getElementById('sizeOutput');
    
    let html = `
        <div class="result-summary">
            <h4>📊 Исходные данные:</h4>
            <p><strong>Желаемый вес:</strong> ${result.targetWeight} кг</p>
            <p><strong>Начинка:</strong> ${result.filling.name} (${result.filling.density} г/см³)</p>
            <p><strong>Необходимый объем:</strong> ${result.requiredVolume} см³</p>
        </div>
    `;
    
    if (result.variants.length === 0) {
        html += '<p class="no-variants">❌ Не удалось найти подходящие варианты размеров</p>';
    } else {
        html += '<h4>💡 Рекомендуемые размеры:</h4>';
        
        result.variants.forEach((variant, index) => {
            const accuracy = ((1 - variant.deviation / result.targetWeight) * 100).toFixed(1);
            
            html += `
                <div class="result-item">
                    <h5>🎯 Вариант ${index + 1}: ${variant.shape}</h5>
                    <div class="result-detail">
                        <span>Размеры:</span>
                        <span class="result-value">${variant.dimensions}</span>
                    </div>
                    <div class="result-detail">
                        <span>Объем:</span>
                        <span class="result-value">${variant.volume} см³</span>
                    </div>
                    <div class="result-detail">
                        <span>Расчетный вес:</span>
                        <span class="result-value">${variant.weight} кг</span>
                    </div>
                    <div class="result-detail">
                        <span>Точность:</span>
                        <span class="result-value">${accuracy}%</span>
                    </div>
                </div>
            `;
        });
    }
    
    output.innerHTML = html;
    resultSection.style.display = 'block';
    
    // Плавная прокрутка к результату
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * МНОГОЯРУСНЫЕ ТОРТЫ
 */
function generateTierInputs() {
    const tierCount = parseInt(document.getElementById('tierCount').value) || 2;
    const container = document.getElementById('tierInputs');
    
    if (!container) return;
    
    let html = '';
    
    for (let i = 1; i <= tierCount; i++) {
        html += `
            <div class="tier-group">
                <h4><span class="tier-number">Ярус ${i}</span> ${i === 1 ? '(Нижний - самый большой)' : i === tierCount ? '(Верхний - самый маленький)' : '(Средний)'}</h4>
                
                <div class="input-group">
                    <label for="tierShape${i}">Форма:</label>
                    <select id="tierShape${i}" onchange="updateTierSizeInputs(${i})" required>
                        <option value="">Выберите форму</option>
                        <option value="round">Круглый</option>
                        <option value="square">Квадратный</option>
                        <option value="rectangular">Прямоугольный</option>
                    </select>
                </div>
                
                <div id="tierSizeInputs${i}">
                    <!-- Размеры яруса появятся здесь -->
                </div>
                
                <div class="input-group">
                    <label for="tierFilling${i}">Начинка:</label>
                    <select id="tierFilling${i}" required>
                        <option value="">Выберите начинку</option>
                    </select>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
    
    // Заполняем начинки для всех ярусов
    for (let i = 1; i <= tierCount; i++) {
        initializeTierFillingSelect(i);
    }
}

/**
 * Инициализация выбора начинки для конкретного яруса
 */
function initializeTierFillingSelect(tierNumber) {
    const select = document.getElementById(`tierFilling${tierNumber}`);
    if (!select) return;
    
    const fillings = getAllFillings();
    
    select.innerHTML = '<option value="">Выберите начинку</option>';
    
    // Добавляем все начинки без группировки
    fillings.forEach(filling => {
        const option = document.createElement('option');
        option.value = filling.key;
        option.textContent = `${filling.name} (${filling.density} г/см³)`;
        select.appendChild(option);
    });
}

/**
 * Обновление полей размеров для конкретного яруса
 */
function updateTierSizeInputs(tierNumber) {
    const shape = document.getElementById(`tierShape${tierNumber}`).value;
    const container = document.getElementById(`tierSizeInputs${tierNumber}`);
    
    if (!shape || !container) return;
    
    let inputsHtml = '';
    
    switch (shape) {
        case 'round':
            inputsHtml = `
                <div class="size-inputs">
                    <div class="input-group">
                        <label for="tierDiameter${tierNumber}">Диаметр (см):</label>
                        <input type="number" id="tierDiameter${tierNumber}" min="5" max="100" step="0.1" required>
                    </div>
                    <div class="input-group">
                        <label for="tierHeight${tierNumber}">Высота (см):</label>
                        <input type="number" id="tierHeight${tierNumber}" min="1" max="30" step="0.1" required>
                    </div>
                </div>
            `;
            break;
        case 'square':
            inputsHtml = `
                <div class="size-inputs">
                    <div class="input-group">
                        <label for="tierSide${tierNumber}">Сторона (см):</label>
                        <input type="number" id="tierSide${tierNumber}" min="5" max="100" step="0.1" required>
                    </div>
                    <div class="input-group">
                        <label for="tierHeightSq${tierNumber}">Высота (см):</label>
                        <input type="number" id="tierHeightSq${tierNumber}" min="1" max="30" step="0.1" required>
                    </div>
                </div>
            `;
            break;
        case 'rectangular':
            inputsHtml = `
                <div class="size-inputs">
                    <div class="input-group">
                        <label for="tierLength${tierNumber}">Длина (см):</label>
                        <input type="number" id="tierLength${tierNumber}" min="5" max="100" step="0.1" required>
                    </div>
                    <div class="input-group">
                        <label for="tierWidth${tierNumber}">Ширина (см):</label>
                        <input type="number" id="tierWidth${tierNumber}" min="5" max="100" step="0.1" required>
                    </div>
                    <div class="input-group">
                        <label for="tierHeightRect${tierNumber}">Высота (см):</label>
                        <input type="number" id="tierHeightRect${tierNumber}" min="1" max="30" step="0.1" required>
                    </div>
                </div>
            `;
            break;
    }
    
    container.innerHTML = inputsHtml;
}

/**
 * Расчет многоярусного торта
 */
function calculateMultiTier() {
    const tierCount = parseInt(document.getElementById('tierCount').value);
    const tiers = [];
    let totalWeight = 0;
    let totalVolume = 0;
    let hasErrors = false;
    
    // Собираем данные по каждому ярусу
    for (let i = 1; i <= tierCount; i++) {
        const shape = document.getElementById(`tierShape${i}`).value;
        const fillingKey = document.getElementById(`tierFilling${i}`).value;
        
        if (!shape || !fillingKey) {
            showNotification(`Заполните все поля для яруса ${i}`, 'error');
            hasErrors = true;
            continue;
        }
        
        let dimensions = {};
        
        try {
            // Получаем размеры в зависимости от формы
            switch (shape) {
                case 'round':
                    dimensions.diameter = parseFloat(document.getElementById(`tierDiameter${i}`).value);
                    dimensions.height = parseFloat(document.getElementById(`tierHeight${i}`).value);
                    break;
                case 'square':
                    dimensions.side = parseFloat(document.getElementById(`tierSide${i}`).value);
                    dimensions.height = parseFloat(document.getElementById(`tierHeightSq${i}`).value);
                    break;
                case 'rectangular':
                    dimensions.length = parseFloat(document.getElementById(`tierLength${i}`).value);
                    dimensions.width = parseFloat(document.getElementById(`tierWidth${i}`).value);
                    dimensions.height = parseFloat(document.getElementById(`tierHeightRect${i}`).value);
                    break;
            }
            
            // Рассчитываем ярус
            const tierResult = calculator.calculateWeightFromDimensions(shape, dimensions, fillingKey);
            
            if (tierResult.success) {
                tiers.push({
                    number: i,
                    ...tierResult
                });
                totalWeight += tierResult.weight;
                totalVolume += tierResult.volume;
            } else {
                showNotification(`Ошибка в ярусе ${i}: ${tierResult.error}`, 'error');
                hasErrors = true;
            }
            
        } catch (error) {
            showNotification(`Ошибка в ярусе ${i}: ${error.message}`, 'error');
            hasErrors = true;
        }
    }
    
    if (!hasErrors && tiers.length > 0) {
        displayMultiTierResult(tiers, totalWeight, totalVolume);
        showNotification('Многоярусный торт рассчитан!', 'success');
    }
}

/**
 * Отображение результата многоярусного торта
 */
function displayMultiTierResult(tiers, totalWeight, totalVolume) {
    const resultSection = document.getElementById('multiTierResult');
    const output = document.getElementById('multiTierOutput');
    
    let html = `
        <div class="result-summary">
            <h4>🎂 Общие характеристики многоярусного торта:</h4>
            <div class="result-detail">
                <span>Количество ярусов:</span>
                <span class="result-value">${tiers.length}</span>
            </div>
            <div class="result-detail">
                <span>Общий объем:</span>
                <span class="result-value">${Math.round(totalVolume * 100) / 100} см³</span>
            </div>
            <div class="result-detail" style="font-size: 1.3em; font-weight: bold; color: #007bff;">
                <span>Общий вес:</span>
                <span class="result-value">${Math.round(totalWeight * 1000) / 1000} кг</span>
            </div>
        </div>
        
        <h4>📋 Детали по ярусам:</h4>
    `;
    
    tiers.forEach(tier => {
        const percentage = ((tier.weight / totalWeight) * 100).toFixed(1);
        
        html += `
            <div class="result-item">
                <h5>
                    <span class="tier-number">Ярус ${tier.number}</span>
                    ${tier.shape} (${percentage}% от общего веса)
                </h5>
                <div class="result-detail">
                    <span>Размеры:</span>
                    <span class="result-value">${tier.dimensions}</span>
                </div>
                <div class="result-detail">
                    <span>Начинка:</span>
                    <span class="result-value">${tier.filling.name}</span>
                </div>
                <div class="result-detail">
                    <span>Объем:</span>
                    <span class="result-value">${tier.volume} см³</span>
                </div>
                <div class="result-detail">
                    <span>Вес:</span>
                    <span class="result-value">${tier.weight} кг</span>
                </div>
            </div>
        `;
    });
    
    output.innerHTML = html;
    resultSection.style.display = 'block';
    
    // Плавная прокрутка к результату
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * УПРАВЛЕНИЕ ВКЛАДКАМИ
 */
function switchTab(tabName) {
    // Скрываем все вкладки
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Убираем активность со всех кнопок
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Показываем выбранную вкладку
    document.getElementById(tabName).classList.add('active');
    
    // Активируем соответствующую кнопку
    event.target.classList.add('active');
}

/**
 * Управление вкладками инструкций
 */
function showInstructions(type) {
    // Скрываем все инструкции
    const instructions = document.querySelectorAll('.instruction-content');
    instructions.forEach(inst => inst.classList.remove('active'));
    
    // Убираем активность со всех вкладок
    const tabs = document.querySelectorAll('.instruction-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Показываем выбранную инструкцию
    document.getElementById(type + '-instructions').classList.add('active');
    event.target.classList.add('active');
}

/**
 * Показ уведомлений
 */
function showNotification(message, type = 'info') {
    // Удаляем существующие уведомления
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Автоматически убираем через 4 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

/**
 * Показать/скрыть дополнительные параметры для расчета размеров
 */
function toggleCustomParams() {
    const checkbox = document.getElementById('useCustomParams');
    const paramsDiv = document.getElementById('customParams');
    
    if (checkbox.checked) {
        paramsDiv.style.display = 'block';
    } else {
        paramsDiv.style.display = 'none';
    }
}