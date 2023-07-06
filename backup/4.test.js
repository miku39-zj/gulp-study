const { series, parallel, src, dest } = require("./mini-gulp/bin/gulp");
const defaultTask = (done) => {
  console.log("defaultTask");
  done();
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

exports.parallelTask = parallelTask;
exports.seriesTask = seriesTask;
