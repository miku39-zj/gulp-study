// 转换流
const File = require("vinyl");
const through = require("through2");
const fs = require("fs-extra");
const path = require("path");

function writeContents(outFolder) {
  // 转换函数
  function writeFile(file, encoding, next) {
    const outputPath = path.resolve(file.cwd, outFolder);
    console.log("outputPath", outputPath);
    let writePath = path.resolve(outputPath, file.relative);
    console.log("writePath", writePath);

    file.path = writePath;
    fs.ensureDir(path.dirname(writePath), (err) => {
      fs.writeFile(file.path, file.content, encoding, next);
    });
  }
  // Buffer  through(readFile)
  // through.obj  {objectMode: true}
  return through.obj(writeFile);
}

module.exports = writeContents;
