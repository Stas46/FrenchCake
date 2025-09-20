// База данных начинок для тортов
// Каждая начинка имеет: название, плотность (г/см³), стандартные параметры
const FILLINGS_DATABASE = {
    "biskuit_vanilla": {
        name: "Бисквит ванильный",
        density: 0.45, // г/см³
        category: "Бисквитные",
        description: "Классический ванильный бисквит",
        standardHeight: 6, // см
        standardDiameter: 20, // см для круглого
        standardWeight: 0.1 // кг (приблизительно)
    },
    "biskuit_chocolate": {
        name: "Бисквит шоколадный",
        density: 0.48,
        category: "Бисквитные", 
        description: "Насыщенный шоколадный бисквит",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "sponge_classic": {
        name: "Губка классическая",
        density: 0.35,
        category: "Губчатые",
        description: "Легкая воздушная основа",
        standardHeight: 5,
        standardDiameter: 18,
        standardWeight: 0.09
    },
    "choux_cream": {
        name: "Заварное тесто",
        density: 0.55,
        category: "Заварные",
        description: "Заварная основа для эклеров и профитролей",
        standardHeight: 4,
        standardDiameter: 15,
        standardWeight: 0.08
    },
    "shortbread": {
        name: "Песочное тесто",
        density: 0.65,
        category: "Песочные",
        description: "Рассыпчатое песочное тесто",
        standardHeight: 3,
        standardDiameter: 22,
        standardWeight: 0.12
    },
    "puff_pastry": {
        name: "Слоеное тесто",
        density: 0.58,
        category: "Слоеные",
        description: "Многослойное слоеное тесто",
        standardHeight: 4,
        standardDiameter: 20,
        standardWeight: 0.11
    },
    "honey_cake": {
        name: "Медовый корж",
        density: 0.52,
        category: "Медовые",
        description: "Традиционный медовый корж",
        standardHeight: 5,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "napoleon": {
        name: "Наполеон",
        density: 0.42,
        category: "Слоеные",
        description: "Тонкие коржи для торта Наполеон",
        standardHeight: 3,
        standardDiameter: 22,
        standardWeight: 0.09
    },
    "red_velvet": {
        name: "Красный бархат",
        density: 0.46,
        category: "Бисквитные",
        description: "Нежный красный бисквит",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "carrot_cake": {
        name: "Морковный бисквит",
        density: 0.53,
        category: "Фруктовые",
        description: "Влажный морковный бисквит",
        standardHeight: 7,
        standardDiameter: 20,
        standardWeight: 0.11
    },
    "lemon_cake": {
        name: "Лимонный бисквит",
        density: 0.44,
        category: "Цитрусовые",
        description: "Легкий лимонный бисквит",
        standardHeight: 6,
        standardDiameter: 18,
        standardWeight: 0.09
    },
    "coconut_cake": {
        name: "Кокосовый бисквит",
        density: 0.47,
        category: "Ореховые",
        description: "Ароматный кокосовый бисквит",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "almond_cake": {
        name: "Миндальный бисквит",
        density: 0.51,
        category: "Ореховые",
        description: "Нежный миндальный бисквит",
        standardHeight: 5,
        standardDiameter: 18,
        standardWeight: 0.1
    },
    "walnut_cake": {
        name: "Ореховый бисквит",
        density: 0.54,
        category: "Ореховые",
        description: "Насыщенный ореховый вкус",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.11
    },
    "coffee_cake": {
        name: "Кофейный бисквит",
        density: 0.49,
        category: "Кофейные",
        description: "Ароматный кофейный бисквит",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "tiramisu_base": {
        name: "Основа Тирамису",
        density: 0.41,
        category: "Кофейные",
        description: "Легкая основа для тирамису",
        standardHeight: 4,
        standardDiameter: 18,
        standardWeight: 0.08
    },
    "cheesecake_base": {
        name: "Основа чизкейка",
        density: 0.68,
        category: "Творожные",
        description: "Плотная творожная основа",
        standardHeight: 8,
        standardDiameter: 22,
        standardWeight: 0.15
    },
    "brownie_base": {
        name: "Браuni основа",
        density: 0.62,
        category: "Шоколадные",
        description: "Плотная шоколадная основа",
        standardHeight: 4,
        standardDiameter: 20,
        standardWeight: 0.12
    },
    "fruit_sponge": {
        name: "Фруктовая губка",
        density: 0.38,
        category: "Фруктовые",
        description: "Легкая основа с фруктами",
        standardHeight: 5,
        standardDiameter: 18,
        standardWeight: 0.09
    },
    "berry_cake": {
        name: "Ягодный бисквит",
        density: 0.43,
        category: "Ягодные",
        description: "Нежный бисквит с ягодами",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "banana_cake": {
        name: "Банановый бисквит",
        density: 0.5,
        category: "Фруктовые",
        description: "Влажный банановый бисквит",
        standardHeight: 7,
        standardDiameter: 20,
        standardWeight: 0.11
    },
    "orange_cake": {
        name: "Апельсиновый бисквит",
        density: 0.45,
        category: "Цитрусовые",
        description: "Яркий апельсиновый вкус",
        standardHeight: 6,
        standardDiameter: 18,
        standardWeight: 0.09
    },
    "strawberry_cake": {
        name: "Клубничный бисквит",
        density: 0.44,
        category: "Ягодные",
        description: "Нежный клубничный бисквит",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "pistachio_cake": {
        name: "Фисташковый бисквит",
        density: 0.52,
        category: "Ореховые",
        description: "Изысканный фисташковый вкус",
        standardHeight: 5,
        standardDiameter: 18,
        standardWeight: 0.1
    },
    "matcha_cake": {
        name: "Бисквит матча",
        density: 0.46,
        category: "Чайные",
        description: "Зеленый чай матча",
        standardHeight: 6,
        standardDiameter: 18,
        standardWeight: 0.1
    },
    "rum_cake": {
        name: "Ромовый бисквит",
        density: 0.48,
        category: "Алкогольные",
        description: "Ароматный ромовый бисквит",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "lavender_cake": {
        name: "Лавандовый бисквит",
        density: 0.43,
        category: "Цветочные",
        description: "Деликатный лавандовый аромат",
        standardHeight: 5,
        standardDiameter: 18,
        standardWeight: 0.09
    }
};

// Функция для получения списка всех начинок
function getAllFillings() {
    return Object.entries(FILLINGS_DATABASE).map(([key, filling]) => ({
        key,
        ...filling
    }));
}

// Функция для получения начинки по ключу
function getFilling(key) {
    return FILLINGS_DATABASE[key];
}

// Функция для получения начинок по категории
function getFillingsByCategory(category) {
    return Object.entries(FILLINGS_DATABASE)
        .filter(([key, filling]) => filling.category === category)
        .map(([key, filling]) => ({
            key,
            ...filling
        }));
}

// Функция для получения всех категорий
function getCategories() {
    const categories = [...new Set(Object.values(FILLINGS_DATABASE).map(filling => filling.category))];
    return categories.sort();
}

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FILLINGS_DATABASE,
        getAllFillings,
        getFilling,
        getFillingsByCategory,
        getCategories
    };
}