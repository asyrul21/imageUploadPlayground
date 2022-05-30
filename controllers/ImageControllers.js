const asyncHandler = require("express-async-handler");
// const {
//   retrieveImage: getImage,
//   deleteImage: removeImage,
// } = require("../utils/AWSS3");
const sharp = require("sharp");
const busboy = require("busboy");
const multer = require("multer");
const upload = multer();

// const { configureAwsS3Middleware } = require("../middlewares/uploadMiddleware");
// const { imageSizes } = require("../constants");
// const upload = configureAwsS3Middleware().single("image");

const uploadOneImage = (req, res, next) => {
  console.log("Request header:");
  console.log(req.headers);

  console.log("Request body:");
  console.log(req.body);

  /* play area */
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    console.log("there is a file!");
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    file
      .on("data", (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
        console.log(data);
        console.log("CALLING MULTER!!");
        upload.single("image")(req, res, function (err) {
          if (err) {
            res.status(400);
            return next(err);
          }
          console.log("MULTER UPLOAD SUCCESS");
          console.log(req.file);
        });
      })
      .on("close", () => {
        console.log(`File [${name}] done`);
      });
  });
  bb.on("close", () => {
    console.log("Done parsing form!");
    // res.writeHead(303, { Connection: "close", Location: "/" });
    res.end();
    // res.send("Upload One Image SUCCESS!");
  });
  req.pipe(bb);
  /* play area */

  //   console.log("Request file:");
  //   console.log(req.file);
  //   res.send("Upload One Image endpoint!");
};

module.exports = {
  uploadOneImage,
};
