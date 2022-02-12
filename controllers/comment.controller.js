const { Error } = require("mongoose");
const Comment = require("../models/comment");

function getAllComments(req, res, next) {
  Comment.find().exec((error, comment) => {
    if (error) {
      next(error);
    }
    return res.json(comment);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  Comment.findById(id).exec((error, comment) => {
    if (!comment) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(comment);
  });
}
async function postComment(req, res, next) {
  const newComment = new Comment({
    TEXT: req.body.text,
    rating: req.body.rating,
  });
  newComment
    .save()
    .then(() => res.status(201).json(newComment))
    .catch((error) => {
      next(error);
    });
}

function deleteComment(req, res, next) {
  const id = req.params.id;
  Comment.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Comment with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllComments,
  getById,
  postComment,
  deleteComment,
};