# Anna Starostina website

Статический сайт-визитка для GitHub Pages.

## Файлы

- `index.html` — структура страницы
- `styles.css` — визуальная система и адаптивность
- `site-data.js` — весь текстовый контент
- `script.js` — рендер данных и reveal-анимации
- `.github/workflows/deploy.yml` — автоматический деплой на GitHub Pages

## Как обновить содержимое

1. Откройте `site-data.js`.
2. Замените текст в `hero`, `story`, `focus`, `notes`, `contact`.
3. При необходимости добавьте email, Telegram, LinkedIn и другие ссылки в `contact.links`.

## Публикация

После пуша в `main` workflow `Deploy GitHub Pages` опубликует сайт.
