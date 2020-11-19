const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "Extended Brain",
    author: "abdullah faruk",
    url: "afaruk.dev/extended-brain",
    likes: 15,
    user: "5fb65f5889606f0e6f1f10ab",
  },
  {
    title: "Digital Garden",
    author: "abdullah faruk",
    url: "afaruk.dev/digital-garden",
    likes: 2,
    user: "5fb65f5889606f0e6f1f10ab",
  },
  {
    title: "Coding Leverage",
    author: "abdullah faruk",
    url: "afaruk.dev/coding-leverage",
    likes: 43,
    user: "5fb65f5889606f0e6f1f10ab",
  },
  {
    title: "Exploring Subnautica",
    author: "cihangera",
    url: "afaruk.dev/subnautica",
    likes: 115,
    user: "5fb65f5889606f0e6f1f10ab",
  },
  {
    title: "Perfect House in Minecraft",
    author: "cihangera",
    url: "afaruk.dev/minecraft",
    likes: 1,
    user: "5fb65f5889606f0e6f1f10ab",
  },
  {
    title: "Lockdown and Having Children",
    author: "abdullah faruk",
    url: "afaruk.dev/lockdown",
    likes: 5,
    user: "5fb65f5889606f0e6f1f10ab",
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon", date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
