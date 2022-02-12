// Cargamos el modelo
const User = require("../models/user");
// Cargamos el módulo de bcrypt
const bcrypt = require("bcrypt");
// Cargamos el módulo de jsonwebtoken
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../utils/httpStatusCode");

async function createUser(req, res, next) {
  try {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    //newUser.adminRole = req.body.adminRole;
    if (!(await User.findOne({ email: req.body.email }))) {
      await newUser.save();
      return res.status(201).json("User registered");
    }
    return res.status(400).json("User email already registered");
    //mejora: logear directamente al usuario
  } catch (err) {
    return next(err);
  }
}
function putUserData(req, res, next) {
  const id = req.params.id;
  const newCart = new Cart({
    adminRole: req.params.adminRole,
    promos: req.params.promos,
    usedPromos: req.params.usedPromos,
    orders: req.params.orders,
    comments: req.params.comments,
    _id: id,
  });
  Cart.findByIdAndUpdate(id, newCart)
    .then(() => res.status(200).json(newCart))
    .catch((error) => {
      next(error);
    });
}
async function autnethicateUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (bcrypt.compareSync(req.body.password, user.password)) {
      user.password = null;
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
        },
        req.app.get("secretKey"),
        {
          expiresIn: "1h",
        }
      );
      return res
        .status(200)
        .json({ token: token, expiresIn: 3600, id: user._id });
    } else {
      return res.status(400).json();
    }
  } catch (error) {
    next(error);
  }
}
async function autnethicateAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (
      bcrypt.compareSync(req.body.password, user.password) &&
      user.adminRole
    ) {
      user.password = null;
      const tokenAdm = jwt.sign(
        {
          id: user._id,
          name: user.name,
        },
        req.app.get("secretAdminKey"),
        {
          expiresIn: "2h",
        }
      );
      return res
        .status(200)
        .json({ tokenAdm: tokenAdm, expiresIn: 3600 * 2, id: user._id });
    } else {
      return res.status(400).json();
    }
  } catch (error) {
    next(error);
  }
}
async function logoutUser(req, res, next) {
  try {
    return res.status(200).json({ token: null });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createUser,
  autnethicateUser,
  autnethicateAdmin,
  logoutUser,
  putUserData,
};
