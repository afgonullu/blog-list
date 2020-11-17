const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "Extended Brain",
    author: "abdullah faruk",
    url: "afaruk.dev/extended-brain",
    likes: 15,
  },
  {
    title: "Digital Garden",
    author: "abdullah faruk",
    url: "afaruk.dev/digital-garden",
    likes: 2,
  },
  {
    title: "Coding Leverage",
    author: "abdullah faruk",
    url: "afaruk.dev/coding-leverage",
    likes: 43,
  },
  {
    title: "Exploring Subnautica",
    author: "cihangera",
    url: "afaruk.dev/subnautica",
    likes: 115,
  },
  {
    title: "Perfect House in Minecraft",
    author: "cihangera",
    url: "afaruk.dev/minecraft",
    likes: 1,
  },
  {
    title: "Lockdown and Having Children",
    author: "abdullah faruk",
    url: "afaruk.dev/lockdown",
    likes: 5,
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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
