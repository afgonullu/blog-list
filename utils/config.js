require("dotenv").config()

const envVars = process.env
const PORT = envVars.PORT
const MONGODB_URI = envVars.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
}
