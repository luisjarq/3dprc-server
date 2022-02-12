const express = require("express");
const router = express.Router();
const {
  getAllCarts,
  getById,
  getByUser,
  postCart,
  putCart,
  deleteCart,
} = require("../controllers/booking.controller");
const { isAuth } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");
const { getByUser } = require("../controllers/cart.controller");
// READ OPERATIONS
router.get("/", [isAdmin], getAllCarts);
router.get("/:id", [isAuth], getById);
router.get("/user/:user", [isAuth], getByUser);
// CREATE OPERATION
router.post("/", [isAuth], postCart);
// UPDATE OPERATION
router.put("/:id", [isAuth], putCart);
// DELETE OPERATION
router.delete("/:id", [isAuth], deleteCart);

module.exports = router;
