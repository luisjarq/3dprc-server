const { Error } = require("mongoose");
const Promo = require("../models/promo");

function getAllPromos(req, res, next) {
  Promo.find().exec((error, promo) => {
    if (error) {
      next(error);
    }
    return res.json(promo);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  Promo.findById(id).exec((error, promo) => {
    if (!promo) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(promo);
  });
}
async function postPromo(req, res, next) {
  const newPromo = new Promo({
    name: req.body.name,
    value: req.body.value,
    units: req.body.units,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    active: req.body.active,
    comment: req.body.comment,
  });
  newPromo
    .save()
    .then(() => res.status(201).json(newPromo))
    .catch((error) => {
      next(error);
    });
}
function putPromo(req, res, next) {
  const id = req.params.id;
  const newPromo = new Promo({
    name: req.body.name,
    value: req.body.value,
    units: req.body.units,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    active: req.body.active,
    comment: req.body.comment,
    _id: id,
  });
  Promo.findByIdAndUpdate(id, newPromo)
    .then(() => res.status(200).json(newPromo))
    .catch((error) => {
      next(error);
    });
}
function deletePromo(req, res, next) {
  const id = req.params.id;
  Promo.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Promo with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllPromos,
  getById,
  postPromo,
  putPromo,
  deletePromo,
};
