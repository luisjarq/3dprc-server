const { Error } = require("mongoose");
const ProductPart = require("../models/productPart");

function getAllproductPart(req, res, next) {
  ProductPart.find().exec((error, movie) => {
    if (error) {
      next(error);
    }
    return res.json(movie);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  ProductPart.findById(id).exec((error, movie) => {
    if (!movie) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(movie);
  });
}
function getByName(req, res, next) {
  const name = req.params.name;
  ProductPart.findOne({ name: name })
    .exec((error, food) => {
      if (!food) {
        const notFound = new Error(`[ERROR] name ${name} not found`);
        notFound.status = 404;
        next(notFound);
        return;
      } else if (error) {
        next(error);
        return;
      }
      return res.json(food);
    });
}
async function postProductPart(req, res, next) {
  const newProductPart = new ProductPart({
    name: req.body.name,
    productParts: req.body.productParts,
    price: req.body.price,
    type: req.body.type,
    description: req.body.description,
    imgs: req.body.imgs,
  });
  newProductPart
    .save()
    .then(() => res.status(201).json(newProductPart))
    .catch((error) => {
      next(error);
    });
}
function putProductPart(req, res, next) {
  const id = req.params.id;
  const newProductPart = new ProductPart({
    name: req.body.name,
    productParts: req.body.productParts,
    price: req.body.price,
    type: req.body.type,
    description: req.body.description,
    imgs: req.body.imgs,
    _id: id,
  });
  ProductPart.findByIdAndUpdate(id, newProductPart)
    .then(() => res.status(200).json(newProductPart))
    .catch((error) => {
      next(error);
    });
}
function deleteProductPart(req, res, next) {
  const id = req.params.id;
  ProductPart.findByIdAndDelete(id)
    .then(() => res.status(200).json(`ProductPart with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllproductPart,
  getByName,
  getById,
  postProductPart,
  putProductPart,
  deleteProductPart,
};
