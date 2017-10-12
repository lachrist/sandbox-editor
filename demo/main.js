var CommonjsEditor = require("../main.js");
var FooSandbox = require("./foo-sandbox.js");
var div = document.createElement("div");
var editor = CommonjsEditor(div, FooSandbox);
document.body.appendChild(div);
var button = document.createElement("button");
button.textContent = "Eval";
button.addEventListener("click", function () {
  alert(JSON.stringify(global.eval(editor.getScript()), null, 2));
});
document.body.appendChild(button);