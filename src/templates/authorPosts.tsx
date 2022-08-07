import React from "react"
import Layout from "../components/layout"
import Post from "../components/post"
import { graphql } from "gatsby"
import { authors } from "../utils/authors"

import { IGatsbyImageData, getImage } from "gatsby-plugin-image"

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
  file: any
}

type Props = {
  data: Data
  pageContext: {
    authorName: string
    imageUrl: string
  }
}

const authorPosts = ({ data, pageContext }: Props) => {
  const { totalCount } = data.allMarkdownRemark
  const author = authors.find((x) => x.name === pageContext.authorName)
  const pageHeader = `${totalCount} Posts by: ${pageContext.authorName}`

  return (
    <Layout pageTitle={pageHeader} author={author} authorImage={data.file}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
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
    </Layout>
  )
}

export const authorQuery = graphql`
  query ($authorName: String!, $imageUrl: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $authorName } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM Do YYYY")
            author
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
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`

export default authorPosts
