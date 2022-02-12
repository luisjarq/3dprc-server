const express = require("express");
const router = express.Router();
const {
  getAllPromos,
  getById,
  postPromo,
  putPromo,
  deletePromo,
} = require("../controllers/promo.controller");
const { isAdmin } = require("../middleware/admin.middleware");
const { isAuth } = require("../middleware/auth.middleware");
// READ OPERATIONS
router.get("/", getAllPromos);
router.get("/:id" , getById);
// CREATE OPERATION
router.post("/", [isAuth, isAdmin], postPromo);
// UPDATE OPERATION
router.put("/:id", [isAuth, isAdmin], putPromo);
// DELETE OPERATION
router.delete("/:id", [isAuth, isAdmin], deletePromo);

module.exports = router;