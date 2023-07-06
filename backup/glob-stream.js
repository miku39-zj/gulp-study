const { Readable } = require("stream");
let util = require("util");
let { Glob } = require("glob");
let globParent = require("glob-parent");
let toAbsoluteGlob = require("to-absolute-glob");

function GlobStream(glob, opt = {}) {
  // 当前的工作目录
  opt.cwd = opt.cwd || process.cwd();
  Readable.call(this, { objectMode: true }); // objectMode流里 放的可以不是buffer  而是对象

  let absoluteGlob = toAbsoluteGlob(glob);
  console.log(absoluteGlob, "absoluteGlob");

  let basePath = globParent(absoluteGlob);
  console.log(basePath, "basePath");
  // globber 也是个可读流
  let globber = new Glob(absoluteGlob, opt);

  this._globber = globber;
  // glob内部会根据文本匹配模式匹配文件 没匹配一个文件 就会触发match事件
  globber.on("match", (filePath) => {
    let obj = {
      cwd: opt.cwd, // 当前工作目录
      base: basePath, // 基本路径
      path: filePath, // 文件路径W
    };
    this.push(obj);
  });

  globber.on("end", (filePath) => {
    this.push(null);
  });
}
util.inherits(GlobStream, Readable);

GlobStream.prototype._read = function () {
  // 开始读取数据 on('data') 内部就是调用的 resume 方法
  this._globber.resume();
};

module.exports = GlobStream;
