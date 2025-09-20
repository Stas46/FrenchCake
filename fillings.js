// База данных начинок для кондитерской FrenchCake
// Реальные начинки с измеренной плотностью
const FILLINGS_DATABASE = {
    "malinovaya": {
        name: "Малиновая",
        density: 0.721791125,
        category: "Ягодные",
        description: "Нежная малиновая начинка",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "limonnaya_vanil": {
        name: "Лимонная ваниль",
        density: 0.721791125,
        category: "Цитрусовые",
        description: "Сочетание лимона и ванили",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "nezhnaya_vanil": {
        name: "Нежная ваниль",
        density: 0.591737488,
        category: "Ванильные",
        description: "Классическая нежная ваниль",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "krasny_barhat": {
        name: "Красный бархат",
        density: 0.649612013,
        category: "Бисквитные",
        description: "Знаменитый красный бархатный торт",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "shokoladny_biskuit": {
        name: "Шоколадный бисквит",
        density: 0.608273066,
        category: "Шоколадные",
        description: "Классический шоколадный бисквит",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "dvoynoy_shokolad": {
        name: "Двойной шоколад",
        density: 0.721791125,
        category: "Шоколадные",
        description: "Интенсивный двойной шоколад",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "medovik": {
        name: "Медовик",
        density: 0.649612013,
        category: "Медовые",
        description: "Традиционный медовый торт",
        standardHeight: 5,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "banan_finik": {
        name: "Банан-финик",
        density: 0.649612013,
        category: "Фруктовые",
        description: "Экзотическое сочетание банана и фиников",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "fistashka_malina": {
        name: "Фисташка малина",
        density: 0.647013565,
        category: "Ореховые",
        description: "Изысканное сочетание фисташек и малины",
        standardHeight: 5,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "solenaya_karamel": {
        name: "Соленая карамель",
        density: 0.590556375,
        category: "Карамельные",
        description: "Модная соленая карамель",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "esterhazy": {
        name: "Эстерхази",
        density: 0.487209009,
        category: "Ореховые",
        description: "Венгерский ореховый торт",
        standardHeight: 4,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "snikers": {
        name: "Сникерс",
        density: 0.649612013,
        category: "Карамельные",
        description: "Как знаменитый батончик",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "karamel_3d": {
        name: "3D карамель",
        density: 0.928017161,
        category: "Карамельные",
        description: "Объемная карамельная начинка",
        standardHeight: 7,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "shokolad_3d": {
        name: "3D шоколад",
        density: 0.928017161,
        category: "Шоколадные",
        description: "Объемная шоколадная начинка",
        standardHeight: 7,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "muss_mango_marakuyya": {
        name: "Мусс манго маракуйя",
        density: 0.590556375,
        category: "Муссовые",
        description: "Легкий тропический мусс",
        standardHeight: 8,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "klubnichno_yogurt": {
        name: "Клубнично йогуртовый",
        density: 0.649612013,
        category: "Ягодные",
        description: "Свежий клубнично-йогуртовый",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "sent_onore": {
        name: "Сент-оноре",
        density: 0.721791125,
        category: "Заварные",
        description: "Классический французский торт",
        standardHeight: 8,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "morkovnaya": {
        name: "Морковная",
        density: 0.721791125,
        category: "Овощные",
        description: "Влажный морковный торт",
        standardHeight: 7,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "kruassan_kofe": {
        name: "Круассан с кофе",
        density: 1.082686688,
        category: "Кофейные",
        description: "Слоеная кофейная начинка",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "madlen_ris_puding": {
        name: "Мадлен с рисовым пудингом",
        density: 0.721791125,
        category: "Заварные",
        description: "Нежный мадлен с рисовым кремом",
        standardHeight: 5,
        standardDiameter: 18,
        standardWeight: 0.1
    },
    "klubnichny_cheesecake": {
        name: "Клубничный чизкейк",
        density: 0.928017161,
        category: "Творожные",
        description: "Плотный клубничный чизкейк",
        standardHeight: 8,
        standardDiameter: 22,
        standardWeight: 0.15
    },
    "vishnevy_makarons": {
        name: "Вишневый макаронс",
        density: 0.649612013,
        category: "Ягодные",
        description: "Нежный вишневый макаронс",
        standardHeight: 4,
        standardDiameter: 18,
        standardWeight: 0.1
    },
    "cherny_les": {
        name: "Черный лес",
        density: 0.590556375,
        category: "Шоколадные",
        description: "Классический черный лес",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "tryufel": {
        name: "Трюфель",
        density: 0.781564453,
        category: "Шоколадные",
        description: "Богатый шоколадный трюфель",
        standardHeight: 5,
        standardDiameter: 18,
        standardWeight: 0.1
    },
    "napoleon": {
        name: "Наполеон",
        density: 1.082686688,
        category: "Слоеные",
        description: "Классический наполеон",
        standardHeight: 6,
        standardDiameter: 22,
        standardWeight: 0.12
    },
    "toffi_plombir": {
        name: "Тоффи пломбир",
        density: 0.649612013,
        category: "Карамельные",
        description: "Кремовый тоффи-пломбир",
        standardHeight: 6,
        standardDiameter: 20,
        standardWeight: 0.1
    },
    "ekler": {
        name: "Эклер",
        density: 0.721791125,
        category: "Заварные",
        description: "Заварная основа эклера",
        standardHeight: 4,
        standardDiameter: 15,
        standardWeight: 0.08
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