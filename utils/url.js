const url = require("url");

const makeAbsoluteUrl = (baseUrl, pathname) => {
  const baseUrlParsed = url.parse(baseUrl);
  const _baseUrl = `${baseUrlParsed.protocol}//${baseUrlParsed.host}`;
  return `${_baseUrl}${pathname}`;
};

module.exports = { makeAbsoluteUrl };
