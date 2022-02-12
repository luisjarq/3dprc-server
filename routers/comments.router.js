const express = require("express");
const router = express.Router();
const {
  getAllComments,
  getById,
  postComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { isAuth } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");
// READ OPERATIONS
router.get("/", getAllComments);
router.get("/:id", getById);
// CREATE OPERATION
router.post("/", [isAuth], postComment);
// DELETE OPERATION
router.delete("/:id", [isAuth, isAdmin], deleteComment);

module.exports = router;
