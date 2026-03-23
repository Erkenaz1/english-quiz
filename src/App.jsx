import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, RotateCcw, Search, BookOpen, Keyboard, ListChecks, Layers3, Eye, BookCopy } from "lucide-react";

const VOCAB = [
  // Lesson 1
  { en: "constantly", tr: "постоянно", lesson: "Lesson 1", category: "Frequency" },
  { en: "at all times", tr: "всегда, во все времена", lesson: "Lesson 1", category: "Frequency" },
  { en: "without fail", tr: "обязательно, без пропуска", lesson: "Lesson 1", category: "Frequency" },
  { en: "every time", tr: "каждый раз", lesson: "Lesson 1", category: "Frequency" },
  { en: "commonly", tr: "обычно, нередко", lesson: "Lesson 1", category: "Frequency" },
  { en: "typically", tr: "типично, обычно", lesson: "Lesson 1", category: "Frequency" },
  { en: "habitually", tr: "по привычке", lesson: "Lesson 1", category: "Frequency" },
  { en: "as a rule", tr: "как правило", lesson: "Lesson 1", category: "Frequency" },
  { en: "most of the time", tr: "большую часть времени", lesson: "Lesson 1", category: "Frequency" },
  { en: "in most cases", tr: "в большинстве случаев", lesson: "Lesson 1", category: "Frequency" },
  { en: "ordinarily", tr: "обычно", lesson: "Lesson 1", category: "Frequency" },
  { en: "for the most part", tr: "по большей части", lesson: "Lesson 1", category: "Frequency" },
  { en: "on the whole", tr: "в целом", lesson: "Lesson 1", category: "Frequency" },
  { en: "from time to time", tr: "время от времени", lesson: "Lesson 1", category: "Frequency" },
  { en: "every now and then", tr: "иногда", lesson: "Lesson 1", category: "Frequency" },
  { en: "now and again", tr: "время от времени", lesson: "Lesson 1", category: "Frequency" },
  { en: "at times", tr: "иногда", lesson: "Lesson 1", category: "Frequency" },
  { en: "off and on", tr: "время от времени", lesson: "Lesson 1", category: "Frequency" },
  { en: "uncommonly", tr: "редко", lesson: "Lesson 1", category: "Frequency" },
  { en: "not often", tr: "нечасто", lesson: "Lesson 1", category: "Frequency" },
  { en: "once in a while", tr: "изредка", lesson: "Lesson 1", category: "Frequency" },
  { en: "every so often", tr: "время от времени", lesson: "Lesson 1", category: "Frequency" },
  { en: "barely", tr: "едва", lesson: "Lesson 1", category: "Frequency" },
  { en: "scarcely", tr: "почти не", lesson: "Lesson 1", category: "Frequency" },
  { en: "almost never", tr: "почти никогда", lesson: "Lesson 1", category: "Frequency" },
  { en: "once in a blue moon", tr: "крайне редко", lesson: "Lesson 1", category: "Frequency" },
  { en: "few and far between", tr: "очень редко", lesson: "Lesson 1", category: "Frequency" },
  { en: "at the moment", tr: "в данный момент", lesson: "Lesson 1", category: "Frequency" },
  { en: "at present", tr: "в настоящее время", lesson: "Lesson 1", category: "Frequency" },
  { en: "currently", tr: "сейчас", lesson: "Lesson 1", category: "Frequency" },
  { en: "nowadays", tr: "в наши дни", lesson: "Lesson 1", category: "Frequency" },
  { en: "these days", tr: "в эти дни", lesson: "Lesson 1", category: "Frequency" },
  { en: "for the time being", tr: "пока что", lesson: "Lesson 1", category: "Frequency" },
  { en: "I enjoy", tr: "мне нравится", lesson: "Lesson 1", category: "Feelings" },
  { en: "I appreciate", tr: "я ценю", lesson: "Lesson 1", category: "Feelings" },
  { en: "I am fond of", tr: "я люблю", lesson: "Lesson 1", category: "Feelings" },
  { en: "I am keen on", tr: "я увлечён", lesson: "Lesson 1", category: "Feelings" },
  { en: "I have a soft spot for", tr: "я питаю слабость к", lesson: "Lesson 1", category: "Feelings" },
  { en: "I relish", tr: "я очень люблю", lesson: "Lesson 1", category: "Feelings" },
  { en: "I take pleasure in", tr: "я получаю удовольствие от", lesson: "Lesson 1", category: "Feelings" },
  { en: "I am passionate about", tr: "я сильно увлечён", lesson: "Lesson 1", category: "Feelings" },
  { en: "I am crazy about", tr: "я без ума от", lesson: "Lesson 1", category: "Feelings" },
  { en: "I am obsessed with", tr: "я одержим", lesson: "Lesson 1", category: "Feelings" },
  { en: "I am deeply fond of", tr: "я очень люблю", lesson: "Lesson 1", category: "Feelings" },
  { en: "I worship", tr: "я обожаю", lesson: "Lesson 1", category: "Feelings" },
  { en: "I cherish", tr: "я дорожу", lesson: "Lesson 1", category: "Feelings" },
  { en: "I dislike", tr: "мне не нравится", lesson: "Lesson 1", category: "Feelings" },
  { en: "I am not a fan of", tr: "я не фанат", lesson: "Lesson 1", category: "Feelings" },
  { en: "I can't stand", tr: "я не выношу", lesson: "Lesson 1", category: "Feelings" },
  { en: "I despise", tr: "я презираю", lesson: "Lesson 1", category: "Feelings" },
  { en: "I loathe", tr: "я ненавижу", lesson: "Lesson 1", category: "Feelings" },
  { en: "I have an aversion to", tr: "у меня отвращение к", lesson: "Lesson 1", category: "Feelings" },
  { en: "I detest", tr: "я терпеть не могу", lesson: "Lesson 1", category: "Feelings" },

  // Lesson 2
  { en: "passport", tr: "паспорт", lesson: "Lesson 2", category: "Travel core" },
  { en: "ticket", tr: "билет", lesson: "Lesson 2", category: "Travel core" },
  { en: "suitcase", tr: "чемодан", lesson: "Lesson 2", category: "Travel core" },
  { en: "backpack", tr: "рюкзак", lesson: "Lesson 2", category: "Travel core" },
  { en: "camera", tr: "камера", lesson: "Lesson 2", category: "Travel core" },
  { en: "guidebook", tr: "путеводитель", lesson: "Lesson 2", category: "Travel core" },
  { en: "map", tr: "карта", lesson: "Lesson 2", category: "Travel core" },
  { en: "sunscreen", tr: "солнцезащитный крем", lesson: "Lesson 2", category: "Travel core" },
  { en: "sunglasses", tr: "очки", lesson: "Lesson 2", category: "Travel core" },
  { en: "travel pillow", tr: "дорожная подушка", lesson: "Lesson 2", category: "Travel core" },
  { en: "headphones", tr: "наушники", lesson: "Lesson 2", category: "Travel core" },
  { en: "converter", tr: "конвертер", lesson: "Lesson 2", category: "Travel core" },
  { en: "adapter", tr: "адаптер", lesson: "Lesson 2", category: "Travel core" },
  { en: "charger", tr: "зарядка", lesson: "Lesson 2", category: "Travel core" },
  { en: "cash", tr: "наличные", lesson: "Lesson 2", category: "Travel core" },
  { en: "credit card", tr: "кредитная карта", lesson: "Lesson 2", category: "Travel core" },
  { en: "ID card", tr: "удостоверение личности", lesson: "Lesson 2", category: "Travel core" },
  { en: "visa", tr: "виза", lesson: "Lesson 2", category: "Travel core" },
  { en: "itinerary", tr: "маршрут", lesson: "Lesson 2", category: "Travel core" },
  { en: "reservation", tr: "бронь", lesson: "Lesson 2", category: "Travel core" },
  { en: "travel", tr: "путешествовать", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "explore", tr: "исследовать", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "visit", tr: "посетить", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "see", tr: "видеть", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "experience", tr: "испытывать", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "stay", tr: "останавливаться", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "pack", tr: "собирать вещи", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "plan", tr: "планировать", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "book", tr: "бронировать", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "fly", tr: "летать", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "drive", tr: "водить", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "walk", tr: "гулять", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "hike", tr: "ходить в поход", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "cruise", tr: "путешествовать на круизе", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "adventure", tr: "приключение", lesson: "Lesson 2", category: "Travel verbs" },
  { en: "carry-on bag", tr: "ручная кладь", lesson: "Lesson 2", category: "Packing" },
  { en: "duffel bag", tr: "дорожная сумка", lesson: "Lesson 2", category: "Packing" },
  { en: "toiletry bag", tr: "косметичка", lesson: "Lesson 2", category: "Packing" },
  { en: "shirts", tr: "рубашки", lesson: "Lesson 2", category: "Packing" },
  { en: "pants", tr: "брюки", lesson: "Lesson 2", category: "Packing" },
  { en: "shorts", tr: "шорты", lesson: "Lesson 2", category: "Packing" },
  { en: "underwear", tr: "нижнее бельё", lesson: "Lesson 2", category: "Packing" },
  { en: "socks", tr: "носки", lesson: "Lesson 2", category: "Packing" },
  { en: "jacket", tr: "куртка", lesson: "Lesson 2", category: "Packing" },
  { en: "hat", tr: "головной убор", lesson: "Lesson 2", category: "Packing" },
  { en: "scarf", tr: "шарф", lesson: "Lesson 2", category: "Packing" },
  { en: "gloves", tr: "перчатки", lesson: "Lesson 2", category: "Packing" },
  { en: "shoes", tr: "обувь", lesson: "Lesson 2", category: "Packing" },
  { en: "sandals", tr: "сандалии", lesson: "Lesson 2", category: "Packing" },
  { en: "sneakers", tr: "кроссовки", lesson: "Lesson 2", category: "Packing" },
  { en: "hiking boots", tr: "походные ботинки", lesson: "Lesson 2", category: "Packing" },
  { en: "toothbrush", tr: "зубная щётка", lesson: "Lesson 2", category: "Packing" },
  { en: "toothpaste", tr: "зубная паста", lesson: "Lesson 2", category: "Packing" },
  { en: "shampoo", tr: "шампунь", lesson: "Lesson 2", category: "Packing" },
  { en: "conditioner", tr: "кондиционер для волос", lesson: "Lesson 2", category: "Packing" },
  { en: "soap", tr: "мыло", lesson: "Lesson 2", category: "Packing" },
  { en: "razor", tr: "бритва", lesson: "Lesson 2", category: "Packing" },
  { en: "deodorant", tr: "дезодорант", lesson: "Lesson 2", category: "Packing" },
  { en: "driver's license", tr: "водительские права", lesson: "Lesson 2", category: "Packing" },
  { en: "travel insurance", tr: "страховка для путешествия", lesson: "Lesson 2", category: "Packing" },
  { en: "phone", tr: "телефон", lesson: "Lesson 2", category: "Packing" },
  { en: "laptop", tr: "ноутбук", lesson: "Lesson 2", category: "Packing" },
  { en: "power bank", tr: "пауэрбанк", lesson: "Lesson 2", category: "Packing" },
  { en: "eye mask", tr: "маска для сна", lesson: "Lesson 2", category: "Packing" },
  { en: "earplugs", tr: "беруши", lesson: "Lesson 2", category: "Packing" },
  { en: "travel-sized laundry detergent", tr: "дорожное средство для стирки", lesson: "Lesson 2", category: "Packing" },
  { en: "travel adapter", tr: "дорожный адаптер", lesson: "Lesson 2", category: "Packing" },
  { en: "travel guidebook", tr: "туристический путеводитель", lesson: "Lesson 2", category: "Packing" },
  { en: "maps", tr: "карты", lesson: "Lesson 2", category: "Packing" },
  { en: "language phrasebook", tr: "разговорник", lesson: "Lesson 2", category: "Packing" },
  { en: "pen and notebook", tr: "ручка и блокнот", lesson: "Lesson 2", category: "Packing" },
  { en: "first aid kit", tr: "аптечка", lesson: "Lesson 2", category: "Packing" },
  { en: "prescription medications", tr: "лекарства по рецепту", lesson: "Lesson 2", category: "Packing" },
  { en: "insect repellent", tr: "средство от насекомых", lesson: "Lesson 2", category: "Packing" },
  { en: "wallet", tr: "кошелёк", lesson: "Lesson 2", category: "Packing" },
  { en: "money belt", tr: "пояс-кошелёк", lesson: "Lesson 2", category: "Packing" },
  { en: "books", tr: "книги", lesson: "Lesson 2", category: "Packing" },
  { en: "e-reader", tr: "электронная книга", lesson: "Lesson 2", category: "Packing" },
  { en: "playing cards", tr: "игральные карты", lesson: "Lesson 2", category: "Packing" },
  { en: "travel games", tr: "дорожные игры", lesson: "Lesson 2", category: "Packing" },
  { en: "water bottle", tr: "бутылка воды", lesson: "Lesson 2", category: "Packing" },
  { en: "snacks", tr: "перекусы", lesson: "Lesson 2", category: "Packing" },
  { en: "reusable shopping bag", tr: "многоразовая сумка", lesson: "Lesson 2", category: "Packing" },
  { en: "umbrella", tr: "зонт", lesson: "Lesson 2", category: "Packing" },
  { en: "travel locks", tr: "дорожные замки", lesson: "Lesson 2", category: "Packing" },
  { en: "plastic bags", tr: "пластиковые пакеты", lesson: "Lesson 2", category: "Packing" },

  // Lesson 3
  { en: "hotel", tr: "отель", lesson: "Lesson 3", category: "Accommodation" },
  { en: "motel", tr: "мотель", lesson: "Lesson 3", category: "Accommodation" },
  { en: "hostel", tr: "хостел", lesson: "Lesson 3", category: "Accommodation" },
  { en: "inn", tr: "гостиница", lesson: "Lesson 3", category: "Accommodation" },
  { en: "bed and breakfast", tr: "мини-отель с завтраком", lesson: "Lesson 3", category: "Accommodation" },
  { en: "guesthouse", tr: "гостевой дом", lesson: "Lesson 3", category: "Accommodation" },
  { en: "resort", tr: "курорт", lesson: "Lesson 3", category: "Accommodation" },
  { en: "vacation rental", tr: "аренда жилья", lesson: "Lesson 3", category: "Accommodation" },
  { en: "Airbnb", tr: "жильё через Airbnb", lesson: "Lesson 3", category: "Accommodation" },
  { en: "single room", tr: "одноместный номер", lesson: "Lesson 3", category: "Accommodation" },
  { en: "double room", tr: "двухместный номер", lesson: "Lesson 3", category: "Accommodation" },
  { en: "twin room", tr: "номер с двумя кроватями", lesson: "Lesson 3", category: "Accommodation" },
  { en: "suite", tr: "люкс", lesson: "Lesson 3", category: "Accommodation" },
  { en: "executive suite", tr: "представительский люкс", lesson: "Lesson 3", category: "Accommodation" },
  { en: "connecting rooms", tr: "смежные номера", lesson: "Lesson 3", category: "Accommodation" },
  { en: "non-smoking room", tr: "номер для некурящих", lesson: "Lesson 3", category: "Accommodation" },
  { en: "booking", tr: "бронирование", lesson: "Lesson 3", category: "Accommodation" },
  { en: "check-in", tr: "заселение", lesson: "Lesson 3", category: "Accommodation" },
  { en: "check-out", tr: "выселение", lesson: "Lesson 3", category: "Accommodation" },
  { en: "reception", tr: "ресепшен", lesson: "Lesson 3", category: "Accommodation" },
  { en: "front desk", tr: "стойка регистрации", lesson: "Lesson 3", category: "Accommodation" },
  { en: "key card", tr: "ключ-карта", lesson: "Lesson 3", category: "Accommodation" },
  { en: "Wi-Fi", tr: "вайфай", lesson: "Lesson 3", category: "Accommodation" },
  { en: "air conditioning", tr: "кондиционер", lesson: "Lesson 3", category: "Accommodation" },
  { en: "heating", tr: "отопление", lesson: "Lesson 3", category: "Accommodation" },
  { en: "television", tr: "телевизор", lesson: "Lesson 3", category: "Accommodation" },
  { en: "minibar", tr: "мини-бар", lesson: "Lesson 3", category: "Accommodation" },
  { en: "safe", tr: "сейф", lesson: "Lesson 3", category: "Accommodation" },
  { en: "hairdryer", tr: "фен", lesson: "Lesson 3", category: "Accommodation" },
  { en: "iron", tr: "утюг", lesson: "Lesson 3", category: "Accommodation" },
  { en: "en-suite bathroom", tr: "ванная в номере", lesson: "Lesson 3", category: "Accommodation" },
  { en: "shower", tr: "душ", lesson: "Lesson 3", category: "Accommodation" },
  { en: "bathtub", tr: "ванна", lesson: "Lesson 3", category: "Accommodation" },
  { en: "toiletries", tr: "туалетные принадлежности", lesson: "Lesson 3", category: "Accommodation" },
  { en: "towels", tr: "полотенца", lesson: "Lesson 3", category: "Accommodation" },
  { en: "room service", tr: "обслуживание в номере", lesson: "Lesson 3", category: "Accommodation" },
  { en: "housekeeping", tr: "уборка номера", lesson: "Lesson 3", category: "Accommodation" },
  { en: "concierge", tr: "консьерж", lesson: "Lesson 3", category: "Accommodation" },
  { en: "laundry service", tr: "прачечная", lesson: "Lesson 3", category: "Accommodation" },
  { en: "wake-up call", tr: "звонок для пробуждения", lesson: "Lesson 3", category: "Accommodation" },
  { en: "lobby", tr: "лобби", lesson: "Lesson 3", category: "Accommodation" },
  { en: "lounge", tr: "лаунж", lesson: "Lesson 3", category: "Accommodation" },
  { en: "restaurant", tr: "ресторан", lesson: "Lesson 3", category: "Accommodation" },
  { en: "bar", tr: "бар", lesson: "Lesson 3", category: "Accommodation" },
  { en: "fitness center", tr: "фитнес-центр", lesson: "Lesson 3", category: "Accommodation" },
  { en: "invoice", tr: "счёт", lesson: "Lesson 3", category: "Accommodation" },
  { en: "bill", tr: "счёт к оплате", lesson: "Lesson 3", category: "Accommodation" },
  { en: "payment receipt", tr: "квитанция об оплате", lesson: "Lesson 3", category: "Accommodation" },
  { en: "emergency exit", tr: "аварийный выход", lesson: "Lesson 3", category: "Accommodation" },
  { en: "fire alarm", tr: "пожарная сигнализация", lesson: "Lesson 3", category: "Accommodation" },
  { en: "security", tr: "охрана", lesson: "Lesson 3", category: "Accommodation" },
  { en: "24-hour front desk", tr: "стойка 24/7", lesson: "Lesson 3", category: "Accommodation" },
  { en: "CCTV", tr: "камеры наблюдения", lesson: "Lesson 3", category: "Accommodation" },

  { en: "landmarks", tr: "достопримечательности", lesson: "Lesson 3", category: "City activities" },
  { en: "monuments", tr: "памятники", lesson: "Lesson 3", category: "City activities" },
  { en: "museums", tr: "музеи", lesson: "Lesson 3", category: "City activities" },
  { en: "historical sites", tr: "исторические места", lesson: "Lesson 3", category: "City activities" },
  { en: "tourist attractions", tr: "туристические места", lesson: "Lesson 3", category: "City activities" },
  { en: "theaters", tr: "театры", lesson: "Lesson 3", category: "City activities" },
  { en: "cinemas", tr: "кинотеатры", lesson: "Lesson 3", category: "City activities" },
  { en: "concerts", tr: "концерты", lesson: "Lesson 3", category: "City activities" },
  { en: "live performances", tr: "живые выступления", lesson: "Lesson 3", category: "City activities" },
  { en: "nightlife", tr: "ночная жизнь", lesson: "Lesson 3", category: "City activities" },
  { en: "restaurants", tr: "рестораны", lesson: "Lesson 3", category: "City activities" },
  { en: "cafes", tr: "кафе", lesson: "Lesson 3", category: "City activities" },
  { en: "local dishes", tr: "местные блюда", lesson: "Lesson 3", category: "City activities" },
  { en: "street food", tr: "уличная еда", lesson: "Lesson 3", category: "City activities" },
  { en: "markets", tr: "рынки", lesson: "Lesson 3", category: "City activities" },
  { en: "parks", tr: "парки", lesson: "Lesson 3", category: "City activities" },
  { en: "gardens", tr: "сады", lesson: "Lesson 3", category: "City activities" },
  { en: "hiking trails", tr: "пешеходные тропы", lesson: "Lesson 3", category: "City activities" },
  { en: "cycling paths", tr: "велодорожки", lesson: "Lesson 3", category: "City activities" },
  { en: "outdoor markets", tr: "открытые рынки", lesson: "Lesson 3", category: "City activities" },
  { en: "shopping districts", tr: "торговые районы", lesson: "Lesson 3", category: "City activities" },
  { en: "malls", tr: "торговые центры", lesson: "Lesson 3", category: "City activities" },
  { en: "boutiques", tr: "бутики", lesson: "Lesson 3", category: "City activities" },
  { en: "souvenir shops", tr: "сувенирные магазины", lesson: "Lesson 3", category: "City activities" },
  { en: "flea markets", tr: "блошиные рынки", lesson: "Lesson 3", category: "City activities" },
  { en: "festivals", tr: "фестивали", lesson: "Lesson 3", category: "City activities" },
  { en: "parades", tr: "парады", lesson: "Lesson 3", category: "City activities" },
  { en: "cultural events", tr: "культурные события", lesson: "Lesson 3", category: "City activities" },
  { en: "fairs", tr: "ярмарки", lesson: "Lesson 3", category: "City activities" },
  { en: "sports facilities", tr: "спортивные объекты", lesson: "Lesson 3", category: "City activities" },
  { en: "gyms", tr: "спортзалы", lesson: "Lesson 3", category: "City activities" },
  { en: "recreational centers", tr: "центры отдыха", lesson: "Lesson 3", category: "City activities" },
  { en: "swimming pools", tr: "бассейны", lesson: "Lesson 3", category: "City activities" },
  { en: "public transportation", tr: "общественный транспорт", lesson: "Lesson 3", category: "City activities" },
  { en: "taxis", tr: "такси", lesson: "Lesson 3", category: "City activities" },
  { en: "bike rentals", tr: "прокат велосипедов", lesson: "Lesson 3", category: "City activities" },
  { en: "walking tours", tr: "пешеходные экскурсии", lesson: "Lesson 3", category: "City activities" },
  { en: "spas", tr: "спа", lesson: "Lesson 3", category: "City activities" },
  { en: "wellness centers", tr: "оздоровительные центры", lesson: "Lesson 3", category: "City activities" },
  { en: "beaches", tr: "пляжи", lesson: "Lesson 3", category: "City activities" },
  { en: "libraries", tr: "библиотеки", lesson: "Lesson 3", category: "City activities" },
  { en: "educational tours", tr: "образовательные туры", lesson: "Lesson 3", category: "City activities" },
  { en: "workshops", tr: "мастер-классы", lesson: "Lesson 3", category: "City activities" },
  { en: "language classes", tr: "языковые занятия", lesson: "Lesson 3", category: "City activities" },
  { en: "scenic views", tr: "живописные виды", lesson: "Lesson 3", category: "City activities" },
  { en: "waterfronts", tr: "набережные", lesson: "Lesson 3", category: "City activities" },
  { en: "observation decks", tr: "смотровые площадки", lesson: "Lesson 3", category: "City activities" },
  { en: "viewpoints", tr: "видовые точки", lesson: "Lesson 3", category: "City activities" },
  { en: "cultural centers", tr: "культурные центры", lesson: "Lesson 3", category: "City activities" },
  { en: "art galleries", tr: "художественные галереи", lesson: "Lesson 3", category: "City activities" },
  { en: "street art", tr: "уличное искусство", lesson: "Lesson 3", category: "City activities" },
  { en: "cultural performances", tr: "культурные выступления", lesson: "Lesson 3", category: "City activities" },
  { en: "old town", tr: "старый город", lesson: "Lesson 3", category: "City activities" },
  { en: "architecture", tr: "архитектура", lesson: "Lesson 3", category: "City activities" },
  { en: "archaeology sites", tr: "археологические объекты", lesson: "Lesson 3", category: "City activities" },

  { en: "to appear", tr: "появляться", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "to cancel", tr: "отменять", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "to bite", tr: "кусать", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "to regret", tr: "жалеть", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "to blow", tr: "дуть", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "to compose", tr: "составлять", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "to congratulate", tr: "поздравлять", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "to correct", tr: "исправлять", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "to fall asleep", tr: "засыпать", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "accept", tr: "принимать", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "accuse", tr: "обвинять", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "achieve", tr: "достигать", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "adapt", tr: "адаптироваться", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "adjust", tr: "приспосабливаться", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "aim", tr: "стремиться", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "appreciate", tr: "ценить", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "argue", tr: "спорить", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "arrive", tr: "прибывать", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "behave", tr: "вести себя", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "bring", tr: "приносить", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "buy", tr: "покупать", lesson: "Lesson 3", category: "Extra verbs" },
  { en: "communicate", tr: "общаться", lesson: "Lesson 3", category: "Extra verbs" },

  { en: "chat", tr: "болтать в чате", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "dance", tr: "танцевать", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "discuss", tr: "обсуждать", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "do homework", tr: "делать домашнее задание", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "dream", tr: "мечтать", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "dress", tr: "одеваться", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "drive", tr: "водить", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "eat breakfast", tr: "завтракать", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "eat dinner", tr: "ужинать", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "eat lunch", tr: "обедать", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "fall asleep", tr: "засыпать", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "get up", tr: "вставать", lesson: "Lesson 3", category: "AT / ON / IN words" },
  { en: "go home", tr: "идти домой", lesson: "Lesson 3", category: "AT / ON / IN words" },

  { en: "grocery store", tr: "продуктовый магазин", lesson: "Lesson 3", category: "Places in town" },
  { en: "pharmacy", tr: "аптека", lesson: "Lesson 3", category: "Places in town" },
  { en: "bank", tr: "банк", lesson: "Lesson 3", category: "Places in town" },
  { en: "post office", tr: "почта", lesson: "Lesson 3", category: "Places in town" },
  { en: "hospital", tr: "больница", lesson: "Lesson 3", category: "Places in town" },
  { en: "school", tr: "школа", lesson: "Lesson 3", category: "Places in town" },
  { en: "library", tr: "библиотека", lesson: "Lesson 3", category: "Places in town" },
  { en: "park", tr: "парк", lesson: "Lesson 3", category: "Places in town" },
  { en: "cafe", tr: "кафе", lesson: "Lesson 3", category: "Places in town" },
  { en: "restaurant", tr: "ресторан", lesson: "Lesson 3", category: "Places in town" },
  { en: "movie theater", tr: "кинотеатр", lesson: "Lesson 3", category: "Places in town" },
  { en: "gym", tr: "спортзал", lesson: "Lesson 3", category: "Places in town" },
  { en: "police station", tr: "полицейский участок", lesson: "Lesson 3", category: "Places in town" },
  { en: "fire station", tr: "пожарная станция", lesson: "Lesson 3", category: "Places in town" },
  { en: "city hall", tr: "мэрия", lesson: "Lesson 3", category: "Places in town" },
  { en: "museum", tr: "музей", lesson: "Lesson 3", category: "Places in town" },
  { en: "shopping mall", tr: "торговый центр", lesson: "Lesson 3", category: "Places in town" },
  { en: "gas station", tr: "заправка", lesson: "Lesson 3", category: "Places in town" },
  { en: "bus station", tr: "автовокзал", lesson: "Lesson 3", category: "Places in town" },
  { en: "train station", tr: "железнодорожный вокзал", lesson: "Lesson 3", category: "Places in town" },
  { en: "airport", tr: "аэропорт", lesson: "Lesson 3", category: "Places in town" },
  { en: "barber shop", tr: "барбершоп", lesson: "Lesson 3", category: "Places in town" },
  { en: "hair salon", tr: "салон красоты", lesson: "Lesson 3", category: "Places in town" },
  { en: "laundromat", tr: "прачечная самообслуживания", lesson: "Lesson 3", category: "Places in town" },
  { en: "hardware store", tr: "строительный магазин", lesson: "Lesson 3", category: "Places in town" },
  { en: "church", tr: "церковь", lesson: "Lesson 3", category: "Places in town" },
  { en: "temple", tr: "храм", lesson: "Lesson 3", category: "Places in town" },
  { en: "mosque", tr: "мечеть", lesson: "Lesson 3", category: "Places in town" },
  { en: "community center", tr: "общественный центр", lesson: "Lesson 3", category: "Places in town" },
  { en: "dentist's office", tr: "кабинет стоматолога", lesson: "Lesson 3", category: "Places in town" },
  { en: "veterinary clinic", tr: "ветеринарная клиника", lesson: "Lesson 3", category: "Places in town" },
  { en: "playground", tr: "детская площадка", lesson: "Lesson 3", category: "Places in town" },
  { en: "car wash", tr: "мойка машин", lesson: "Lesson 3", category: "Places in town" },
  { en: "supermarket", tr: "супермаркет", lesson: "Lesson 3", category: "Places in town" },
  { en: "bakery", tr: "пекарня", lesson: "Lesson 3", category: "Places in town" },
  { en: "butcher shop", tr: "мясная лавка", lesson: "Lesson 3", category: "Places in town" },
  { en: "fish market", tr: "рыбный рынок", lesson: "Lesson 3", category: "Places in town" },
  { en: "florist", tr: "цветочный магазин", lesson: "Lesson 3", category: "Places in town" },
  { en: "bookstore", tr: "книжный магазин", lesson: "Lesson 3", category: "Places in town" },
  { en: "boutique", tr: "бутик", lesson: "Lesson 3", category: "Places in town" },
  { en: "shoe store", tr: "обувной магазин", lesson: "Lesson 3", category: "Places in town" },
  { en: "electronics store", tr: "магазин электроники", lesson: "Lesson 3", category: "Places in town" },
  { en: "furniture store", tr: "мебельный магазин", lesson: "Lesson 3", category: "Places in town" },
  { en: "pet store", tr: "магазин для животных", lesson: "Lesson 3", category: "Places in town" },
  { en: "gift shop", tr: "магазин подарков", lesson: "Lesson 3", category: "Places in town" },
  { en: "auto repair shop", tr: "автосервис", lesson: "Lesson 3", category: "Places in town" },
  { en: "car dealership", tr: "автосалон", lesson: "Lesson 3", category: "Places in town" },
  { en: "coffee shop", tr: "кофейня", lesson: "Lesson 3", category: "Places in town" },
  { en: "ice cream parlor", tr: "магазин мороженого", lesson: "Lesson 3", category: "Places in town" },
  { en: "nightclub", tr: "ночной клуб", lesson: "Lesson 3", category: "Places in town" },
  { en: "gallery", tr: "галерея", lesson: "Lesson 3", category: "Places in town" },
  { en: "office building", tr: "офисное здание", lesson: "Lesson 3", category: "Places in town" },
  { en: "conference center", tr: "конференц-центр", lesson: "Lesson 3", category: "Places in town" },
  { en: "car rental", tr: "прокат машин", lesson: "Lesson 3", category: "Places in town" },
  { en: "bicycle shop", tr: "веломагазин", lesson: "Lesson 3", category: "Places in town" },

  { en: "shop", tr: "делать покупки", lesson: "Lesson 3", category: "Actions by place" },
  { en: "browse", tr: "просматривать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "purchase", tr: "покупать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "eat", tr: "есть", lesson: "Lesson 3", category: "Actions by place" },
  { en: "drink", tr: "пить", lesson: "Lesson 3", category: "Actions by place" },
  { en: "dine", tr: "обедать, ужинать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "order", tr: "заказывать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "deposit", tr: "вносить деньги", lesson: "Lesson 3", category: "Actions by place" },
  { en: "withdraw", tr: "снимать деньги", lesson: "Lesson 3", category: "Actions by place" },
  { en: "manage", tr: "управлять", lesson: "Lesson 3", category: "Actions by place" },
  { en: "mail", tr: "отправлять почтой", lesson: "Lesson 3", category: "Actions by place" },
  { en: "send", tr: "посылать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "receive", tr: "получать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "post", tr: "отправлять по почте", lesson: "Lesson 3", category: "Actions by place" },
  { en: "treat", tr: "лечить", lesson: "Lesson 3", category: "Actions by place" },
  { en: "heal", tr: "заживать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "diagnose", tr: "диагностировать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "study", tr: "учиться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "learn", tr: "изучать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "attend", tr: "посещать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "teach", tr: "учить кого-то", lesson: "Lesson 3", category: "Actions by place" },
  { en: "read", tr: "читать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "borrow", tr: "брать взаймы", lesson: "Lesson 3", category: "Actions by place" },
  { en: "stroll", tr: "прогуливаться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "jog", tr: "бегать трусцой", lesson: "Lesson 3", category: "Actions by place" },
  { en: "relax", tr: "отдыхать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "play", tr: "играть", lesson: "Lesson 3", category: "Actions by place" },
  { en: "sip", tr: "пить маленькими глотками", lesson: "Lesson 3", category: "Actions by place" },
  { en: "watch", tr: "смотреть", lesson: "Lesson 3", category: "Actions by place" },
  { en: "exercise", tr: "тренироваться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "work out", tr: "заниматься спортом", lesson: "Lesson 3", category: "Actions by place" },
  { en: "train", tr: "тренироваться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "report", tr: "сообщать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "inquire", tr: "спрашивать, узнавать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "assist", tr: "помогать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "respond", tr: "реагировать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "rescue", tr: "спасать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "govern", tr: "управлять", lesson: "Lesson 3", category: "Actions by place" },
  { en: "view", tr: "осматривать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "fill up", tr: "заправлять, наполнять", lesson: "Lesson 3", category: "Actions by place" },
  { en: "refuel", tr: "заправлять", lesson: "Lesson 3", category: "Actions by place" },
  { en: "pay", tr: "платить", lesson: "Lesson 3", category: "Actions by place" },
  { en: "board", tr: "садиться в транспорт", lesson: "Lesson 3", category: "Actions by place" },
  { en: "alight", tr: "выходить из транспорта", lesson: "Lesson 3", category: "Actions by place" },
  { en: "wait", tr: "ждать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "disembark", tr: "высаживаться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "cut", tr: "стричь, резать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "style", tr: "укладывать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "groom", tr: "ухаживать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "wash", tr: "мыть, стирать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "dry", tr: "сушить", lesson: "Lesson 3", category: "Actions by place" },
  { en: "fold", tr: "складывать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "find", tr: "находить", lesson: "Lesson 3", category: "Actions by place" },
  { en: "shop for", tr: "покупать, подбирать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "pray", tr: "молиться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "worship", tr: "поклоняться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "gather", tr: "собираться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "meet", tr: "встречаться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "host", tr: "проводить, принимать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "check", tr: "проверять", lesson: "Lesson 3", category: "Actions by place" },
  { en: "run", tr: "бежать", lesson: "Lesson 3", category: "Actions by place" },
  { en: "swing", tr: "качаться", lesson: "Lesson 3", category: "Actions by place" },
  { en: "clean", tr: "чистить", lesson: "Lesson 3", category: "Actions by place" },
  { en: "vacuum", tr: "пылесосить", lesson: "Lesson 3", category: "Actions by place" },

  // Lesson 4
  { en: "weather", tr: "погода", lesson: "Lesson 4", category: "Weather" },
  { en: "sunny", tr: "солнечно", lesson: "Lesson 4", category: "Weather" },
  { en: "cloudy", tr: "облачно", lesson: "Lesson 4", category: "Weather" },
  { en: "rain", tr: "дождь", lesson: "Lesson 4", category: "Weather" },
  { en: "snow", tr: "снег", lesson: "Lesson 4", category: "Weather" },
  { en: "wind", tr: "ветер", lesson: "Lesson 4", category: "Weather" },
  { en: "storm", tr: "шторм", lesson: "Lesson 4", category: "Weather" },
  { en: "thunder", tr: "гром", lesson: "Lesson 4", category: "Weather" },
  { en: "lightning", tr: "молния", lesson: "Lesson 4", category: "Weather" },
  { en: "fog", tr: "туман", lesson: "Lesson 4", category: "Weather" },
  { en: "temperature", tr: "температура", lesson: "Lesson 4", category: "Weather" },
  { en: "chop", tr: "резать", lesson: "Lesson 4", category: "Food" },
  { en: "coffee", tr: "кофе", lesson: "Lesson 4", category: "Food" },
  { en: "cook", tr: "готовить", lesson: "Lesson 4", category: "Food" },
  { en: "dessert", tr: "десерт", lesson: "Lesson 4", category: "Food" },
  { en: "dinner", tr: "ужин", lesson: "Lesson 4", category: "Food" },
  { en: "drink", tr: "напиток", lesson: "Lesson 4", category: "Food" },
  { en: "cake", tr: "торт", lesson: "Lesson 4", category: "Food" },
  { en: "egg", tr: "яйцо", lesson: "Lesson 4", category: "Food" },
  { en: "food", tr: "еда", lesson: "Lesson 4", category: "Food" },
  { en: "fruit", tr: "фрукт", lesson: "Lesson 4", category: "Food" },
  { en: "fry", tr: "жарить", lesson: "Lesson 4", category: "Food" },
  { en: "garlic", tr: "чеснок", lesson: "Lesson 4", category: "Food" },
  { en: "grape", tr: "виноград", lesson: "Lesson 4", category: "Food" },
  { en: "honey", tr: "мёд", lesson: "Lesson 4", category: "Food" },
  { en: "apple", tr: "яблоко", lesson: "Lesson 4", category: "Food" },
  { en: "beans", tr: "бобы", lesson: "Lesson 4", category: "Food" },
  { en: "beef", tr: "говядина", lesson: "Lesson 4", category: "Food" },
  { en: "biscuit", tr: "печенье", lesson: "Lesson 4", category: "Food" },
  { en: "boil", tr: "варить", lesson: "Lesson 4", category: "Food" },
  { en: "bottle", tr: "бутылка", lesson: "Lesson 4", category: "Food" },
  { en: "bowl", tr: "миска", lesson: "Lesson 4", category: "Food" },
  { en: "bread", tr: "хлеб", lesson: "Lesson 4", category: "Food" },
  { en: "breakfast", tr: "завтрак", lesson: "Lesson 4", category: "Food" },
  { en: "butter", tr: "масло", lesson: "Lesson 4", category: "Food" },
  { en: "cereal", tr: "крупа, хлопья", lesson: "Lesson 4", category: "Food" },
  { en: "cheese", tr: "сыр", lesson: "Lesson 4", category: "Food" },
  { en: "chips", tr: "чипсы", lesson: "Lesson 4", category: "Food" },
  { en: "chocolate", tr: "шоколад", lesson: "Lesson 4", category: "Food" },
  { en: "jam", tr: "джем", lesson: "Lesson 4", category: "Food" },
  { en: "juice", tr: "сок", lesson: "Lesson 4", category: "Food" },
  { en: "lemonade", tr: "лимонад", lesson: "Lesson 4", category: "Food" },
  { en: "lunch", tr: "обед", lesson: "Lesson 4", category: "Food" },
  { en: "meat", tr: "мясо", lesson: "Lesson 4", category: "Food" },
  { en: "menu", tr: "меню", lesson: "Lesson 4", category: "Food" },
  { en: "milk", tr: "молоко", lesson: "Lesson 4", category: "Food" },
  { en: "mushroom", tr: "гриб", lesson: "Lesson 4", category: "Food" },
  { en: "olive", tr: "оливка", lesson: "Lesson 4", category: "Food" },
  { en: "onion", tr: "лук", lesson: "Lesson 4", category: "Food" },
  { en: "orange", tr: "апельсин", lesson: "Lesson 4", category: "Food" },
  { en: "order (food)", tr: "заказывать еду", lesson: "Lesson 4", category: "Food" },
  { en: "pepper", tr: "перец", lesson: "Lesson 4", category: "Food" },
  { en: "rice", tr: "рис", lesson: "Lesson 4", category: "Food" },
  { en: "salad", tr: "салат", lesson: "Lesson 4", category: "Food" },
  { en: "salt", tr: "соль", lesson: "Lesson 4", category: "Food" },
  { en: "sauce", tr: "соус", lesson: "Lesson 4", category: "Food" },
  { en: "sugar", tr: "сахар", lesson: "Lesson 4", category: "Food" },
  { en: "reduce", tr: "сокращать", lesson: "Lesson 4", category: "Food" },
  { en: "exclude", tr: "исключать", lesson: "Lesson 4", category: "Food" },
  { en: "spend", tr: "тратить", lesson: "Lesson 4", category: "Food" },
  { en: "spoil", tr: "портить", lesson: "Lesson 4", category: "Food" },
  { en: "remain", tr: "оставаться", lesson: "Lesson 4", category: "Food" },
  { en: "keep", tr: "держать", lesson: "Lesson 4", category: "Food" },
  { en: "possess", tr: "владеть", lesson: "Lesson 4", category: "Food" },
  { en: "belong to", tr: "принадлежать", lesson: "Lesson 4", category: "Food" },
  { en: "contain", tr: "содержать", lesson: "Lesson 4", category: "Food" },
  { en: "several", tr: "несколько", lesson: "Lesson 4", category: "Food" },
  { en: "try", tr: "пробовать", lesson: "Lesson 4", category: "Unusual food" },
  { en: "taste", tr: "пробовать на вкус", lesson: "Lesson 4", category: "Unusual food" },
  { en: "prepare", tr: "готовить", lesson: "Lesson 4", category: "Unusual food" },
  { en: "serve", tr: "подавать", lesson: "Lesson 4", category: "Unusual food" },
  { en: "raw fish", tr: "сырая рыба", lesson: "Lesson 4", category: "Unusual food" },
  { en: "octopus", tr: "осьминог", lesson: "Lesson 4", category: "Unusual food" },
  { en: "frog legs", tr: "лягушачьи лапки", lesson: "Lesson 4", category: "Unusual food" },
  { en: "snails", tr: "улитки", lesson: "Lesson 4", category: "Unusual food" },
  { en: "caviar", tr: "икра", lesson: "Lesson 4", category: "Unusual food" },
  { en: "insects", tr: "насекомые", lesson: "Lesson 4", category: "Unusual food" },
  { en: "exotic fruits", tr: "экзотические фрукты", lesson: "Lesson 4", category: "Unusual food" },
  { en: "spicy food", tr: "острая еда", lesson: "Lesson 4", category: "Unusual food" },
  { en: "fermented food", tr: "ферментированная еда", lesson: "Lesson 4", category: "Unusual food" },
  { en: "delicious", tr: "вкусный", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "spicy", tr: "острый", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "sweet", tr: "сладкий", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "sour", tr: "кислый", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "salty", tr: "солёный", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "bitter", tr: "горький", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "crunchy", tr: "хрустящий", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "chewy", tr: "жёсткий, тягучий", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "weird", tr: "странный", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "strange", tr: "странный", lesson: "Lesson 4", category: "Food adjectives" },
  { en: "exotic", tr: "экзотический", lesson: "Lesson 4", category: "Food adjectives" },

  // Lesson 5
  { en: "shirt", tr: "рубашка", lesson: "Lesson 5", category: "Clothes" },
  { en: "T-shirt", tr: "футболка", lesson: "Lesson 5", category: "Clothes" },
  { en: "blouse", tr: "блузка", lesson: "Lesson 5", category: "Clothes" },
  { en: "sweater", tr: "свитер", lesson: "Lesson 5", category: "Clothes" },
  { en: "coat", tr: "пальто", lesson: "Lesson 5", category: "Clothes" },
  { en: "hoodie", tr: "толстовка", lesson: "Lesson 5", category: "Clothes" },
  { en: "sweatshirt", tr: "свитшот", lesson: "Lesson 5", category: "Clothes" },
  { en: "dress", tr: "платье", lesson: "Lesson 5", category: "Clothes" },
  { en: "skirt", tr: "юбка", lesson: "Lesson 5", category: "Clothes" },
  { en: "jeans", tr: "джинсы", lesson: "Lesson 5", category: "Clothes" },
  { en: "leggings", tr: "леггинсы", lesson: "Lesson 5", category: "Clothes" },
  { en: "flip flops", tr: "сланцы", lesson: "Lesson 5", category: "Clothes" },
  { en: "belt", tr: "ремень", lesson: "Lesson 5", category: "Clothes" },
  { en: "tie", tr: "галстук", lesson: "Lesson 5", category: "Clothes" },
  { en: "suit", tr: "костюм", lesson: "Lesson 5", category: "Clothes" },
  { en: "tuxedo", tr: "смокинг", lesson: "Lesson 5", category: "Clothes" },
  { en: "bra", tr: "лифчик", lesson: "Lesson 5", category: "Clothes" },
  { en: "panties", tr: "трусы", lesson: "Lesson 5", category: "Clothes" },
  { en: "underpants", tr: "трусы", lesson: "Lesson 5", category: "Clothes" },
  { en: "wear", tr: "носить", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "undress", tr: "раздеваться", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "change", tr: "менять, переодеваться", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "try on", tr: "примерять", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "put on", tr: "надевать", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "take off", tr: "снимать", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "fold", tr: "складывать", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "hang up", tr: "вешать", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "iron", tr: "гладить", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "mend", tr: "чинить", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "wash", tr: "стирать", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "dry-clean", tr: "сдавать в химчистку", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "bleach", tr: "отбеливать", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "dye", tr: "красить", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "press", tr: "гладить, прижимать", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "sew", tr: "шить", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "stitch", tr: "сшивать", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "unbutton", tr: "расстёгивать пуговицы", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "zip up", tr: "застёгивать молнию", lesson: "Lesson 5", category: "Clothes verbs" },
  { en: "go sightseeing", tr: "осматривать достопримечательности", lesson: "Lesson 5", category: "End-of-lesson" },
  { en: "return", tr: "возвращаться", lesson: "Lesson 5", category: "End-of-lesson" },
  { en: "city", tr: "город", lesson: "Lesson 5", category: "End-of-lesson" },
  { en: "country", tr: "страна", lesson: "Lesson 5", category: "End-of-lesson" },
  { en: "beach", tr: "пляж", lesson: "Lesson 5", category: "End-of-lesson" },
  { en: "mountain", tr: "гора", lesson: "Lesson 5", category: "End-of-lesson" },
  { en: "museum", tr: "музей", lesson: "Lesson 5", category: "End-of-lesson" },
  { en: "hotel", tr: "отель", lesson: "Lesson 5", category: "End-of-lesson" },
  { en: "airport", tr: "аэропорт", lesson: "Lesson 5", category: "End-of-lesson" },
  { en: "restaurant", tr: "ресторан", lesson: "Lesson 5", category: "End-of-lesson" },

  // Lesson 6
  { en: "meet", tr: "встретить", lesson: "Lesson 6", category: "Famous people" },
  { en: "see", tr: "видеть", lesson: "Lesson 6", category: "Famous people" },
  { en: "talk to", tr: "разговаривать с", lesson: "Lesson 6", category: "Famous people" },
  { en: "take a picture with", tr: "сфотографироваться с", lesson: "Lesson 6", category: "Famous people" },
  { en: "shake hands with", tr: "пожать руку", lesson: "Lesson 6", category: "Famous people" },
  { en: "ask for an autograph", tr: "попросить автограф", lesson: "Lesson 6", category: "Famous people" },
  { en: "attend an event", tr: "посетить мероприятие", lesson: "Lesson 6", category: "Famous people" },
  { en: "recognize", tr: "узнавать", lesson: "Lesson 6", category: "Famous people" },
  { en: "interview", tr: "брать интервью", lesson: "Lesson 6", category: "Famous people" },
  { en: "singer", tr: "певец, певица", lesson: "Lesson 6", category: "Famous people" },
  { en: "actor", tr: "актёр", lesson: "Lesson 6", category: "Famous people" },
  { en: "actress", tr: "актриса", lesson: "Lesson 6", category: "Famous people" },
  { en: "athlete", tr: "спортсмен", lesson: "Lesson 6", category: "Famous people" },
  { en: "politician", tr: "политик", lesson: "Lesson 6", category: "Famous people" },
  { en: "influencer", tr: "инфлюенсер", lesson: "Lesson 6", category: "Famous people" },
  { en: "blogger", tr: "блогер", lesson: "Lesson 6", category: "Famous people" },
  { en: "writer", tr: "писатель", lesson: "Lesson 6", category: "Famous people" },
  { en: "TV host", tr: "телеведущий", lesson: "Lesson 6", category: "Famous people" },
  { en: "concert", tr: "концерт", lesson: "Lesson 6", category: "Famous people" },
  { en: "film festival", tr: "кинофестиваль", lesson: "Lesson 6", category: "Famous people" },
  { en: "sport event", tr: "спортивное событие", lesson: "Lesson 6", category: "Famous people" },
  { en: "book signing", tr: "автограф-сессия", lesson: "Lesson 6", category: "Famous people" },
  { en: "airport", tr: "аэропорт", lesson: "Lesson 6", category: "Places to meet a famous person" },
  { en: "restaurant", tr: "ресторан", lesson: "Lesson 6", category: "Places to meet a famous person" },
  { en: "shopping mall", tr: "торговый центр", lesson: "Lesson 6", category: "Places to meet a famous person" },
  { en: "exciting", tr: "захватывающий", lesson: "Lesson 6", category: "Famous people" },
  { en: "unbelievable", tr: "невероятный", lesson: "Lesson 6", category: "Famous people" },
  { en: "amazing", tr: "потрясающий", lesson: "Lesson 6", category: "Famous people" },
  { en: "surprising", tr: "удивительный", lesson: "Lesson 6", category: "Famous people" },
  { en: "memorable", tr: "незабываемый", lesson: "Lesson 6", category: "Famous people" },
  { en: "nervous", tr: "нервничающий", lesson: "Lesson 6", category: "Famous people" },
  { en: "friendly", tr: "дружелюбный", lesson: "Lesson 6", category: "Famous people" },
  { en: "watch", tr: "смотреть", lesson: "Lesson 6", category: "Movies" },
  { en: "enjoy", tr: "наслаждаться", lesson: "Lesson 6", category: "Movies" },
  { en: "understand", tr: "понимать", lesson: "Lesson 6", category: "Movies" },
  { en: "learn", tr: "учить", lesson: "Lesson 6", category: "Movies" },
  { en: "listen to", tr: "слушать", lesson: "Lesson 6", category: "Movies" },
  { en: "read subtitles", tr: "читать субтитры", lesson: "Lesson 6", category: "Movies" },
  { en: "recognize words", tr: "узнавать слова", lesson: "Lesson 6", category: "Movies" },
  { en: "memorize", tr: "запоминать", lesson: "Lesson 6", category: "Movies" },
  { en: "action movie", tr: "боевик", lesson: "Lesson 6", category: "Movies" },
  { en: "comedy", tr: "комедия", lesson: "Lesson 6", category: "Movies" },
  { en: "horror movie", tr: "фильм ужасов", lesson: "Lesson 6", category: "Movies" },
  { en: "romantic movie", tr: "романтический фильм", lesson: "Lesson 6", category: "Movies" },
  { en: "sci-fi", tr: "научная фантастика", lesson: "Lesson 6", category: "Movies" },
  { en: "science fiction", tr: "научная фантастика", lesson: "Lesson 6", category: "Movies" },
  { en: "animation", tr: "анимация", lesson: "Lesson 6", category: "Movies" },
  { en: "cartoon", tr: "мультфильм", lesson: "Lesson 6", category: "Movies" },
  { en: "drama", tr: "драма", lesson: "Lesson 6", category: "Movies" },
  { en: "documentary", tr: "документальный фильм", lesson: "Lesson 6", category: "Movies" },
  { en: "interesting", tr: "интересный", lesson: "Lesson 6", category: "Movies" },
  { en: "funny", tr: "смешной", lesson: "Lesson 6", category: "Movies" },
  { en: "scary", tr: "страшный", lesson: "Lesson 6", category: "Movies" },
  { en: "boring", tr: "скучный", lesson: "Lesson 6", category: "Movies" },
  { en: "inspiring", tr: "вдохновляющий", lesson: "Lesson 6", category: "Movies" },
  { en: "emotional", tr: "эмоциональный", lesson: "Lesson 6", category: "Movies" },

  // Lesson 7
  { en: "win", tr: "выигрывать", lesson: "Lesson 7", category: "Competitions" },
  { en: "compete", tr: "соревноваться", lesson: "Lesson 7", category: "Competitions" },
  { en: "participate in", tr: "участвовать в", lesson: "Lesson 7", category: "Competitions" },
  { en: "train for", tr: "тренироваться для", lesson: "Lesson 7", category: "Competitions" },
  { en: "lose", tr: "проигрывать", lesson: "Lesson 7", category: "Competitions" },
  { en: "achieve", tr: "достигать", lesson: "Lesson 7", category: "Competitions" },
  { en: "earn", tr: "зарабатывать, получать", lesson: "Lesson 7", category: "Competitions" },
  { en: "receive", tr: "получать", lesson: "Lesson 7", category: "Competitions" },
  { en: "try hard", tr: "очень стараться", lesson: "Lesson 7", category: "Competitions" },
  { en: "sports competition", tr: "спортивное соревнование", lesson: "Lesson 7", category: "Competitions" },
  { en: "math/science/spelling contest", tr: "конкурс по математике, науке или орфографии", lesson: "Lesson 7", category: "Competitions" },
  { en: "debate competition", tr: "дебатный конкурс", lesson: "Lesson 7", category: "Competitions" },
  { en: "singing contest", tr: "певческий конкурс", lesson: "Lesson 7", category: "Competitions" },
  { en: "dancing competition", tr: "танцевальный конкурс", lesson: "Lesson 7", category: "Competitions" },
  { en: "chess tournament", tr: "шахматный турнир", lesson: "Lesson 7", category: "Competitions" },
  { en: "cooking contest", tr: "кулинарный конкурс", lesson: "Lesson 7", category: "Competitions" },
  { en: "essay writing competition", tr: "конкурс эссе", lesson: "Lesson 7", category: "Competitions" },
  { en: "art competition", tr: "художественный конкурс", lesson: "Lesson 7", category: "Competitions" },
  { en: "difficult", tr: "сложный", lesson: "Lesson 7", category: "Competitions" },
  { en: "challenging", tr: "трудный, но интересный", lesson: "Lesson 7", category: "Competitions" },
  { en: "rewarding", tr: "полезный, дающий результат", lesson: "Lesson 7", category: "Competitions" },
  { en: "unforgettable", tr: "незабываемый", lesson: "Lesson 7", category: "Competitions" },
  { en: "competitive", tr: "соревновательный", lesson: "Lesson 7", category: "Competitions" },
  { en: "injury", tr: "травма", lesson: "Lesson 7", category: "Health" },
  { en: "broken bone", tr: "перелом", lesson: "Lesson 7", category: "Health" },
  { en: "sprain", tr: "растяжение", lesson: "Lesson 7", category: "Health" },
  { en: "cut", tr: "порез", lesson: "Lesson 7", category: "Health" },
  { en: "bruise", tr: "синяк", lesson: "Lesson 7", category: "Health" },
  { en: "burn", tr: "ожог", lesson: "Lesson 7", category: "Health" },
  { en: "scratch", tr: "царапина", lesson: "Lesson 7", category: "Health" },
  { en: "swelling", tr: "отёк", lesson: "Lesson 7", category: "Health" },
  { en: "headache", tr: "головная боль", lesson: "Lesson 7", category: "Health" },
  { en: "fever", tr: "температура", lesson: "Lesson 7", category: "Health" },
  { en: "cold", tr: "простуда", lesson: "Lesson 7", category: "Health" },
  { en: "cough", tr: "кашель", lesson: "Lesson 7", category: "Health" },
  { en: "sore throat", tr: "боль в горле", lesson: "Lesson 7", category: "Health" },
  { en: "flu", tr: "грипп", lesson: "Lesson 7", category: "Health" },
  { en: "allergy", tr: "аллергия", lesson: "Lesson 7", category: "Health" },
  { en: "heal", tr: "заживать", lesson: "Lesson 7", category: "Health" },
  { en: "recover", tr: "выздоравливать", lesson: "Lesson 7", category: "Health" },
  { en: "rest", tr: "отдыхать", lesson: "Lesson 7", category: "Health" },
  { en: "take medicine", tr: "принимать лекарство", lesson: "Lesson 7", category: "Health" },
  { en: "put on a bandage", tr: "наложить повязку", lesson: "Lesson 7", category: "Health" },
  { en: "use ice", tr: "приложить лёд", lesson: "Lesson 7", category: "Health" },
  { en: "go to the doctor", tr: "идти к врачу", lesson: "Lesson 7", category: "Health" },
  { en: "get rid of", tr: "избавляться от", lesson: "Lesson 7", category: "Health" },
];

const GRAMMAR_TOPICS = [
  {
    id: "g1",
    lesson: "Grammar 1",
    title: "Present simple / Present continuous",
    summary: "Привычки, факты, постоянные состояния и действия, которые происходят сейчас или временно.",
    forms: [
      "Present Simple: Subject + V / Vs",
      "Present Continuous: am / is / are + V-ing",
    ],
    uses: [
      "Present Simple: habit, fact, permanent state",
      "Present Continuous: now, around now, temporary situation, arrangement",
    ],
    keywords: ["usually", "often", "every day", "at the moment", "now", "currently"],
    examples: [
      "I usually wake up at 7.",
      "She is studying English at the moment.",
      "They live in Almaty, but these days they are staying in Astana.",
    ],
    review: [
      "I usually ___ to school at 8. (go)",
      "She ___ dinner now. (cook)",
      "They ___ in Astana these days. (stay)",
    ],
    detailed: "Present Simple нужен для регулярных действий, расписаний, общеизвестных фактов и состояний. Present Continuous нужен для того, что происходит прямо сейчас, вокруг настоящего момента или временно.",
    whenToUse: [
      "Present Simple: always, usually, often, sometimes, never, every day, on Mondays",
      "Present Continuous: now, right now, at the moment, currently, these days",
      "Present Simple также используют со stative verbs: know, like, love, need, understand",
    ],
    compare: [
      "I study English every day. — это привычка.",
      "I am studying English now. — это действие сейчас.",
      "She works in a bank. — постоянная работа.",
      "She is working from home this week. — временная ситуация.",
    ],
    mistakes: [
      "Не говори: I am knowing. Правильно: I know.",
      "Не забывай -s / -es в 3 лице: he works, she studies.",
      "В Continuous обязательно нужен be: am / is / are.",
    ],
    tasks: [
      {
        prompt: "She usually ___ coffee in the morning.",
        options: ["drink", "drinks", "is drinking"],
        answer: "drinks",
        explanation: "Usually показывает привычку, поэтому нужен Present Simple: she drinks.",
      },
      {
        prompt: "Look! The children ___ in the yard now.",
        options: ["play", "are playing", "plays"],
        answer: "are playing",
        explanation: "Now показывает действие в момент речи, поэтому нужен Present Continuous.",
      },
    ],
  },
  {
    id: "g2",
    lesson: "Grammar 2",
    title: "Future simple / Future continuous / To be going to",
    summary: "Планы, решения, обещания, прогнозы и действие, которое будет продолжаться в конкретный момент будущего.",
    forms: [
      "Future Simple: will + V",
      "Future Continuous: will be + V-ing",
      "Be going to: am / is / are going to + V",
    ],
    uses: [
      "will: promise, offer, decision now, future fact",
      "will be + ing: action in progress at a future time",
      "going to: plan or strong prediction",
    ],
    keywords: ["tomorrow", "next week", "soon", "this time tomorrow", "in the future"],
    examples: [
      "I will help you.",
      "This time tomorrow, I will be traveling.",
      "We are going to visit Japan next year.",
    ],
    review: [
      "I think it ___ rain tomorrow. (will)",
      "At 8 p.m. I ___ for the exam. (will be studying)",
      "We ___ move to a new city next year. (are going to)",
    ],
    detailed: "Will часто используют, когда решение принимается прямо сейчас, при обещании, предложении помощи или нейтральном прогнозе. Going to используют для заранее намеченного плана или когда уже есть признаки будущего результата. Future Continuous показывает процесс в определённый момент будущего.",
    whenToUse: [
      "will: I will call you, I will help you, I think it will rain",
      "going to: We are going to buy tickets, She is going to study abroad",
      "will be + ing: At 9 p.m. I will be doing homework",
    ],
    compare: [
      "I will open the window. — решение сейчас.",
      "I am going to open the window. — уже есть план / намерение.",
      "At 6 tomorrow I will be flying to Astana. — процесс в будущем времени.",
    ],
    mistakes: [
      "После will не ставят am / is / are.",
      "После going to нужен инфинитив: going to study, going to buy.",
      "Не путай Future Continuous с обычным future plan.",
    ],
    tasks: [
      {
        prompt: "I forgot my bag. I ___ back for it.",
        options: ["will go", "am going", "will be going"],
        answer: "will go",
        explanation: "Решение принимается в момент речи, поэтому используется will.",
      },
      {
        prompt: "At 10 tomorrow, we ___ to the conference.",
        options: ["will travel", "will be traveling", "are going to traveled"],
        answer: "will be traveling",
        explanation: "Есть указание на процесс в конкретный момент будущего.",
      },
    ],
  },
  {
    id: "g3",
    lesson: "Grammar 3",
    title: "can / could / able to / capable of",
    summary: "Способность в настоящем, прошлом, будущем и в конкретной ситуации.",
    forms: [
      "can + V",
      "could + V",
      "be able to + V",
      "be capable of + noun / V-ing",
    ],
    uses: [
      "can: general ability now",
      "could: past ability or polite request",
      "be able to: specific ability or future ability",
      "capable of: formal way to show ability",
    ],
    keywords: ["can", "could", "able to", "capable of"],
    examples: [
      "I can swim.",
      "When I was a child, I could run very fast.",
      "She will be able to join us tomorrow.",
      "He is capable of working under pressure.",
    ],
    review: [
      "I ___ speak English and Russian. (can)",
      "When she was younger, she ___ run faster. (could)",
      "After treatment, he will ___ walk again. (be able to)",
    ],
    detailed: "Can используют для общей способности в настоящем. Could — для способности в прошлом или вежливой просьбы. Be able to удобно там, где can грамматически не подходит: в будущем, после модальных конструкций или для конкретного результата. Capable of — более формальный вариант, обычно в письменной речи.",
    whenToUse: [
      "I can drive. — умею сейчас.",
      "Could you help me? — вежливая просьба.",
      "She will be able to come tomorrow. — future ability.",
      "He is capable of solving complex problems. — формальный стиль.",
    ],
    compare: [
      "I can swim. — общая способность.",
      "Yesterday I was able to finish the task. — смог в конкретной ситуации.",
      "She could read at four. — общая способность в прошлом.",
    ],
    mistakes: [
      "После can / could всегда идёт базовая форма: can go, could speak.",
      "После capable of идёт noun или V-ing: capable of solving.",
      "Не говори: will can. Правильно: will be able to.",
    ],
    tasks: [
      {
        prompt: "Next year I ___ speak Japanese better.",
        options: ["can", "will be able to", "capable of"],
        answer: "will be able to",
        explanation: "Для будущей способности нужен be able to.",
      },
      {
        prompt: "When he was five, he ___ already read simple books.",
        options: ["can", "could", "is able to"],
        answer: "could",
        explanation: "Речь о способности в прошлом, поэтому used could.",
      },
    ],
  },
  {
    id: "g4",
    lesson: "Grammar 4",
    title: "Past simple / Past continuous / WH questions",
    summary: "Завершённые действия в прошлом, процесс в прошлом и специальные вопросы.",
    forms: [
      "Past Simple: V2 / V-ed",
      "Past Continuous: was / were + V-ing",
      "WH questions: What / Where / When / Why / Who / Which / Whose / How + ... ?",
    ],
    uses: [
      "Past Simple: finished action in the past",
      "Past Continuous: process at a past moment, background action",
      "WH questions: asking for detail",
    ],
    keywords: ["yesterday", "last week", "in 2024", "while", "when", "at 7 p.m."],
    examples: [
      "I visited my friend yesterday.",
      "At 9 p.m. I was doing homework.",
      "What did you do yesterday?",
    ],
    review: [
      "She ___ to Paris last year. (went)",
      "At 6 p.m. we ___ dinner. (were cooking)",
      "___ did you meet there? (Who)",
    ],
    detailed: "Past Simple показывает завершённый факт в прошлом. Past Continuous показывает процесс, который длился в определённый момент прошлого, или фон для другого действия. WH questions помогают уточнить детали: что, где, когда, почему, кто, как.",
    whenToUse: [
      "Past Simple: yesterday, last year, ago, in 2023",
      "Past Continuous: at 5 p.m., while, when + background action",
      "WH questions: What did you buy? Where were you going?",
    ],
    compare: [
      "I cooked dinner yesterday. — факт.",
      "I was cooking dinner at 7 p.m. — процесс.",
      "I was cooking dinner when my friend called. — процесс + короткое действие.",
    ],
    mistakes: [
      "В вопросах с Past Simple нужен did + V1: What did you do?",
      "Не говори: did went. Правильно: did go.",
      "В Past Continuous нужен was / were.",
    ],
    tasks: [
      {
        prompt: "While I ___, my mother called me.",
        options: ["studied", "was studying", "am studying"],
        answer: "was studying",
        explanation: "Есть длительный процесс в прошлом, прерванный другим действием.",
      },
      {
        prompt: "___ did you see at the station?",
        options: ["What", "Who", "Where"],
        answer: "Who",
        explanation: "Вопрос о человеке, поэтому Who.",
      },
    ],
  },
  {
    id: "g5",
    lesson: "Grammar 5",
    title: "Present perfect simple",
    summary: "Опыт, результат к настоящему моменту и действие, которое продолжается с since / for.",
    forms: [
      "have / has + V3 / V-ed",
      "have / has not + V3 / V-ed",
      "Have / Has + subject + V3 / V-ed?",
    ],
    uses: [
      "life experience",
      "finished action with present result",
      "unfinished time period",
      "duration with since / for",
    ],
    keywords: ["ever", "never", "already", "just", "yet", "since", "for", "recently"],
    examples: [
      "I have just eaten lunch.",
      "She has worked here since January.",
      "Have you ever been to Italy?",
    ],
    review: [
      "I ___ just ___ the email. (have / sent)",
      "She ___ never ___ sushi. (has / eaten)",
      "How long ___ you ___ each other? (have / known)",
    ],
    detailed: "Present Perfect связывает прошлое с настоящим. Он показывает опыт, недавний результат или действие, которое началось раньше и важно сейчас. Если время указано точно и завершено, чаще нужен Past Simple, а не Present Perfect.",
    whenToUse: [
      "ever / never — опыт",
      "just / already / yet — результат к настоящему моменту",
      "since / for — длительность до настоящего времени",
    ],
    compare: [
      "I have visited London. — опыт в жизни.",
      "I visited London in 2022. — точное завершённое время, Past Simple.",
      "She has lost her key. — результат важен сейчас.",
    ],
    mistakes: [
      "Не ставь точное прошедшее время с Present Perfect: not 'I have seen him yesterday'.",
      "После has / have нужен V3.",
      "Since — точка начала, for — период времени.",
    ],
    tasks: [
      {
        prompt: "She ___ just ___ her homework.",
        options: ["has / finished", "did / finish", "has / finish"],
        answer: "has / finished",
        explanation: "Just + результат сейчас = Present Perfect.",
      },
      {
        prompt: "I have lived here ___ five years.",
        options: ["since", "for", "from"],
        answer: "for",
        explanation: "For используют с периодом времени: five years.",
      },
    ],
  },
  {
    id: "g6",
    lesson: "Grammar 6",
    title: "To get used to / To be used to / Used to",
    summary: "Адаптация к новому, привычное состояние сейчас и привычка в прошлом.",
    forms: [
      "get used to + noun / V-ing",
      "be used to + noun / V-ing",
      "used to + V",
    ],
    uses: [
      "get used to: process of adaptation",
      "be used to: already accustomed",
      "used to: past habit or past state, but not now",
    ],
    keywords: ["adapt", "habit", "past routine", "now accustomed"],
    examples: [
      "I am getting used to the cold weather.",
      "He is used to driving on the left.",
      "I used to live in the UK.",
    ],
    review: [
      "She is still ___ used to life in Canada. (getting)",
      "I am used to ___ up early. (getting)",
      "We used to ___ football every weekend. (play)",
    ],
    detailed: "Get used to показывает процесс привыкания. Be used to означает, что человек уже привык. Used to говорит о привычке или состоянии в прошлом, которого сейчас уже нет.",
    whenToUse: [
      "I am getting used to online classes. — процесс привыкания.",
      "I am used to online classes. — уже привычно.",
      "I used to play outside every day. — раньше была привычка.",
    ],
    compare: [
      "used to + V1",
      "be used to + noun / V-ing",
      "get used to + noun / V-ing",
    ],
    mistakes: [
      "После be used to и get used to часто нужен V-ing: used to waking up early.",
      "Used to как прошлую привычку не путай с be used to.",
      "Не говори: I am used to get up early. Правильно: getting up.",
    ],
    tasks: [
      {
        prompt: "I ___ drinking green tea now, so it feels normal.",
        options: ["am used to", "used to", "get used to"],
        answer: "am used to",
        explanation: "Сейчас это уже привычно, значит be used to.",
      },
      {
        prompt: "She moved to a cold country and is slowly ___ the weather.",
        options: ["used to", "getting used to", "be used to"],
        answer: "getting used to",
        explanation: "Процесс привыкания = getting used to.",
      },
    ],
  },
  {
    id: "g7",
    lesson: "Grammar 7",
    title: "Practice day (Listening IELTS)",
    summary: "Тренировка listening и speaking: describing jobs, describing places, alphabet listening, IELTS-style listening, debate.",
    forms: ["Review lesson: mixed grammar and speaking practice"],
    uses: [
      "describe jobs and places",
      "listen for names, dates, spelling, key words",
      "give reasons and support your opinion",
      "prepare for IELTS-style listening tasks",
    ],
    keywords: ["listening", "IELTS", "debate", "describe", "spelling"],
    examples: [
      "Describe a place in your hometown.",
      "Describe a job you would like to do.",
      "Listen carefully for names and dates.",
    ],
    review: [
      "Can you describe a doctor’s job in 3–4 sentences?",
      "Can you describe one city clearly?",
      "Can you listen for names, dates, and spelling?",
    ],
    detailed: "Эта тема не про одну грамматическую формулу, а про применение языка в реальной речи и listening. Здесь важно уметь быстро понимать ключевые слова, давать развернутый ответ и строить мнение с аргументами.",
    whenToUse: [
      "Listening: names, dates, numbers, spelling",
      "Speaking: full sentences + reason + example",
      "Debate: opinion + support + contrast",
    ],
    compare: [
      "Короткий ответ: I like it.",
      "Хороший ответ: I like it because it is useful and helps me communicate with people.",
    ],
    mistakes: [
      "Не давай односложные ответы в speaking.",
      "В listening не теряй focus после незнакомого слова.",
      "Старайся слушать опорные слова, а не каждое слово отдельно.",
    ],
    tasks: [
      {
        prompt: "Какой ответ лучше для speaking?",
        options: [
          "Yes.",
          "Yes, I do.",
          "Yes, I do, because it helps me improve my vocabulary and confidence.",
        ],
        answer: "Yes, I do, because it helps me improve my vocabulary and confidence.",
        explanation: "Для speaking лучше полный ответ с причиной.",
      },
      {
        prompt: "На что важно обращать внимание в listening?",
        options: ["Только на первое слово", "На имена, даты, числа и ключевые слова", "Только на длинные предложения"],
        answer: "На имена, даты, числа и ключевые слова",
        explanation: "Именно эти элементы чаще всего нужны в заданиях listening.",
      },
    ],
  },
  {
    id: "g8",
    lesson: "Grammar 8",
    title: "Prepositions IN / ON / AT",
    summary: "Основные предлоги времени и места.",
    forms: [
      "in: months, years, seasons, cities, countries, inside spaces",
      "on: days, dates, surfaces, streets, public transport",
      "at: exact time, exact place, address, fixed point",
    ],
    uses: [
      "in July / in 2025 / in spring / in the room",
      "on Monday / on my birthday / on the wall / on the bus",
      "at 5 p.m. / at home / at the airport / at 45 Green Street",
    ],
    keywords: ["in the morning", "on Monday", "at 5 p.m.", "at the airport", "in Paris", "on the table"],
    examples: [
      "I wake up at 7:30.",
      "We travel in summer.",
      "My meeting is on Friday.",
      "She is at the station now.",
    ],
    review: [
      "___ Monday morning (on)",
      "___ 2005 (in)",
      "___ the bus stop (at)",
      "___ the wall (on)",
      "___ the car (in)",
    ],
    detailed: "IN, ON и AT зависят от того, насколько общее или точное значение ты хочешь показать. In — более широкое пространство или период. On — поверхность, день, дата. At — точная точка времени или места.",
    whenToUse: [
      "IN: in the room, in Kazakhstan, in winter, in 2026",
      "ON: on Monday, on the table, on the wall, on the bus",
      "AT: at 6 o’clock, at home, at school, at the airport",
    ],
    compare: [
      "in the car — внутри машины",
      "on the bus — как пассажир в общественном транспорте",
      "at the station — точка / место",
    ],
    mistakes: [
      "Не путай in the car и on the bus.",
      "С точным временем обычно at.",
      "С днями и датами обычно on.",
    ],
    tasks: [
      {
        prompt: "My exam is ___ Monday morning.",
        options: ["in", "on", "at"],
        answer: "on",
        explanation: "С днями недели используют on.",
      },
      {
        prompt: "She was born ___ 2010.",
        options: ["at", "on", "in"],
        answer: "in",
        explanation: "С годами используют in.",
      },
    ],
  },
  {
    id: "g9",
    lesson: "Grammar 9",
    title: "Instead of / Owing to / In order to",
    summary: "Связки замены, причины и цели.",
    forms: [
      "instead of + noun / V-ing",
      "owing to + noun / noun phrase",
      "in order to + V",
    ],
    uses: [
      "instead of: replacement",
      "owing to: reason / cause",
      "in order to: purpose",
    ],
    keywords: ["replacement", "reason", "purpose"],
    examples: [
      "I drank tea instead of coffee.",
      "Owing to traffic, she arrived late.",
      "I study every day in order to pass the exam.",
    ],
    review: [
      "He walked ___ taking a taxi. (instead of)",
      "___ heavy rain, the match was canceled. (owing to)",
      "She saved money ___ buy a laptop. (in order to)",
    ],
    detailed: "These linkers help you make speech richer. Instead of shows replacement. Owing to shows reason in a more formal style. In order to shows purpose, that is why somebody does something.",
    whenToUse: [
      "instead of coffee / instead of going / instead of a taxi",
      "owing to bad weather / owing to traffic / owing to illness",
      "in order to learn / in order to save money / in order to arrive on time",
    ],
    compare: [
      "instead of = вместо",
      "owing to = из-за / вследствие",
      "in order to = чтобы / с целью",
    ],
    mistakes: [
      "После instead of часто ставят noun или V-ing.",
      "После in order to идёт базовая форма глагола.",
      "Owing to чаще формальнее, чем because of.",
    ],
    tasks: [
      {
        prompt: "She took a bus ___ a taxi.",
        options: ["in order to", "instead of", "owing to"],
        answer: "instead of",
        explanation: "Здесь значение замены: вместо такси.",
      },
      {
        prompt: "___ the snow, the road was closed.",
        options: ["Instead of", "In order to", "Owing to"],
        answer: "Owing to",
        explanation: "Здесь причина, поэтому Owing to.",
      },
    ],
  },
  {
    id: "g10",
    lesson: "Grammar 10",
    title: "Practice day",
    summary: "Финальное повторение: free speaking, discussion of all topics, exam preparation and sharing ideas.",
    forms: ["Review lesson: mixed grammar and vocabulary"],
    uses: [
      "free speaking",
      "topic review",
      "exam speaking preparation",
      "sharing inspirations and ideas",
    ],
    keywords: ["review", "free speaking", "exam speaking", "all topics"],
    examples: [
      "Talk about your habits, health, food, travel, and plans.",
      "Compare your past and present life.",
      "Give full answers with examples.",
    ],
    review: [
      "Can you speak for 1 minute about yourself?",
      "Can you compare your past and present habits?",
      "Can you use examples and linking words in answers?",
    ],
    detailed: "Это итоговая практика. Здесь важно не просто знать правила, а уметь выбрать подходящее время, связки, лексику и построить логичный ответ. Хороший ответ обычно состоит из main idea + reason + example + short conclusion.",
    whenToUse: [
      "Когда нужно повторить всё сразу",
      "Когда готовишься к устному ответу или speaking",
      "Когда хочешь проверить, какие темы ещё слабые",
    ],
    compare: [
      "Слабый ответ: I like travel.",
      "Сильный ответ: I like travel because it helps me relax and learn about new cultures.",
    ],
    mistakes: [
      "Не отвечай слишком коротко.",
      "Не бойся комбинировать времена и связки.",
      "Старайся давать хотя бы один пример.",
    ],
    tasks: [
      {
        prompt: "Какой ответ лучше для practice day?",
        options: [
          "I like movies.",
          "I like movies because they help me relax after studying, especially comedies.",
          "Movies good.",
        ],
        answer: "I like movies because they help me relax after studying, especially comedies.",
        explanation: "Лучший ответ содержит мысль, причину и пример.",
      },
      {
        prompt: "Что лучше добавить в устный ответ?",
        options: ["Только одно слово", "Причину и пример", "Ничего, кроме yes/no"],
        answer: "Причину и пример",
        explanation: "Так ответ звучит полно и естественно.",
      },
    ],
  },
];

const LESSONS = ["All book", ...Array.from(new Set(VOCAB.map((v) => v.lesson)))];

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[ё]/g, "е")
    .replace(/[—–-]/g, " ")
    .replace(/[()'’.,/]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildOptions(current, pool, direction) {
  const answer = direction === "en-ru" ? current.tr : current.en;
  const distractors = shuffleArray(
    pool
      .filter((w) => !(w.en === current.en && w.lesson === current.lesson && w.category === current.category))
      .map((w) => (direction === "en-ru" ? w.tr : w.en))
      .filter((v, i, arr) => arr.indexOf(v) === i)
  ).slice(0, 3);
  return shuffleArray([answer, ...distractors]);
}

export default function InteractiveVocabularyQuizComplete() {
  const [lesson, setLesson] = useState("All book");
  const [category, setCategory] = useState("All categories");
  const [mode, setMode] = useState("mcq");
  const [direction, setDirection] = useState("en-ru");
  const [count, setCount] = useState(15);
  const [tab, setTab] = useState("quiz");
  const [search, setSearch] = useState("");
  const [round, setRound] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mistakes, setMistakes] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashReveal, setFlashReveal] = useState(false);
  const [grammarIndex, setGrammarIndex] = useState(0);
  const [grammarAnswers, setGrammarAnswers] = useState({});

  const pool = useMemo(() => {
    return lesson === "All book" ? VOCAB : VOCAB.filter((v) => v.lesson === lesson);
  }, [lesson]);

  const categories = useMemo(() => {
    return ["All categories", ...Array.from(new Set(pool.map((v) => v.category)))];
  }, [pool]);

  const visibleWords = useMemo(() => {
    const q = normalize(search);
    const base = category === "All categories" ? pool : pool.filter((v) => v.category === category);
    if (!q) return base;
    return base.filter((w) => [w.en, w.tr, w.category, w.lesson].some((x) => normalize(x).includes(q)));
  }, [pool, category, search]);

  const current = round[index];
  const answer = current ? (direction === "en-ru" ? current.tr : current.en) : "";
  const prompt = current ? (direction === "en-ru" ? current.en : current.tr) : "";
  const options = current ? buildOptions(current, visibleWords.length >= 4 ? visibleWords : pool, direction) : [];
  const progress = round.length ? ((index + ((selected || checked) ? 1 : 0)) / round.length) * 100 : 0;
  const flashCard = visibleWords[flashIndex] || null;
  const currentGrammar = GRAMMAR_TOPICS[grammarIndex] || null;
  const topicTaskKey = (topicId, taskIndex) => `${topicId}-${taskIndex}`;

  const startRound = () => {
    const base = visibleWords.length ? visibleWords : pool;
    const amount = Math.min(count, base.length);
    setRound(shuffleArray(base).slice(0, amount));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setTyped("");
    setChecked(false);
    setShowAnswer(false);
    setCompleted(false);
    setTab("quiz");
  };

  const repeatMistakes = () => {
    if (!mistakes.length) return;
    setRound(shuffleArray(mistakes));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setTyped("");
    setChecked(false);
    setShowAnswer(false);
    setMistakes([]);
    setCompleted(false);
    setTab("quiz");
  };

  const nextQuestion = () => {
    setSelected(null);
    setTyped("");
    setChecked(false);
    setShowAnswer(false);
    if (index + 1 < round.length) setIndex(index + 1);
    else setCompleted(true);
  };

  const chooseOption = (choice) => {
    if (selected || checked) return;
    setSelected(choice);
    if (normalize(choice) === normalize(answer)) setScore((s) => s + 1);
    else setMistakes((m) => [...m, current]);
  };

  const checkTyped = () => {
    if (checked) return;
    setChecked(true);
    if (normalize(typed) === normalize(answer)) setScore((s) => s + 1);
    else setMistakes((m) => [...m, current]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <BookOpen className="h-7 w-7" /> Full Vocabulary Quiz Complete
              </CardTitle>
              <Badge className="rounded-full px-4 py-1 text-sm">{VOCAB.length} слов и фраз</Badge>
            </div>
            <p className="text-sm text-slate-600">Полная версия по книге: лексика, карточки, список слов, повтор ошибок и вкладка грамматики.</p>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="grid w-full max-w-2xl grid-cols-4 rounded-2xl">
                <TabsTrigger value="quiz">Квиз</TabsTrigger>
                <TabsTrigger value="flashcards">Карточки</TabsTrigger>
                <TabsTrigger value="list">Список слов</TabsTrigger>
                <TabsTrigger value="grammar">Грамматика</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="mb-2 text-sm font-medium text-slate-700">Урок</div>
                <div className="flex flex-wrap gap-2">
                  {LESSONS.map((item) => (
                    <Button
                      key={item}
                      variant={lesson === item ? "default" : "outline"}
                      className="rounded-2xl"
                      onClick={() => {
                        setLesson(item);
                        setCategory("All categories");
                        setFlashIndex(0);
                        setFlashReveal(false);
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-slate-700">Категория</div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <Button
                      key={item}
                      variant={category === item ? "default" : "outline"}
                      className="rounded-2xl"
                      onClick={() => {
                        setCategory(item);
                        setFlashIndex(0);
                        setFlashReveal(false);
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="mb-2 text-sm font-medium text-slate-700">Режим</div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant={mode === "mcq" ? "default" : "outline"} className="rounded-2xl" onClick={() => setMode("mcq")}>
                      <ListChecks className="mr-2 h-4 w-4" /> Тест
                    </Button>
                    <Button variant={mode === "typing" ? "default" : "outline"} className="rounded-2xl" onClick={() => setMode("typing")}>
                      <Keyboard className="mr-2 h-4 w-4" /> Ввод
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-slate-700">Направление</div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant={direction === "en-ru" ? "default" : "outline"} className="rounded-2xl" onClick={() => setDirection("en-ru")}>EN → RU</Button>
                    <Button variant={direction === "ru-en" ? "default" : "outline"} className="rounded-2xl" onClick={() => setDirection("ru-en")}>RU → EN</Button>
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-slate-700">Сколько слов</div>
                  <div className="flex flex-wrap gap-2">
                    {[10, 15, 20, 30].map((n) => (
                      <Button key={n} variant={count === n ? "default" : "outline"} className="rounded-2xl" onClick={() => setCount(n)}>
                        {n}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-slate-700">Поиск слова</div>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Например: passport, headache, hoodie" className="rounded-2xl pl-9" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl" onClick={startRound}>Начать раунд</Button>
                <Button variant="outline" className="rounded-2xl" onClick={repeatMistakes} disabled={!mistakes.length}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Повторить ошибки
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Layers3 className="h-5 w-5" /> Как легче запомнить</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <div>1. Сначала бери один урок, не всю книгу сразу.</div>
              <div>2. Делай по 10–15 слов за один раунд.</div>
              <div>3. Сначала EN → RU, потом тот же урок RU → EN.</div>
              <div>4. После раунда обязательно проходи только ошибки.</div>
              <div>5. Самые трудные слова закрепляй в режиме «Карточки» и «Ввод».</div>
              <div>6. Для полного повторения выбери «All book» и сделай 30 слов.</div>
              <div>7. Для правил открой вкладку «Грамматика» и повторяй темы по порядку.</div>
            </CardContent>
          </Card>
        </div>

        {tab === "quiz" && round.length > 0 && !completed && current && (
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Badge>{current.lesson}</Badge>
                  <Badge variant="outline">{current.category}</Badge>
                  <Badge variant="outline">{index + 1} / {round.length}</Badge>
                </div>
                <div className="text-sm font-medium">Счёт: {score}</div>
              </div>
              <Progress value={progress} className="h-3" />
              <CardTitle className="break-words text-3xl md:text-4xl">{prompt}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {mode === "mcq" ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {options.map((option) => {
                    const isCorrect = normalize(option) === normalize(answer);
                    const isChosen = normalize(option) === normalize(selected || "");
                    let variant = "outline";
                    if (selected) {
                      if (isCorrect) variant = "default";
                      else if (isChosen) variant = "destructive";
                    }
                    return (
                      <Button
                        key={option}
                        variant={variant}
                        className="h-auto min-h-14 justify-start whitespace-normal rounded-2xl py-3 text-left"
                        onClick={() => chooseOption(option)}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <Input
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && checkTyped()}
                    placeholder="Введи перевод"
                    className="h-12 rounded-2xl text-base"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button className="rounded-2xl" onClick={checkTyped} disabled={!typed.trim() || checked}>Проверить</Button>
                    <Button variant="outline" className="rounded-2xl" onClick={() => setShowAnswer((s) => !s)}>
                      {showAnswer ? "Скрыть ответ" : "Показать ответ"}
                    </Button>
                  </div>
                  {showAnswer && (
                    <div className="rounded-2xl bg-slate-100 p-4">Правильный ответ: <span className="font-semibold">{answer}</span></div>
                  )}
                </div>
              )}

              {((mode === "mcq" && selected) || (mode === "typing" && checked)) && (
                <div className="rounded-2xl border p-4">
                  {((mode === "mcq" && normalize(selected) === normalize(answer)) ||
                    (mode === "typing" && normalize(typed) === normalize(answer))) ? (
                    <div className="flex items-center gap-2 font-medium text-emerald-700"><CheckCircle2 className="h-5 w-5" /> Верно</div>
                  ) : (
                    <div className="flex items-center gap-2 font-medium text-rose-700"><XCircle className="h-5 w-5" /> Неверно. Ответ: {answer}</div>
                  )}
                  <div className="mt-4"><Button className="rounded-2xl" onClick={nextQuestion}>Следующее слово</Button></div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {tab === "quiz" && completed && (
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Раунд завершён</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-lg">Результат: <span className="font-semibold">{score} / {round.length}</span></div>
              <div className="text-sm text-slate-600">Ошибок: {mistakes.length}</div>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl" onClick={startRound}>Новый раунд</Button>
                <Button variant="outline" className="rounded-2xl" onClick={repeatMistakes} disabled={!mistakes.length}>Повторить ошибки</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {tab === "flashcards" && (
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl"><Eye className="h-6 w-6" /> Карточки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {flashCard ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{flashCard.lesson}</Badge>
                    <Badge variant="outline">{flashCard.category}</Badge>
                    <Badge variant="outline">{flashIndex + 1} / {visibleWords.length}</Badge>
                  </div>
                  <div className="rounded-3xl border bg-white p-8 text-center shadow-sm">
                    <div className="text-3xl font-semibold break-words">{flashCard.en}</div>
                    {flashReveal && <div className="mt-6 text-xl text-slate-600 break-words">{flashCard.tr}</div>}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button className="rounded-2xl" onClick={() => setFlashReveal((s) => !s)}>
                      {flashReveal ? "Скрыть перевод" : "Показать перевод"}
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-2xl"
                      onClick={() => {
                        setFlashIndex((i) => Math.max(0, i - 1));
                        setFlashReveal(false);
                      }}
                      disabled={flashIndex === 0}
                    >
                      Назад
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-2xl"
                      onClick={() => {
                        setFlashIndex((i) => Math.min(visibleWords.length - 1, i + 1));
                        setFlashReveal(false);
                      }}
                      disabled={flashIndex >= visibleWords.length - 1}
                    >
                      Дальше
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-slate-500">Нет слов в выбранном фильтре.</div>
              )}
            </CardContent>
          </Card>
        )}

        {tab === "grammar" && currentGrammar && (
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl"><BookCopy className="h-6 w-6" /> Грамматика и повторение правил</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {GRAMMAR_TOPICS.map((topic, idx) => (
                  <Button
                    key={topic.id}
                    variant={grammarIndex === idx ? "default" : "outline"}
                    className="rounded-2xl"
                    onClick={() => setGrammarIndex(idx)}
                  >
                    {topic.lesson}
                  </Button>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{currentGrammar.lesson}</Badge>
                    <Badge variant="outline">{currentGrammar.title}</Badge>
                  </div>
                  <div className="text-lg font-semibold">{currentGrammar.title}</div>
                  <div className="text-sm text-slate-600">{currentGrammar.summary}</div>

                  <div>
                    <div className="mb-2 font-medium">Формула</div>
                    <div className="space-y-2">
                      {currentGrammar.forms.map((item) => (
                        <div key={item} className="rounded-2xl bg-slate-50 p-3 text-sm">{item}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 font-medium">Подробное объяснение</div>
                    <div className="rounded-2xl border p-4 text-sm leading-6 text-slate-700">{currentGrammar.detailed}</div>
                  </div>

                  <div>
                    <div className="mb-2 font-medium">Когда и как использовать</div>
                    <div className="space-y-2">
                      {currentGrammar.whenToUse.map((item) => (
                        <div key={item} className="rounded-2xl border p-3 text-sm">{item}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 font-medium">Сравнение</div>
                    <div className="space-y-2">
                      {currentGrammar.compare.map((item) => (
                        <div key={item} className="rounded-2xl bg-slate-50 p-3 text-sm">{item}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 font-medium">Частые ошибки</div>
                    <div className="space-y-2">
                      {currentGrammar.mistakes.map((item) => (
                        <div key={item} className="rounded-2xl border p-3 text-sm">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-3xl border bg-white p-6 shadow-sm">
                  <div>
                    <div className="mb-2 font-medium">Ключевые слова</div>
                    <div className="flex flex-wrap gap-2">
                      {currentGrammar.keywords.map((item) => (
                        <Badge key={item} variant="secondary">{item}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 font-medium">Примеры</div>
                    <div className="space-y-2">
                      {currentGrammar.examples.map((item) => (
                        <div key={item} className="rounded-2xl bg-slate-50 p-3 text-sm">{item}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 font-medium">Быстрая проверка себя</div>
                    <div className="space-y-2">
                      {currentGrammar.review.map((item) => (
                        <div key={item} className="rounded-2xl border p-3 text-sm">{item}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 font-medium">Интерактивные задания</div>
                    <div className="space-y-4">
                      {currentGrammar.tasks.map((task, taskIndex) => {
                        const selectedAnswer = grammarAnswers[topicTaskKey(currentGrammar.id, taskIndex)];
                        const isAnswered = Boolean(selectedAnswer);
                        return (
                          <div key={task.prompt} className="rounded-2xl border p-4">
                            <div className="mb-3 text-sm font-medium text-slate-800">{task.prompt}</div>
                            <div className="grid gap-2">
                              {task.options.map((option) => {
                                const isCorrect = option === task.answer;
                                const isSelected = option === selectedAnswer;
                                let variant = "outline";
                                if (isAnswered) {
                                  if (isCorrect) variant = "default";
                                  else if (isSelected) variant = "destructive";
                                }
                                return (
                                  <Button
                                    key={option}
                                    variant={variant}
                                    className="h-auto justify-start whitespace-normal rounded-2xl py-3 text-left"
                                    disabled={isAnswered}
                                    onClick={() => setGrammarAnswers((prev) => ({ ...prev, [topicTaskKey(currentGrammar.id, taskIndex)]: option }))}
                                  >
                                    {option}
                                  </Button>
                                );
                              })}
                            </div>
                            {isAnswered && (
                              <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                                <div className="font-medium">Объяснение:</div>
                                <div>{task.explanation}</div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="rounded-2xl"
                      onClick={() => setGrammarIndex((i) => Math.max(0, i - 1))}
                      disabled={grammarIndex === 0}
                    >
                      Назад
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-2xl"
                      onClick={() => setGrammarIndex((i) => Math.min(GRAMMAR_TOPICS.length - 1, i + 1))}
                      disabled={grammarIndex >= GRAMMAR_TOPICS.length - 1}
                    >
                      Дальше
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {tab === "list" && (
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Список слов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm text-slate-600">Показано: {visibleWords.length}</div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {visibleWords.map((w) => (
                  <div key={`${w.lesson}-${w.category}-${w.en}`} className="rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="font-semibold">{w.en}</div>
                    <div className="mt-1 text-slate-600">{w.tr}</div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                      <span>{w.lesson}</span>
                      <span>·</span>
                      <span>{w.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
