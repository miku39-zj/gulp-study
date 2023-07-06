const File = require("vinyl");

// 虚拟文件对象 就是一个js对象 用来描述一个文件的
const indexFile = new File({
  cwd: "/", // 当前路径
  base: "/test/", // 所在文件
  path: "/test/index.js", // 路径
  contents: new Buffer("miku"),
});

console.log(File.isVinyl(indexFile)); // 是否是vinyl
console.log(indexFile.isBuffer()); // 是否是buffer
console.log(indexFile.isStream()); // 是否是Stream
