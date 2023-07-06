const { Readable } = require("stream");
let util = require("util");

function GlobStream() {
  Readable.call(this, { objectMode: true });
}
util.inherits(GlobStream, Readable);

const files = ["file1", "file2", "file3"];
let idx = 0;
// read 从数据源中读取数据
// 当on data 后会开启一个死循环，不停的调用 _read 方法， 注入数据，  知道注入 null
GlobStream.prototype._read = function () {
  if (idx < files.length) {
    this.push(files[idx]);
  } else {
    // 放置Null 表示结束
    this.push(null);
  }
  idx++;
};
let gs = new GlobStream();
gs.on("data", (data) => {
  console.log(data);
});
