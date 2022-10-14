const html2markdown = require("../utils/html2markdown");

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
  if (content.results.length > 0) {
    return content.results.map(({ imageUrl, title, content }) => ({
      url: imageUrl,
      name: title,
      body: html2markdown(content),
      nsfw: false,
    }));
  }
};
