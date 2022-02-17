const express = require("express");
const router = express.Router();
const { config } = require("dotenv");
var ForgeSDK = require("forge-apis");
const { ClientId, ClientSecret, Callback } = require("../config/config");
let oAuth2ThreeLegged;
let credentials;

function receiveToken(req, res, next) {
  //console.log(req);
  oAuth2ThreeLegged.getToken(req.query.code).then(
    function (credentials) {
      res.status(201).json(credentials);
    },
    function (err) {
      console.error(err);
      next(error);
    }
  );
}
function authorize(req, res, next) {
  // Initialize the 3-legged OAuth2 client, set specific scopes and optionally set the `autoRefresh` parameter to true
  // if you want the token to auto refresh
  let autoRefresh = true;
  oAuth2ThreeLegged = new ForgeSDK.AuthClientThreeLegged(
    ClientId,
    ClientSecret,
    Callback,
    ["data:read"],
    autoRefresh
  );

  // Generate a URL page that asks for permissions for the specified scopes.
  res.redirect(oAuth2ThreeLegged.generateAuthUrl());
}
function authorize2L(req, res, next) {
  let autoRefresh = true; // or false

  let oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(
    ClientId,
    ClientSecret,
    ["data:read"],
    autoRefresh
  );

  oAuth2TwoLegged.authenticate().then(
    function (cred) {
      credentials = cred;
      res.status(201).json(credentials);
    },
    function (err) {
      console.error(err);
      next(error);
    }
  );
}
function getHubs(req, res, next) {
  var HubsApi = new ForgeSDK.HubsApi();
  HubsApi.getHubs({}, oAuth2ThreeLegged, credentials).then(
    function (hubs) {
      console.log(hubs);
      res.json(hubs);
    },
    function (err) {
      console.error(err);
      next(error);
    }
  );
}
//const { getByUser } = require("../controllers/cart.controller");
// READ OPERATIONS
router.get("/authorize3L", authorize);
router.get("/authorize2L", authorize2L);
router.get("/hubs", getHubs);
// CREATE OPERATION
router.post("/", receiveToken);
// UPDATE OPERATION
//router.put("/:id", );
// DELETE OPERATION
//router.delete("/:id", );

module.exports = router;
