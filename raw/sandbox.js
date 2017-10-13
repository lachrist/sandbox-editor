
const Fs = require("fs");
const Path = require("path");

module.exports = (path, options, callback) => {
  Fs.readFile(path, "utf8", (error, content) => {
    callback(error, {
      type: "raw",
      path: "/"+Path.relative(options.basedir||Path.dirname(path), path),
      content: content
    });
  });
};
