const { shuffle } = require("lodash");

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
  if (content.length > 0) {
    const [{ word, translation, url: translationUrl }] = shuffle(content).slice(
      0,
      1
    );

    return {
      name: "...",
      url: translationUrl,
      body: `> ${word} ⮂ ${translation}`,
    };
  }

  return undefined;
};
