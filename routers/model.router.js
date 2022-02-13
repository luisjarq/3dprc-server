const express = require("express");
const { getModelById, postModel } = require("../controllers/model.controller");
const { isAdmin } = require("../middleware/admin.middleware");
const { isAuth } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/:modelID", getModelById);
router.post("/",[isAdmin], postModel);

module.exports = router;