
const Fs = require("fs");
const Path = require("path");
const Browserify = require("browserify");
const Resolve = require("resolve");
const Stream = require("stream");

module.exports = (path, options, callback) => {
  options = options || {};
  options.basedir = String(options.basedir || process.cwd());
  options.editor = options.editor || {};
  options.noprocess = Boolean(options.noprocess);
  options.nobuffer = Boolean(options.nobuffer);
  const sandbox = {
    type: "browserify",
    path: "/"+Path.relative(options.basedir, path),
    editor: options.editor,
    modules: [],
  };
  Fs.readFile(path, "utf8", (error, content) => {
    if (error)
      return callback(error);
    const browserify = Browserify({detectGlobals:false});
    const add = (module, expose) => {
      browserify.require(module, {expose:expose});
      sandbox.modules.push(expose);
    };
    ((() => {
      const shim = (variable, expose) => {
        const readable = new Stream.Readable({read:()=>{}});
        readable.push("module.exports = "+variable+";");
        readable.push(null);
        if (!options["no"+expose])
          add(expose, "_"+expose);
        add(readable, expose);
      };
      shim("process", "process");
      shim("Buffer", "buffer");
    }) ());
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
          const filename = "/"+Path.relative(options.basedir, file);
          stream.push("\n}) ("+JSON.stringify(filename)+","+JSON.stringify(Path.dirname(filename))+"));");
          callback();
        }
      });
      stream.push("(((__filename, __dirname) => {\n");
      return stream;
    }, {global:true});
    sandbox.content = content.replace(/([^a-zA-Z0-9_$]|^)require\s*\(\s*(("[^"]*")|('[^']*'))\s*\)/g, (match, p1, p2) => {
      let module = eval(p2);
      if (module[0] === ".")
        module = Path.resolve(Path.dirname(path), module);
      const expose = module[0] === "/" ? "/"+Path.relative(options.basedir, module) : module;
      if (module[0] !== "/" && !Resolve.isCore(module))
        module = Resolve.sync(module, {basedir:Path.dirname(path)});
      if (sandbox.modules.indexOf(module) === -1)
        add(module, expose);
      return p1+"require("+JSON.stringify(expose)+")";
    });
    browserify.bundle((error, bundle) => {
      if (error)
        return callback(error);
      sandbox.require = bundle.toString("utf8");
      callback(null, sandbox);
    });
  });
};
