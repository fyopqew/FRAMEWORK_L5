# Театральная афиша — RESTful API

Проект представляет собой REST API, созданный с использованием собственного фреймворка. Все данные хранятся в JSON-файлах.

## Структура проекта
```
server.js                  // Точка входа
src/
├── framework/             // Фреймворк (Router, Application)
├── controllers/           // Контроллеры для обработки логики
├── services/              // Сервисы для работы с данными
├── routes/
│   └── v1/                // Версия маршрутов
├── middlewares/           // Миддлвары
├── db/
│   ├── actors.json        // Данные актёров
│   ├── performances.json  // Данные спектаклей
│   └── db.js              // (если потребуется универсальный доступ)
```

## Сущности

### 1. Спектакль (`performance`)
```json
{
  "id": 1,
  "title": "Гамлет",
  "genre": "Трагедия",
  "duration": 130,
  "isPremiere": true,
  "date": "2024-04-15T19:00:00.000Z",
  "actors": ["Иванов И.И.", "Петрова А.А."]
}
```

### 2. Актёр (`actor`)
```json
{
  "id": 1,
  "name": "Иванов Илья",
  "age": 34,
  "isHonored": false,
  "birthdate": "1989-01-10T00:00:00.000Z",
  "roles": ["Гамлет", "Отелло"]
}
```

## Эндпоинты

### Спектакли (`/api/v1/performances`)
- `GET /api/v1/performances` — получить все спектакли
- `GET /api/v1/performances/:id` — получить спектакль по ID
- `POST /api/v1/performances` — создать спектакль
- `PUT /api/v1/performances/:id` — заменить спектакль
- `PATCH /api/v1/performances/:id` — обновить часть данных спектакля
- `DELETE /api/v1/performances/:id` — удалить спектакль

### 👤 Актёры (`/api/v1/actors`)
- `GET /api/v1/actors` — получить всех актёров
- `GET /api/v1/actors/:id` — получить актёра по ID
- `POST /api/v1/actors` — создать актёра
- `PUT /api/v1/actors/:id` — заменить актёра
- `PATCH /api/v1/actors/:id` — обновить часть данных актёра
- `DELETE /api/v1/actors/:id` — удалить актёра

## Особенности реализации
- Использован собственный фреймворк с роутингом и middleware.
- Данные читаются и записываются в `.json` файлы.
- Все изменения в данных сохраняются между перезапусками.
- Обработка ошибок предусмотрена на уровне контроллеров и сервера.