const { series, parallel, src, dest } = require("./mini-gulp/lib/index.js");
const gulpBabel = require("./plugins/gulp-babel.js");
const gulpPrefixerr = require("./plugins/gulp-prefixer.js");
const defaultTask = (done) => {
  // src会从文本匹配出发啊 找到匹配的文件 src会返回一个可读流  可读流里放一个一个的文件
  // 写入目标目录
  return src("src/scripts/**/*.js").pipe(dest("dist"));
};

const defaultTask2 = (done) => {
  return src("src/scripts/**/*.js")
    .pipe(gulpPrefixerr("/**predended**/\n"))
    .pipe(gulpBabel({ presets: ["@babel/preset-env"] }))
    .pipe(dest("dist"));
};

const oneTask = (done) => {
  setTimeout(() => {
    console.log("defaultTask");
    done();
  }, 3000);
};
const twoTask = (done) => {
  setTimeout(() => {
    console.log("defaultTask");
    done();
  }, 3000);
};
const threeTask = (done) => {
  setTimeout(() => {
    console.log("defaultTask");
    done();
  }, 3000);
};

// 并行 类似Promise.all
const parallelTask = parallel(oneTask, twoTask, threeTask);
// 串行 series
const seriesTask = series(oneTask, twoTask, threeTask);

exports.defaultTask = defaultTask;
exports.parallelTask = parallelTask;
exports.seriesTask = seriesTask;
