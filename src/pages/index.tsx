import React from "react"
import { graphql, PageProps, StaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import Post from "../components/post"

type DataProps = {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          id: number
          frontmatter: {
            title: string
            date: string
            author: string
            path: string
            tags: string[]
            image: any
            image_alt: string
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

const IndexPage = ({ data }: PageProps<DataProps>) => {
  return (
    <Layout pageTitle="Blog">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <StaticQuery
        query={indexQuery}
        render={(data) => {
          return (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }: any) => (
                <Post
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
            </div>
          )
        }}
      />
    </Layout>
  )
}

export default IndexPage

const indexQuery = graphql`
  query indexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
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
  }
`
