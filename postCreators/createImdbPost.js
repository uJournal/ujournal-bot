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

  if (tomorrowReleases.length > 0) {
    return {
      name: title,
      body: tomorrowReleases
        .map(
          ({ title, image, date, url }) =>
            `[**${title}**](${url}) (дата релізу ${format(date, "EEEE", {
              locale: uk,
            })}, ${format(date, "d LLL", {
              locale: uk,
            })}) \n![${title}](${image})`
        )
        .join("\n\n"),
    };
  }

  return undefined;
};
