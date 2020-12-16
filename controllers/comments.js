const commentsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const logger = require("../utils/logger")

commentsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  response.json(blog.comments)
})

commentsRouter.get("/:id/comments/:cid", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  console.log(request.params.cid)
  const comment = blog["comments"].filter((comment) => {
    console.log(comment.id)
    console.log(comment.id === Number(request.params.cid))
    return comment.id === Number(request.params.cid)
  })
  if (comment) {
    response.json(comment)
  } else {
    response.status(404).end()
  }
})

commentsRouter.post("/:id/comments", async (request, response, next) => {
  console.log("hhhhheelllo")
  const body = request.body

  const blog = await Blog.findById(request.params.id)
  console.log(blog)

  const comment = {
    id: blog.comments.length + 1,
    text: body.text,
  }

  const updatedComments = [...blog.comments, comment]
  console.log(updatedComments)

  const updatedBlog = {
    ...blog._doc,
    comments: updatedComments,
  }

  console.log(updatedBlog)

  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  })

  response.json(result)
})

module.exports = commentsRouter
