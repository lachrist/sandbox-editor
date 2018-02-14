# sandbox-editor

[NPM module](https://www.npmjs.com/package/sandbox-editor) for editing JS files in the browser and execute them inside a sandbox environment.
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/sandbox-editor/506be7b2/demo/index.html).
Command line interface:

```
sandbox-editor [--type raw] --path foo.js [--basedir .] > foo-sandbox.js
```

In the browserify sandbox, the nodejs pseudo global variables are always available: `module`, `exports`, `require`, `__filename`, `__dirname`.
`__filename` and `__dirname` are the (absolute) path of the current script relative to `options.basedir`.
As for the nodejs genuine global variables, if they are not already defined they are declared as:
* `global`: the global object.
* `process`: if `options.noprocess` is truthy then it is an empty object else it is the [browserify process shim](https://www.npmjs.com/package/process). 
* `Buffer`: if `options.nobuffer` is truthy then it is an empty object else it is the [browserify buffer shim](https://github.com/feross/buffer).

Note that `require("process")` and `require("buffer")` are always available and consistent with their respective globally declared value.

## `RawSandbox`

* `type :: string`
* `path :: string`
* `content :: string`

## `BrowserifySandbox`

* `type :: string`
* `path :: string`
* `content :: string`
* `modules :: [string]`
* `require :: string`

## `Sandbox = require("sandbox-editor/sandbox");`

* `Sandbox :: object`
  * `sandbox = raw(path, options, callback)`
    * `path :: string`
    * `options :: object`
      * `basedir :: string`
      * `editor :: ace.c9.editor.Options`
    * `callback(error, sandbox)`
      * `error :: Error`
      * `sandbox :: sandbox-editor.RawSandbox`
  * `sandbox = browserify(path, options, callback)`
    * `path :: string`
    * `options :: object`
      * `basedir :: string`
      * `editor :: ace.c9.editor.Options`
      * `noprocess :: boolean`
      * `nobuffer :: boolean`
    * `callback(error, sandbox)`
      * `error :: Error`
      * `sandbox :: sandbox-editor.BrowserifySandbox`

## `editor = require("sandbox-editor")(container, sandbox, options)`

* `container :: dom.Element`
* `sandbox :: sandbox-editor.Sandbox`
* `options :: ace.c9.Editor.Options`
* `editor :: brace.Editor`
  * `sandbox = getSandbox()`
    * `sandbox :: sandbox-editor.Sandbox`
  * `script = getScript()`
    * `script :: string`
