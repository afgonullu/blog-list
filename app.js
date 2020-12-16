const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const loginRouter = require("./controllers/login")
const usersRouter = require("./controllers/users")
const blogsRouter = require("./controllers/blogs")
const commentsRouter = require("./controllers/comments")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

let uri = config.MONGODB_URI

if (process.env.NODE_ENV === "test") {
  uri = config.TEST_MONGODB_URI
}

logger.info("connecting to", uri)
logger.info(process.env.NODE_ENV)

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/blogs", commentsRouter)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing")
  app.use("/api/testing", testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
