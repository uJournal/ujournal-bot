/*
  Вхідні данні:
  targetUrl - URL який був переданий до Github Action

  Функція повинна повернути якийсь контент:
  {
    "key": "value"
  }
*/

module.exports = () => {
  const day = `${new Date().getDate()}`.padStart(4, "0");
  const url = `https://ia802807.us.archive.org/BookReader/BookReaderImages.php?zip=/32/items/fondorlatosjucika/Fondorlatos%20Jucika_jp2.zip&file=Fondorlatos%20Jucika_jp2/Fondorlatos%20Jucika_${day}.jp2&id=fondorlatosjucika&scale=0&rotate=0`;

  return {
    url,
  };
};
