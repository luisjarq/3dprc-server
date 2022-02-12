const multer = require("multer");

//GET model by ID Route
const multer = require(multer)
function getModelById(req, res, next) {
  try {
    var modelID = new ObjectID(req.params.modelID);
  } catch (err) {
    return res.status(400).json({
      message:
        "Invalid ID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters",
    });
  }
  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: "models",
  });
  let downloadStream = bucket.openDownloadStream(modelID);
  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });
  downloadStream.on("error", () => {
    res.sendStatus(404);
  });
  downloadStream.on("end", () => {
    res.end();
  });
}

//POST model Route
function postModel(req, res, next) {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
  upload.single("model")(req, res, (err) => {
    if (err) {
      next(
        res.status(400).json({ message: "Upload Request Validation Failed" })
      );
    } else if (!req.body.name) {
      next(res.status(400).json({ message: "No model name in request body" }));
    }
    let modelName = req.body.name;
    // Covert buffer to Readable Stream
    const readableModelStream = new Readable();
    readableModelStream.push(req.file.buffer);
    readableModelStream.push(null);

    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: "models",
    });

    let uploadStream = bucket.openUploadStream(modelName);
    let id = uploadStream.id;
    readableModelStream.pipe(uploadStream);

    uploadStream.on("error", () => {
      next(res.status(500).json({ message: "Error uploading file" }));
    });

    uploadStream.on("finish", () => {
      return res.status(201).json({
        message:
          "File uploaded successfully, stored under Mongo ObjectID: " + id,
      });
    });
  });
}
module.exports = {
    getModelById,
    postModel
  };
  
