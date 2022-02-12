const { Error } = require("mongoose");
const Cart = require("../models/cart");

function getAllCarts(req, res, next) {
  Cart.find().exec((error, cart) => {
    if (error) {
      next(error);
    }
    return res.json(cart);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  Cart.findById(id).exec((error, cart) => {
    if (!cart) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(cart);
  });
}
function getCartByUser(req, res, next) {
  const user = req.params.user;
  Cart.findOne({user:user}).exec((error, cart) => {
    if (!cart) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(cart);
  });
}
async function postCart(req, res, next) {
  const newCart = new Cart({
    user: req.body.user,
    date: req.body.date,
    products: req.body.products,
  });
  newCart
    .save()
    .then(() => res.status(201).json(newCart))
    .catch((error) => {
      next(error);
    });
}
function putCart(req, res, next) {
  const id = req.params.id;
  const newCart = new Cart({
    user: req.body.user,
    date: req.body.date,
    products: req.body.products,
    _id: id,
  });
  Cart.findByIdAndUpdate(id, newCart)
    .then(() => res.status(200).json(newCart))
    .catch((error) => {
      next(error);
    });
}
function deleteCart(req, res, next) {
  const id = req.params.id;
  Cart.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Cart with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllCarts,
  getById,
  getCartByUser,
  postCart,
  putCart,
  deleteCart,
};