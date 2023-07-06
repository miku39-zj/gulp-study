const EventEmitter = require("events");
const util = require("util");

function Undertaker() {
  EventEmitter.call(this);

  // 存放任务
  this._tasks = {};
}
function task(name, fn) {
  this._tasks[name] = fn;
}
function series() {
  // 拿到所有要串行执行的函数数组
  let args = Array.from(arguments);
  let fn = buildSeries(args);
  return fn.bind(this);
}
function parallel() {
  // 拿到所有要并行执行的函数数组
  let args = Array.from(arguments);
  let fn = buildParallel(args);
  return fn.bind(this);
}

Undertaker.prototype.task = task;
Undertaker.prototype.series = series;
Undertaker.prototype.parallel = parallel;

function buildSeries(values) {
  function series(done) {
    let length = values.length;
    let idx = 0;
    let results = [];
    let self = this;
    function next(idx) {
      let value = values[idx];
      let startMS = Date.now();
      if (typeof value !== "function") {
        value = self._tasks[value];
      }
      self.emit("start", { name: value.name });
      value((err, result) => {
        self.emit("stop", {
          name: value.name,
          duration: [(Date.now() - startMS) / 1000],
        });
        results[idx] = result;
        if (++idx >= length) {
          done(err, results);
        } else {
          next(idx);
        }
      });
    }
    next(idx);
  }
  return series;
}

function buildParallel(values) {
  function parallel(done) {
    let length = values.length;
    let counter = length;
    let results = [];
    let self = this;
    function next(idx) {
      let value = values[idx];
      self.emit("start", { name: value.name });
      if (typeof value !== "function") {
        value = self._tasks[value];
      }
      let startMS = Date.now();
      value((err, result) => {
        self.emit("stop", {
          name: value.name,
          duration: [(Date.now() - startMS) / 1000],
        });

        results[idx] = result;
        if (idx >= length - 1) {
          done(err, results);
        }
      });
    }
    for (let idx = 0; idx < length; idx++) {
      next(idx);
    }
  }
  return parallel;
}

util.inherits(Undertaker, EventEmitter);

module.exports = Undertaker;
