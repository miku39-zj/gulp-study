const fs = require("fs");
const through = require("through2");
const { series, parallel, src, dest } = require("gulp");

function streamTask() {
  // 要等待流这个异步任务 之后才结束
  let rs = fs.createReadStream("input.txt", { autoClose: true });
  let ws = fs.createWriteStream("output.txt", { autoClose: true });
  return rs
    .pipe(
      through((chunk, enc, next) => {
        // 转换流
        setTimeout(() => {
          next(null, chunk.toString() + "666");
        }, 1000);
      })
    )
    .pipe(ws, { end: true })
    .on("end", () => console.log("写入 end"));
}
/**
 * dest 指定的是输出的目录名， 不包括文件路径
 * 文件路径或者文件名 是 glob 里通配符开始的路径部分
 *
 */
function copyTask() {
  console.log("执行拷贝任务");
  return src("src/scripts/**/*.js", { base: "src" }).pipe(dest("dist"));
}

exports.stream = streamTask;
exports.copy = copyTask;
