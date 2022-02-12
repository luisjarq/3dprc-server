const express = require("express");
const { getModelById, postModel } = require("../controllers/model.controller");
const { isAuth } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/:modelID", getModelById);
router.post("/", postModel);

module.exports = router;