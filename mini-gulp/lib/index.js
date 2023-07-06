// const Undertaker = require("undertaker");
const Undertaker = require("./undertaker");
const util = require("util");
const vfs = require("./vinyl-fs");

function Gulp() {
  Undertaker.call(this);

  this.task = this.task.bind(this);

  this.series = this.series.bind(this);
  this.parallel = this.parallel.bind(this);

  this.src = this.src.bind(this);
  this.dest = this.dest.bind(this);
}
util.inherits(Gulp, Undertaker);
// Object.setPrototypeOf(Gulp, Undertaker)
Gulp.prototype.src = vfs.src;
Gulp.prototype.dest = vfs.dest;

const inst = new Gulp();
module.exports = inst;
