const axios = require("axios");
const jsdom = require("jsdom");
const { parse, format, sub } = require("date-fns");
const { upload: uploadImgbb } = require("../utils/imgbb");
const { download } = require("../utils/file");

const { JSDOM } = jsdom;

module.exports = async (targetUrl) => {
  if (targetUrl.includes("uareview.com")) {
    const response = await axios.get(targetUrl);
    const dom = new JSDOM(response.data);

    const results = [];

    const posts = Array.from(
      dom.window.document.body.querySelectorAll("#content .post")
    );

    for (let post of posts) {
      const title = post.querySelector("h2").textContent.trim();
      const url = post.querySelector("h2 a").href;
      const date = parse(
        post.querySelector(".entry-date").textContent.trim(),
        "dd.MM.yyyy, HH:mm",
        new Date()
      );

      if (
        format(new Date(date), "P") !==
        format(sub(new Date(), { days: 1 }), "P")
      ) {
        continue;
      }

      const response = await axios.get(url);
      const dom = new JSDOM(response.data);

      const image = dom.window.document.querySelector(
        ".entry-content img[src^='http']"
      );

      const content = Array.from(
        dom.window.document.querySelector(".entry-content").children
      )
        .filter((el) => {
          return (
            !el.textContent.includes("Підтримати ЗСУ") &&
            !el.textContent.includes("Читайте також") &&
            !el.innerHTML.includes("<img") &&
            !el.innerHTML.includes("<iframe")
          );
        })
        .map((el) => el.outerHTML)
        .join("");

      const imageUrl = image
        ? await uploadImgbb(await download(image.src))
        : undefined;

      results.push({
        url,
        title,
        date,
        content,
        imageUrl,
      });
    }

    return {
      results,
    };
  }
};
