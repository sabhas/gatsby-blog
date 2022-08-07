import { GatsbyNode } from "gatsby"
import path from "path"
import _ from "lodash"

import { slugify, authors } from "./src/utils"

type TypeNode = {
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

type TypeData = {
  allMarkdownRemark: {
    edges: TypeNode[]
  }
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
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

  const res = await graphql<TypeData>(`
    {
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

  if (res.errors) return Promise.reject(res.errors)

  const posts = res.data?.allMarkdownRemark.edges

  posts?.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: templates.singlePost,
      context: {
        // Passing slug for template to use to get post
        slug: node.fields.slug,
        // Find author imageUrl from authors and pass it to the single post template
        imageUrl: authors.find((x) => x.name === node.frontmatter.author)
          ?.imageUrl,
      },
    })
  })

  // Get all tags
  let tags: string[] = []
  _.each(posts, (edge) => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags.push(...edge.node.frontmatter.tags)
    }
  })

  const tagPostCounts: any = {}
  tags.forEach((tag) => {
    tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
  })

  tags = _.uniq(tags)

  // Create tags page
  createPage({
    path: `/tags`,
    component: templates.tagsPage,
    context: {
      tags,
      tagPostCounts,
    },
  })

  // Create tag posts pages
  tags.forEach((tag) => {
    createPage({
      path: `/tag/${slugify(tag)}`,
      component: templates.tagPosts,
      context: {
        tag,
      },
    })
  })

  const postsPerPage = 2
  const numberOfPages = Math.ceil(posts?.length ?? 0 / postsPerPage)

  Array.from({ length: numberOfPages }).forEach((_, index) => {
    const isFirstPage = index === 0
    const currentPage = index + 1

    if (isFirstPage) return

    createPage({
      path: `/page/${currentPage}`,
      component: templates.postList,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        currentPage,
        numberOfPages,
      },
    })
  })

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
