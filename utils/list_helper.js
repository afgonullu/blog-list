var _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const onlyLikes = blogs.map((blog) => blog.likes)

  return onlyLikes.reduce((acc, i) => acc + i, 0)
}

const favoriteBlog = (blogs) => {
  const sorted = blogs.sort((a, b) => b.likes - a.likes)

  return sorted[0]
}

const mostBlogs = (blogs) => {
  if (blogs.length < 1) {
    return undefined
  } else {
    const authors = _.countBy(blogs, "author")
    const authors1 = Object.entries(authors).sort(([, a], [, b]) => b - a)
    return {
      author: authors1[0][0],
      blogs: authors1[0][1],
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length < 1) {
    return undefined
  } else {
    const authors = _.groupBy(blogs, "author")

    const keys = Object.keys(authors)

    // console.log(keys)

    let result = []

    for (let i = 0; i < keys.length; i++) {
      result.push({
        author: keys[i],
        likes: authors[keys[i]]
          .map((blog) => blog.likes)
          .reduce((acc, next) => acc + next, 0),
      })
    }

    result.sort((a, b) => b.likes - a.likes)

    return {
      author: result[0].author,
      likes: result[0].likes,
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
