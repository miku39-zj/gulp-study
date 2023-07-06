const through = require("through2");

function gulpPrefixerr(prefixText) {
  prefixText = Buffer.from(prefixText);
  const stream = through.obj((file, enc, next) => {
    if (file.isBuffer()) {
      file.contents = Buffer.concat([prefixText, file.contents]);
    }
    this.push(file);
    next();
  });
  return stream;
}
module.exports = gulpPrefixerr;
