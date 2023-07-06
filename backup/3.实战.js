const { src, dest, parallel, watch, series } = require("gulp");
const less = require("gulp-less");
const gulpClean = require("gulp-clean");
const babel = require("gulp-babel");
const ejs = require("gulp-ejs");
const browserSync = require("browser-sync");
const browserSyncServe = browserSync.create();
// const imagemin = require("gulp-imagemin");
const path = require("path");
const useref = require("gulp-useref");
const htmlmin = require("gulp-htmlmin");
const GulpUglify = require("gulp-uglify");
const GulpCleanCss = require("gulp-clean-css");
const gulpIf = require("gulp-if");
// 清空输出目录
const clean = () => {
  return src(["dist/**", "temp/**"], { read: false }).pipe(gulpClean());
};
// 编译样式
const styles = () => {
  return src("src/styles/**/*.less", { base: "src" })
    .pipe(less())
    .pipe(dest("temp"));
};

// 编译js
const scripts = () => {
  return src("src/scripts/**/*.js", { base: "src" })
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest("temp"));
};

// 编译html
const html = () => {
  return src("src/**/*.html", { base: "src" })
    .pipe(
      ejs({
        title: "gulp",
      })
    )
    .pipe(dest("temp"));
};
const images = async () => {
  const imagemin = await import("gulp-imagemin");
  return src("src/assets/images/**/*.@(jpg|png|gif|svg)", { base: "src" })
    .pipe(imagemin.default())
    .pipe(dest("dist"));
};
// 拷贝静态文件
const static = async () => {
  return src("static/**", { base: "static" }).pipe(dest("dist"));
};

const serve = () => {
  watch("src/styles/**/*.less", styles).on("change", browserSyncServe.reload);
  watch("src/scripts/**/*.js", scripts);
  watch("src/**/*.html", html);

  watch(
    ["src/assets/images/**/*.@(jpg|png|gif|svg)", "static/**"],
    browserSyncServe.reload
  );
  // serve 不会在内存和硬盘上生成任何文件
  return browserSyncServe.init({
    notify: false,
    server: {
      baseDir: ["dist", "src", "static"], // 静态文件目录
      files: ["dist/**"], // 监听文件变化
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
};

// useref 找html中的引用注释
const concat = () => {
  return src("temp/**/*.html", { base: "temp" })
    .pipe(useref({ searchPath: ["temp", "."] }))
    .pipe(gulpIf("*.js", GulpUglify()))
    .pipe(gulpIf("*.css", GulpCleanCss()))
    .pipe(
      gulpIf(
        "*.html",
        htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        })
      )
    )
    .pipe(dest("dist"));
};

const compile = parallel(styles, scripts, html);

const build = series(clean, parallel(series(compile, concat), images, static));

const dev = series(clean, compile, serve);

exports.styles = styles;
exports.clean = clean;
exports.scripts = scripts;
exports.html = html;

exports.images = images;

exports.serve = serve;

exports.compile = compile;
exports.build = build;
exports.dev = dev;
