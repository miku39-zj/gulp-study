#!/user/bin/env node
const registerExports = require("./registerExports.js");
const logEvents = require("./logEvents.js");
const path = require("path");
const gulpInst = require("../lib");

logEvents(gulpInst);

// 获取任务名称
const taskName = process.argv[2];
const toRun = taskName || "defaultTask" || "default";

// 获取配置文件
// const configPath =
//   path.join(process.cwd(), "gulpfile.js") || "../../gulpfile.js";
const configPath = "../../gulpfile.js";
console.log(configPath, "configPath");
// 获取导出对象
const exported = require(configPath);

// 注册导出的任务 到gulp实例
registerExports(gulpInst, exported);
gulpInst.parallel(toRun)(() => console.log("well done"));
