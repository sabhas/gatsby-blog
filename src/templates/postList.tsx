import React from "react"
import Layout from "../components/layout"
import Post from "../components/post"
import { graphql } from "gatsby"

import { IGatsbyImageData, getImage } from "gatsby-plugin-image"

import PaginationLinks from "../components/paginationLinks"

type Data = {
  allMarkdownRemark: {
    totalCount: number
    edges: [
      {
        node: {
          id: number
          frontmatter: {
            title: string
            date: string
            author: string
            tags: string[]
            image_alt: string
            image: IGatsbyImageData
          }
          fields: {
            slug: string
          }
          excerpt: string
        }
      }
    ]
  }
}

type Props = {
  data: Data
  pageContext: {
    limit: number
    skip: number
    currentPage: number
    numberOfPages: number
  }
}

const PostList = ({ data, pageContext }: Props) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numberOfPages } = pageContext

  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      {posts.map(({ node }) => (
        <Post
          key={node.id}
          title={node.frontmatter.title}
          slug={node.fields.slug}
          author={node.frontmatter.author}
          tags={node.frontmatter.tags}
          body={node.excerpt}
          date={node.frontmatter.date}
          image={getImage(node.frontmatter.image)}
          imageAlt={node.frontmatter.image_alt}
        />
      ))}
      <PaginationLinks
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Layout>
  )
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            author
            date(formatString: "MMM Do YYYY")
            tags
            image_alt
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default PostList
