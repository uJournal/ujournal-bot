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
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const news = content.news.filter(
    ({ important, date }) => important && date === currentDate
  );

  if (news.length === 0) {
    return null;
  }

  return {
    name: `Важливі заголовки Економічної правди (${format(new Date(), "EEEE", {
      locale: uk,
    })}, ${format(new Date(), "d LLL", { locale: uk })})`,
    url: `https://i.postimg.cc/MpMsQnSF/Frame-30.png`,
    body: `${news.map(({ title, url }) => `- [${title}](${url})`).join("\n")}`,
  };
};
