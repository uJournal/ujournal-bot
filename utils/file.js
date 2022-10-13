const fs = require("fs");
const os = require("os");
const path = require("path");
const axios = require("axios");

const getFileExtension = (filename) => {
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
};

const download = async (url) => {
  const _path = path.resolve(
    os.tmpdir(),
    `${new Date().getTime()}_${Math.ceil(Math.random() * 1000)}.jpg`
  );
  const writer = fs.createWriteStream(_path);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(_path));
    writer.on("error", reject);
  });
};

module.exports = { getFileExtension, download };
