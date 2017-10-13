#!/usr/bin/env node

const Minimist = require("minimist");
const options = Minimist(process.argv.slice(2));
const Sandbox = require("./sandbox.js");
Sandbox[options.type](options.path, {basedir:options.basedir||process.cwd()}, function (error, sandbox) {
  if (error)
    throw error;
  process.stdout.write("module.exports = "+JSON.stringify(sandbox, null, 2)+";\n");
});
