import React from "react"
import { graphql } from "gatsby"

import { IGatsbyImageData, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Post from "../components/post"

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
    tag: string
  }
}

const TagPosts = ({ data, pageContext }: Props) => {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const pageHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout pageTitle={pageHeader}>
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

export const tagQuery = graphql`
  query ($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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

export default TagPosts
