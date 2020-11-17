const listHelper = require("../utils/list_helper")

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
]

const multipleblogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
]

describe("dummy", () => {
  test("string returns 1", () => {
    expect(listHelper.dummy("blogs")).toBe(1)
  })

  test("array returns 1", () => {
    expect(
      listHelper.dummy(["ali", 1, "afgonullu", { ali: 1, afgonullu: "hello" }])
    ).toBe(1)
  })

  test("number returns 1", () => {
    expect(listHelper.dummy(5)).toBe(1)
  })

  test("object returns 1", () => {
    expect(listHelper.dummy({ ali: 1, afgonullu: "hello" })).toBe(1)
  })
})

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([])

    expect(result).toBe(0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)

    expect(result).toBe(5)
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(multipleblogs)

    expect(result).toBe(36)
  })
})

describe("favoriteBlog", () => {
  test("of empty list is zero", () => {
    const result = listHelper.favoriteBlog([])

    expect(result).toEqual(undefined)
  })

  test("when list has only one blog, equals the that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)

    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    })
  })

  test("of a bigger list is returned the blog with most likes", () => {
    const result = listHelper.favoriteBlog(multipleblogs)

    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    })
  })
})

describe("mostBlogs", () => {
  test("of empty list is zero", () => {
    const result = listHelper.mostBlogs([])

    expect(result).toEqual(undefined)
  })

  test("when list has only one blog, equals the that blogs author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog)

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    })
  })

  test("of a bigger list is returned the blog with most likes", () => {
    const result = listHelper.mostBlogs(multipleblogs)

    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    })
  })
})

describe("mostLikes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.mostLikes([])

    expect(result).toEqual(undefined)
  })

  test("when list has only one blog, equals the that blogs author", () => {
    const result = listHelper.mostLikes(listWithOneBlog)

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    })
  })

  test("of a bigger list is returned the blog with most likes", () => {
    const result = listHelper.mostLikes(multipleblogs)

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})
