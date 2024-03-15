import { GatsbyNode } from "gatsby"
import path from "path"
import _ from "lodash"

import { slugify, authors } from "./src/utils"

interface MarkdownRemarkNode {
  node: {
    frontmatter: {
      author: string
      tags: string[]
    }
    fields: {
      slug: string
    }
  }
}

interface MarkdownQueryData {
  allMarkdownRemark: {
    edges: MarkdownRemarkNode[]
  }
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions

  const templates = {
    singlePost: path.resolve("src/templates/singlePost.tsx"),
    tagsPage: path.resolve("src/templates/tagsPage.tsx"),
    tagPosts: path.resolve("src/templates/tagPost.tsx"),
    postList: path.resolve("src/templates/postList.tsx"),
    authorPosts: path.resolve("src/templates/authorPosts.tsx"),
  }

  const res = await graphql<MarkdownQueryData>(`
    query AllMarkdownData{
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (res.errors) {
    console.error("GraphQL query error:", res.errors)
    throw new Error("GraphQL query failed")
  }

  const posts = res.data?.allMarkdownRemark.edges || []

  // Create individual post pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: templates.singlePost,
      context: {
        slug: node.fields.slug,
        imageUrl: authors.find((x) => x.name === node.frontmatter.author)?.imageUrl,
      },
    })
  })

  // Create tag pages
  const allTags: string[] = []
  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      allTags.push(...node.frontmatter.tags)
    }
  })

  const tagPostCounts = _.countBy(allTags)
  const uniqueTags = _.uniq(allTags)

  createPage({
    path: `/tags`,
    component: templates.tagsPage,
    context: {
      tags: uniqueTags,
      tagPostCounts,
    },
  })

  // Create tag post pages
  uniqueTags.forEach((tag) => {
    createPage({
      path: `/tag/${slugify(tag)}`,
      component: templates.tagPosts,
      context: {
        tag,
      },
    })
  })

  // Create paginated post list
  const postsPerPage = 2
  const numberOfPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numberOfPages }).forEach((_, index) => {
    const currentPage = index + 1
    const skip = index * postsPerPage

    createPage({
      path: `/page/${currentPage}`,
      component: templates.postList,
      context: {
        limit: postsPerPage,
        skip,
        currentPage,
        numberOfPages,
      },
    })
  })

  // Create author pages
  authors.forEach((author) => {
    createPage({
      path: `/author/${slugify(author.name)}`,
      component: templates.authorPosts,
      context: {
        authorName: author.name,
        imageUrl: author.imageUrl,
      },
    })
  })
}
