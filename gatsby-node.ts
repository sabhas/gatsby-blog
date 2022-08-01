import { GatsbyNode } from "gatsby"
import path from "path"
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`)

import { slugify, authors } from "./src/utils"

type TypeNode = {
  node: {
    frontmatter: {
      author: string
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
  const singlePostTemplate = path.resolve("src/templates/singlePost.tsx")

  const res = await graphql<TypeData>(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
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
      component: singlePostTemplate,
      context: {
        // Passing slug for template to use to get post
        slug: node.fields.slug,
        // Find author imageUrl from authors and pass it to the single post template
        imageUrl: authors.find((x) => x.name === node.frontmatter.author)
          ?.imageUrl,
      },
    })
  })
}
