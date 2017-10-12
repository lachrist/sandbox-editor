
const Path = require("path");

const Brace = require("brace");
require("brace/mode/javascript");
require("brace/theme/monokai");

const Getters = {};
Getters.raw = require("./raw/getter.js");
Getters.browserify = require("./browserify/getter.js");

function getPath () { return this._sandbox.path }

module.exports = (container, sandbox) => {
  const editor = Brace.edit(container);
  editor.getPath = getPath;
  editor._sandbox = sandbox;
  editor.$blockScrolling = Infinity;
  editor.setShowPrintMargin(false);
  editor.getSession().setMode("ace/mode/javascript");
  editor.setTheme("ace/theme/monokai");
  editor.setValue(sandbox.content, 1);
  editor.setOption("maxLines", sandbox.content.split("\n").length);
  editor.getScript = Getters[sandbox.type];
  return editor;
};
