const Path = require("path");
module.exports = function () {
  return [
    "((() => {",
    "  "+this._sandbox.require,
    "  "+(this._sandbox.modules.includes("buffer")?"let Buffer = require(\"buffer\");":""),
    "  let global = window;",
    "  return ((() => {",
    "    let module = {exports:{}};",
    "    let exports = module.exports;",
    "    let __filename = "+JSON.stringify(this._sandbox.path)+";",
    "    let __dirname = "+JSON.stringify(Path.dirname(this._sandbox.path))+";",
    "    "+this.getValue(),
    "    return module.exports;",
    "  }) ());",
    "}) ())"
  ].join("\n");
};