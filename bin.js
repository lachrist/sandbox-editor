#!/usr/bin/env node
const Minimist = require("minimist");
const options = Minimist(process.argv.slice(2));
const Sandbox = require("./sandbox.js");
const editor = {};
if ("max-lines" in options)
  editor.maxLines = options["max-lines"];
if ("min-lines" in options)
  editor.minLines = options["min-lines"];
Sandbox[options.type||"raw"](options.path, {
  basedir: options.basedir || process.cwd(),
  editor: editor,
  nobuffer: options.nobuffer || false,
  noprocess: options.noprocess || false
}, (error, sandbox) => {
  if (error)
    throw error;
  process.stdout.write("module.exports = "+JSON.stringify(sandbox, null, 2)+";\n");
});