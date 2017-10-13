# commonjs-editor

Edit JS files within different environments into browsers.
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/sandbox-editor/87e65965/demo/index.html).

## `RawSandbox`

* `type :: string`
* `path :: string`
* `content :: string`

## `BrowserifySandbox`

* `type :: string`
* `path :: string`
* `content :: string`
* `raw :: boolean`
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
    * `options :: browserify.Options`
      * `raw :: boolean`
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
