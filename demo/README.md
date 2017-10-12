```sh
node ../bin.js --type browserify --path foo.js --basedir ../ > demo/foo-sandbox.js
browserify main.js > bundle.js
rm foo-sandbox.js
```

node ../bin.js --type browserify --path foo.js --basedir ../ > foo-sandbox.js && browserify main.js > bundle.js
