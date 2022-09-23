# Що таке UJournal Bot?

Це скріпт який вміє працювати прямо у гітхабі та може ходити у [Телеграм](https://telegram.org/), [Словотвір](https://slovotvir.org.ua/) та в [Архів інтернета за Юцикой](https://archive.org/details/fondorlatosjucika/page/n325/mode/2up),
а потім додає пост на сайт [UJournal](https://ujournal.com.ua/new/) у задане комюніті.

## Як сконфігурувати UJournal бота?

1. Склонувати [репозіторій бота](https://github.com/uJournal/ujournal-bot)
2. Сгенерувати `ВАШ_ГІТХАБ_PERSONAL_TOKEN` по [цій інструкції](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
3. Зареєструватись на [cron-job.org](https://cron-job.org/en/) та почати створення Кронджобу (Cronjobs)
4. Продовження конфігурувння нової кронджоби: додати назву, та додати URL `https://api.github.com/repos/<ВАШ_ГІТХАБ_ЮЗЕРНЕЙТ>/<РЕПОЗІТОРІЙ_БОТА>/dispatches`
5. Продовження конфігурувння нової кронджоби: перейти в розділі ADVANCED і додати заголовок до Headers. Вказати Key: `authorization` Value: `Bearer <ВАШ_ГІТХАБ_PERSONAL_TOKEN>`
6. Продовження конфігурувння нової кронджоби: нижче йде секція Advanced, вибрати Request method: POST і вказати Request body (наведено нижче)

Request body (приклад). Цей реквест-баді додає новий запис у спільноту Словотвір (запускає функції `fetchSlovotvirContent` та `createSlovotvirPost`):

```json
{
  "event_type": "Trigger",
  "client_payload": {
    "COMMUNITY_ID": 113,
    "TARGET_URL": "https://slovotvir.org.ua/weekly/",
    "USERNAME_OR_EMAIL": "<ЮЗЕРНЕЙМ_АБО_ЕМЕІЛ_ВАШОГО_АККАУНТА>",
    "PASSWORD": "<ПАРОЛЬ_ВАШОГО_АККАУНТА>"
  }
}
```
