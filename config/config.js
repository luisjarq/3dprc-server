const dotnev = require("dotenv");
dotnev.config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const JWT_Secret = process.env.JWT_Secret;
const JWT_AdminSecret = process.env.JWT_AdminSecret;

module.exports = { DB_URL, PORT, JWT_Secret , JWT_AdminSecret};
