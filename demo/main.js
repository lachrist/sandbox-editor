const SandboxEditor = require("../main.js");
const FooSandbox = require("./foo-sandbox.js");
const div = document.createElement("div");
const editor = SandboxEditor(div, FooSandbox);
document.body.appendChild(div);
const button = document.createElement("button");
button.textContent = "Eval";
button.addEventListener("click", () => {
  const global = "sandbox-global";
  const process = "sandbox-process";
  const Buffer = "sandbox-buffer";
  alert(JSON.stringify(eval(editor.getScript()), null, 2));
});
document.body.appendChild(button);