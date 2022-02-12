const express = require("express");
const router = express.Router();

const {
  createUser,
  autnethicateUser,
  logoutUser,
  autnethicateAdmin,
  putUserData,
} = require("../controllers/user.controller");

const { isAuth } = require("../middleware/auth.middleware");

router.post("/register", createUser);
router.post("/login", autnethicateUser);
router.post("/login/adm", [isAuth], autnethicateAdmin);
router.post("/logout", [isAuth], logoutUser);
router.put("/updateCart", [isAuth], putUserData);

module.exports = router;
