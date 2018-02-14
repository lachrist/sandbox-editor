const Path = require("path");
const define = (variable, expose, modules) => [ 
  "  if (typeof "+variable+" === \"undefined\")",
  "    eval(\"var "+variable+" = "+(modules.includes("_"+expose)?"require('_"+expose+"')":"{}")+"\");",
  "  require(\""+expose+"\");"
].join("\n");
module.exports = function () {
  return [
    "(function () {",
    "  if (typeof global === \"undefined\")",
    "    eval(\"var global = this\");",
    "  var "+this._sandbox.require,
    define("process", "process", this._sandbox.modules),
    define("Buffer", "buffer", this._sandbox.modules),
    "  return ((() => {",
    "    let module = {exports:{}};",
    "    let exports = module.exports;",
    "    let __filename = "+JSON.stringify(this._sandbox.path)+";",
    "    let __dirname = "+JSON.stringify(Path.dirname(this._sandbox.path))+";",
    "    "+this.getValue(),
    "    return module.exports;",
    "  }) ());",
    "} ())"
  ].join("\n");
};