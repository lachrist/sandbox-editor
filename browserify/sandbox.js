
const Fs = require("fs");
const Path = require("path");
const Browserify = require("browserify");
const Resolve = require("resolve");
const Stream = require("stream");

module.exports = (path, options, callback) => {
  options = options || {};
  options.basedir = String(options.basedir) || Path.dirname(path);
  options.nobuffer = Boolean(options.nobuffer) || false;
  const sandbox = {
    type: "browserify",
    path: "/"+Path.relative(options.basedir, path),
    modules: []
  };
  Fs.readFile(path, "utf8", (error, content) => {
    if (error)
      return callback(error);
    // const checkbuffer = (content) => {
    //   if (sandbox.modules.indexOf("buffer") === -1 && content.search(/([^a-zA-Z0-9_$]|^)Buffer([^a-zA-Z0-9_$]|$)/) !== -1) {
    //     browserify.require("buffer", "buffer");
    //     sandbox.modules.push("buffer");
    //   }
    // }
    const browserify = Browserify({detectGlobals:false});
    if (!options.nobuffer) {
      browserify.require("buffer", {expose:"buffer"});
      sandbox.modules.push("buffer");
    }
    browserify.transform((file) => {
      let content = "";
      const stream = new Stream.Transform({
        decodeStrings: false,
        transform: (chunk, encoding, callback) => {
          content += chunk;
          stream.push(chunk, encoding);
          callback();
        },
        flush: (callback) => {
          // checkbuffer(content);
          const filename = "/"+Path.relative(options.basedir, file);
          stream.push("\n}) ("+JSON.stringify(filename)+","+JSON.stringify(Path.dirname(filename))+"));");
          callback();
        }
      });
      stream.push("(((__filename, __dirname) => {\n");
      return stream;
    }, {global:true});
    // checkbuffer(content);
    sandbox.content = content.replace(/([^a-zA-Z0-9_$]|^)require\s*\(\s*(("[^"]*")|('[^']*'))\s*\)/g, (match, p1, p2) => {
      let module = eval(p2);
      if (module[0] === ".")
        module = Path.resolve(Path.dirname(path), module);
      const expose = module[0] === "/" ? "/"+Path.relative(options.basedir, module) : module;
      if (module[0] !== "/" && !Resolve.isCore(module))
        module = Resolve.sync(module, {basedir:Path.dirname(path)});
      if (sandbox.modules.indexOf(module) === -1) {
        browserify.require(module, {expose:expose});
        sandbox.modules.push(expose);
      }
      return p1+"require("+JSON.stringify(expose)+")";
    });
    // const comments = ["Available nodejs variables: module, exports, require, global, __filename, __dirname"+(modules.includes("buffer")?", Buffer":"")]
    // if (sandbox.modules.length) {
    //   comments.push("Available modules:");
    //   sandbox.modules.forEach((module) => comments.push("  - "+module));
    // }
    // sandbox.content = comments.map((line) => "// "+line+"\n").join("")+sandbox.content;
    browserify.bundle((error, bundle) => {
      if (error)
        return callback(error);
      sandbox.require = bundle.toString("utf8");
      callback(null, sandbox);
    });
  });
};
