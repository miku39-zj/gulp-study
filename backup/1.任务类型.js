const fs = require("fs");
const through = require("through2");
const { series, parallel } = require("gulp");
function callbackTask(done) {
  setTimeout(() => {
    console.log("callbackTask");
    done(); // 调用done表示任务完成
  }, 1000);
}
function promiseTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("promiseTask");
      resolve(); // 调用resolve表示promise完成
    }, 1000);
  });
}

async function asyncTask() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("promiseTask");
      resolve(); // 调用resolve表示promise完成
    }, 1000);
  });
}

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

  // return fs
  //   .createReadStream("input.txt", { autoClose: true })
  //   .pipe(
  //     through((chunk, enc, next) => {
  //       // 转换流
  //       setTimeout(() => {
  //         next(null, chunk.toString() + "666");
  //       }, 1000);
  //     })
  //   )
  //   .pipe(fs.createWriteStream("output.txt"), { autoClose: true })
  //   .on("end", () => console.log("写入 end"));
}
// 并行 类似Promise.all
const parallelTask = parallel(callbackTask, promiseTask, asyncTask, streamTask);

// 串行 series
const seriesTask = series(callbackTask, promiseTask, asyncTask, streamTask);

exports.callback = callbackTask;
exports.promiseTask = promiseTask;
exports.asyncTask = asyncTask;

exports.stream = streamTask;
exports.parallelT = parallelTask;
exports.seriesT = seriesTask;
