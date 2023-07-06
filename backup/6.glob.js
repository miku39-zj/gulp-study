const GlobStream = require("./glob-stream");
const { Transform } = require("stream");
const VinylFile = require("vinyl");
// const wrapVinyl = require("./wrap-vinyl");

const golb = "src/scripts/**/*.js";

function wrapVinyl() {
  return new Transform({
    objectMode: false,
    transform(globFile, encoding, next) {
      // 如果转换后是Buffer
      next(null, new VinylFile(globFile));
    },
  });
}

wrapVinyl.obj = function wrapVinyl() {
  return new Transform({
    objectMode: true,
    transform(globFile, encoding, next) {
      next(null, new VinylFile(globFile));
    },
  });
};

let globStream = new GlobStream(golb);

globStream.pipe(wrapVinyl()).on("data", (data) => {
  console.log(data, "data111");
});
