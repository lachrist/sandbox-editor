
const Fs = require("fs");
const Path = require("path");

module.exports = (path, options, callback) => {
  options = options || {};
  options.basedir = String(options.basedir || process.cwd());
  options.editor = options.editor || {};
  Fs.readFile(path, "utf8", (error, content) => {
    callback(error, {
      type: "raw",
      path: "/"+Path.relative(options.basedir, path),
      editor: options.editor,
      content: content
    });
  });
};
