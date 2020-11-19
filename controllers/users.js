const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response, next) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  })
  response.json(users)
})

usersRouter.post("/", async (request, response, next) => {
  const body = request.body

  if (body.password) {
    if (body.password.length < 3) {
      return response.status(400).json({
        error: "password is too short. should be at least 3 characters long.",
      })
    }
  } else {
    return response.status(400).json({
      error:
        "password cannot be empty and should be at least 3 characters long.",
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.delete("/:id", async (request, response, next) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter
