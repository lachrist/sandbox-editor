# commonjs-editor

Edit JS files within different environments into browsers.
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/sandbox-editor/7179a926/demo/index.html).
In the BrowserifySandbox environment, the following nodejs variables are always available: `module`, `exports`, `require`, `__filename`, `__dirname`, `global`.
`process` is never available (nowhere) but can be defined globally before evaluating the script.
`Buffer` is not available (nowhere) only if `options.nobuffer` is truthy *and* `buffer` is not required in the top-level file.

```
sandbox-editor --path script.js [--basedir .] [--nobuffer] > sandbox.js
```

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
    * `callback(error, sandbox)`
      * `error :: Error`
      * `sandbox :: sandbox-editor.RawSandbox`
  * `sandbox = browserify(path, options, callback)`
    * `path :: string`
    * `options :: object`
      * `basedir :: string`
      * `nobuffer :: boolean`
    * `callback(error, sandbox)`
      * `error :: Error`
      * `sandbox :: sandbox-editor.BrowserifySandbox`

## `editor = require("sandbox-editor")(container, sandbox)`

* `container :: dom.Element`
* `sandbox :: sandbox-editor.RawSandbox | sandbox-editor.BrowserifySandbox`
* `editor :: brace.Editor`
  * `path = getPath()`
    * `path :: string`
  * `script = getScript()`
    * `script :: string`
