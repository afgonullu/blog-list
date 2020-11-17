require("dotenv").config()

// eslint-disable-next-line no-undef
const envVars = process.env
const PORT = envVars.PORT
let MONGODB_URI = envVars.MONGODB_URI

if (envVars.NODE_ENV === "test") {
  MONGODB_URI = envVars.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
}
