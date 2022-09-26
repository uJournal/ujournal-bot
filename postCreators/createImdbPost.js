const { format } = require("date-fns");
const uk = require("date-fns/locale/uk");

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
  const { title, tomorrowReleases } = content;
  return {
    name: title,
    body: tomorrowReleases
      .map(
        ({ title, image, description, date, url }) =>
          `[**${title}**](${url}) (${format(date, "EEEE", {
            locale: uk,
          })}, ${format(date, "d LLL", {
            locale: uk,
          })}) \n![${title}](${image})\n${description}`
      )
      .join("\n\n"),
  };
};
