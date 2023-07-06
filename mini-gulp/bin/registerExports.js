function registerExports(gulpInst, tasks) {
  Object.keys(tasks).forEach((taskName) => {
    // 注册任务
    gulpInst.task(taskName, tasks[taskName]);
  });
}

module.exports = registerExports;

/**
 * tasks
 * exporst = {default, callback, promiseTask....}
 */
