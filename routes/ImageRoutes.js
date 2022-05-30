const express = require("express");
const router = express.Router();
const { uploadOneImage } = require("../controllers/imageControllers");

router.route("/").post(uploadOneImage);

module.exports = router;
