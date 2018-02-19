
const Path = require("path");
const Brace = require("brace");
const Theme = require("./sandbox/theme.js");
const GetScript = require("./sandbox/get-script.js");

require("brace/mode/javascript");

function getSandbox () { return this._sandbox }
const defopts = {minLines:10,maxLines:20};

module.exports = (container, sandbox) => {
  const editor = Brace.edit(container);
  editor.getSandbox = getSandbox;
  editor._sandbox = sandbox;
  editor.$blockScrolling = Infinity;
  editor.setShowPrintMargin(false);
  editor.getSession().setMode("ace/mode/javascript");
  editor.setTheme(Theme[sandbox.type]);
  editor.getScript = GetScript[sandbox.type];
  editor.setValue(sandbox.content, 1);
  editor.setOptions(Object.assign(defopts, sandbox.editor));
  return editor;
};
