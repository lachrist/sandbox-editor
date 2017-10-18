#!/usr/bin/env node
const Minimist = require("minimist");
const Bundle = require("./bundle.js");
const options = Minimist(process.argv.slice(2));
Bundle[options.type||"raw"](options.path, {
  basedir: options.basedir || process.cwd()
}, (error, sandbox) => {
  if (error)
    throw error;
  process.stdout.write("module.exports = "+JSON.stringify(sandbox, null, 2)+";\n");
});