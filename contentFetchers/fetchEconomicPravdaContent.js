const axios = require("axios");
const iconv = require("iconv-lite");
const jsdom = require("jsdom");
const url = require("url");

const { JSDOM } = jsdom;

module.exports = async (targetUrl) => {
  const response = await axios.get(targetUrl, {
    responseEncoding: "binary",
  });

  const content = iconv
    .encode(iconv.decode(response.data, "win1251"), "utf8")
    .toString("utf-8");

  const dom = new JSDOM(content);

  const targetUrlParsed = url.parse(targetUrl);
  const baseUrl = `${targetUrlParsed.protocol}//${targetUrlParsed.host}`;

  const news = [];

  Array.from(dom.window.document.querySelectorAll(".news > *")).forEach(
    (child) => {
      if (child.classList.contains("article")) {
        const important = child.classList.contains("article_bold");
        const item = child.querySelector("a");
        const [, , year, month, day] = item.href.split("/");

        news.push({
          title: (
            item.querySelector("[data-vr-headline]") || item
          ).textContent.trim(),
          url: `${baseUrl}${item.href}`,
          time:
            child.querySelector(".article__time")?.textContent.trim() || null,
          date: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
          important,
        });
      }
    }
  );

  return {
    news,
  };
};
