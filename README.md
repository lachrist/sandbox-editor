# commonjs-editor

Edit JS files within different environments into browsers.
Usage [here](/demo), live demo [here](wesh).

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

## `require("sandbox-editor/raw/sandbox")(path, options, callback)`

* `path :: string`
* `options :: object`
  * `basedir :: string`
* `callback(error, sandbox)`
  * `error :: Error`
  * `sandbox :: sandbox-editor.RawSandbox`

## `require("sandbox-editor/browserify/sandbox")(path, options, callback)`

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
