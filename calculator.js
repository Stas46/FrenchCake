// КАЛЬКУЛЯТОР ТОРТОВ - Основные математические функции
// Этот файл содержит все расчеты для определения веса и размеров тортов

/**
 * ОСНОВНЫЕ ФОРМУЛЫ ДЛЯ РАСЧЕТОВ:
 * 
 * 1. КРУГЛЫЙ ТОРТ:
 *    - Объем = π × (диаметр/2)² × высота
 *    - Объем = π × радиус² × высота
 * 
 * 2. КВАДРАТНЫЙ ТОРТ:
 *    - Объем = сторона × сторона × высота
 * 
 * 3. ПРЯМОУГОЛЬНЫЙ ТОРТ:
 *    - Объем = длина × ширина × высота
 * 
 * 4. ВЕС ТОРТА:
 *    - Вес = Объем × плотность начинки
 */

class CakeCalculator {
    constructor() {
        this.PI = Math.PI; // 3.14159...
    }

    /**
     * Расчет объема круглого торта
     * @param {number} diameter - диаметр в см
     * @param {number} height - высота в см
     * @returns {number} объем в см³
     */
    calculateRoundVolume(diameter, height) {
        if (!diameter || !height || diameter <= 0 || height <= 0) {
            throw new Error('Диаметр и высота должны быть положительными числами');
        }
        
        const radius = diameter / 2;
        const volume = this.PI * Math.pow(radius, 2) * height;
        return Math.round(volume * 100) / 100; // округляем до 2 знаков после запятой
    }

    /**
     * Расчет объема квадратного торта
     * @param {number} side - сторона в см
     * @param {number} height - высота в см
     * @returns {number} объем в см³
     */
    calculateSquareVolume(side, height) {
        if (!side || !height || side <= 0 || height <= 0) {
            throw new Error('Сторона и высота должны быть положительными числами');
        }
        
        const volume = Math.pow(side, 2) * height;
        return Math.round(volume * 100) / 100;
    }

    /**
     * Расчет объема прямоугольного торта
     * @param {number} length - длина в см
     * @param {number} width - ширина в см
     * @param {number} height - высота в см
     * @returns {number} объем в см³
     */
    calculateRectangularVolume(length, width, height) {
        if (!length || !width || !height || length <= 0 || width <= 0 || height <= 0) {
            throw new Error('Длина, ширина и высота должны быть положительными числами');
        }
        
        const volume = length * width * height;
        return Math.round(volume * 100) / 100;
    }

    /**
     * Расчет веса торта по объему и плотности начинки
     * @param {number} volume - объем в см³
     * @param {number} density - плотность начинки в г/см³
     * @returns {number} вес в кг
     */
    calculateWeight(volume, density) {
        if (!volume || !density || volume <= 0 || density <= 0) {
            throw new Error('Объем и плотность должны быть положительными числами');
        }
        
        const weightInGrams = volume * density;
        const weightInKg = weightInGrams / 1000; // переводим в килограммы
        return Math.round(weightInKg * 1000) / 1000; // округляем до 3 знаков после запятой
    }

    /**
     * Расчет веса торта по размерам и начинке
     * @param {string} shape - форма торта ('round', 'square', 'rectangular')
     * @param {object} dimensions - размеры торта
     * @param {string} fillingKey - ключ начинки из базы данных
     * @returns {object} результат с весом и деталями расчета
     */
    calculateWeightFromDimensions(shape, dimensions, fillingKey) {
        const filling = getFilling(fillingKey);
        if (!filling) {
            throw new Error('Начинка не найдена');
        }

        let volume;
        let dimensionText;

        try {
            switch (shape) {
                case 'round':
                    if (!dimensions.diameter || !dimensions.height) {
                        throw new Error('Для круглого торта нужны диаметр и высота');
                    }
                    volume = this.calculateRoundVolume(dimensions.diameter, dimensions.height);
                    dimensionText = `Диаметр: ${dimensions.diameter}см, Высота: ${dimensions.height}см`;
                    break;

                case 'square':
                    if (!dimensions.side || !dimensions.height) {
                        throw new Error('Для квадратного торта нужны сторона и высота');
                    }
                    volume = this.calculateSquareVolume(dimensions.side, dimensions.height);
                    dimensionText = `Сторона: ${dimensions.side}см, Высота: ${dimensions.height}см`;
                    break;

                case 'rectangular':
                    if (!dimensions.length || !dimensions.width || !dimensions.height) {
                        throw new Error('Для прямоугольного торта нужны длина, ширина и высота');
                    }
                    volume = this.calculateRectangularVolume(dimensions.length, dimensions.width, dimensions.height);
                    dimensionText = `Длина: ${dimensions.length}см, Ширина: ${dimensions.width}см, Высота: ${dimensions.height}см`;
                    break;

                default:
                    throw new Error('Неизвестная форма торта');
            }

            const weight = this.calculateWeight(volume, filling.density);

            return {
                success: true,
                weight: weight,
                volume: volume,
                filling: filling,
                dimensions: dimensionText,
                shape: this.getShapeName(shape),
                details: {
                    formula: this.getFormulaText(shape),
                    calculation: this.getCalculationText(shape, dimensions, volume, filling.density, weight)
                }
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Расчет возможных размеров торта по желаемому весу
     * @param {number} targetWeight - желаемый вес в кг
     * @param {string} fillingKey - ключ начинки
     * @param {string} preferredShape - предпочитаемая форма ('all', 'round', 'square', 'rectangular')
     * @returns {object} варианты размеров
     */
    calculateSizeFromWeight(targetWeight, fillingKey, preferredShape = 'all', customParams = null) {
        const filling = getFilling(fillingKey);
        if (!filling) {
            throw new Error('Начинка не найдена');
        }

        if (!targetWeight || targetWeight <= 0) {
            throw new Error('Вес должен быть положительным числом');
        }

        try {
            // Вычисляем нужный объем
            const targetWeightInGrams = targetWeight * 1000;
            const requiredVolume = targetWeightInGrams / filling.density;

            const variants = [];

            // Генерируем варианты для разных форм
            if (preferredShape === 'all' || preferredShape === 'round') {
                variants.push(...this.generateRoundVariants(requiredVolume, filling, customParams));
            }

            if (preferredShape === 'all' || preferredShape === 'square') {
                variants.push(...this.generateSquareVariants(requiredVolume, filling, customParams));
            }

            if (preferredShape === 'all' || preferredShape === 'rectangular') {
                variants.push(...this.generateRectangularVariants(requiredVolume, filling, customParams));
            }

            return {
                success: true,
                targetWeight: targetWeight,
                requiredVolume: Math.round(requiredVolume * 100) / 100,
                filling: filling,
                variants: variants
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Генерация вариантов круглых тортов
     */
    generateRoundVariants(requiredVolume, filling, customParams = null) {
        const variants = [];
        
        // Определяем высоты для генерации
        let heights;
        if (customParams && customParams.preferredHeights) {
            heights = customParams.preferredHeights;
        } else {
            heights = [4, 5, 6, 7, 8, 10, 12]; // популярные высоты по умолчанию
        }
        
        // Ограничения по размерам
        const minHeight = customParams?.minHeight || 3;
        const maxHeight = customParams?.maxHeight || 15;
        const minDiameter = customParams?.minDiameter || 10;
        const maxDiameter = customParams?.maxDiameter || 50;

        heights.forEach(height => {
            // Проверяем ограничения по высоте
            if (height < minHeight || height > maxHeight) return;
            
            // Вычисляем диаметр: Volume = π × (d/2)² × h
            // d = 2 × √(Volume / (π × h))
            const diameter = 2 * Math.sqrt(requiredVolume / (this.PI * height));
            
            // Проверяем ограничения по диаметру
            if (diameter >= minDiameter && diameter <= maxDiameter) {
                const actualVolume = this.calculateRoundVolume(diameter, height);
                const actualWeight = this.calculateWeight(actualVolume, filling.density);
                
                variants.push({
                    shape: 'Круглый',
                    dimensions: `⌀${Math.round(diameter * 10) / 10}см × ${height}см`,
                    diameter: Math.round(diameter * 10) / 10,
                    height: height,
                    volume: actualVolume,
                    weight: actualWeight,
                    deviation: Math.abs(actualWeight - (requiredVolume * filling.density / 1000))
                });
            }
        });

        return variants.sort((a, b) => a.deviation - b.deviation).slice(0, 3); // топ-3 варианта
    }

    /**
     * Генерация вариантов квадратных тортов
     */
    generateSquareVariants(requiredVolume, filling, customParams = null) {
        const variants = [];
        
        // Определяем высоты для генерации
        let heights;
        if (customParams && customParams.preferredHeights) {
            heights = customParams.preferredHeights;
        } else {
            heights = [4, 5, 6, 7, 8, 10, 12];
        }
        
        // Ограничения по размерам
        const minHeight = customParams?.minHeight || 3;
        const maxHeight = customParams?.maxHeight || 15;
        const minSide = customParams?.minDiameter || 10; // используем minDiameter как minSide
        const maxSide = customParams?.maxDiameter || 50; // используем maxDiameter как maxSide

        heights.forEach(height => {
            // Проверяем ограничения по высоте
            if (height < minHeight || height > maxHeight) return;
            
            // Вычисляем сторону: Volume = side² × h
            // side = √(Volume / h)
            const side = Math.sqrt(requiredVolume / height);
            
            // Проверяем ограничения по стороне
            if (side >= minSide && side <= maxSide) {
                const actualVolume = this.calculateSquareVolume(side, height);
                const actualWeight = this.calculateWeight(actualVolume, filling.density);
                
                variants.push({
                    shape: 'Квадратный',
                    dimensions: `${Math.round(side * 10) / 10}см × ${Math.round(side * 10) / 10}см × ${height}см`,
                    side: Math.round(side * 10) / 10,
                    height: height,
                    volume: actualVolume,
                    weight: actualWeight,
                    deviation: Math.abs(actualWeight - (requiredVolume * filling.density / 1000))
                });
            }
        });

        return variants.sort((a, b) => a.deviation - b.deviation).slice(0, 3);
    }

    /**
     * Генерация вариантов прямоугольных тортов
     */
    generateRectangularVariants(requiredVolume, filling, customParams = null) {
        const variants = [];
        
        // Определяем высоты для генерации
        let heights;
        if (customParams && customParams.preferredHeights) {
            heights = customParams.preferredHeights;
        } else {
            heights = [4, 5, 6, 7, 8, 10];
        }
        
        // Ограничения по размерам
        const minHeight = customParams?.minHeight || 3;
        const maxHeight = customParams?.maxHeight || 15;
        const minSize = customParams?.minDiameter || 10;
        const maxSize = customParams?.maxDiameter || 60;
        
        const aspectRatios = [1.2, 1.4, 1.5, 1.6, 2.0]; // отношения длина/ширина

        heights.forEach(height => {
            // Проверяем ограничения по высоте
            if (height < minHeight || height > maxHeight) return;
            
            aspectRatios.forEach(ratio => {
                // Volume = length × width × height
                // length = ratio × width
                // Volume = ratio × width² × height
                // width = √(Volume / (ratio × height))
                const width = Math.sqrt(requiredVolume / (ratio * height));
                const length = width * ratio;
                
                // Проверяем ограничения по размерам
                if (width >= minSize && width <= maxSize && length >= minSize && length <= maxSize) {
                    const actualVolume = this.calculateRectangularVolume(length, width, height);
                    const actualWeight = this.calculateWeight(actualVolume, filling.density);
                    
                    variants.push({
                        shape: 'Прямоугольный',
                        dimensions: `${Math.round(length * 10) / 10}см × ${Math.round(width * 10) / 10}см × ${height}см`,
                        length: Math.round(length * 10) / 10,
                        width: Math.round(width * 10) / 10,
                        height: height,
                        volume: actualVolume,
                        weight: actualWeight,
                        deviation: Math.abs(actualWeight - (requiredVolume * filling.density / 1000))
                    });
                }
            });
        });

        return variants.sort((a, b) => a.deviation - b.deviation).slice(0, 4);
    }

    /**
     * Вспомогательные функции для получения текстовых описаний
     */
    getShapeName(shape) {
        const names = {
            'round': 'Круглый торт',
            'square': 'Квадратный торт',
            'rectangular': 'Прямоугольный торт'
        };
        return names[shape] || 'Неизвестная форма';
    }

    getFormulaText(shape) {
        const formulas = {
            'round': 'Объем = π × (диаметр/2)² × высота',
            'square': 'Объем = сторона² × высота',
            'rectangular': 'Объем = длина × ширина × высота'
        };
        return formulas[shape] || '';
    }

    getCalculationText(shape, dimensions, volume, density, weight) {
        let calc = '';
        
        switch (shape) {
            case 'round':
                calc = `π × (${dimensions.diameter}/2)² × ${dimensions.height} = ${volume} см³`;
                break;
            case 'square':
                calc = `${dimensions.side}² × ${dimensions.height} = ${volume} см³`;
                break;
            case 'rectangular':
                calc = `${dimensions.length} × ${dimensions.width} × ${dimensions.height} = ${volume} см³`;
                break;
        }
        
        calc += `\nВес = ${volume} см³ × ${density} г/см³ = ${weight} кг`;
        return calc;
    }
}

// Создаем глобальный экземпляр калькулятора
const calculator = new CakeCalculator();