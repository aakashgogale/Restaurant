import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/*
  UI copy in three languages. Keys missing from AR/RU fall back to EN,
  so new copy can ship in English first. Menu dish names and guest
  quotes intentionally stay in English.
*/
const en = {
  skip: "Skip to content",
  nav: {
    story: "Story",
    dry: "Dry-aged bar",
    menu: "Menu",
    nights: "Terrace",
    gallery: "Gallery",
    visit: "Visit",
    reserve: "Reserve",
    open: "Menu",
    close: "Close",
    language: "Language",
  },
  hero: {
    place: "The Address Beach Resort · JBR · Floor M",
    lines: ["Modern Uzbek,", "above the Marina."],
    sub: "Modern Uzbek cuisine and dry-aged seafood, served on a terrace above Dubai Marina.",
    reserve: "Reserve a table",
    menu: "View menu",
    rating: "on Google",
    reviews: "3,700+ reviews",
    scroll: "Scroll",
    alt: "Dubai Marina towers at dusk",
  },
  story: {
    label: "The house",
    lines: ["Plov, charcoal", "and sea air."],
    p1: "OSH Del Mar sits on Floor M of The Address Beach Resort JBR, with panoramic terrace views over the Marina. It has become one of the top-rated restaurants in Dubai for modern Uzbek cooking and a premium seafood selection, served with impeccable care.",
    p2: "Charcoal-grilled meats and authentic plov share the table with dry-aged seabass and hamachi, alongside Eastern European classics given a contemporary touch. Premium ingredients, plated with restraint.",
    stats: [
      ["4.7", "Rating on Google"],
      ["3,700+", "Guest reviews"],
      ["1st", "Dry-aged fish bar in Dubai"],
    ],
  },
  dry: {
    label: "The dry-aged fish bar",
    lines: ["Time is", "an ingredient."],
    intro: "Dubai's first dry-aged fish bar. Ageing deepens the natural flavour of the fish and improves its texture, the same patience usually reserved for prime beef.",
    steps: [
      ["Whole fish", "Salmon, branzino and hamachi, aged whole and served by weight for the table."],
      ["Ageing", "Flavour concentrates and the flesh firms, giving a cleaner, deeper taste."],
      ["Fire", "Charcoal-grilled, Asian-style or steamed. Choose a sauce and a side."],
    ],
    weight: "By weight",
    per: "AED / 100 g",
    note: "Whole fish of 1.5 to 3 kg, to share.",
    cta: "See the dry-aged menu",
    alt: "Whole fish resting on ice",
  },
  sig: {
    label: "Signature plates",
    lines: ["Eight plates", "guests return for."],
    hint: "Drag to explore",
    prev: "Previous plate",
    next: "Next plate",
  },
  menu: {
    label: "The menu",
    title: "À la carte",
    note: "Prices in AED",
    more: "Also available",
    wine: "Wine list",
    bar: "Bar menu",
    cocktails: "Signature cocktails",
    tabs: "Menu sections",
  },
  offers: {
    label: "Daily, 2 – 6 PM",
    lines: ["Lunch on the terrace,", "two until six."],
    off: "off the à la carte menu",
    lunch: "Four-course business lunch",
    when: "Daily, 2 – 6 PM",
    from: "From",
    cta: "Reserve lunch",
    alt: "A set lunch table seen from above",
  },
  nights: {
    label: "Terrace & nights",
    lines: ["The terrace,", "after dark."],
    intro: "The legendary terrace parties return from 16 October, with resident DJs and special guests. DJ nights every Friday and Saturday, and shisha into the early hours.",
    upcoming: "Upcoming nights",
    book: "Book a table",
    note: "Special live nights are ticketed, with a minimum spend per table and prepayment.",
    alt: "A resort terrace at dusk",
    rows: [
      ["From 16 Oct", "Terrace season opens", "Resident DJs and special guests return to the terrace."],
      ["Every Friday", "DJ night", "Resident DJ on the terrace, dinner into late."],
      ["Every Saturday", "DJ night", "Resident DJ on the terrace, open until 3 AM."],
      ["Selected dates", "Special live nights", "Ticketed. Minimum spend from AED 5,000 per table, prepayment required."],
    ],
  },
  gallery: {
    label: "Gallery",
    lines: ["Moments from", "Floor M."],
    open: "Open image",
    close: "Close gallery",
    prev: "Previous image",
    next: "Next image",
  },
  reviews: {
    label: "Guests",
    lines: ["What guests", "mention most."],
    total: "3,700+ reviews on Google",
    caption: "Paraphrased from guest reviews on Google",
    prev: "Previous review",
    next: "Next review",
  },
  reserve: {
    label: "Reservations",
    lines: ["Reserve", "your table."],
    intro: "Share a few details and we will prepare a WhatsApp message for the team. For instant confirmation, book directly on SevenRooms.",
    sevenrooms: "Book on SevenRooms",
    call: "Or call",
    name: "Name",
    phone: "Phone",
    date: "Date",
    time: "Time",
    guests: "Guests",
    note: "Note",
    notePh: "Occasion, terrace preference, allergies",
    choose: "Choose",
    pickDate: "Pick a date first",
    large: "13+ (we will call you)",
    submit: "Prepare message",
    readyTitle: "Your request is ready.",
    readyText: "It opens in WhatsApp with everything filled in. Just press send.",
    send: "Send via WhatsApp",
    edit: "Edit details",
    errors: {
      name: "Please add your name.",
      phone: "Please add a phone number we can reach.",
      date: "Please choose today or a later date.",
      time: "Please choose a time.",
    },
  },
  visit: {
    label: "Visit",
    lines: ["Find us", "on Floor M."],
    address: "Address",
    hours: "Hours",
    weekdays: "Sun – Thu",
    weekend: "Fri – Sat",
    contact: "Phone & WhatsApp",
    email: "Email",
    follow: "Follow",
    directions: "Get directions",
    call: "Call",
    mapTitle: "Map showing The Address Beach Resort, Dubai Marina",
  },
  footer: {
    concept: "Concept redesign. Not the official website.",
    top: "Back to top",
  },
  mobile: { reserve: "Reserve a table", whatsapp: "WhatsApp" },
};

const ar = {
  skip: "انتقل إلى المحتوى",
  nav: {
    story: "حكايتنا",
    dry: "بار الأسماك المعتّقة",
    menu: "القائمة",
    nights: "التراس",
    gallery: "المعرض",
    visit: "زورونا",
    reserve: "احجز",
    open: "القائمة",
    close: "إغلاق",
    language: "اللغة",
  },
  hero: {
    place: "منتجع العنوان بيتش · جي بي آر · الطابق M",
    lines: ["مطبخ أوزبكي حديث،", "فوق مرسى دبي."],
    sub: "مطبخ أوزبكي حديث ومأكولات بحرية معتّقة، تُقدَّم على تراس يطل على مرسى دبي.",
    reserve: "احجز طاولة",
    menu: "اطّلع على القائمة",
    rating: "على Google",
    reviews: "أكثر من 3,700 تقييم",
    scroll: "مرّر",
  },
  story: {
    label: "المكان",
    lines: ["بلوف، وجمر،", "ونسيم البحر."],
    p1: "يقع أوش ديل مار في الطابق M من منتجع العنوان بيتش في جي بي آر، مع إطلالات بانورامية من التراس على المرسى. وأصبح من أعلى المطاعم تقييماً في دبي بفضل المطبخ الأوزبكي الحديث وتشكيلة المأكولات البحرية الفاخرة وخدمته المتقنة.",
    p2: "تلتقي اللحوم المشوية على الفحم والبلوف الأصيل مع سمك القاروص والهاماشي المعتّق، إلى جانب أطباق أوروبا الشرقية الكلاسيكية بلمسة معاصرة. مكوّنات فاخرة وتقديم أنيق.",
    stats: [
      ["4.7", "التقييم على Google"],
      ["+3,700", "تقييم من الضيوف"],
      ["الأول", "بار أسماك معتّقة في دبي"],
    ],
  },
  dry: {
    label: "بار الأسماك المعتّقة",
    lines: ["الوقت", "مكوّن أساسي."],
    intro: "أول بار للأسماك المعتّقة في دبي. يعمّق التعتيق النكهة الطبيعية للسمك ويحسّن قوامه.",
    steps: [
      ["السمكة كاملة", "سلمون وقاروص وهاماشي، تُعتّق كاملة وتُقدَّم بالوزن للمشاركة."],
      ["التعتيق", "تتركّز النكهة ويتماسك اللحم، فيصبح الطعم أنقى وأعمق."],
      ["النار", "مشوي على الفحم، أو على الطريقة الآسيوية، أو على البخار. اختر الصلصة والطبق الجانبي."],
    ],
    weight: "بالوزن",
    per: "درهم / 100 غ",
    note: "سمكة كاملة من 1.5 إلى 3 كغ، للمشاركة.",
    cta: "قائمة الأسماك المعتّقة",
  },
  sig: { label: "الأطباق المميّزة", lines: ["ثمانية أطباق", "يعود الضيوف لأجلها."], hint: "اسحب للاستكشاف" },
  menu: {
    label: "القائمة",
    title: "الأطباق",
    note: "الأسعار بالدرهم",
    more: "متوفر أيضاً",
    wine: "قائمة النبيذ",
    bar: "قائمة البار",
    cocktails: "الكوكتيلات المميّزة",
  },
  offers: {
    label: "يومياً، 2 – 6 مساءً",
    lines: ["غداء على التراس،", "من الثانية حتى السادسة."],
    off: "خصم على قائمة الأطباق",
    lunch: "غداء عمل من أربعة أطباق",
    when: "يومياً، 2 – 6 مساءً",
    from: "ابتداءً من",
    cta: "احجز الغداء",
  },
  nights: {
    label: "التراس والسهرات",
    lines: ["التراس", "بعد الغروب."],
    intro: "تعود حفلات التراس الشهيرة ابتداءً من 16 أكتوبر مع منسّقي موسيقى مقيمين وضيوف مميّزين. سهرات DJ كل جمعة وسبت.",
    upcoming: "السهرات القادمة",
    book: "احجز طاولة",
    note: "السهرات الحيّة الخاصة بتذاكر، مع حد أدنى للإنفاق لكل طاولة ودفع مسبق.",
    rows: [
      ["من 16 أكتوبر", "افتتاح موسم التراس", "عودة منسّقي الموسيقى المقيمين والضيوف المميّزين."],
      ["كل جمعة", "سهرة DJ", "منسّق موسيقى مقيم على التراس."],
      ["كل سبت", "سهرة DJ", "منسّق موسيقى مقيم، حتى الثالثة فجراً."],
      ["مواعيد مختارة", "سهرات حيّة خاصة", "بتذاكر. حد أدنى للإنفاق من 5,000 درهم لكل طاولة، مع دفع مسبق."],
    ],
  },
  gallery: { label: "المعرض", lines: ["لحظات من", "الطابق M."] },
  reviews: {
    label: "الضيوف",
    lines: ["ما يذكره", "ضيوفنا دائماً."],
    total: "أكثر من 3,700 تقييم على Google",
    caption: "بتصرّف من تقييمات الضيوف على Google",
  },
  reserve: {
    label: "الحجوزات",
    lines: ["احجز", "طاولتك."],
    intro: "شاركنا بعض التفاصيل وسنجهّز رسالة واتساب للفريق. للتأكيد الفوري، احجز مباشرة عبر SevenRooms.",
    sevenrooms: "احجز عبر SevenRooms",
    call: "أو اتصل",
    name: "الاسم",
    phone: "الهاتف",
    date: "التاريخ",
    time: "الوقت",
    guests: "عدد الضيوف",
    note: "ملاحظة",
    notePh: "مناسبة، تفضيل التراس، حساسية",
    choose: "اختر",
    pickDate: "اختر التاريخ أولاً",
    large: "+13 (سنتصل بك)",
    submit: "جهّز الرسالة",
    readyTitle: "طلبك جاهز.",
    readyText: "سيفتح في واتساب بكل التفاصيل. فقط اضغط إرسال.",
    send: "أرسل عبر واتساب",
    edit: "تعديل التفاصيل",
    errors: {
      name: "يرجى إضافة اسمك.",
      phone: "يرجى إضافة رقم هاتف للتواصل.",
      date: "يرجى اختيار اليوم أو تاريخ لاحق.",
      time: "يرجى اختيار الوقت.",
    },
  },
  visit: {
    label: "زورونا",
    lines: ["تجدوننا", "في الطابق M."],
    address: "العنوان",
    hours: "ساعات العمل",
    weekdays: "الأحد – الخميس",
    weekend: "الجمعة – السبت",
    contact: "الهاتف وواتساب",
    email: "البريد الإلكتروني",
    follow: "تابعونا",
    directions: "الاتجاهات",
    call: "اتصل",
  },
  footer: { concept: "تصميم مقترح. ليس الموقع الرسمي.", top: "إلى الأعلى" },
  mobile: { reserve: "احجز طاولة", whatsapp: "واتساب" },
};

const ru = {
  skip: "Перейти к содержанию",
  nav: {
    story: "О нас",
    dry: "Выдержанная рыба",
    menu: "Меню",
    nights: "Терраса",
    gallery: "Галерея",
    visit: "Контакты",
    reserve: "Бронь",
    open: "Меню",
    close: "Закрыть",
    language: "Язык",
  },
  hero: {
    place: "The Address Beach Resort · JBR · этаж M",
    lines: ["Узбекская кухня,", "над Dubai Marina."],
    sub: "Современная узбекская кухня и морепродукты сухой выдержки на террасе с видом на Dubai Marina.",
    reserve: "Забронировать стол",
    menu: "Смотреть меню",
    rating: "в Google",
    reviews: "более 3 700 отзывов",
    scroll: "Вниз",
  },
  story: {
    label: "О ресторане",
    lines: ["Плов, угли", "и морской воздух."],
    p1: "OSH Del Mar находится на этаже M отеля The Address Beach Resort JBR, с панорамной террасой над Marina. Это один из самых высоко оценённых ресторанов Дубая: современная узбекская кухня, премиальные морепродукты и безупречный сервис.",
    p2: "Мясо на углях и настоящий плов соседствуют с выдержанным сибасом и хамачи, а также с классикой восточноевропейской кухни в современном прочтении. Лучшие продукты и сдержанная подача.",
    stats: [
      ["4.7", "Рейтинг в Google"],
      ["3 700+", "Отзывов гостей"],
      ["Первый", "бар выдержанной рыбы в Дубае"],
    ],
  },
  dry: {
    label: "Бар выдержанной рыбы",
    lines: ["Время —", "тоже ингредиент."],
    intro: "Первый в Дубае бар рыбы сухой выдержки. Выдержка раскрывает естественный вкус рыбы и делает её текстуру лучше.",
    steps: [
      ["Целая рыба", "Лосось, сибас и хамачи выдерживаются целиком и подаются на вес, на всю компанию."],
      ["Выдержка", "Вкус становится насыщеннее, мякоть плотнее, послевкусие чище."],
      ["Огонь", "На углях, по-азиатски или на пару. Выберите соус и гарнир."],
    ],
    weight: "На вес",
    per: "AED / 100 г",
    note: "Целая рыба весом 1,5–3 кг, на компанию.",
    cta: "Меню выдержанной рыбы",
  },
  sig: { label: "Фирменные блюда", lines: ["Восемь блюд,", "ради которых возвращаются."], hint: "Листайте" },
  menu: {
    label: "Меню",
    title: "А-ля карт",
    note: "Цены в AED",
    more: "Также",
    wine: "Винная карта",
    bar: "Барное меню",
    cocktails: "Авторские коктейли",
  },
  offers: {
    label: "Ежедневно, 14:00 – 18:00",
    lines: ["Обед на террасе,", "с двух до шести."],
    off: "скидка на меню а-ля карт",
    lunch: "Бизнес-ланч из четырёх блюд",
    when: "Ежедневно, 14:00 – 18:00",
    from: "От",
    cta: "Забронировать обед",
  },
  nights: {
    label: "Терраса и вечера",
    lines: ["Терраса", "после заката."],
    intro: "Легендарные вечеринки на террасе возвращаются с 16 октября: резидентные диджеи и специальные гости. DJ-вечера каждую пятницу и субботу.",
    upcoming: "Ближайшие вечера",
    book: "Забронировать",
    note: "Специальные live-вечера по билетам, с минимальным депозитом на стол и предоплатой.",
    rows: [
      ["С 16 октября", "Открытие сезона террасы", "Резидентные диджеи и специальные гости."],
      ["Каждую пятницу", "DJ-вечер", "Резидентный диджей на террасе."],
      ["Каждую субботу", "DJ-вечер", "Резидентный диджей, открыто до 3:00."],
      ["Отдельные даты", "Специальные live-вечера", "По билетам. Депозит от AED 5 000 на стол, предоплата."],
    ],
  },
  gallery: { label: "Галерея", lines: ["Моменты", "с этажа M."] },
  reviews: {
    label: "Гости",
    lines: ["О чём гости", "пишут чаще всего."],
    total: "Более 3 700 отзывов в Google",
    caption: "Пересказ отзывов гостей в Google",
  },
  reserve: {
    label: "Бронирование",
    lines: ["Забронируйте", "стол."],
    intro: "Оставьте пару деталей, и мы подготовим сообщение для команды в WhatsApp. Для мгновенного подтверждения бронируйте через SevenRooms.",
    sevenrooms: "Бронь в SevenRooms",
    call: "Или позвоните",
    name: "Имя",
    phone: "Телефон",
    date: "Дата",
    time: "Время",
    guests: "Гостей",
    note: "Комментарий",
    notePh: "Повод, терраса, аллергии",
    choose: "Выбрать",
    pickDate: "Сначала выберите дату",
    large: "13+ (мы перезвоним)",
    submit: "Подготовить сообщение",
    readyTitle: "Запрос готов.",
    readyText: "Он откроется в WhatsApp уже заполненным. Осталось нажать «Отправить».",
    send: "Отправить в WhatsApp",
    edit: "Изменить",
    errors: {
      name: "Укажите имя.",
      phone: "Укажите номер телефона.",
      date: "Выберите сегодняшнюю или более позднюю дату.",
      time: "Выберите время.",
    },
  },
  visit: {
    label: "Контакты",
    lines: ["Ждём вас", "на этаже M."],
    address: "Адрес",
    hours: "Часы работы",
    weekdays: "Вс – Чт",
    weekend: "Пт – Сб",
    contact: "Телефон и WhatsApp",
    email: "Почта",
    follow: "Соцсети",
    directions: "Маршрут",
    call: "Позвонить",
  },
  footer: { concept: "Концепт редизайна. Не официальный сайт.", top: "Наверх" },
  mobile: { reserve: "Забронировать", whatsapp: "WhatsApp" },
};

const dictionaries = { en, ar, ru };
export const LANGS = [
  { code: "en", label: "EN", dir: "ltr" },
  { code: "ar", label: "عربي", dir: "rtl" },
  { code: "ru", label: "RU", dir: "ltr" },
];

const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

const I18nContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem("osh-lang");
    if (saved && dictionaries[saved]) return saved;
  } catch {
    /* storage unavailable */
  }
  return "en";
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);
  const dir = LANGS.find((l) => l.code === lang).dir;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((code) => {
    setLangState(code);
    try {
      localStorage.setItem("osh-lang", code);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const t = useCallback((key) => get(dictionaries[lang], key) ?? get(en, key) ?? key, [lang]);

  const value = useMemo(() => ({ lang, dir, setLang, t }), [lang, dir, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
