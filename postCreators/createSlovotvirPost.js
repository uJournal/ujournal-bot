const { shuffle } = require("lodash");

module.exports = async (url, content) => {
  const [{ word, translation, url: translationUrl }] = shuffle(content).slice(
    0,
    1
  );

  return {
    name: "...",
    url: translationUrl,
    body: `> ${word} ⮂ ${translation}`,
  };
};
