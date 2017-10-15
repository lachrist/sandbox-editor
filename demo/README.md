```sh
node ../bin.js --type browserify --path foo.js --basedir ../ --noprocess --nobuffer > foo-sandbox.js
browserify main.js > bundle.js
rm foo-sandbox.js
```
