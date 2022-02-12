const { Error } = require("mongoose");
const Product = require("../models/product");

function getAllProducts(req, res, next) {
  Product.find().exec((error, product) => {
    if (error) {
      next(error);
    }
    return res.json(product);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  Product.findById(id).exec((error, product) => {
    if (!product) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(product);
  });
}
function getByName(req, res, next) {
  const name = req.params.name;
  Product.findOne({ name: name })
    .populate("productParts")
    .exec((error, product) => {
      if (!product) {
        const notFound = new Error(`[ERROR] name ${name} not found`);
        notFound.status = 404;
        next(notFound);
        return;
      } else if (error) {
        next(error);
        return;
      }
      return res.json(product);
    });
}
function getByType(req, res, next) {
  const type = req.params.type;
  Product.findOne({ type: type })
    .populate("productParts")
    .populate("imgs")
    .exec((error, product) => {
      if (!product) {
        const notFound = new Error(`[ERROR] name ${name} not found`);
        notFound.status = 404;
        next(notFound);
        return;
      } else if (error) {
        next(error);
        return;
      }
      return res.json(product);
    });
}
async function postProduct(req, res, next) {
  const newProduct = new Product({
    name: req.body.name,
    productParts: req.body.productParts,
    price: req.body.price,
    type: req.body.type,
    description: req.body.description,
    imgs: req.body.imgs,
  });
  newProduct
    .save()
    .then(() => res.status(201).json(newProduct))
    .catch((error) => {
      next(error);
    });
}
function putProduct(req, res, next) {
  const id = req.params.id;
  const newProduct = new Product({
    name: req.body.name,
    productParts: req.body.productParts,
    price: req.body.price,
    type: req.body.type,
    description: req.body.description,
    imgs: req.body.imgs,
    _id: id,
  });
  Product.findByIdAndUpdate(id, newProduct)
    .then(() => res.status(200).json(newProduct))
    .catch((error) => {
      next(error);
    });
}
function deleteProduct(req, res, next) {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Product with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllProducts,
  getByName,
  getByType,
  getById,
  postProduct,
  putProduct,
  deleteProduct,
};
