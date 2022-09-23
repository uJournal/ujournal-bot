const jsdom = require("jsdom");
const axios = require("axios");
const url = require("url");

const { JSDOM } = jsdom;

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

  const dom = new JSDOM(response.data);
  const nodes = Array.from(
    dom.window.document.querySelectorAll(
      "#best_translations .app-word--representation-content"
    )
  );

  const targetUrlParsed = url.parse(targetUrl);
  const baseUrl = `${targetUrlParsed.protocol}//${targetUrlParsed.host}`;

  const content = [];

  for (let element of nodes) {
    const [wordNode, translationNode] = element.childNodes;
    content.push({
      word: wordNode.textContent.trim(),
      translation: translationNode.textContent.trim(),
      url: `${baseUrl}${translationNode.href}`,
    });
  }

  return content;
};
