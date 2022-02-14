const express = require("express");
const router = express.Router();

function callbackToken(req,res,next){
    //console.log(req);
    return res.status(201).json(req.query);
}
//const { getByUser } = require("../controllers/cart.controller");
// READ OPERATIONS
router.get("/",callbackToken);
// CREATE OPERATION
//router.post("/", receiveToken);
// UPDATE OPERATION
//router.put("/:id", );
// DELETE OPERATION
//router.delete("/:id", );

module.exports = router;