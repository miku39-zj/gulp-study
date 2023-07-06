// 转换流
const File = require("vinyl");

const through = require("through2");

function wrapVinyl() {
  // 转换函数
  function wrapFile(globFile, encoding, next) {
    next(null, new File(globFile));
  }
  // Buffer  through(wrapFile)
  // through.obj  {objectMode: true}
  return through.obj(wrapFile);
}

module.exports = wrapVinyl;
