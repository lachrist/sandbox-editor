const SandboxEditor = require("../main.js");
const FooSandbox = require("./foo-sandbox.js");
const FacSandbox = require("./fac-sandbox.js");
const button = document.createElement("button");
document.body.appendChild(button);
const edit = (sandbox) => {
  const h2 = document.createElement("h2");
  const div = document.createElement("div");
  h2.textContent = sandbox.path+" ["+sandbox.type+"]";
  document.body.appendChild(h2);
  document.body.appendChild(div);
  return SandboxEditor(div, sandbox);
}
const editor1 = edit(FacSandbox);
const editor2 = edit(FooSandbox);
button.textContent = "Eval";
button.addEventListener("click", () => {
  alert(window.eval(editor1.getScript()));
  const Buffer = "predefined-buffer";
  alert(JSON.stringify(eval(editor2.getScript()), null, 2));
});