```sh
node ../bin.js --type browserify --path foo.js --basedir ../ --min-lines 10 --max-lines 20 --noprocess --nobuffer > foo-sandbox.js
browserify main.js > bundle.js
rm foo-sandbox.js
```
