var SandboxEditor = require("../main.js");
var FooSandbox = require("./foo-sandbox.js");
var div = document.createElement("div");
var editor = SandboxEditor(div, FooSandbox);
document.body.appendChild(div);
var button = document.createElement("button");
button.textContent = "Eval";
button.addEventListener("click", function () {
  const global = "sandbox-global";
  const process = "sandbox-process";
  const Buffer = "sandbox-buffer";
  alert(JSON.stringify(eval(editor.getScript()), null, 2));
});
document.body.appendChild(button);