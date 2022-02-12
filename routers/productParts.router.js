const express = require("express");
const router = express.Router();
const {
  getAllproductParts,
  getByName,
  getById,
  postProductPart,
  putProductPart,
  deleteProductPart,
} = require("../controllers/productParts.controller");
const { isAdmin } = require("../middleware/admin.middleware");
const { isAuth } = require("../middleware/auth.middleware");
// READ OPERATIONS
router.get("/", getAllproductParts);
router.get("/:id" , getById);
router.get("/name/:name" , getByName);
// CREATE OPERATION
router.post("/", [isAdmin], postProductPart);
// UPDATE OPERATION
router.put("/:id", [isAdmin], putProductPart);
// DELETE OPERATION
router.delete("/:id", [isAdmin], deleteProductPart);

module.exports = router;