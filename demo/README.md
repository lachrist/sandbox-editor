```sh
node ../bin.js --type raw        --path fac.js --basedir ../ > fac-sandbox.js
node ../bin.js --type browserify --path foo.js --basedir ../ > foo-sandbox.js
browserify main.js > bundle.js
rm fac-sandbox.js
rm foo-sandbox.js
```
