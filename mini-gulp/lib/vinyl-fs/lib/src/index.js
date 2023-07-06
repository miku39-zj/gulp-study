const GlobStream = require("./glob-stream");

const wrapVinyl = require("./wrap-vinyl");
const readContents = require("./read-contents");

function src(glob, opt) {
  let gs = new GlobStream(glob, opt);
  // gs() 获取可读流
  // wrapVinyl() 把每个globFile包装成一个vinyl File对象
  // readContents() 读取每个file对象的文件内容 并存到 files.contents 上
  return gs.pipe(wrapVinyl()).pipe(readContents());
}

module.exports = src;
