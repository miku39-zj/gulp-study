function logEvents(gulpInst) {
  // undertaker 执行任务的时候 触发starts事件
  gulpInst.on("start", (evt) => {
    console.log(`start ${evt.name}`);
  });
  gulpInst.on("stop", (evt) => {
    console.log(`finish ${evt.name} after ${evt.duration[0]} ms`);
  });
}

module.exports = logEvents;
