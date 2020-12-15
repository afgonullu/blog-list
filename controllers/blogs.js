const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const logger = require("../utils/logger")

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization")
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     request.token = authorization.substring(7)
//     return request.token
//   }
//   return null
// }

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body

  // const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0,
    user: user,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  const userFromToken = jwt.verify(request.token, process.env.SECRET)
  console.log(userFromToken.id.toString() === blog.user.toString())

  if (userFromToken.id.toString() === blog.user.toString()) {
    logger.info("hey are equal")
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({
      error: "you are not authorized to delete this blog",
    })
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  response.json(updatedBlog)
})

module.exports = blogsRouter
