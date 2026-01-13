# OAuth2 реализация для браузерного приложения

## Почему нет серверной части?

Это приложение построено на платформе Spark, которая специализируется на **браузерных (client-side) приложениях**. У нас нет возможности создать Node.js/Express сервер.

## Безопасно ли это?

**Да!** Мы используем OAuth2 Implicit Flow - это официальный и безопасный метод авторизации для браузерных приложений, рекомендованный Google.

### Ключевые отличия от серверной авторизации:

| Серверная авторизация | Браузерная авторизация (наша) |
|----------------------|-------------------------------|
| Требует backend (Node.js/Express) | Работает полностью в браузере |
| Использует Client Secret | Client Secret НЕ используется (это правильно!) |
| Authorization Code Flow | Implicit Flow / Token Flow |
| Токены хранятся на сервере | Токены хранятся в браузере |
| Нужен callback endpoint на сервере | Redirect URI указывает на frontend |

## Почему Client Secret не нужен?

**Client Secret НЕЛЬЗЯ использовать в браузерных приложениях!**

- Client Secret должен оставаться секретным
- Весь JavaScript код виден в браузере
- Любой может открыть DevTools и увидеть Client Secret
- Это серьезная уязвимость безопасности

Google знает об этом и специально создал Implicit Flow для браузерных приложений, который НЕ требует Client Secret.

## Что мы используем:

1. **API Key** - для публичных API запросов к Calendar API
2. **Client ID** - для OAuth2 авторизации (публичный идентификатор)
3. **Redirect URI** - URL куда Google перенаправит после авторизации
4. **Implicit Flow** - авторизация без Client Secret

## Настройка OAuth Client

### Критически важные параметры:

1. **Application type**: Web application
2. **Authorized JavaScript origins**: 
   - URL вашего приложения БЕЗ / в конце
   - Пример: `https://your-app.com`
3. **Authorized redirect URIs**: 
   - URL вашего приложения СО / в конце
   - Пример: `https://your-app.com/`
   - ⚠️ Слэш в конце обязателен!

### Почему два URL?

- **JavaScript origins** - откуда будет инициирован OAuth запрос
- **Redirect URIs** - куда Google перенаправит после авторизации
- Это разные URL с точки зрения Google (со слэшем и без)

## Безопасность

### Что хранится в браузере:
- API Key (публичный)
- Client ID (публичный)
- Access Token (временный, истекает через ~1 час)
- Refresh Token (опционально, для продления сессии)

### Что НЕ хранится:
- ❌ Client Secret (его вообще нет в браузерных приложениях)
- ❌ Данные календаря (загружаются по запросу)

### Меры безопасности:
- Все запросы идут напрямую к Google API через HTTPS
- Токены хранятся в localStorage (можно улучшить до IndexedDB)
- OAuth Consent Screen настроен как "External" с Test users
- Приложение запрашивает только read-only доступ к календарям

## Ограничения

1. **Refresh tokens**: В Implicit Flow refresh token не выдается. Пользователю нужно будет переавторизоваться через ~1 час.
   - Решение: можно переключиться на Authorization Code Flow with PKCE (более современный метод)

2. **Test users**: Пока приложение в режиме Testing, работать будет только для email'ов добавленных в Test users.
   - Решение: можно опубликовать приложение (пройти верификацию Google)

## Альтернативы (если нужна серверная часть)

Если действительно нужна серверная часть:

1. Создать отдельный backend на другом хостинге (Heroku, Vercel, Railway)
2. Использовать serverless функции (Vercel Functions, Netlify Functions)
3. Использовать готовый BaaS (Firebase, Supabase)

Но для данного приложения это излишне - браузерная авторизация полностью подходит!

## Официальная документация

- [Google OAuth2 for Web Apps](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Google Identity Services](https://developers.google.com/identity/gsi/web/guides/overview)
- [Calendar API Quickstart](https://developers.google.com/calendar/api/quickstart/js)
