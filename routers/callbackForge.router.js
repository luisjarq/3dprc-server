const express = require("express");
const router = express.Router();

function receiveToken(req,res,next){
console.log(req);
}
function askToken(req,res,next){

}
//const { getByUser } = require("../controllers/cart.controller");
// READ OPERATIONS
router.get("/",askToken);
// CREATE OPERATION
router.post("/", receiveToken);
// UPDATE OPERATION
//router.put("/:id", );
// DELETE OPERATION
//router.delete("/:id", );

module.exports = router;