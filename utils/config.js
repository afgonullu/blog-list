require("dotenv").config()

// eslint-disable-next-line no-undef
const envVars = process.env
const PORT = envVars.PORT
let MONGODB_URI = envVars.MONGODB_URI
let TEST_MONGODB_URI = envVars.TEST_MONGODB_URI

if (process.env.NODE_ENV === "test") {
  MONGODB_URI = TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
  TEST_MONGODB_URI,
}
