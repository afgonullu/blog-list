const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe("blog_api", () => {
  describe("get blogs", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    })

    test("all blogs are returned", async () => {
      const response = await api.get("/api/blogs")

      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test("a specific blog is within the returned blogs", async () => {
      const response = await api.get("/api/blogs")

      const contents = response.body.map((r) => r.title)

      expect(contents).toContain("Exploring Subnautica")
    })
  })

  describe("get specific blog", () => {
    test("a specific blog can be viewed", async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)

      expect(resultBlog.body.id).toBeDefined()
    })

    test("unique identifier property of the blog posts is named id", async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

      expect(resultBlog.body).toEqual(processedBlogToView)
    })

    // test("fails with statuscode 404 if blog does not exist", async () => {
    //   const validNonexistingId = await helper.nonExistingId()

    //   console.log(validNonexistingId)

    //   await api.get(`/api/notes/${validNonexistingId}`).expect(404)
    // })

    // test("fails with statuscode 400 id is invalid", async () => {
    //   const invalidId = "5a3d5da59070081a82a3445"

    //   await api.get(`/api/notes/${invalidId}`).expect(400)
    // })
  })

  describe("addition of a new blog", () => {
    test("a valid blog can be added ", async () => {
      const newBlog = {
        title: "Financial Freedom",
        author: "abdullah faruk",
        url: "afaruk.dev/financial-freedom",
        likes: 500,
        user: "5fb65f5889606f0e6f1f10ab",
      }

      await api
        .post("/api/blogs")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNpaGFuZ2VyYSIsImlkIjoiNWZiNjVmNTg4OTYwNmYwZTZmMWYxMGFiIiwiaWF0IjoxNjA1Nzg3NDk5fQ.MpQE5TOu-ZUKTJs9_J6_IoQTs6eP3UXxXO3utQY5eec"
        )
        .send(newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map((n) => n.title)
      expect(contents).toContain("Financial Freedom")
    })

    test("post fails if no token is provided", async () => {
      const newBlog = {
        title: "Financial Freedom",
        author: "abdullah faruk",
        url: "afaruk.dev/financial-freedom",
        likes: 500,
        user: "5fb65f5889606f0e6f1f10ab",
      }

      await api.post("/api/blogs").send(newBlog).expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test("if the likes property is missing from the post request, it will default to the value 0", async () => {
      const newBlog = {
        title: "Lifestyle Business",
        author: "abdullah faruk",
        url: "afaruk.dev/lifestyle-business",
      }

      await api
        .post("/api/blogs")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNpaGFuZ2VyYSIsImlkIjoiNWZiNjVmNTg4OTYwNmYwZTZmMWYxMGFiIiwiaWF0IjoxNjA1Nzg3NDk5fQ.MpQE5TOu-ZUKTJs9_J6_IoQTs6eP3UXxXO3utQY5eec"
        )
        .send(newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map((n) => n.likes)
      expect(contents).toContain(0)
    })

    test("blog without title and url is not added", async () => {
      const newBlog = {
        author: "abdullah faruk",
      }

      await api
        .post("/api/blogs")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNpaGFuZ2VyYSIsImlkIjoiNWZiNjVmNTg4OTYwNmYwZTZmMWYxMGFiIiwiaWF0IjoxNjA1Nzg3NDk5fQ.MpQE5TOu-ZUKTJs9_J6_IoQTs6eP3UXxXO3utQY5eec"
        )
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNpaGFuZ2VyYSIsImlkIjoiNWZiNjVmNTg4OTYwNmYwZTZmMWYxMGFiIiwiaWF0IjoxNjA1Nzg3NDk5fQ.MpQE5TOu-ZUKTJs9_J6_IoQTs6eP3UXxXO3utQY5eec"
      )
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).not.toContain(blogToDelete.content)
  })

  test("a blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToUpdate = blogsAtStart[0]

    blogToUpdate = { ...blogToUpdate, likes: 999 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const likes = blogsAtEnd[0].likes
    expect(likes).toBe(999)
  })

  describe("addition of a new user", () => {
    test("a valid user can be added ", async () => {
      const newUser = {
        username: "afaruk",
        name: "afgonullu",
        password: "123456",
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      const createdUser = usersAtEnd.find(
        (user) => user.username === newUser.username
      )

      const contents = usersAtEnd.map((n) => n.username)
      expect(contents).toContain("afaruk")

      await User.findByIdAndRemove(createdUser.id)
    })

    test("username must be at least 3 characters long", async () => {
      const newUser = {
        username: "cq",
        name: "cq test user",
        password: "123456",
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    })

    test("password must be at least 3 characters long", async () => {
      const newUser = {
        username: "cqe",
        name: "cq test user",
        password: "12",
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})
