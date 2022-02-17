const dotnev = require("dotenv");
dotnev.config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const JWT_Secret = process.env.JWT_Secret;
const JWT_AdminSecret = process.env.JWT_AdminSecret;
const ClientId = process.env.ClientId;
const ClientSecret = process.env.ClientSecret;
const Callback = process.env.callback;

module.exports = {
  DB_URL,
  PORT,
  JWT_Secret,
  JWT_AdminSecret,
  ClientId,
  ClientSecret,
  Callback,
};
