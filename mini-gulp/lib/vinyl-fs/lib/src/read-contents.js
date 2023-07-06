// 转换流
const File = require("vinyl");
const through = require("through2");
const fs = require("fs");

function readContents() {
  // 转换函数
  function readFile(file, encoding, next) {
    fs.readFile(file.path, "binary", (err, dat) => {
      file.contents = Buffer.from(data);
      next(null, file);
    });
  }
  // Buffer  through(readFile)
  // through.obj  {objectMode: true}
  return through.obj(readFile);
}

module.exports = readContents;
