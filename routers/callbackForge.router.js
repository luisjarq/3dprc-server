const express = require("express");
const router = express.Router();

function receiveToken(req,res,next){

}
function askToken(req,res,next){

}
//const { getByUser } = require("../controllers/cart.controller");
// READ OPERATIONS
router.get("/",askToken);
// CREATE OPERATION
router.post("/", receiveToken);
// UPDATE OPERATION
router.put("/:id", [, putCart);
// DELETE OPERATION
router.delete("/:id", [isAuth], deleteCart);

module.exports = router;