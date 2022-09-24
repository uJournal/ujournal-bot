const axios = require("axios");
const jsdom = require("jsdom");

/*
  Вхідні данні:
  targetUrl - URL який був переданий до Github Action

  Функція повинна повернути якийсь контент:
  {
    "key": "value"
  }
*/

module.exports = async (targetUrl) => {
  const response = await axios.get(targetUrl);

  const url = response.request.responseURL;

  const dom = new JSDOM(response.data);
  const title = dom.window.document.querySelector("h1")?.textContent;

  return {
    title,
    url,
  };
};
