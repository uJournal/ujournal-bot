const { shuffle } = require("lodash");

module.exports = async (url, content) => {
  const [{ messageUrl }] = shuffle(content).slice(0, 1);
  return { url: messageUrl };
};
