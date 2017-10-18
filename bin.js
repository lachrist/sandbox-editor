#!/usr/bin/env node
const Minimist = require("minimist");
const Sandbox = require("./sandbox.js");
const options = Minimist(process.argv.slice(2));
Sandbox[options.type||"raw"](options.path, {
  basedir: options.basedir || process.cwd()
}, (error, sandbox) => {
  if (error)
    throw error;
  process.stdout.write("module.exports = "+JSON.stringify(sandbox, null, 2)+";\n");
});