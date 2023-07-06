const through = require("through2");
const babel = require("@babel/core");

function gulpBabel(options) {
  const stream = through.obj((file, enc, next) => {
    const { code } = babel.transformSync(file.contents, options);
    file.contents = Buffer.from(code);
    this.push(file);
    next();
  });
  return stream;
}

module.exports = gulpBabel;
