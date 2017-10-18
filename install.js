const Fs = require("fs");
const Path = require("path");

process.argv.slice(2).forEach(x => { Fs.symlinkSync(x, Path.join(__dirname, "sandbox", Path.basename(x))) });
const basenames = Fs.readdirSync(Path.join(__dirname, "sandbox")).filter((s) => s !== ".DS_Store");
const lineof = (x) => (y) => "exports."+y+" = require("+JSON.stringify("./sandbox/"+y+"/"+x)+");"
const write = (x) => Fs.writeFileSync(Path.join(__dirname, x), basenames.map(lineof(x)).join("\n"));

write("bundle.js");
write("get-script.js");
write("theme.js");