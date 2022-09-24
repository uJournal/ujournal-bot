/*
  Вхідні данні:
  url - URL який був переданий до Github Action
  content - данні які були сгенеровані функцією Content Fetcher

  Функція повинна повернути наступне:
  {
    nsfw: false,
    url: "",
    name: "",
    body: "",
  }
*/

module.exports = async (url, content) => {
  const { url: _url, title } = content;
  return {
    name: `${title} — Драматика кожен день`,
    url: _url,
  };
};
