
const Path = require("path");
const Brace = require("brace");
const Theme = require("./theme.js");
const GetScript = require("./get-script.js");

require("brace/mode/javascript");

function getPath () { return this._sandbox.path }

module.exports = (container, sandbox) => {
  const editor = Brace.edit(container);
  editor.getPath = getPath;
  editor._sandbox = sandbox;
  editor.$blockScrolling = Infinity;
  editor.setShowPrintMargin(false);
  editor.getSession().setMode("ace/mode/javascript");
  editor.setTheme(Theme[sandbox.type]);
  editor.getScript = GetScript[sandbox.type];
  editor.setValue(sandbox.content, 1);
  const lines = Math.min(sandbox.content.split("\n").length, 20);
  editor.setOption("minLines", lines);
  editor.setOption("maxLines", lines);
  editor.setOptions(sandbox.editor);
  return editor;
};
