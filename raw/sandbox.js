
const Fs = require("fs");

module.exports = (path, options, callback) => {
  Fs.readFile(path, "utf8", (error, content) => {
    callback(error, {
      type: "raw",
      path: "/"+Path.relative(options.basedir||__dirname, path),
      content: content
    });
  });
};
