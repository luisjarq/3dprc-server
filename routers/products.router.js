const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getByName,
  getByType,
  getById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controllers/foods.controller");
const { isAdmin } = require("../middleware/admin.middleware");
const { isAuth } = require("../middleware/auth.middleware");
// READ OPERATIONS
router.get("/", getAllProducts);
router.get("/:id" , getByType);
router.get("/name/:name" , getByName);
router.get("/type/:type" , getById);
// CREATE OPERATION
router.post("/", [isAdmin], postProduct);
// UPDATE OPERATION
router.put("/:id", [isAdmin], putProduct);
// DELETE OPERATION
router.delete("/:id", [isAdmin], deleteProduct);

module.exports = router;