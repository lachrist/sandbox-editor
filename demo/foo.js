console.log("foo");
var Bar = require("./bar.js");
var Qux = require("qux");
exports.Bar = Bar;
exports.Qux = Qux;
exports.global = global;
exports.Buffer = Buffer;
exports.process = process;
exports.__dirname = __dirname;
exports.__filename = __filename;